'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Conditions', href: '/conditions' },
  { name: 'Doctors', href: '/doctors' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const router = useRouter()
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const profileButtonRef = useRef<HTMLButtonElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }
    
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileOpen])

  // Handle dashboard navigation
  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsProfileOpen(false)
    // Use window.location for a hard navigation to ensure it works
    window.location.href = '/dashboard'
  }

  // Handle profile navigation
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsProfileOpen(false)
    // Use window.location for a hard navigation to ensure it works
    window.location.href = '/dashboard/profile'
  }

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setIsProfileOpen(false)
      await signOut({ redirect: false })
      // Force a hard reload to ensure session is cleared
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
      // Fallback - force redirect to home page
      window.location.href = '/'
    }
  }

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">PC</div>
              </div>
              <span className="font-display font-bold text-xl text-gray-900">PhysioCare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {status === 'authenticated' ? (
              <div className="relative">
                <button
                  ref={profileButtonRef}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium focus:outline-none"
                >
                  <div className="bg-primary-100 h-8 w-8 rounded-full flex items-center justify-center text-primary-600 font-bold">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span>{session.user?.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div 
                    ref={profileDropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-[9999] py-1 border border-gray-200"
                  >
                    <a 
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={handleDashboardClick}
                    >
                      <FiUser className="mr-2" />
                      Dashboard
                    </a>
                    <a 
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={handleProfileClick}
                    >
                      <FiSettings className="mr-2" />
                      My Profile
                    </a>
                    <a 
                      href="/"
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center cursor-pointer"
                    >
                      <FiLogOut className="mr-2" />
                      Log Out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container-custom py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 font-medium text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
              {status === 'authenticated' ? (
                <>
                  <div className="flex items-center py-2">
                    <div className="bg-primary-100 h-8 w-8 rounded-full flex items-center justify-center text-primary-600 font-bold mr-2">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="font-medium">{session.user?.name}</span>
                  </div>
                  <a
                    href="/dashboard"
                    className="block py-2 font-medium text-gray-700 hover:text-primary-600 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
                      // Use window.location.href for more reliable navigation
                      window.location.href = '/dashboard'
                    }}
                  >
                    <FiUser className="mr-2" />
                    Dashboard
                  </a>
                  <a
                    href="/dashboard/profile"
                    className="block py-2 font-medium text-gray-700 hover:text-primary-600 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
                      // Use window.location.href for more reliable navigation
                      window.location.href = '/dashboard/profile'
                    }}
                  >
                    <FiSettings className="mr-2" />
                    My Profile
                  </a>
                  <a 
                    href="/"
                    className="block w-full text-left py-2 font-medium text-red-600 hover:text-red-700 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
                      handleSignOut(e)
                    }}
                  >
                    <FiLogOut className="mr-2" />
                    Log Out
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 font-medium text-gray-700 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="btn-primary inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 