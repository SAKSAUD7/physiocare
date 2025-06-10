'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { format, addDays, startOfDay } from 'date-fns'
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiChevronRight, FiCheck, FiAlertCircle, FiUser, FiClipboard } from 'react-icons/fi'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

// Mock data - in a real app, this would come from the database
const services = [
  {
    id: 1,
    name: 'Sports Injury Rehabilitation',
    price: 80,
    duration: 60,
    description: 'Specialized care for athletes and active individuals recovering from sports-related injuries.',
  },
  {
    id: 2,
    name: 'Orthopedic Rehabilitation',
    price: 75,
    duration: 60,
    description: 'Treatment for musculoskeletal conditions affecting bones, joints, muscles, and ligaments.',
  },
  {
    id: 3,
    name: 'Neurological Rehabilitation',
    price: 90,
    duration: 60,
    description: 'Specialized care for individuals with neurological conditions like stroke, Parkinson\'s, or MS.',
  },
  {
    id: 4,
    name: 'Geriatric Physiotherapy',
    price: 70,
    duration: 45,
    description: 'Age-appropriate care focusing on mobility, strength, and fall prevention for older adults.',
  },
  {
    id: 5,
    name: 'Post-Surgical Rehabilitation',
    price: 85,
    duration: 60,
    description: 'Recovery programs for patients who have undergone orthopedic or neurological surgeries.',
  },
  {
    id: 6,
    name: 'Pain Management',
    price: 75,
    duration: 45,
    description: 'Techniques to reduce chronic pain and improve quality of life through non-invasive methods.',
  },
]

// Mock doctor data
const doctors = [
  {
    id: 1,
    name: 'Dr. Emily Johnson',
    specialization: 'Sports Rehabilitation',
    experience: 8,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    availableServices: [1, 5, 6],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Orthopedic Rehabilitation',
    experience: 12,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    availableServices: [2, 3, 5],
  },
  {
    id: 3,
    name: 'Dr. Sarah Williams',
    specialization: 'Neurological Rehabilitation',
    experience: 10,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    availableServices: [3, 4, 6],
  },
]

// Generate next 14 days for appointment scheduling
const generateAvailableDates = () => {
  const dates = []
  const today = startOfDay(new Date())
  
  for (let i = 1; i <= 14; i++) {
    const date = addDays(today, i)
    dates.push({
      date,
      dateString: format(date, 'yyyy-MM-dd'),
      display: format(date, 'EEE, MMM d, yyyy'),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    })
  }
  
  return dates
}

