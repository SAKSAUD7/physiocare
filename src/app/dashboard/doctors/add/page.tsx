'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiChevronLeft, FiPlus, FiCalendar, FiX } from 'react-icons/fi'

interface DoctorFormData {
  name: string
  email: string
  password: string
  phone: string
  specialization: string
  qualifications: string
  experience: number
  bio: string
  consultationFee: number
  profileImage?: string
}

export default function AddDoctorPage() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<DoctorFormData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Check if user is admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  const onSubmit = async (data: DoctorFormData) => {
    setLoading(true)
    setError(null)
    
    try {
      // This would be an API call in a real app
      // const response = await fetch('/api/doctors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })
      
      // if (!response.ok) {
      //   throw new Error('Failed to create doctor')
      // }
      
      // Mock successful response
      console.log('Doctor data:', data)
      
      setSuccess(true)
      reset()
      
      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard/doctors')
      }, 2000)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom">
          <div className="flex items-center mb-8">
            <Link 
              href="/dashboard/doctors"
              className="flex items-center text-gray-600 hover:text-primary-600 mr-4"
            >
              <FiChevronLeft className="mr-1" />
              <span>Back to Doctors</span>
            </Link>
            <h1 className="text-2xl font-bold">Add New Doctor</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                Doctor has been added successfully! Redirecting...
              </div>
            ) : null}
            
            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                {error}
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4 md:col-span-2">
                  <h2 className="text-lg font-semibold border-b pb-2">Basic Information</h2>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Dr. Full Name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="doctor@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        {...register('password', { 
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="••••••••"
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Professional Information */}
                <div className="space-y-4 md:col-span-2">
                  <h2 className="text-lg font-semibold border-b pb-2">Professional Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization
                      </label>
                      <input
                        id="specialization"
                        type="text"
                        {...register('specialization', { required: 'Specialization is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g. Sports Rehabilitation"
                      />
                      {errors.specialization && (
                        <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <input
                        id="experience"
                        type="number"
                        {...register('experience', { 
                          required: 'Experience is required',
                          min: {
                            value: 0,
                            message: 'Experience must be a positive number'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="5"
                      />
                      {errors.experience && (
                        <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                      Qualifications (comma separated)
                    </label>
                    <input
                      id="qualifications"
                      type="text"
                      {...register('qualifications', { required: 'Qualifications are required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. DPT, OCS, CSCS"
                    />
                    {errors.qualifications && (
                      <p className="mt-1 text-sm text-red-600">{errors.qualifications.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700 mb-1">
                        Consultation Fee ($)
                      </label>
                      <input
                        id="consultationFee"
                        type="number"
                        {...register('consultationFee', { 
                          required: 'Consultation fee is required',
                          min: {
                            value: 0,
                            message: 'Fee must be a positive number'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="85"
                      />
                      {errors.consultationFee && (
                        <p className="mt-1 text-sm text-red-600">{errors.consultationFee.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image URL (optional)
                      </label>
                      <input
                        id="profileImage"
                        type="text"
                        {...register('profileImage')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Biography
                    </label>
                    <textarea
                      id="bio"
                      {...register('bio', { 
                        required: 'Biography is required',
                        maxLength: {
                          value: 1000,
                          message: 'Biography cannot exceed 1000 characters'
                        }
                      })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Write a professional biography describing the doctor's background, expertise, and approach to patient care..."
                    ></textarea>
                    {errors.bio && (
                      <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Link
                  href="/dashboard/doctors"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 