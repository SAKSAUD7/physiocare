import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiArrowRight } from 'react-icons/fi'

// Mock data for conditions
const conditions = [
  {
    id: 1,
    name: 'Back Pain',
    shortDescription: 'Relief from chronic or acute back pain through targeted therapies and exercises.',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Musculoskeletal',
    slug: 'back-pain',
  },
  {
    id: 2,
    name: 'Neck Pain',
    shortDescription: 'Treatment for neck stiffness, pain, and limited mobility with specialized techniques.',
    image: 'https://images.unsplash.com/photo-1600959862637-7b245a9b69b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Musculoskeletal',
    slug: 'neck-pain',
  },
  {
    id: 3,
    name: 'Sports Injuries',
    shortDescription: 'Specialized rehabilitation for athletes and active individuals suffering from sports-related injuries.',
    image: 'https://images.unsplash.com/photo-1574589631550-89131cd35512?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Sports Injuries',
    slug: 'sports-injuries',
  },
  {
    id: 4,
    name: 'Arthritis',
    shortDescription: 'Management and relief for osteoarthritis, rheumatoid arthritis, and related joint conditions.',
    image: 'https://images.unsplash.com/photo-1560240290-a1ad56833085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Musculoskeletal',
    slug: 'arthritis',
  },
  {
    id: 5,
    name: 'Post-Surgical Rehabilitation',
    shortDescription: 'Recovery support after orthopedic surgeries, joint replacements, and other procedures.',
    image: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Post-Surgical',
    slug: 'post-surgical-rehabilitation',
  },
  {
    id: 6,
    name: 'Stroke Rehabilitation',
    shortDescription: 'Specialized therapy to regain mobility, strength, and function after a stroke.',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Neurological',
    slug: 'stroke-rehabilitation',
  },
  {
    id: 7,
    name: 'Sciatica',
    shortDescription: 'Relief from sciatic nerve pain, numbness, and tingling with targeted treatments.',
    image: 'https://images.unsplash.com/photo-1566241782917-927de3b86351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80',
    category: 'Musculoskeletal',
    slug: 'sciatica',
  },
  {
    id: 8,
    name: 'Balance Disorders',
    shortDescription: 'Therapy for vertigo, dizziness, and balance problems to improve stability and prevent falls.',
    image: 'https://images.unsplash.com/photo-1603017527055-d78e96093a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Neurological',
    slug: 'balance-disorders',
  },
  {
    id: 9,
    name: 'Chronic Pain',
    shortDescription: 'Long-term management strategies for chronic pain conditions through therapeutic techniques.',
    image: 'https://images.unsplash.com/photo-1624786195195-721056babc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Chronic Pain',
    slug: 'chronic-pain',
  },
];

// Group conditions by category
const groupedConditions = conditions.reduce((acc, condition) => {
  if (!acc[condition.category]) {
    acc[condition.category] = [];
  }
  acc[condition.category].push(condition);
  return acc;
}, {} as Record<string, typeof conditions>);

export default function ConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Conditions We Treat</h1>
              <p className="text-lg mb-8">
                At PhysioCare, our expert physiotherapists specialize in treating a wide range of health conditions.
                Explore the conditions we treat and learn how we can help you on your path to recovery.
              </p>
            </div>
          </div>
        </section>

        {/* Conditions by Category */}
        <section className="py-16">
          <div className="container-custom">
            {Object.entries(groupedConditions).map(([category, categoryConditions]) => (
              <div key={category} className="mb-16">
                <h2 className="heading-md mb-8 pb-3 border-b border-gray-200">{category} Conditions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryConditions.map((condition) => (
                    <div key={condition.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                      <div className="relative h-48">
                        <Image
                          src={condition.image}
                          alt={condition.name}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2">{condition.name}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{condition.shortDescription}</p>
                        <Link 
                          href={`/conditions/${condition.slug}`}
                          className="btn-primary flex items-center justify-center"
                        >
                          Learn More
                          <FiArrowRight className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-md mb-4">Need Expert Treatment for Your Condition?</h2>
              <p className="text-gray-600 mb-8">
                Our experienced physiotherapists are ready to help you manage your condition and improve your quality of life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking" className="btn-primary">
                  Book a Consultation
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