// Timeslot generator for demo purposes
const generateTimeSlots = () => {
  const slots = []
  const startHour = 9 // 9 AM
  const endHour = 17 // 5 PM
  
  for (let hour = startHour; hour <= endHour; hour++) {
    if (hour !== 12) { // Skip lunch hour
      slots.push(`${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`)
      if (hour !== endHour) { // Don't add :30 for the last hour
        slots.push(`${hour % 12 || 12}:30 ${hour < 12 ? 'AM' : 'PM'}`)
      }
    }
  }
  
  return slots
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [availableDoctors, setAvailableDoctors] = useState(doctors)
  const [formData, setFormData] = useState({
    service: '',
    doctor: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: '',
  })
  
  // Check for query parameters for pre-selecting service
  useEffect(() => {
    const serviceId = searchParams.get('service')
    if (serviceId) {
      setFormData(prev => ({
        ...prev,
        service: serviceId
      }))
      
      // Filter doctors based on selected service
      filterDoctorsByService(serviceId)
    }
  }, [searchParams])
  
  useEffect(() => {
    if (selectedService) {
      filterDoctorsByService(selectedService);
    }
  }, [selectedService, filterDoctorsByService]);
  
  const filterDoctorsByService = (serviceId: string) => {
    if (!serviceId) {
      setAvailableDoctors(doctors)
      return
    }
    
    const id = parseInt(serviceId)
    const filtered = doctors.filter(doctor => 
      doctor.availableServices.includes(id)
    )
    setAvailableDoctors(filtered)
    
    // Clear doctor selection if current selection is not available for this service
    const currentDoctorId = parseInt(formData.doctor)
    const isCurrentDoctorAvailable = filtered.some(d => d.id === currentDoctorId)
    
    if (!isCurrentDoctorAvailable) {
      setFormData(prev => ({
        ...prev,
        doctor: ''
      }))
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Filter available doctors when service changes
    if (name === 'service') {
      filterDoctorsByService(value)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFormError('')
    
    // In a real app, you would submit to your backend here
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to success page
      router.push('/booking/success')
    } catch (error) {
      console.error('Booking error:', error)
      setFormError('There was an error processing your booking. Please try again.')
      setLoading(false)
    }
  }
  
  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.service && formData.doctor
      case 2:
        return formData.date && formData.time
      case 3:
        return (
          formData.name && 
          formData.email && 
          formData.phone
        )
      default:
        return true
    }
  }
  
  const nextStep = () => {
    if (validateStep(step)) {
      setFormError('')
      window.scrollTo(0, 0)
      setStep(prev => prev + 1)
    } else {
      setFormError('Please fill in all required fields before proceeding.')
    }
  }
  
  const prevStep = () => {
    setFormError('')
    window.scrollTo(0, 0)
    setStep(prev => prev - 1)
  }
  
  const selectedService = services.find(s => s.id.toString() === formData.service)
  const selectedDoctor = doctors.find(d => d.id.toString() === formData.doctor)
  const timeSlots = generateTimeSlots()
  const availableDates = generateAvailableDates()
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-lg mb-4">Book Your Physiotherapy Session</h1>
            <p className="text-gray-600">
              Complete the form below to schedule your personalized treatment session.
            </p>
          </div>
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="h-1 w-full bg-gray-200 rounded"></div>
              </div>
              <div className="relative flex justify-between">
                <div className={`${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'} h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm`}>
                  1
                </div>
                <div className={`${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'} h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm`}>
                  2
                </div>
                <div className={`${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'} h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm`}>
                  3
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <div className={`${step >= 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                Service & Doctor
              </div>
              <div className={`${step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                Date & Time
              </div>
              <div className={`${step >= 3 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                Your Details
              </div>
            </div>
          </div>
          
          {formError && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md flex items-start">
              <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
              <p>{formError}</p>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Select Service & Doctor</h2>
                  
                  <div className="mb-6">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} (${service.price} - {service.duration} min)
                        </option>
                      ))}
                    </select>
                    
                    {selectedService && (
                      <div className="mt-2 bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                        <p>{selectedService.description}</p>
                        <div className="mt-2 flex items-center text-primary-700">
                          <FiDollarSign className="mr-1" />
                          <span className="font-medium">${selectedService.price}</span>
                          <span className="mx-2">•</span>
                          <FiClock className="mr-1" />
                          <span>{selectedService.duration} minutes</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                      Physiotherapist <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="doctor"
                      name="doctor"
                      required
                      value={formData.doctor}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      disabled={!formData.service}
                    >
                      <option value="">Select a physiotherapist</option>
                      {availableDoctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization} ({doctor.experience} yrs exp)
                        </option>
                      ))}
                    </select>
                    
                    {selectedDoctor && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-md flex items-start">
                        <div className="h-16 w-16 rounded-full overflow-hidden relative flex-shrink-0 mr-4">
                          <img 
                            src={selectedDoctor.image} 
                            alt={selectedDoctor.name}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{selectedDoctor.name}</h3>
                          <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
                          <div className="flex items-center mt-1 text-sm">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{selectedDoctor.rating} • {selectedDoctor.experience} years experience</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary flex items-center"
                      disabled={!formData.service || !formData.doctor}
                    >
                      Next Step
                      <FiChevronRight className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Date and Time Selection */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Appointment Date <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableDates.map(dateObj => (
                        <button
                          key={dateObj.dateString}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, date: dateObj.dateString }))}
                          className={`p-3 border rounded-md text-center flex flex-col items-center justify-center transition-colors ${
                            dateObj.isWeekend ? 'bg-gray-50' : ''
                          } ${
                            formData.date === dateObj.dateString
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <span className="text-xs uppercase font-medium">{format(dateObj.date, 'EEE')}</span>
                          <span className="text-lg font-semibold">{format(dateObj.date, 'd')}</span>
                          <span className="text-xs">{format(dateObj.date, 'MMM')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Appointment Time <span className="text-red-500">*</span>
                    </label>
                    <div className={`grid grid-cols-3 md:grid-cols-4 gap-2 ${!formData.date ? 'opacity-50 pointer-events-none' : ''}`}>
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, time }))}
                          disabled={!formData.date}
                          className={`py-2 px-3 border rounded-md text-center transition-colors ${
                            formData.time === time
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {!formData.date && (
                      <p className="text-sm text-gray-500 mt-2">Please select a date first</p>
                    )}
                  </div>
                  
                  {formData.date && formData.time && (
                    <div className="bg-green-50 border border-green-100 p-4 rounded-md mb-6 flex items-start">
                      <div className="bg-green-100 rounded-full p-1 text-green-700 mr-3 mt-1">
                        <FiCheck size={16} />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-800">Your selected appointment:</h3>
                        <p className="text-green-700 mt-1">
                          {formData.date && format(new Date(formData.date), 'EEEE, MMMM d, yyyy')} at {formData.time}
                        </p>
                        <p className="text-green-700">
                          with {selectedDoctor?.name} for {selectedService?.name}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-outline"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary flex items-center"
                      disabled={!formData.date || !formData.time}
                    >
                      Next Step
                      <FiChevronRight className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Personal Information */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Your Details</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          required
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Please let us know if you have any specific concerns or requirements"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gray-50 rounded-md border">
                    <h3 className="font-semibold mb-2">Appointment Summary</h3>
                    <div className="text-sm space-y-2">
                      <div className="flex items-start">
                        <FiCalendar className="text-primary-600 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium">Date & Time</p>
                          <p className="text-gray-600">
                            {formData.date ? format(new Date(formData.date), 'EEEE, MMMM d, yyyy') : ''}
                            {formData.time ? ` at ${formData.time}` : ''}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FiUser className="text-primary-600 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium">Physiotherapist</p>
                          <p className="text-gray-600">{selectedDoctor?.name || 'Not selected'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FiClipboard className="text-primary-600 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium">Service</p>
                          <p className="text-gray-600">{selectedService?.name || 'Not selected'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FiDollarSign className="text-primary-600 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium">Price</p>
                          <p className="text-gray-600">${selectedService?.price || '--'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-outline"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 