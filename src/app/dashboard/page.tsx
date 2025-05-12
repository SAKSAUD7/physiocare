'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiCalendar, FiUser, FiClock, FiMap, FiClipboard, FiSettings, FiLogOut, FiUsers, FiDatabase, FiMenu, FiX, FiBell, FiInfo, FiCheckCircle } from 'react-icons/fi'

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<{ id: string; type: string; message: string }[]>([])
  const [showWelcomeNotice, setShowWelcomeNotice] = useState(true)
  
  // Handle logout with direct signOut call
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true
      });
      // Force a hard reload to ensure session is cleared
      window.location.href = '/'
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback - force redirect to home page
      window.location.href = '/'
    }
  }

  useEffect(() => {
    // If the user is not authenticated, redirect to login page
    if (status === 'unauthenticated') {
      console.log('User is not authenticated, redirecting to login page')
      window.location.href = '/login'
    } else if (status === 'authenticated') {
      console.log('User authenticated successfully:', session?.user?.email)
      setLoading(false)
      
      // Set up demo notifications based on user role
      const roleBasedNotifications = [];
      
      if (session?.user?.role === 'admin') {
        roleBasedNotifications.push({
          id: '1',
          type: 'info',
          message: 'Welcome to the admin dashboard. You have full access to manage the system.'
        });
        roleBasedNotifications.push({
          id: '2',
          type: 'alert',
          message: '3 new user registrations require approval'
        });
      } else if (session?.user?.role === 'doctor') {
        roleBasedNotifications.push({
          id: '1',
          type: 'info',
          message: 'Welcome back, Doctor. You have 2 appointments scheduled for today.'
        });
        roleBasedNotifications.push({
          id: '2',
          type: 'alert',
          message: 'New treatment plan request from Sarah Johnson'
        });
      } else if (session?.user?.role === 'patient') {
        roleBasedNotifications.push({
          id: '1',
          type: 'info',
          message: 'Welcome to your patient dashboard. Your next appointment is in 3 days.'
        });
        roleBasedNotifications.push({
          id: '2',
          type: 'success',
          message: 'Your latest treatment plan has been updated'
        });
      }
      
      setNotifications(roleBasedNotifications);
    }
  }, [status, router, session])

  const dismissNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  }

  const dismissWelcomeNotice = () => {
    setShowWelcomeNotice(false);
  }

  // Placeholder data - in a real app, this would come from an API call
  const appointments = [
    {
      id: 'AP123456',
      service: 'Sports Injury Rehabilitation',
      doctor: 'Dr. Emily Johnson',
      date: '2023-12-15',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 'AP123457',
      service: 'Orthopedic Rehabilitation',
      doctor: 'Dr. Michael Chen',
      date: '2023-12-22',
      time: '2:30 PM',
      status: 'pending',
    },
  ]

  // If loading or not authenticated yet, show loading state
  if (loading || status === 'loading') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-700">Loading your dashboard...</p>
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
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Welcome, {session?.user?.name || 'User'}</h1>
            <p className="text-gray-600">
              {session?.user?.role === 'admin' 
                ? 'Manage your platform from your admin dashboard'
                : session?.user?.role === 'doctor'
                ? 'View your appointments and manage patient treatments'
                : 'Track your appointments and treatment progress'}
            </p>
          </div>
          
          {/* Notifications Section */}
          {notifications.length > 0 && (
            <div className="mb-8">
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div key={notification.id} className={`flex items-start justify-between p-4 rounded-lg shadow-sm ${
                    notification.type === 'info' ? 'bg-blue-50 text-blue-700' : 
                    notification.type === 'alert' ? 'bg-yellow-50 text-yellow-700' : 
                    'bg-green-50 text-green-700'
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {notification.type === 'info' ? <FiInfo /> : 
                         notification.type === 'alert' ? <FiBell /> : 
                         <FiCheckCircle />}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{notification.message}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => dismissNotification(notification.id)}
                      className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-500"
                      aria-label="Dismiss notification"
                      title="Dismiss notification"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Welcome Notice */}
          {showWelcomeNotice && (
            <div className="mb-8 bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiCheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-primary-800">Getting Started</h3>
                    <div className="mt-2 text-sm text-primary-700">
                      <p>Welcome to your personalized {session?.user?.role} dashboard! Here you can:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {session?.user?.role === 'admin' && (
                          <>
                            <li>Manage users and assign roles</li>
                            <li>View system analytics and reports</li>
                            <li>Configure system settings</li>
                          </>
                        )}
                        {session?.user?.role === 'doctor' && (
                          <>
                            <li>View your upcoming appointments</li>
                            <li>Manage patient treatment plans</li>
                            <li>Update your availability schedule</li>
                          </>
                        )}
                        {session?.user?.role === 'patient' && (
                          <>
                            <li>Book new physiotherapy appointments</li>
                            <li>View and follow your treatment plans</li>
                            <li>Track your recovery progress</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="flex-shrink-0 bg-primary-50 rounded-md inline-flex text-primary-600 hover:text-primary-800"
                  onClick={dismissWelcomeNotice}
                  aria-label="Dismiss welcome message"
                  title="Dismiss welcome message"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden mb-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-full p-3 bg-primary-600 text-white rounded-md"
            >
              {mobileMenuOpen ? (
                <>
                  <FiX className="mr-2" />
                  <span>Close Menu</span>
                </>
              ) : (
                <>
                  <FiMenu className="mr-2" />
                  <span>Dashboard Menu</span>
                </>
              )}
            </button>
          </div>
          
          {/* Dashboard Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className={`md:col-span-1 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary-600 text-white">
                  <h2 className="font-semibold text-lg">Dashboard</h2>
                </div>
                <div className="p-4">
                  <nav className="space-y-2">
                    <Link 
                      href="/dashboard" 
                      className="flex items-center space-x-2 p-2 rounded-md bg-primary-50 text-primary-700 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiClipboard />
                      <span>Overview</span>
                    </Link>
                    <Link 
                      href="/dashboard/appointments" 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiCalendar />
                      <span>Appointments</span>
                    </Link>
                    {session?.user?.role === 'patient' && (
                      <Link 
                        href="/dashboard/treatments" 
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiClipboard />
                        <span>My Treatment Plans</span>
                      </Link>
                    )}
                    {session?.user?.role === 'doctor' && (
                      <Link 
                        href="/dashboard/patients" 
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiUser />
                        <span>My Patients</span>
                      </Link>
                    )}
                    {session?.user?.role === 'admin' && (
                      <>
                        <Link 
                          href="/dashboard/admin/users" 
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FiUsers />
                          <span>User Management</span>
                        </Link>
                        <Link 
                          href="/dashboard/doctors" 
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FiUser />
                          <span>Manage Doctors</span>
                        </Link>
                        <Link 
                          href="/dashboard/services" 
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FiClipboard />
                          <span>Manage Services</span>
                        </Link>
                        <Link 
                          href="/dashboard/admin/export" 
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FiDatabase />
                          <span>Export Data</span>
                        </Link>
                      </>
                    )}
                    <Link 
                      href="/dashboard/profile" 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiUser />
                      <span>My Profile</span>
                    </Link>
                    <Link 
                      href="/dashboard/settings" 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiSettings />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full text-left text-red-600"
                    >
                      <FiLogOut />
                      <span>Log Out</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            
            <div className={`md:col-span-3 ${mobileMenuOpen ? 'hidden md:block' : 'block'}`}>
              {/* Role-specific Dashboard Content */}
              {session?.user?.role === 'admin' ? (
                <AdminDashboard />
              ) : session?.user?.role === 'doctor' ? (
                <DoctorDashboard appointments={appointments} />
              ) : (
                <PatientDashboard appointments={appointments} />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

function PatientDashboard({ appointments }: { appointments: any[] }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  <h3 className="font-semibold mt-2">{appointment.service}</h3>
                  <div className="text-sm text-gray-600 space-y-1 mt-1">
                    <p className="flex items-center">
                      <FiUser className="mr-2" /> {appointment.doctor}
                    </p>
                    <p className="flex items-center">
                      <FiCalendar className="mr-2" /> {appointment.date}
                    </p>
                    <p className="flex items-center">
                      <FiClock className="mr-2" /> {appointment.time}
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
                  <Link 
                    href={`/dashboard/appointments/${appointment.id}`}
                    className="btn-primary text-sm text-center"
                  >
                    View Details
                  </Link>
                  <button 
                    className="btn-outline text-sm"
                    onClick={() => alert('This would reschedule the appointment in a real app')}
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You don't have any upcoming appointments.</p>
            <Link href="/booking" className="btn-primary">
              Book an Appointment
            </Link>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Treatment Plans</h2>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No treatment plans available yet.</p>
            <Link href="/dashboard/treatments" className="text-primary-600 font-medium">
              View All Plans
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link 
              href="/booking" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="rounded-full bg-primary-100 p-3 mr-4 group-hover:bg-primary-200 transition-colors">
                  <FiCalendar className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Book New Appointment</h3>
                  <p className="text-sm text-gray-600">Schedule your next physiotherapy session</p>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/services" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="rounded-full bg-primary-100 p-3 mr-4 group-hover:bg-primary-200 transition-colors">
                  <FiClipboard className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Browse Services</h3>
                  <p className="text-sm text-gray-600">Explore our physiotherapy services</p>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/profile" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="rounded-full bg-primary-100 p-3 mr-4 group-hover:bg-primary-200 transition-colors">
                  <FiUser className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Update Profile</h3>
                  <p className="text-sm text-gray-600">Keep your information up to date</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function DoctorDashboard({ appointments }: { appointments: any[] }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Today's Schedule</h2>
          <Link href="/dashboard/calendar" className="btn-outline text-sm">View Full Calendar</Link>
        </div>
        
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  <h3 className="font-semibold mt-2">{appointment.service}</h3>
                  <div className="text-sm text-gray-600 space-y-1 mt-1">
                    <p className="flex items-center">
                      <FiUser className="mr-2" /> Patient: John Doe
                    </p>
                    <p className="flex items-center">
                      <FiClock className="mr-2" /> {appointment.time}
                    </p>
                    <p className="flex items-center">
                      <FiMap className="mr-2" /> Home Visit
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 space-x-2 flex flex-col sm:flex-row gap-2">
                  <Link 
                    href={`/dashboard/appointments/${appointment.id}`}
                    className="btn-primary text-sm text-center"
                  >
                    View Details
                  </Link>
                  <button 
                    className="btn-outline text-sm" 
                    onClick={() => alert('This would start the appointment session in a real app')}
                  >
                    Start Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">You don't have any appointments scheduled for today.</p>
            <Link href="/dashboard/availability" className="btn-primary mt-4 inline-block">
              Update Availability
            </Link>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Patient Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="text-gray-600">Total Patients</div>
              <div className="font-semibold">24</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600">Active Treatment Plans</div>
              <div className="font-semibold">18</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600">Appointments This Week</div>
              <div className="font-semibold">12</div>
            </div>
            <div className="mt-4">
              <Link 
                href="/dashboard/patients" 
                className="text-primary-600 font-medium flex items-center"
              >
                <span>View All Patients</span>
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Availability</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-gray-600">Status</div>
              <div className="font-semibold text-green-600">Available</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600">Working Hours</div>
              <div className="font-semibold">9:00 AM - 5:00 PM</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600">Next Off Day</div>
              <div className="font-semibold">Sunday, Dec 17</div>
            </div>
            <div className="mt-4">
              <Link 
                href="/dashboard/availability" 
                className="btn-outline text-sm block text-center"
              >
                Update Availability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      {/* Dashboard Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reports
          </button>
        </nav>
      </div>
      
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Patients</h3>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">142</div>
                <div className="text-green-600 text-sm">+12% ↑</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Active Doctors</h3>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">18</div>
                <div className="text-green-600 text-sm">+2 ↑</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Monthly Appointments</h3>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">256</div>
                <div className="text-green-600 text-sm">+8% ↑</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Registered Users</h3>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">310</div>
                <div className="text-green-600 text-sm">+15% ↑</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm">AP789012</td>
                      <td className="px-4 py-3 text-sm">Sarah Johnson</td>
                      <td className="px-4 py-3 text-sm">Orthopedic Rehab</td>
                      <td className="px-4 py-3 text-sm">2023-12-14</td>
                      <td className="px-4 py-3 text-sm"><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Completed</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">AP789013</td>
                      <td className="px-4 py-3 text-sm">Michael Chen</td>
                      <td className="px-4 py-3 text-sm">Sports Injury</td>
                      <td className="px-4 py-3 text-sm">2023-12-14</td>
                      <td className="px-4 py-3 text-sm"><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Confirmed</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">AP789014</td>
                      <td className="px-4 py-3 text-sm">Emma Rodriguez</td>
                      <td className="px-4 py-3 text-sm">Neurological Rehab</td>
                      <td className="px-4 py-3 text-sm">2023-12-15</td>
                      <td className="px-4 py-3 text-sm"><span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <Link href="/dashboard/appointments" className="text-primary-600 font-medium flex items-center justify-end">
                  <span>View All</span>
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Popular Services</h2>
                <Link href="/dashboard/admin/users" className="text-primary-600 font-medium flex items-center">
                  <FiUsers className="mr-1" />
                  Manage Users
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Sports Injury Rehabilitation</h3>
                    <p className="text-sm text-gray-600">42 appointments this month</p>
                  </div>
                  <div className="text-primary-600 font-medium">23%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <h3 className="font-medium">Orthopedic Rehabilitation</h3>
                    <p className="text-sm text-gray-600">38 appointments this month</p>
                  </div>
                  <div className="text-primary-600 font-medium">21%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '21%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <h3 className="font-medium">Geriatric Physiotherapy</h3>
                    <p className="text-sm text-gray-600">31 appointments this month</p>
                  </div>
                  <div className="text-primary-600 font-medium">17%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
              <div className="mt-6 text-right">
                <Link href="/dashboard/services" className="text-primary-600 font-medium flex items-center justify-end">
                  <span>Manage Services</span>
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Analytics</h2>
          <p className="text-gray-600 mb-4">In a real application, this would display charts and analytics data.</p>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p>Analytics visualizations would appear here</p>
          </div>
        </div>
      )}
      
      {activeTab === 'reports' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">System Reports</h2>
          <p className="text-gray-600 mb-4">Generate various system reports.</p>
          <div className="space-y-4">
            <button className="btn-primary w-full sm:w-auto">Generate Monthly Summary</button>
            <button className="btn-outline w-full sm:w-auto ml-0 sm:ml-2">Export User Data</button>
          </div>
        </div>
      )}
    </div>
  )
} 