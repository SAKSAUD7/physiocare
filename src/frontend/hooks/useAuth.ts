import { useState, useCallback } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Custom hook for authentication functionality
 */
export default function useAuth() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Login using credentials
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        return false;
      }

      if (result?.ok) {
        router.push('/dashboard');
        return true;
      }

      return false;
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [router]);

  /**
   * Login with Google
   */
  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true
      });
      // No need to return anything here as the redirect happens automatically
    } catch (err) {
      setError('An error occurred during Google sign in');
      console.error('Google sign in error:', err);
      setLoading(false);
      return false;
    }
  }, []);

  /**
   * Logout the current user
   */
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });
      // Force a hard reload to ensure session is cleared
      window.location.href = '/';
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      // Fallback - force redirect to home page
      window.location.href = '/';
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = status === 'authenticated';

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback((role: string) => {
    return isAuthenticated && session?.user?.role === role;
  }, [isAuthenticated, session]);

  return {
    login,
    loginWithGoogle,
    logout,
    isAuthenticated,
    isLoading: status === 'loading' || loading,
    error,
    session,
    user: session?.user,
    hasRole,
  };
} 