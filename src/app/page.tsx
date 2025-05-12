import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiCalendar, FiUser, FiMap, FiCheckCircle } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container-custom py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="heading-xl mb-6">
                  Expert Physiotherapy in the Comfort of Your Home
                </h1>
                <p className="text-lg mb-8">
                  We bring professional physiotherapy services right to your doorstep. 
                  Get personalized care, flexible scheduling, and improved recovery without leaving home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking" className="btn-secondary text-center">
                    Book Appointment
                  </Link>
                  <Link href="/services" className="bg-white text-primary-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors text-center">
                    Our Services
                  </Link>
                </div>
              </div>
              <div className="relative h-80 md:h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary-600 border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
                <Image 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Physiotherapist working with a patient"
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">How PhysioCare Works</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our simple process makes it easy to get the physiotherapy care you need, right at your doorstep.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: <FiCalendar className="w-10 h-10 text-primary-600" />,
                  title: 'Book Appointment',
                  description: 'Schedule a session that works with your timetable through our easy booking system.'
                },
                {
                  icon: <FiUser className="w-10 h-10 text-primary-600" />,
                  title: 'Meet Your Therapist',
                  description: 'Get matched with a qualified physiotherapist specialized in your condition.'
                },
                {
                  icon: <FiMap className="w-10 h-10 text-primary-600" />,
                  title: 'Home Treatment',
                  description: 'Receive professional care in the comfort and privacy of your own home.'
                },
                {
                  icon: <FiCheckCircle className="w-10 h-10 text-primary-600" />,
                  title: 'Track Progress',
                  description: 'Follow your recovery journey with personalized exercise plans and progress tracking.'
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Our Physiotherapy Services</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We offer a wide range of physiotherapy services tailored to meet your specific needs and health conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Sports Injury Rehabilitation',
                  description: 'Specialized treatment for athletes and sports enthusiasts to recover from injuries and improve performance.',
                  image: 'https://images.unsplash.com/photo-1597452485675-25680c293f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
                },
                {
                  title: 'Orthopedic Rehabilitation',
                  description: 'Treatment for conditions affecting bones, joints, ligaments, tendons, and muscles to restore mobility and function.',
                  image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
                },
                {
                  title: 'Neurological Rehabilitation',
                  description: 'Specialized care for individuals with neurological conditions to improve movement, coordination, and quality of life.',
                  image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80'
                },
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary-600 font-medium hover:text-primary-700">
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services" className="btn-primary">
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">What Our Patients Say</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our patients have to say about their PhysioCare experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  condition: 'Back Pain',
                  quote: 'The convenience of having therapy at home made all the difference in my recovery. My therapist was professional, knowledgeable, and supportive throughout the process.',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
                },
                {
                  name: 'Michael Chen',
                  condition: 'Post-Surgery Rehab',
                  quote: 'After my knee surgery, PhysioCare made recovery so much easier. No traveling when I was in pain, and the personalized exercises have helped me regain full mobility.',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
                },
                {
                  name: 'Emma Rodriguez',
                  condition: 'Sports Injury',
                  quote: 'As an athlete, I needed specialized care for my shoulder injury. My PhysioCare therapist not only helped me recover but also provided preventative exercises for future training.',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.condition}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-700 text-white py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-lg mb-6">Ready to Start Your Healing Journey?</h2>
              <p className="text-lg mb-8">
                Take the first step towards recovery with PhysioCare's home physiotherapy services.
                Our expert therapists are ready to help you feel better, move better, and live better.
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