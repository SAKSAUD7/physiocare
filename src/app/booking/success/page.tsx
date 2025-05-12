'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiCalendar, FiCheck, FiHome, FiUser } from 'react-icons/fi'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function BookingSuccessPage() {
  const router = useRouter()
  
  // If the user refreshes the page, redirect to dashboard
  // This simulates a proper booking flow where direct access 
  // to the success page wouldn't make sense
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      // In a real app, we would check if they got here legitimately
      // For now, just set a timer to simulate this behavior
    }, 300000) // 5 minutes
    
    return () => clearTimeout(redirectTimer)
  }, [router])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4">
                  <FiCheck className="text-white text-4xl" />
                </div>
              </div>
              <h1 className="text-white text-2xl font-bold">Booking Successful!</h1>
              <p className="text-green-100 mt-2">
                Your appointment has been confirmed.
              </p>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  We've sent a confirmation email with all the details of your appointment.
                  You can also view your appointment in your dashboard.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>
                
                <div className="space-y-4">
                  <div className="flex">
                    <FiCalendar className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">Monday, July 24, 2023 at 10:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <FiUser className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Physiotherapist</p>
                      <p className="text-gray-600">Dr. Emily Johnson</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <FiCalendar className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Service</p>
                      <p className="text-gray-600">Sports Injury Rehabilitation (60 min)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-8">
                <h3 className="font-medium text-yellow-800 mb-2">Important Information</h3>
                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                  <li>Please arrive 10 minutes before your appointment time</li>
                  <li>Wear comfortable clothing that allows for movement</li>
                  <li>Bring any relevant medical reports or scans</li>
                  <li>If you need to cancel, please do so at least 24 hours in advance</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/dashboard/appointments" className="btn-primary flex items-center justify-center">
                  <FiCalendar className="mr-2" /> View My Appointments
                </Link>
                <Link href="/" className="btn-outline flex items-center justify-center">
                  <FiHome className="mr-2" /> Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 