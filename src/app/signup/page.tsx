'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FaGoogle } from 'react-icons/fa'
import { FiAlertCircle } from 'react-icons/fi'

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    phone: '',
    address: '',
    problem: '',
    problemDetails: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phone: formData.phone,
          address: formData.address,
          problem: formData.problem,
          problemDetails: formData.problemDetails,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      // If registration was successful, redirect to login
      router.push(`/login?registered=true&email=${encodeURIComponent(formData.email)}`)
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true)
      await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true
      })
    } catch (err) {
      console.error('Google sign up error:', err)
      setError('An error occurred during Google sign up')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 flex items-center">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  I am a
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Physiotherapist</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Profile Photo
                </label>
                <input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              {formData.role === 'patient' && (
                <>
                  <div>
                    <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Physiotherapy Problem
                    </label>
                    <select
                      id="problem"
                      name="problem"
                      value={formData.problem}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a problem</option>
                      <option value="back_pain">Back Pain</option>
                      <option value="knee_pain">Knee Pain</option>
                      <option value="shoulder_pain">Shoulder Pain</option>
                      <option value="neck_pain">Neck Pain</option>
                      <option value="ankle_pain">Ankle Pain</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {formData.problem === 'other' && (
                    <div>
                      <label htmlFor="problemDetails" className="block text-sm font-medium text-gray-700 mb-1">
                        Describe Your Problem
                      </label>
                      <textarea
                        id="problemDetails"
                        name="problemDetails"
                        value={formData.problemDetails}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        rows={4}
                      />
                    </div>
                  )}
                </>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex justify-center items-center py-2.5 px-4"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Creating account...
                    </>
                  ) : (
                    'Sign Up'
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
                  onClick={handleGoogleSignUp}
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
                      Sign up with Google
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Log in
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