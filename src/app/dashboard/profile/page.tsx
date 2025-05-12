'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'
import { FiUser, FiMail, FiPhone, FiMapPin, FiChevronLeft, FiEdit } from 'react-icons/fi'

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  // Placeholder user data - in a real app, you would fetch this from your API
  const userData = {
    id: session?.user?.id || '1',
    name: session?.user?.name || 'John Doe',
    email: session?.user?.email || 'user@example.com',
    role: session?.user?.role || 'patient',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Anytown, USA',
    dateOfBirth: '1985-06-15',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      setLoading(false)
    }
  }, [status, router])

  if (loading || status === 'loading') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-700">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom max-w-4xl">
          <div className="mb-6">
            <Link 
              href="/dashboard"
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <FiChevronLeft className="mr-1" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-primary-600 text-white">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <p className="text-primary-100">Manage your personal information</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={userData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-center">{userData.name}</h2>
                  <p className="text-gray-600 mb-4 text-center capitalize">{userData.role}</p>
                  
                  <button className="btn-outline flex items-center justify-center w-full">
                    <FiEdit className="mr-2" />
                    Change Photo
                  </button>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                      <p className="text-gray-800">{userData.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                      <p className="text-gray-800">{userData.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                      <p className="text-gray-800">{userData.phone}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h3>
                      <p className="text-gray-800">{userData.dateOfBirth}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                      <p className="text-gray-800">{userData.address}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Emergency Contact</h3>
                      <p className="text-gray-800">{userData.emergencyContact}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button className="btn-primary flex-1">
                      Edit Profile
                    </button>
                    <button className="btn-outline flex-1">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 