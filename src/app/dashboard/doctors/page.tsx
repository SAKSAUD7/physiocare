'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiPlus, FiEdit, FiTrash2, FiChevronLeft, FiMail, FiPhone, FiSearch, FiFilter } from 'react-icons/fi'

// Mock data for doctors (will be replaced with API calls)
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@physiocare.com',
    phone: '555-1234',
    specialization: 'Sports Rehabilitation',
    experience: 8,
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    isVerified: true,
    isAvailable: true,
    createdAt: new Date('2023-04-10').toISOString(),
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@physiocare.com',
    phone: '555-2345',
    specialization: 'Orthopedic Rehabilitation',
    experience: 12,
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80',
    isVerified: true,
    isAvailable: true,
    createdAt: new Date('2023-03-15').toISOString(),
  },
  {
    id: '3',
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@physiocare.com',
    phone: '555-3456',
    specialization: 'Neurological Rehabilitation',
    experience: 10,
    profileImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
    isVerified: true,
    isAvailable: false,
    createdAt: new Date('2023-02-22').toISOString(),
  },
];

export default function DoctorsManagementPage() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [doctors, setDoctors] = useState(mockDoctors)
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null)
  
  // Check if user is admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [status, session, router])
  
  // Filter doctors based on search term and availability
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAvailability = availabilityFilter === 'all' || 
      (availabilityFilter === 'available' && doctor.isAvailable) ||
      (availabilityFilter === 'unavailable' && !doctor.isAvailable)
    
    return matchesSearch && matchesAvailability
  })
  
  const handleDeleteClick = (id: string) => {
    setDoctorToDelete(id)
    setShowDeleteModal(true)
  }
  
  const confirmDelete = async () => {
    if (!doctorToDelete) return
    
    setLoading(true)
    try {
      // This would be an API call in a real app
      // await fetch(`/api/doctors/${doctorToDelete}`, { method: 'DELETE' })
      
      // For now, just remove from state
      setDoctors(doctors.filter(doctor => doctor.id !== doctorToDelete))
      setShowDeleteModal(false)
      setDoctorToDelete(null)
    } catch (error) {
      console.error('Error deleting doctor:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    setLoading(true)
    try {
      // This would be an API call in a real app
      // await fetch(`/api/doctors/${id}`, { 
      //   method: 'PATCH', 
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ isAvailable: !currentStatus }) 
      // })
      
      // For now, just update state
      setDoctors(doctors.map(doctor => 
        doctor.id === id 
          ? { ...doctor, isAvailable: !currentStatus } 
          : doctor
      ))
    } catch (error) {
      console.error('Error updating doctor availability:', error)
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
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-primary-600 mr-4"
            >
              <FiChevronLeft className="mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold">Manage Doctors</h1>
          </div>
          
          {/* Filters and Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search doctors..."
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
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  aria-label="Filter doctors by availability"
                >
                  <option value="all">All Doctors</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Not Available</option>
                </select>
              </div>
              
              <Link
                href="/dashboard/doctors/add"
                className="btn-primary flex items-center justify-center"
              >
                <FiPlus className="mr-2" />
                <span>Add New Doctor</span>
              </Link>
            </div>
          </div>
          
          {/* Doctors List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden">
                        {doctor.profileImage ? (
                          <Image
                            src={doctor.profileImage}
                            alt={doctor.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xl text-gray-500">
                              {doctor.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{doctor.name}</h3>
                        <p className="text-primary-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          doctor.isAvailable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {doctor.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center text-gray-600 mb-1">
                        <FiMail className="mr-2" />
                        <span>{doctor.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiPhone className="mr-2" />
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => toggleAvailability(doctor.id, doctor.isAvailable)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          doctor.isAvailable
                            ? 'bg-red-50 text-red-700 hover:bg-red-100'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                      >
                        {doctor.isAvailable ? 'Set Unavailable' : 'Set Available'}
                      </button>
                      
                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/doctors/edit/${doctor.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <FiEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(doctor.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          aria-label="Delete doctor"
                          title="Delete doctor"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No doctors found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto relative z-10">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this doctor? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
} 