import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiArrowRight, FiClock, FiDollarSign } from 'react-icons/fi'

// Mock data - in a real app, this would come from the database
const services = [
  {
    id: 1,
    name: 'Sports Injury Rehabilitation',
    shortDescription: 'Specialized therapy for athletes and sports enthusiasts to recover from injuries and improve performance.',
    price: 80,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1597452485675-25680c293f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    slug: 'sports-injury-rehabilitation',
  },
  {
    id: 2,
    name: 'Orthopedic Rehabilitation',
    shortDescription: 'Treatment for conditions affecting bones, joints, ligaments, tendons, and muscles to restore mobility and function.',
    price: 75,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    slug: 'orthopedic-rehabilitation',
  },
  {
    id: 3,
    name: 'Neurological Rehabilitation',
    shortDescription: 'Specialized care for individuals with neurological conditions to improve movement, coordination, and quality of life.',
    price: 90,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    slug: 'neurological-rehabilitation',
  },
  {
    id: 4,
    name: 'Geriatric Physiotherapy',
    shortDescription: 'Specialized care for older adults to improve mobility, strength, and balance to maintain independence and quality of life.',
    price: 70,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    slug: 'geriatric-physiotherapy',
  },
  {
    id: 5,
    name: 'Post-Surgical Rehabilitation',
    shortDescription: 'Structured therapy designed to facilitate recovery after surgical procedures and restore function.',
    price: 85,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d99b75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    slug: 'post-surgical-rehabilitation',
  },
  {
    id: 6,
    name: 'Pain Management',
    shortDescription: 'Comprehensive approach to reducing pain and improving function for individuals with chronic or acute pain conditions.',
    price: 75,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1609883954782-0240646fbcba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    slug: 'pain-management',
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Our Physiotherapy Services</h1>
              <p className="text-lg mb-8">
                We offer a comprehensive range of physiotherapy services tailored to meet your specific needs. 
                Our expert therapists bring professional care right to your doorstep.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                    <p className="text-gray-600 mb-4 flex-grow">{service.shortDescription}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-500">
                        <FiClock className="mr-1" />
                        <span>{service.duration} min</span>
                      </div>
                      <div className="flex items-center font-medium">
                        <FiDollarSign className="mr-1 text-primary-600" />
                        <span>${service.price}</span>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/services/${service.slug}`}
                      className="btn-primary flex items-center justify-center"
                    >
                      View Details
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-md mb-4">Ready to Book Your Treatment?</h2>
              <p className="text-gray-600 mb-8">
                Schedule your first session with one of our expert physiotherapists and start your journey to recovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking" className="btn-primary">
                  Book Appointment
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 