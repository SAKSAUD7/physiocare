'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { 
  FiCalendar, 
  FiUser, 
  FiClock, 
  FiMapPin, 
  FiDollarSign, 
  FiChevronLeft,
  FiMessageSquare,
  FiFileText,
  FiPhone
} from 'react-icons/fi'

export default function AppointmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  
  const [appointment, setAppointment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch the specific appointment
    // For now, we'll simulate this with mock data
    const fetchAppointment = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock appointment data
        const mockAppointment = {
          id: params.id,
          service: 'Sports Injury Rehabilitation',
          description: 'Initial assessment and treatment for sports-related shoulder injury.',
          doctor: 'Dr. Emily Johnson',
          doctorSpecialty: 'Sports Rehabilitation Specialist',
          doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          date: '2023-12-15',
          time: '10:00 AM',
          duration: 60,
          address: '123 Main St, City, State, 12345',
          status: params.id.includes('8') ? 'completed' : params.id.includes('9') ? 'cancelled' : 'confirmed',
          price: 85,
          paymentStatus: 'paid',
          notes: 'Please wear comfortable clothing and be ready 5 minutes before the appointment.',
          treatmentPlan: params.id.includes('8') ? 'Complete 3 sets of the prescribed exercises daily. Apply ice for 15 minutes after activity. Follow up in 2 weeks.' : null,
        }
        
        setAppointment(mockAppointment)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching appointment:', error)
        setLoading(false)
      }
    }
    
    if (status === 'authenticated') {
      fetchAppointment()
    }
  }, [params.id, status])
  
  // If still loading session or appointment data, show loading state
  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-700">Loading appointment details...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  // If appointment not found
  if (!appointment) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container-custom text-center">
            <h1 className="heading-lg mb-4">Appointment Not Found</h1>
            <p className="mb-8">The appointment you're looking for doesn't exist or has been removed.</p>
            <Link href="/dashboard/appointments" className="btn-primary">
              Back to Appointments
            </Link>
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
          <div className="flex items-center mb-8">
            <Link 
              href="/dashboard/appointments"
              className="flex items-center text-gray-600 hover:text-primary-600 mr-4"
            >
              <FiChevronLeft className="mr-1" />
              <span>Back to Appointments</span>
            </Link>
            <h1 className="text-2xl font-bold">Appointment Details</h1>
          </div>
          
          {/* Status Banner */}
          <div className={`mb-8 rounded-lg p-4 ${
            appointment.status === 'confirmed' 
              ? 'bg-green-50 border border-green-200' 
              : appointment.status === 'pending'
              ? 'bg-yellow-50 border border-yellow-200'
              : appointment.status === 'completed'
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
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
                <span className="ml-4 text-gray-700">
                  {appointment.status === 'confirmed' 
                    ? 'Your appointment is confirmed. We look forward to seeing you!' 
                    : appointment.status === 'pending'
                    ? 'Your appointment is pending confirmation.'
                    : appointment.status === 'completed'
                    ? 'This appointment has been completed.'
                    : 'This appointment has been cancelled.'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  ID: <span className="font-medium">{appointment.id}</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{appointment.service}</h2>
              <p className="text-gray-600 mb-6">{appointment.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Appointment Info */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Appointment Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FiCalendar className="text-primary-600 mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">{appointment.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiClock className="text-primary-600 mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">
                          {appointment.time} ({appointment.duration} minutes)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiMapPin className="text-primary-600 mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">Home Visit</p>
                        <p className="text-gray-600 text-sm">{appointment.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiDollarSign className="text-primary-600 mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Payment</p>
                        <p className="text-gray-600">
                          ${appointment.price} · 
                          <span className={appointment.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                            {' '}{appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Therapist Info */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Physiotherapist</h3>
                  <div className="flex items-start">
                    <div className="mr-4 relative w-16 h-16 rounded-full overflow-hidden">
                      <Image 
                        src={appointment.doctorImage} 
                        alt={appointment.doctor}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-gray-600 text-sm">{appointment.doctorSpecialty}</p>
                      <div className="mt-3 space-x-2">
                        <button className="inline-flex items-center text-primary-600 hover:text-primary-700">
                          <FiPhone className="mr-1" />
                          <span className="text-sm">Call</span>
                        </button>
                        <button className="inline-flex items-center text-primary-600 hover:text-primary-700 ml-3">
                          <FiMessageSquare className="mr-1" />
                          <span className="text-sm">Message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-md">
                      <h4 className="font-medium mb-2 flex items-center">
                        <FiFileText className="mr-2 text-primary-600" />
                        Notes
                      </h4>
                      <p className="text-sm text-gray-700">{appointment.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Treatment Plan (if completed) */}
              {appointment.treatmentPlan && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">Treatment Plan</h3>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="text-gray-700">{appointment.treatmentPlan}</p>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              {appointment.status === 'confirmed' && (
                <div className="border-t border-gray-200 pt-6 mt-6 flex flex-wrap justify-end gap-3">
                  <button className="btn-outline">
                    Reschedule
                  </button>
                  <button className="border border-red-300 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-md transition-colors">
                    Cancel Appointment
                  </button>
                </div>
              )}
              
              {appointment.status === 'completed' && !appointment.review && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <Link 
                    href={`/dashboard/appointments/${appointment.id}/feedback`}
                    className="btn-primary"
                  >
                    Leave Feedback
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 