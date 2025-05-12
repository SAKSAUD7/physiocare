import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiStar, FiMail, FiCalendar } from 'react-icons/fi'

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: 'Dr. Emily Johnson',
    title: 'Senior Physiotherapist',
    specialization: 'Sports Rehabilitation',
    experience: 8,
    qualifications: ['DPT', 'OCS', 'CSCS'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    slug: 'emily-johnson',
    bio: 'Dr. Emily Johnson specializes in sports injury rehabilitation and has worked with professional athletes across multiple sports. She focuses on evidence-based treatments and personalized recovery plans.',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    title: 'Lead Physiotherapist',
    specialization: 'Orthopedic Rehabilitation',
    experience: 12,
    qualifications: ['DPT', 'MTC', 'OCS'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    slug: 'michael-chen',
    bio: 'With over 12 years of experience, Dr. Chen specializes in orthopedic rehabilitation and post-surgical recovery. He believes in a holistic approach that combines manual therapy with therapeutic exercises.',
  },
  {
    id: 3,
    name: 'Dr. Sarah Williams',
    title: 'Neurological Specialist',
    specialization: 'Neurological Rehabilitation',
    experience: 10,
    qualifications: ['DPT', 'NCS', 'CBIS'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    slug: 'sarah-williams',
    bio: 'Dr. Williams specializes in neurological rehabilitation, helping patients recover from strokes, brain injuries, and other neurological conditions. She is passionate about improving mobility and independence.',
  },
  {
    id: 4,
    name: 'Dr. James Rodriguez',
    title: 'Geriatric Specialist',
    specialization: 'Geriatric Physiotherapy',
    experience: 15,
    qualifications: ['DPT', 'GCS', 'CEEAA'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    slug: 'james-rodriguez',
    bio: 'Dr. Rodriguez has dedicated his career to helping older adults maintain mobility, strength, and balance. He specializes in fall prevention and management of age-related conditions.',
  },
  {
    id: 5,
    name: 'Dr. Olivia Martin',
    title: 'Pain Management Specialist',
    specialization: 'Chronic Pain Management',
    experience: 9,
    qualifications: ['DPT', 'COMT', 'TPS'],
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1041&q=80',
    slug: 'olivia-martin',
    bio: 'Dr. Martin specializes in managing chronic pain conditions through a combination of manual therapy, therapeutic exercises, and education on pain science and self-management strategies.',
  },
  {
    id: 6,
    name: 'Dr. David Wilson',
    title: 'Pediatric Specialist',
    specialization: 'Pediatric Physiotherapy',
    experience: 11,
    qualifications: ['DPT', 'PCS', 'C/NDT'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    slug: 'david-wilson',
    bio: 'Dr. Wilson works primarily with children, helping them overcome developmental delays, congenital conditions, and injuries. He creates fun, engaging therapy sessions that children enjoy.',
  },
];

export default function DoctorsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Our Expert Physiotherapists</h1>
              <p className="text-lg mb-8">
                Meet our team of highly qualified physiotherapists dedicated to providing 
                exceptional care and helping you achieve your health and mobility goals.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <div className="relative h-64">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                    <p className="text-primary-600 font-medium mb-2">{doctor.title}</p>
                    <p className="text-gray-600 mb-2"><span className="font-medium">Specialization:</span> {doctor.specialization}</p>
                    <p className="text-gray-600 mb-4"><span className="font-medium">Experience:</span> {doctor.experience} years</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-yellow-400 mr-2">
                        <FiStar className="fill-current" />
                        <span className="ml-1 text-gray-800 font-medium">{doctor.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.floor(doctor.rating * 20)} reviews
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{doctor.bio}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link 
                        href={`/doctors/${doctor.slug}`}
                        className="btn-primary flex items-center justify-center flex-1"
                      >
                        View Profile
                      </Link>
                      <Link 
                        href={`/booking?doctor=${doctor.id}`}
                        className="btn-outline flex items-center justify-center flex-1"
                      >
                        <FiCalendar className="mr-1" />
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team */}
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h2 className="heading-md mb-4">Join Our Team of Experts</h2>
                  <p className="text-gray-600 mb-6">
                    Are you a qualified physiotherapist passionate about providing excellent care? 
                    We're always looking for talented professionals to join our growing team.
                  </p>
                  <ul className="mb-8 space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Competitive compensation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Flexible scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Professional development opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>Supportive team environment</span>
                    </li>
                  </ul>
                  <Link href="/careers" className="btn-primary inline-flex items-center">
                    View Open Positions
                  </Link>
                </div>
                <div className="relative md:h-auto h-60">
                  <Image
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1486&q=80"
                    alt="Join our team"
                    className="object-cover"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 