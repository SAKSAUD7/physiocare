'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiAward, FiUsers, FiHome, FiHeart, FiStar, FiMapPin, FiCalendar, FiClock } from 'react-icons/fi'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About PhysioCare</h1>
              <p className="text-xl mb-8">
                Transforming physiotherapy care by bringing experienced professionals 
                to your doorstep for personalized treatment in the comfort of your home.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/booking" className="btn bg-white text-primary-700 hover:bg-gray-100">
                  Book Appointment
                </Link>
                <Link href="/contact" className="btn border border-white text-white hover:bg-white/10">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '5+', label: 'Years Experience', icon: <FiCalendar className="w-8 h-8 mx-auto text-primary-600 mb-2" /> },
                { number: '40+', label: 'Expert Physiotherapists', icon: <FiUsers className="w-8 h-8 mx-auto text-primary-600 mb-2" /> },
                { number: '10,000+', label: 'Happy Patients', icon: <FiHeart className="w-8 h-8 mx-auto text-primary-600 mb-2" /> },
                { number: '15+', label: 'Service Locations', icon: <FiMapPin className="w-8 h-8 mx-auto text-primary-600 mb-2" /> }
              ].map((stat, index) => (
                <div key={index} className="p-6 rounded-lg">
                  {stat.icon}
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    PhysioCare was founded in 2018 by a team of passionate physiotherapists who recognized a gap in the healthcare system. 
                    Many patients who needed ongoing physiotherapy struggled to consistently attend in-clinic appointments due to mobility issues, 
                    transportation challenges, busy schedules, or simply the discomfort of traveling when in pain.
                  </p>
                  <p className="text-gray-600">
                    We set out to solve this problem by creating a service that brings qualified physiotherapists directly to patients' homes. 
                    What started as a small team of dedicated professionals has grown into a network of specialized physiotherapists 
                    serving communities across the country.
                  </p>
                </div>
              </div>
              <div className="relative h-80 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="PhysioCare team member helping a patient"
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our dedicated leadership team brings decades of combined experience in healthcare, 
                physiotherapy, and technology to guide PhysioCare's mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dr. Emily Johnson',
                  role: 'Founder & Clinical Director',
                  bio: 'With over 15 years of experience in physiotherapy, Dr. Johnson founded PhysioCare to make quality care accessible to all.',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80'
                },
                {
                  name: 'Dr. Michael Chen',
                  role: 'Medical Director',
                  bio: 'Dr. Chen specializes in sports medicine and rehabilitation, overseeing our clinical standards and treatment protocols.',
                  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
                },
                {
                  name: 'Sarah Williams',
                  role: 'Operations Director',
                  bio: 'Sarah ensures smooth day-to-day operations and coordinates our network of physiotherapists across all locations.',
                  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1561&q=80'
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Patients Say</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Here's what some of our patients have to say about their experience with PhysioCare.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "After my knee surgery, I was worried about getting to my physiotherapy appointments. PhysioCare came to my home, and their therapist helped me recover in my own space.",
                  name: "John D.",
                  location: "New York",
                  rating: 5
                },
                {
                  quote: "The convenience of having a professional physiotherapist come to my home has been incredible. The care is personalized, and they took the time to understand my needs.",
                  name: "Maria S.",
                  location: "Chicago",
                  rating: 5
                },
                {
                  quote: "As a busy professional, finding time for physiotherapy was challenging. PhysioCare works around my schedule, and their app makes it easy to track my progress.",
                  name: "Robert T.",
                  location: "Los Angeles",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <FiStar key={i + testimonial.rating} className="w-5 h-5 text-gray-300" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-700 text-white py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to Experience the PhysioCare Difference?</h2>
              <p className="text-xl mb-8">
                Book your first appointment today and discover how our expert therapists can help you 
                achieve your health and mobility goals in the comfort of your own home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking" className="bg-white text-primary-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors text-center">
                  Book Your First Session
                </Link>
                <Link href="/contact" className="border border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-md transition-colors text-center">
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