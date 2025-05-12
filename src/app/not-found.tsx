'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h1 className="heading-lg mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary inline-flex items-center"
          >
            Return to Home
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 