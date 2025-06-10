import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth/next';
import { findUserByCredentials, findOrCreateOAuthUser, findUserByEmail } from '@/backend/services/authService';

/**
 * NextAuth configuration options
 */
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
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

        // Special handling for test accounts
        const isTestAccount = [
          'admin@physiocare.com',
          'doctor@physiocare.com',
          'patient@physiocare.com'
        ].includes(credentials.email.toLowerCase());

        if (isTestAccount) {
          console.log('Test account login attempt:', credentials.email);
        }

        // Use authentication service to validate credentials
        const user = await findUserByCredentials(credentials.email, credentials.password);
        
        // Log authentication result for debugging
        if (user) {
          console.log('User authenticated successfully:', user.email);
        } else {
          console.log('Authentication failed for:', credentials.email);
        }
        
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile) {
        try {
          console.log('Google sign-in attempt for:', profile.email);
          
          // Use service to find or create user from OAuth profile
          const oauthUser = await findOrCreateOAuthUser(profile);
          
          if (oauthUser) {
            console.log('Google authentication successful for:', oauthUser.email);
            return true;
          } else {
            console.error('Failed to process Google sign-in for:', profile.email);
            return false;
          }
        } catch (error) {
          console.error('Error during Google sign-in:', error);
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
      
      // If it's a Google sign-in, make sure we have the role
      if (account?.provider === 'google' && token.email) {
        try {
          const dbUser = await findUserByEmail(token.email as string);
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            console.log('JWT updated with user role from DB:', dbUser.role);
          } else {
            // Default role for OAuth users
            token.role = 'patient';
            console.log('Default role assigned for OAuth user:', token.email);
          }
        } catch (error) {
          console.error('Error retrieving user role for JWT:', error);
          // Fallback to patient role
          token.role = 'patient';
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
    signOut: '/',
  },
  secret: process.env.NEXTAUTH_SECRET || 'physiocare-nextauth-secret-key',
  debug: process.env.NODE_ENV === 'development',
};

/**
 * NextAuth API handler
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };