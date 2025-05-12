'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiCalendar, FiUser, FiClock, FiMapPin, FiSearch, FiFilter, FiChevronLeft } from 'react-icons/fi'

export default function AppointmentsPage() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  // Mock appointments data - in a real app, this would come from an API call
  const appointments = [
    {
      id: 'AP123456',
      service: 'Sports Injury Rehabilitation',
      doctor: 'Dr. Emily Johnson',
      date: '2023-12-15',
      time: '10:00 AM',
      address: '123 Main St, City, State, 12345',
      status: 'confirmed',
    },
    {
      id: 'AP123457',
      service: 'Orthopedic Rehabilitation',
      doctor: 'Dr. Michael Chen',
      date: '2023-12-22',
      time: '2:30 PM',
      address: '123 Main St, City, State, 12345',
      status: 'pending',
    },
    {
      id: 'AP123458',
      service: 'Neurological Rehabilitation',
      doctor: 'Dr. Sarah Williams',
      date: '2023-11-28',
      time: '11:00 AM',
      address: '123 Main St, City, State, 12345',
      status: 'completed',
    },
    {
      id: 'AP123459',
      service: 'Pain Management',
      doctor: 'Dr. James Rodriguez',
      date: '2023-11-15',
      time: '3:00 PM',
      address: '123 Main St, City, State, 12345',
      status: 'cancelled',
    },
  ]
  
  // Filter and search appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  // If still loading session, show loading state
  if (status === 'loading') {
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
          <div className="flex items-center mb-8">
            <Link 
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-primary-600 mr-4"
            >
              <FiChevronLeft className="mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold">Your Appointments</h1>
          </div>
          
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by service or doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <FiFilter className="text-gray-400 mr-2" />
                  <span className="text-gray-600">Filter:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  aria-label="Filter appointments by status"
                >
                  <option value="all">All Appointments</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <Link href="/booking" className="btn-primary">
                <FiCalendar className="mr-2" />
                Book New Appointment
              </Link>
            </div>
          </div>
          
          {/* Appointments List */}
          <div className="space-y-6">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : appointment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : appointment.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                        <h2 className="text-xl font-semibold mt-2">{appointment.service}</h2>
                        <p className="text-gray-600">
                          Appointment ID: <span className="font-medium">{appointment.id}</span>
                        </p>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <Link 
                          href={`/dashboard/appointments/${appointment.id}`}
                          className="btn-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h3>
                        <div className="flex items-start">
                          <FiCalendar className="text-primary-600 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">{appointment.date}</p>
                            <p className="text-gray-600">{appointment.time}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Physiotherapist</h3>
                        <div className="flex items-start">
                          <FiUser className="text-primary-600 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">{appointment.doctor}</p>
                            <p className="text-gray-600">Physiotherapist</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                        <div className="flex items-start">
                          <FiMapPin className="text-primary-600 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Home Visit</p>
                            <p className="text-gray-600 text-sm">{appointment.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.status === 'confirmed' && (
                      <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3 justify-end">
                        <button className="btn-outline">
                          Reschedule
                        </button>
                        <button className="border border-red-300 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-md transition-colors">
                          Cancel
                        </button>
                      </div>
                    )}
                    
                    {appointment.status === 'completed' && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link 
                          href={`/dashboard/appointments/${appointment.id}/feedback`}
                          className="btn-outline"
                        >
                          Leave Feedback
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-500 mb-4 text-5xl">
                  <FiCalendar className="inline-block" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Appointments Found</h2>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'No appointments match your current filters.'
                    : 'You don\'t have any appointments scheduled.'}
                </p>
                {searchTerm || statusFilter !== 'all' ? (
                  <button 
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('all')
                    }}
                    className="btn-outline mr-4"
                  >
                    Clear Filters
                  </button>
                ) : null}
                <Link href="/booking" className="btn-primary">
                  Book an Appointment
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 