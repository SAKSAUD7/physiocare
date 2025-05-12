'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { FiMapPin, FiPhone, FiMail, FiMessageSquare, FiClock } from 'react-icons/fi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError('')

    // Simulate API call
    try {
      // In a real app, you would submit the form data to your backend here
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Success
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Contact Us</h1>
              <p className="text-lg mb-8">
                Have questions about our services or ready to book an appointment? 
                Get in touch with our team and we'll be happy to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="heading-md mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Whether you have questions about our services, need help booking an appointment, 
                  or want to learn more about how we can help with your specific condition, 
                  our friendly team is ready to assist you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-primary-100 p-3 rounded-full">
                        <FiMapPin className="text-primary-600 w-5 h-5" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Our Office</h3>
                      <p className="mt-1 text-gray-600">
                        123 Therapy Street<br />
                        Health City, HC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-primary-100 p-3 rounded-full">
                        <FiPhone className="text-primary-600 w-5 h-5" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="tel:+15551234567" className="hover:text-primary-600">+1 (555) 123-4567</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-primary-100 p-3 rounded-full">
                        <FiMail className="text-primary-600 w-5 h-5" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Email</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="mailto:contact@physiocare.com" className="hover:text-primary-600">contact@physiocare.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-primary-100 p-3 rounded-full">
                        <FiClock className="text-primary-600 w-5 h-5" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                      <div className="mt-1 text-gray-600 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                  
                  {submitSuccess && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
                      <p>Thank you for your message! Our team will get back to you shortly.</p>
                    </div>
                  )}
                  
                  {submitError && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
                      <p>{submitError}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Appointment">Appointment</option>
                        <option value="Service Information">Service Information</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary py-3 flex items-center justify-center"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <FiMessageSquare className="ml-2" />}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Find Us</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                While we primarily offer home visits, you're welcome to visit our main office for consultations.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md h-96 relative">
              {/* In a real app, you would integrate Google Maps or another mapping service here */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Map Integration Here</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Find quick answers to common questions about our services.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: 'What areas do you serve?',
                  answer: 'We currently provide services in [List of Areas/Cities]. If you're not sure if we cover your location, please contact us directly, and we'll be happy to check for you.'
                },
                {
                  question: 'How do I book an appointment?',
                  answer: 'You can book an appointment through our online booking system, by calling our office, or by sending us a message through the contact form on this page.'
                },
                {
                  question: 'What should I prepare for a home physiotherapy session?',
                  answer: 'Wear comfortable clothing that allows for movement and provides access to the area being treated. Clear a small space (about 6x6 feet) for exercises if possible. Have any relevant medical records or referrals ready.'
                },
                {
                  question: 'Do you accept insurance?',
                  answer: 'Yes, we work with most major insurance providers. Please contact us with your insurance details, and we can verify your coverage before your appointment.'
                },
            ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/faq" className="text-primary-600 hover:text-primary-700 font-medium">
                View All FAQs →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 