'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiUser, FiEdit, FiMail, FiPhone, FiMapPin, FiChevronLeft, FiSave, FiUpload, FiCamera, FiLock, FiAlertCircle } from 'react-icons/fi'

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status, update } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [avatarSrc, setAvatarSrc] = useState('')
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [changePassword, setChangePassword] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
  })
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch the user's profile data
    // For now, we'll use mock data
    if (status === 'authenticated' && session?.user) {
      setUserProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: '(555) 123-4567',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        bio: session.user.role === 'doctor' ? 
            'Experienced physiotherapist specializing in sports injuries and rehabilitation.' : 
            'I enjoy staying active and maintaining a healthy lifestyle.',
      })
      
      // Set avatar based on role for demo
      if (session.user.role === 'admin') {
        setAvatarSrc('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')
      } else if (session.user.role === 'doctor') {
        setAvatarSrc('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')
      } else {
        setAvatarSrc('https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')
      }
    }
  }, [session, status])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  
  const validatePasswords = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match")
      return false
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    }
    
    setPasswordError('')
    return true
  }
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')
    
    try {
      // Validate passwords if changing them
      if (changePassword && !validatePasswords()) {
        setLoading(false)
        return
      }
      
      // In a real app, this would be an API call to update the user's profile
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update the session
      await update({
        ...session,
        user: {
          ...session?.user,
          name: userProfile.name,
        }
      })
      
      setSuccessMessage('Profile updated successfully')
      setIsEditing(false)
      setChangePassword(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      setErrorMessage('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  // If still loading session, show loading state
  if (status === 'loading') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-700">Loading profile...</p>
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
        <div className="container-custom max-w-3xl">
          <div className="flex items-center mb-8">
            <Link 
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-primary-600 mr-4"
            >
              <FiChevronLeft className="mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          
          {successMessage && (
            <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6 flex items-start">
              <FiSave className="mt-0.5 mr-2" />
              <div>{successMessage}</div>
            </div>
          )}
          
          {errorMessage && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6 flex items-start">
              <FiAlertCircle className="mt-0.5 mr-2" />
              <div>{errorMessage}</div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-500 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="relative mb-4 md:mb-0 md:mr-6">
                  {avatarSrc ? (
                    <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white">
                      <Image 
                        src={avatarSrc} 
                        alt="Profile" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 text-3xl font-bold border-4 border-white">
                      {userProfile.name.charAt(0)}
                    </div>
                  )}
                  
                  {isEditing && (
                    <>
                      <button 
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 bg-white text-primary-600 p-1.5 rounded-full shadow-md hover:bg-gray-100"
                        title="Change profile picture"
                      >
                        <FiCamera size={16} />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        title="Upload profile picture"
                      />
                    </>
                  )}
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  <p className="text-primary-100">
                    {session?.user?.role === 'admin' ? 'Administrator' : 
                     session?.user?.role === 'doctor' ? 'Physiotherapist' : 'Patient'}
                  </p>
                  <p className="text-primary-100 mt-1">{userProfile.email}</p>
                </div>
                
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="md:ml-auto mt-4 md:mt-0 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md flex items-center"
                  >
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              <form onSubmit={handleSave}>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={userProfile.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        ) : (
                          <div className="flex items-center bg-gray-50 p-2 rounded">
                            <FiUser className="text-primary-600 mr-2" />
                            <span>{userProfile.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={userProfile.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-gray-100"
                            required
                            disabled
                          />
                        ) : (
                          <div className="flex items-center bg-gray-50 p-2 rounded">
                            <FiMail className="text-primary-600 mr-2" />
                            <span>{userProfile.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={userProfile.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <div className="flex items-center bg-gray-50 p-2 rounded">
                            <FiPhone className="text-primary-600 mr-2" />
                            <span>{userProfile.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                          Role
                        </label>
                        <div className="flex items-center bg-gray-50 p-2 rounded">
                          <FiUser className="text-primary-600 mr-2" />
                          <span>{session?.user?.role === 'admin' ? 'Administrator' : 
                                 session?.user?.role === 'doctor' ? 'Physiotherapist' : 'Patient'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          value={userProfile.bio}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <div className="bg-gray-50 p-2 rounded">
                          <p>{userProfile.bio || "No bio provided."}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 py-6">
                  <h3 className="text-lg font-medium mb-4">Address Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      {isEditing ? (
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={userProfile.address}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      ) : (
                        <div className="flex items-center bg-gray-50 p-2 rounded">
                          <FiMapPin className="text-primary-600 mr-2" />
                          <span>{userProfile.address}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        {isEditing ? (
                          <input
                            id="city"
                            name="city"
                            type="text"
                            value={userProfile.city}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <div className="bg-gray-50 p-2 rounded">
                            {userProfile.city}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        {isEditing ? (
                          <input
                            id="state"
                            name="state"
                            type="text"
                            value={userProfile.state}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <div className="bg-gray-50 p-2 rounded">
                            {userProfile.state}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        {isEditing ? (
                          <input
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            value={userProfile.zipCode}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <div className="bg-gray-50 p-2 rounded">
                            {userProfile.zipCode}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="py-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-medium">Password Settings</h3>
                      <button
                        type="button"
                        onClick={() => setChangePassword(!changePassword)}
                        className="ml-4 text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        <FiLock className="mr-1" />
                        {changePassword ? 'Cancel' : 'Change Password'}
                      </button>
                    </div>
                    
                    {changePassword && (
                      <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                        {passwordError && (
                          <div className="text-red-600 text-sm flex items-center">
                            <FiAlertCircle className="mr-1" />
                            {passwordError}
                          </div>
                        )}
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            required={changePassword}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              required={changePassword}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm Password
                            </label>
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              required={changePassword}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {isEditing && (
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false)
                        setChangePassword(false)
                      }}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex items-center"
                    >
                      {loading ? 'Saving...' : (
                        <>
                          <FiSave className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 