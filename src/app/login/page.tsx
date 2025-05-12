'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiMail, FiUser, FiShield, FiUsers, FiAlertCircle, FiCheck } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Check if already authenticated and redirect
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  // Check for query parameters
  useEffect(() => {
    const registered = searchParams.get('registered')
    const emailParam = searchParams.get('email')
    const callbackUrl = searchParams.get('callbackUrl')
    
    if (registered === 'true' && emailParam) {
      setSuccessMessage('Registration successful! Please log in with your credentials.')
      setEmail(emailParam)
    }
    
    // Check for error message from NextAuth
    const errorMessage = searchParams.get('error')
    if (errorMessage) {
      if (errorMessage === 'OAuthCallback') {
        setError('Error signing in with Google. Please try again.')
      } else if (errorMessage === 'CredentialsSignin') {
        setError('Invalid email or password. Please try again.')
      } else {
        setError('An error occurred during sign in.')
      }
    }
  }, [searchParams])

  const fillTestCredentials = (role: string) => {
    if (role === 'admin') {
      setEmail('admin@physiocare.com')
      setPassword('admin123')
    } else if (role === 'doctor') {
      setEmail('doctor@physiocare.com')
      setPassword('doctor123')
    } else if (role === 'patient') {
      setEmail('patient@physiocare.com')
      setPassword('patient123')
    }
    // Clear any previous errors
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    // Basic validation
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    try {
      setIsLoading(true)
      
      // Special handling for test accounts
      const isTestAccount = [
        'admin@physiocare.com',
        'doctor@physiocare.com',
        'patient@physiocare.com'
      ].includes(email.toLowerCase())
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        if (isTestAccount) {
          console.error('Test account login failed:', result.error)
          setError('Test account login failed. Please try again with the exact credentials shown')
        } else {
          setError('Invalid email or password')
        }
        return
      }

      if (result?.ok) {
        setSuccessMessage('Login successful! Redirecting to dashboard...')
        // Use window.location for a more reliable redirect
        window.location.href = '/dashboard'
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true)
      await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true
      })
    } catch (err) {
      console.error('Google sign in error:', err)
      setError('An error occurred during Google sign in')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
            
            {successMessage && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 flex items-center">
                <FiCheck className="mr-2 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 flex items-center">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Test Accounts Section - More prominently displayed */}
            <div className="mb-6 border border-primary-100 rounded-lg bg-primary-50 p-4">
              <h3 className="font-medium text-primary-800 mb-2 flex items-center">
                <FiUsers className="mr-2" />
                Test Accounts (Click to autofill)
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => fillTestCredentials('admin')}
                  className="text-left border border-primary-200 rounded p-2 hover:bg-primary-100 transition flex items-center"
                >
                  <FiShield className="mr-2 text-primary-700" />
                  <div>
                    <p className="font-medium text-primary-700">Admin</p>
                    <p className="text-xs text-primary-600">admin@physiocare.com / admin123</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => fillTestCredentials('doctor')}
                  className="text-left border border-primary-200 rounded p-2 hover:bg-primary-100 transition flex items-center"
                >
                  <FiUser className="mr-2 text-primary-700" />
                  <div>
                    <p className="font-medium text-primary-700">Doctor</p>
                    <p className="text-xs text-primary-600">doctor@physiocare.com / doctor123</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => fillTestCredentials('patient')}
                  className="text-left border border-primary-200 rounded p-2 hover:bg-primary-100 transition flex items-center"
                >
                  <FiUser className="mr-2 text-primary-700" />
                  <div>
                    <p className="font-medium text-primary-700">Patient</p>
                    <p className="text-xs text-primary-600">patient@physiocare.com / patient123</p>
                  </div>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex justify-center items-center py-2.5 px-4"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <FiMail className="mr-2" />
                      Log In with Email
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative flex items-center justify-center mt-6 mb-6">
                <div className="absolute w-full border-t border-gray-300"></div>
                <div className="relative bg-white px-4 text-sm text-gray-500">
                  Or continue with
                </div>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {googleLoading ? (
                    <>
                      <div className="animate-spin h-5 w-5 mr-2 border-2 border-primary-600 border-t-transparent rounded-full"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <FaGoogle className="mr-2 text-red-600" />
                      Sign in with Google
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary-600 font-medium hover:text-primary-700">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 