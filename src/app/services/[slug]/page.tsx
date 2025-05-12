'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiCalendar, FiClock, FiDollarSign, FiCheck } from 'react-icons/fi'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

// Mock data - in a real app, this would come from the database
const services = [
  {
    id: 1,
    name: 'Sports Injury Rehabilitation',
    shortDescription: 'Specialized therapy for athletes and sports enthusiasts to recover from injuries and improve performance.',
    description: `
      Our Sports Injury Rehabilitation service is designed specifically for athletes and active individuals who have sustained injuries during physical activity. Our expert physiotherapists specialize in treating sports-related injuries and helping you return to your optimal performance level.
      
      Using evidence-based techniques and personalized treatment plans, we address both the symptoms and underlying causes of your injury to prevent recurrence and improve your athletic performance.
    `,
    price: 80,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1597452485675-25680c293f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    slug: 'sports-injury-rehabilitation',
    benefits: [
      'Faster recovery from sports injuries',
      'Improved strength and flexibility',
      'Prevention of future injuries',
      'Enhanced athletic performance',
      'Personalized exercise programs',
      'Sport-specific rehabilitation techniques'
    ],
    conditions: [
      'Sprains and strains',
      'Tendonitis',
      'Muscle tears',
      'Ligament injuries (including ACL)',
      'Shoulder injuries',
      'Tennis/Golfer\'s elbow',
      'Runner\'s knee'
    ]
  },
  {
    id: 2,
    name: 'Orthopedic Rehabilitation',
    shortDescription: 'Treatment for conditions affecting bones, joints, ligaments, tendons, and muscles to restore mobility and function.',
    description: `
      Orthopedic Rehabilitation focuses on treating conditions that affect the musculoskeletal system, including bones, joints, ligaments, tendons, and muscles. Our specialized approach helps restore mobility, strength, and function after injury, surgery, or if you're managing a chronic orthopedic condition.
      
      Our experienced physiotherapists use a combination of manual therapy, therapeutic exercises, and education to help you achieve your recovery goals and improve your quality of life.
    `,
    price: 75,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    slug: 'orthopedic-rehabilitation',
    benefits: [
      'Reduced pain and inflammation',
      'Improved joint mobility and stability',
      'Enhanced muscle strength',
      'Better posture and alignment',
      'Increased functional independence',
      'Prevention of future injuries'
    ],
    conditions: [
      'Arthritis',
      'Joint replacements',
      'Fractures',
      'Back and neck pain',
      'Sciatica',
      'Carpal tunnel syndrome',
      'Temporomandibular joint (TMJ) disorders'
    ]
  },
  {
    id: 3,
    name: 'Neurological Rehabilitation',
    shortDescription: 'Specialized care for individuals with neurological conditions to improve movement, coordination, and quality of life.',
    description: `
      Our Neurological Rehabilitation service is dedicated to helping individuals with neurological conditions improve their movement, coordination, balance, and overall quality of life. We understand the unique challenges of neurological disorders and design treatment plans that address your specific needs.
      
      Through specialized therapeutic techniques, our expert physiotherapists work to enhance neural plasticity, optimize functional abilities, and promote greater independence in daily activities.
    `,
    price: 90,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    slug: 'neurological-rehabilitation',
    benefits: [
      'Improved motor control and coordination',
      'Enhanced balance and stability',
      'Increased strength and endurance',
      'Better mobility and gait',
      'Greater independence in daily activities',
      'Personalized home exercise programs'
    ],
    conditions: [
      'Stroke',
      'Parkinson\'s disease',
      'Multiple sclerosis',
      'Brain injury',
      'Spinal cord injury',
      'Peripheral neuropathy',
      'Balance disorders'
    ]
  }
];

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Find the service based on the slug
  const service = services.find(s => s.slug === params.slug)
  
  // Handle not found
  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-16">
          <div className="container-custom text-center">
            <h1 className="heading-lg mb-4">Service Not Found</h1>
            <p className="mb-8">The service you're looking for doesn't exist or has been removed.</p>
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleBooking = () => {
    setLoading(true)
    // In a real app, you might store this in context/state
    router.push(`/booking?service=${service.id}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h1 className="heading-lg mb-4">{service.name}</h1>
                <p className="text-lg mb-6">
                  {service.shortDescription}
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center">
                    <FiClock className="mr-2 text-xl" />
                    <span>{service.duration} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="mr-2 text-xl" />
                    <span>${service.price} per session</span>
                  </div>
                </div>
                <button 
                  onClick={handleBooking}
                  disabled={loading}
                  className="bg-white text-primary-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
                >
                  <FiCalendar className="mr-2" />
                  {loading ? 'Loading...' : 'Book This Service'}
                </button>
              </div>
              <div className="lg:w-1/2 relative h-64 sm:h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src={service.image} 
                  alt={service.name}
                  className="object-cover"
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="heading-md mb-6">About This Service</h2>
                <div className="prose prose-lg max-w-none">
                  {service.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mt-12 mb-4">Conditions We Treat</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {service.conditions.map((condition, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
                  <p className="text-gray-700 mb-6">
                    Book your session today and take the first step toward recovery and improved health.
                  </p>
                  <button 
                    onClick={handleBooking}
                    disabled={loading}
                    className="btn-primary w-full"
                  >
                    {loading ? 'Loading...' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-md mb-8 text-center">Other Services You Might Need</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services
                .filter(s => s.id !== service.id)
                .slice(0, 3)
                .map((relatedService) => (
                  <div key={relatedService.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={relatedService.image}
                        alt={relatedService.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{relatedService.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedService.shortDescription}</p>
                      <Link 
                        href={`/services/${relatedService.slug}`}
                        className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 