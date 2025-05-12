'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'
import { FiChevronLeft, FiBell, FiGlobe, FiShield, FiCheckCircle, FiToggleLeft, FiToggleRight } from 'react-icons/fi'

export default function SettingsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    newsletterSubscription: false,
    darkMode: false,
    language: 'english',
    twoFactorAuth: false,
  })

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      setLoading(false)
    }
  }, [status, router])

  const handleToggle = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings]
    })
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({
      ...settings,
      language: e.target.value
    })
  }

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
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-primary-100">Configure your account preferences</p>
            </div>
            
            <div className="p-6">
              {/* Notification Settings */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiBell className="mr-2 text-primary-600" />
                  Notification Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive appointment confirmations and updates via email</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('emailNotifications')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.emailNotifications ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Receive text message alerts for your appointments</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('smsNotifications')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.smsNotifications ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Appointment Reminders</h3>
                      <p className="text-sm text-gray-600">Get reminders 24 hours before your scheduled appointments</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('appointmentReminders')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.appointmentReminders ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletter Subscription</h3>
                      <p className="text-sm text-gray-600">Receive our monthly newsletter with health tips and updates</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('newsletterSubscription')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.newsletterSubscription ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Display Settings */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiGlobe className="mr-2 text-primary-600" />
                  Display Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-600">Switch between light and dark theme</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('darkMode')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.darkMode ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div>
                    <label htmlFor="language-select" className="font-medium mb-1 block">Language</label>
                    <select 
                      id="language-select"
                      name="language"
                      aria-label="Select language"
                      value={settings.language}
                      onChange={handleLanguageChange}
                      className="w-full md:w-60 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Security Settings */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiShield className="mr-2 text-primary-600" />
                  Security Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('twoFactorAuth')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.twoFactorAuth ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div>
                    <button className="btn-outline flex items-center mt-2">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button className="btn-primary flex items-center">
                  <FiCheckCircle className="mr-2" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'
import { FiChevronLeft, FiBell, FiGlobe, FiShield, FiCheckCircle, FiToggleLeft, FiToggleRight } from 'react-icons/fi'

export default function SettingsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    newsletterSubscription: false,
    darkMode: false,
    language: 'english',
    twoFactorAuth: false,
  })

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      setLoading(false)
    }
  }, [status, router])

  const handleToggle = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings]
    })
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({
      ...settings,
      language: e.target.value
    })
  }

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
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-primary-100">Configure your account preferences</p>
            </div>
            
            <div className="p-6">
              {/* Notification Settings */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiBell className="mr-2 text-primary-600" />
                  Notification Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive appointment confirmations and updates via email</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('emailNotifications')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.emailNotifications ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Receive text message alerts for your appointments</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('smsNotifications')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.smsNotifications ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Appointment Reminders</h3>
                      <p className="text-sm text-gray-600">Get reminders 24 hours before your scheduled appointments</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('appointmentReminders')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.appointmentReminders ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletter Subscription</h3>
                      <p className="text-sm text-gray-600">Receive our monthly newsletter with health tips and updates</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('newsletterSubscription')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.newsletterSubscription ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Display Settings */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiGlobe className="mr-2 text-primary-600" />
                  Display Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-600">Switch between light and dark theme</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('darkMode')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.darkMode ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div>
                    <label htmlFor="language-select" className="font-medium mb-1 block">Language</label>
                    <select 
                      id="language-select"
                      name="language"
                      aria-label="Select language"
                      value={settings.language}
                      onChange={handleLanguageChange}
                      className="w-full md:w-60 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Security Settings */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FiShield className="mr-2 text-primary-600" />
                  Security Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <button 
                      onClick={() => handleToggle('twoFactorAuth')}
                      className="text-2xl text-primary-600"
                    >
                      {settings.twoFactorAuth ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                  </div>
                  
                  <div>
                    <button className="btn-outline flex items-center mt-2">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button className="btn-primary flex items-center">
                  <FiCheckCircle className="mr-2" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 