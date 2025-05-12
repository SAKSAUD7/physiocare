import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import NextAuth from 'next-auth/next';
import bcrypt from 'bcryptjs';

// Mock admin user for testing purposes
const mockUsers = [
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

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Try to connect to DB first
          try {
            await connectDB();
            
            // Find user by email in real database
            const user = await User.findOne({ email: credentials.email }).select('+password');
            
            if (user) {
              // Verify password
              const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
              
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
            console.log('DB connection failed, using mock users', dbError);
          }
          
          // If DB connection fails or user not found, use mock users
          const mockUser = mockUsers.find(user => user.email === credentials.email);
          
          if (!mockUser) {
            return null;
          }

          // Verify password against mock user
          const isPasswordValid = await bcrypt.compare(credentials.password, mockUser.password);
          
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
          };
        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Try to connect to DB first
          try {
            await connectDB();
            
            // Check if the user already exists in our database
            const existingUser = await User.findOne({ email: user.email });
            
            if (existingUser) {
              // Update user information if needed
              return true;
            }
            
            // Create a new user if they don't exist
            const newUser = new User({
              name: user.name,
              email: user.email,
              password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 10), // Generate random password
              role: 'patient' // Default role
            });
            
            await newUser.save();
          } catch (dbError) {
            console.log('DB connection failed during Google sign in', dbError);
            // For demo purposes, we'll still allow sign in even if DB fails
          }
          
          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      
      // If it's a Google sign-in, fetch user role from database or use mock
      if (account?.provider === 'google') {
        try {
          try {
            await connectDB();
            const dbUser = await User.findOne({ email: token.email });
            if (dbUser) {
              token.id = dbUser._id.toString();
              token.role = dbUser.role;
            }
          } catch (dbError) {
            console.log('DB connection failed during Google auth, using default role', dbError);
            // For demo, set a default role
            token.role = 'patient';
          }
        } catch (error) {
          console.error('Error in jwt callback:', error);
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };