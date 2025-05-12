'use client'

import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">PC</div>
              </div>
              <span className="font-display font-bold text-xl">PhysioCare</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional physiotherapy services delivered to your doorstep. We make healthcare accessible and convenient.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/conditions" className="text-gray-400 hover:text-white transition-colors">Conditions</Link>
              </li>
              <li>
                <Link href="/doctors" className="text-gray-400 hover:text-white transition-colors">Our Therapists</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/sports-injury" className="text-gray-400 hover:text-white transition-colors">Sports Injury</Link>
              </li>
              <li>
                <Link href="/services/geriatric" className="text-gray-400 hover:text-white transition-colors">Geriatric Therapy</Link>
              </li>
              <li>
                <Link href="/services/orthopedic" className="text-gray-400 hover:text-white transition-colors">Orthopedic Rehab</Link>
              </li>
              <li>
                <Link href="/services/neurological" className="text-gray-400 hover:text-white transition-colors">Neurological Rehab</Link>
              </li>
              <li>
                <Link href="/services/pain-management" className="text-gray-400 hover:text-white transition-colors">Pain Management</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Therapy Street, Health City</li>
              <li>contact@physiocare.com</li>
              <li>+1 (555) 123-4567</li>
              <li className="pt-2">
                <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md inline-block transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} PhysioCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 