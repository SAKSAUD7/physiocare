'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { 
  FiUsers, 
  FiDownload, 
  FiFilter, 
  FiChevronLeft, 
  FiMail, 
  FiPhone, 
  FiSearch, 
  FiExternalLink 
} from 'react-icons/fi'
import { 
  formatDataToCsv, 
  downloadCsvFile, 
  formatDataForWhatsApp, 
  createGoogleSheetsUrl, 
  createEmailLink 
} from '@/utils/exportHelpers'

// Mock users for the UI (we'll replace with API call in a real app)
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@physiocare.com',
    role: 'admin',
    phone: '555-1234',
    address: '123 Admin St',
    createdAt: new Date('2023-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Doctor User',
    email: 'doctor@physiocare.com',
    role: 'doctor',
    phone: '555-5678',
    address: '456 Doctor Ave',
    createdAt: new Date('2023-02-15').toISOString(),
  },
  {
    id: '3',
    name: 'Patient User',
    email: 'patient@physiocare.com',
    role: 'patient',
    phone: '555-9012',
    address: '789 Patient Blvd',
    createdAt: new Date('2023-03-20').toISOString(),
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'patient',
    phone: '555-3456',
    address: '101 Main St',
    createdAt: new Date('2023-04-10').toISOString(),
  },
  {
    id: '5',
    name: 'Dr. Robert Johnson',
    email: 'robert.j@example.com',
    role: 'doctor',
    phone: '555-7890',
    address: '202 Medical Center',
    createdAt: new Date('2023-05-05').toISOString(),
  },
];

export default function AdminUsersPage() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [users, setUsers] = useState(mockUsers)
  const [loading, setLoading] = useState(false)
  const [exportFormat, setExportFormat] = useState('csv')
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  
  // Check if user is admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [status, session, router])
  
  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    
    return matchesSearch && matchesRole
  })
  
  const handleViewUser = (user) => {
    setSelectedUser(user)
    setIsEditing(false)
  }
  
  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsEditing(true)
  }
  
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
    setSelectedUser(null)
  }
  
  const handleSaveUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
    setSelectedUser(null)
    setIsEditing(false)
  }
  
  const handleExport = () => {
    // In a real app, we'd fetch from the API
    // Here, we'll use the filtered data directly
    try {
      if (exportFormat === 'csv') {
        // Define fields to export
        const fields = ['id', 'name', 'email', 'role', 'phone', 'address', 'createdAt'];
        
        // Format data as CSV
        const csvContent = formatDataToCsv(filteredUsers, fields);
        
        // Download the file
        downloadCsvFile(csvContent, 'physiocare_users.csv');
      } else if (exportFormat === 'json') {
        // For JSON, create and download file
        const jsonContent = JSON.stringify(filteredUsers, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'physiocare_users.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      // Show success message
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Export error:', error);
      alert('An error occurred during export. Please try again.');
    }
    
    setShowExportOptions(false);
  }
  
  // Create WhatsApp sharing link with user data
  const getWhatsAppLink = () => {
    const dataToExport = roleFilter === 'all' 
      ? filteredUsers 
      : filteredUsers.filter(user => user.role === roleFilter);
    
    const message = formatDataForWhatsApp(dataToExport, 'PhysioCare User Data');
    
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }
  
  // Create email link with user data
  const getEmailLink = () => {
    const dataToExport = roleFilter === 'all' 
      ? filteredUsers 
      : filteredUsers.filter(user => user.role === roleFilter);
    
    return createEmailLink(dataToExport, 'PhysioCare User Data');
  }
  
  // Create Google Sheets URL
  const getGoogleSheetsLink = () => {
    const dataToExport = roleFilter === 'all' 
      ? filteredUsers 
      : filteredUsers.filter(user => user.role === roleFilter);
    
    const fields = ['name', 'email', 'role', 'phone', 'address'];
    
    return createGoogleSheetsUrl(dataToExport, fields);
  }
  
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
            <h1 className="text-2xl font-bold">User Management</h1>
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
                  placeholder="Search users..."
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
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  aria-label="Filter users by role"
                >
                  <option value="all">All Users</option>
                  <option value="admin">Admins</option>
                  <option value="doctor">Doctors</option>
                  <option value="patient">Patients</option>
                </select>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  className="btn-outline flex items-center"
                >
                  <FiDownload className="mr-2" />
                  Export Users
                </button>
                
                {showExportOptions && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4">
                    <h3 className="text-sm font-medium mb-2">Export Options</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-1">Format</label>
                      <select
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        aria-label="Select export format"
                      >
                        <option value="csv">CSV File</option>
                        <option value="json">JSON File</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={handleExport}
                      className="btn-primary text-sm w-full mb-2"
                    >
                      Download
                    </button>
                    
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <h4 className="text-xs font-medium mb-2">Share via</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <a
                          href={getGoogleSheetsLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Google_Sheets_logo_%282014-2020%29.svg/1498px-Google_Sheets_logo_%282014-2020%29.svg.png" 
                            alt="Google Sheets"
                            className="w-4 h-4 mr-1"
                          />
                          Google Sheets
                          <FiExternalLink className="ml-1" size={12} />
                        </a>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            WhatsApp
                            <FiExternalLink className="ml-1" size={12} />
                          </a>
                          <a
                            href={getEmailLink()}
                            className="text-xs flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            Email
                            <FiExternalLink className="ml-1" size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {exportSuccess && (
              <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-md">
                Export successful! Data has been downloaded.
              </div>
            )}
          </div>
          
          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.address}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <FiMail className="mr-1 text-gray-400" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiPhone className="mr-1 text-gray-400" />
                              {user.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'doctor'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No users found matching the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 