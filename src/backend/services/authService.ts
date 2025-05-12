import bcrypt from 'bcryptjs';
import User from '../models/User';
import { connectDB } from '../db/database';

/**
 * Mock user data for fallback when database is unavailable
 */
export const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@physiocare.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    id: '2',
    name: 'Doctor User',
    email: 'doctor@physiocare.com',
    password: bcrypt.hashSync('doctor123', 10),
    role: 'doctor',
  },
  {
    id: '3',
    name: 'Patient User',
    email: 'patient@physiocare.com',
    password: bcrypt.hashSync('patient123', 10),
    role: 'patient',
  }
];

/**
 * Find user by credentials
 */
export async function findUserByCredentials(email: string, password: string) {
  try {
    // Check mock users first for test accounts (faster and more reliable)
    const mockUser = mockUsers.find(user => user.email === email);
    if (mockUser) {
      try {
        // Compare password directly for mock users
        const isPasswordValid = await bcrypt.compare(password, mockUser.password);
        if (isPasswordValid) {
          console.log('Mock user authenticated:', mockUser.email);
          return {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
          };
        }
      } catch (mockError) {
        console.error('Error comparing mock user password:', mockError);
      }
    }

    // If not a mock user or mock auth failed, try database
    try {
      // Ensure connection is made before proceeding
      await connectDB();
      
      // Find user by email in real database
      const user = await User.findOne({ email }).select('+password');
      
      if (user) {
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
      }
    } catch (dbError) {
      console.log('DB connection failed:', dbError);
    }
    
    return null;
  } catch (error) {
    console.error('Error in findUserByCredentials:', error);
    return null;
  }
}

/**
 * Find or create user from OAuth provider
 */
export async function findOrCreateOAuthUser(profile: any) {
  try {
    console.log('Processing OAuth profile:', profile.email);
    
    // Check if it's a mock user email
    const mockUser = mockUsers.find(user => user.email === profile.email);
    if (mockUser) {
      console.log('OAuth user matched with mock user:', mockUser.email);
      return {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
      };
    }

    // Try to connect to DB
    try {
      await connectDB();
      
      // Check if the user already exists in our database
      const existingUser = await User.findOne({ email: profile.email });
      
      if (existingUser) {
        console.log('OAuth user found in database:', existingUser.email);
        return {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        };
      }
      
      // Create a new user if they don't exist
      const newUser = new User({
        name: profile.name || profile.given_name + ' ' + profile.family_name,
        email: profile.email,
        password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 10), // Generate random password
        role: 'patient', // Default role for OAuth users
        profileImage: profile.picture || null,
        emailVerified: true // OAuth emails are verified by the provider
      });
      
      await newUser.save();
      console.log('New OAuth user created:', newUser.email);
      
      return {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };
    } catch (dbError) {
      console.log('DB connection failed during OAuth sign in', dbError);
    }
    
    // If DB connection fails and not a mock user, create basic profile
    console.log('Creating temporary OAuth user profile:', profile.email);
    return {
      id: profile.sub || 'oauth-id',
      name: profile.name || profile.given_name + ' ' + profile.family_name,
      email: profile.email,
      role: 'patient',
    };
  } catch (error) {
    console.error('Error in findOrCreateOAuthUser:', error);
    return null;
  }
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string) {
  // Check mock users first (faster)
  const mockUser = mockUsers.find(user => user.email === email);
  if (mockUser) {
    return {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    };
  }
  
  try {
    await connectDB();
    const user = await User.findOne({ email });
    
    if (user) {
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
} 