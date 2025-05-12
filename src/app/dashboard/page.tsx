'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiCalendar, FiUser, FiClock, FiMap, FiClipboard, FiSettings, FiLogOut, FiUsers, FiDatabase } from 'react-icons/fi'

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If the user is not authenticated, redirect to login page
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      setLoading(false)
    }
  }, [status, router])

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
          
          {/* Dashboard Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary-600 text-white">
                  <h2 className="font-semibold text-lg">Dashboard</h2>
                </div>
                <div className="p-4">
                  <nav className="space-y-2">
                    <Link 
                      href="/dashboard" 
                      className="flex items-center space-x-2 p-2 rounded-md bg-primary-50 text-primary-700 font-medium"
                    >
                      <FiClipboard />
                      <span>Overview</span>
                    </Link>
                    <Link 
                      href="/dashboard/appointments" 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <FiCalendar />
                      <span>Appointments</span>
                    </Link>
                    {session?.user?.role === 'patient' && (
                      <Link 
                        href="/dashboard/treatments" 
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                      >
                        <FiClipboard />
                        <span>My Treatment Plans</span>
                      </Link>
                    )}
                    {session?.user?.role === 'doctor' && (
                      <Link 
                        href="/dashboard/patients" 
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
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
                        >
                          <FiUsers />
                          <span>User Management</span>
                        </Link>
                        <Link 
                          href="/dashboard/doctors" 
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        >
                          <FiUser />
                          <span>Manage Doctors</span>
                        </Link>
                        <Link 
                          href="/dashboard/services" 
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        >
                          <FiClipboard />
                          <span>Manage Services</span>
                        </Link>
                        <Link 
                          href="/dashboard/admin/export" 
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                        >
                          <FiDatabase />
                          <span>Export Data</span>
                        </Link>
                      </>
                    )}
                    <Link 
                      href="/dashboard/profile" 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <FiUser />
                      <span>My Profile</span>
                    </Link>
                    <Link 
                      href="/dashboard/settings" 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <FiSettings />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full text-left text-red-600"
                    >
                      <FiLogOut />
                      <span>Log Out</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
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

function PatientDashboard({ appointments }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between"
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
                <div className="mt-4 sm:mt-0">
                  <Link 
                    href={`/dashboard/appointments/${appointment.id}`}
                    className="btn-primary text-sm"
                  >
                    View Details
                  </Link>
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
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="rounded-full bg-primary-100 p-3 mr-4">
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
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="rounded-full bg-primary-100 p-3 mr-4">
                  <FiClipboard className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Browse Services</h3>
                  <p className="text-sm text-gray-600">Explore our physiotherapy services</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function DoctorDashboard({ appointments }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between"
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
                <div className="mt-4 sm:mt-0 space-x-2">
                  <Link 
                    href={`/dashboard/appointments/${appointment.id}`}
                    className="btn-primary text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">You don't have any appointments scheduled for today.</p>
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
                className="text-primary-600 font-medium"
              >
                View All Patients
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
  return (
    <div className="space-y-6">
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
            <Link href="/dashboard/appointments" className="text-primary-600 font-medium">
              View All
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
            <Link href="/dashboard/services" className="text-primary-600 font-medium">
              Manage Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 