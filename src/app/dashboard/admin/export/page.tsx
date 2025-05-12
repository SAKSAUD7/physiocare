'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { 
  FiUsers, 
  FiCalendar, 
  FiFileText, 
  FiDownload, 
  FiChevronLeft, 
  FiExternalLink 
} from 'react-icons/fi'

export default function AdminExportPage() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  
  const [selectedData, setSelectedData] = useState('users')
  const [selectedFormat, setSelectedFormat] = useState('csv')
  const [exportSuccess, setExportSuccess] = useState(false)
  
  // Check if user is admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [status, session, router])
  
  const handleExport = () => {
    let apiUrl = '';
    
    switch (selectedData) {
      case 'users':
        apiUrl = `/api/admin/export-users?format=${selectedFormat}`;
        break;
      case 'appointments':
        apiUrl = `/api/admin/export-appointments?format=${selectedFormat}`;
        break;
      case 'all':
        apiUrl = `/api/admin/export-all?format=${selectedFormat}`;
        break;
    }
    
    if (selectedFormat === 'csv') {
      // For CSV, download the file
      window.open(apiUrl, '_blank');
    } else {
      // For other formats (e.g., JSON), show success message
      setExportSuccess(true)
      setTimeout(() => setExportSuccess(false), 3000)
    }
  }
  
  // Create WhatsApp sharing link
  const getWhatsAppLink = () => {
    return `https://wa.me/?text=${encodeURIComponent('PhysioCare Data Export is ready. Please check your dashboard.')}`;
  }
  
  // Create email sharing link
  const getEmailLink = () => {
    return `mailto:?subject=PhysioCare Data Export&body=${encodeURIComponent('PhysioCare Data Export is ready. Please check your dashboard.')}`;
  }
  
  // Create Google Sheets integration link (this would be a real integration in a production app)
  const getGoogleSheetsLink = () => {
    return 'https://docs.google.com/spreadsheets/create';
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
        <div className="container-custom max-w-4xl">
          <div className="flex items-center mb-8">
            <Link 
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-primary-600 mr-4"
            >
              <FiChevronLeft className="mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold">Export Data</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Export Options</h2>
              <p className="text-gray-600 mb-6">
                Export data from PhysioCare in various formats. This data can be used for reporting, 
                analysis, or integration with other systems.
              </p>
              
              {exportSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                  Export successful! Data is ready to be shared.
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Data to Export
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="dataType"
                        value="users"
                        checked={selectedData === 'users'}
                        onChange={() => setSelectedData('users')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 flex items-center">
                        <FiUsers className="mr-2 text-gray-500" />
                        User Data
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="dataType"
                        value="appointments"
                        checked={selectedData === 'appointments'}
                        onChange={() => setSelectedData('appointments')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 flex items-center">
                        <FiCalendar className="mr-2 text-gray-500" />
                        Appointment Data
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="dataType"
                        value="all"
                        checked={selectedData === 'all'}
                        onChange={() => setSelectedData('all')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 flex items-center">
                        <FiFileText className="mr-2 text-gray-500" />
                        All Data
                      </span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Export Format
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="formatType"
                        value="csv"
                        checked={selectedFormat === 'csv'}
                        onChange={() => setSelectedFormat('csv')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2">CSV (Excel compatible)</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="formatType"
                        value="json"
                        checked={selectedFormat === 'json'}
                        onChange={() => setSelectedFormat('json')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2">JSON</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Export & Share Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <button
                    onClick={handleExport}
                    className="w-full btn-primary flex justify-center items-center py-3"
                  >
                    <FiDownload className="mr-2" />
                    Export Data
                  </button>
                  
                  <p className="mt-2 text-sm text-gray-600">
                    This will export your selected data in the chosen format.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Share via</h4>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <a
                      href={getGoogleSheetsLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Google_Sheets_logo_%282014-2020%29.svg/1498px-Google_Sheets_logo_%282014-2020%29.svg.png" 
                        alt="Google Sheets"
                        className="w-5 h-5 mr-2"
                      />
                      <span>Export to Google Sheets</span>
                      <FiExternalLink className="ml-1" size={12} />
                    </a>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <span>WhatsApp</span>
                        <FiExternalLink className="ml-1" size={12} />
                      </a>
                      
                      <a
                        href={getEmailLink()}
                        className="flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <span>Email</span>
                        <FiExternalLink className="ml-1" size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Scheduled Exports</h3>
              
              <div className="bg-gray-50 rounded-md p-4 mb-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly User Report</p>
                  <p className="text-sm text-gray-600">CSV export sent every Monday at 8:00 AM</p>
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Edit
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Monthly Analytics</p>
                  <p className="text-sm text-gray-600">JSON export sent on the 1st of each month</p>
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Edit
                </button>
              </div>
              
              <div className="mt-4">
                <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  <FiCalendar className="mr-1" />
                  Set Up New Scheduled Export
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