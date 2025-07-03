'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import MusicPlayerOverlay from '../../components/MusicPlayerOverlay'
import WaveAnimation from '../../components/WaveAnimation'
import Footer from '../../components/Footer'

export default function Contact() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <main className="min-h-screen bg-gray-800">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto bg-black min-h-screen">
        {/* Hero Navigation Bar */}
        <nav className="flex items-center justify-between p-4 md:p-4">
          {/* Logo - Left */}
          <Link href="/">
            <div className="w-20 h-20 md:w-32 md:h-32 relative cursor-pointer flex-shrink-0">
              <Image
                src="/logo7.png"
                alt="Austin Creative Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Menu - Right */}
          <div className="hidden md:flex space-x-8 text-base">
            <button onClick={() => { router.push('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">PROJECTS</button>
            <Link href="/about" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">ABOUT</Link>
            <Link href="/music" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">MUSIC</Link>
            <Link href="/contact" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">CONTACT</Link>
          </div>
          
          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </nav>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-600">
            <div className="flex flex-col space-y-4 p-4">
              <button onClick={() => { router.push('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); setMobileMenuOpen(false); }} className="text-white hover:text-gray-400 transition-colors text-left">PROJECTS</button>
              <Link href="/about" className="text-white hover:text-gray-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
              <Link href="/music" className="text-white hover:text-gray-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>MUSIC</Link>
              <Link href="/contact" className="text-white hover:text-gray-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
            </div>
          </div>
        )}
        
        {/* Wave Animation - Fixed Height */}
        <div className="w-full h-24">
          <WaveAnimation />
        </div>
        
        {/* Music Player */}
        <MusicPlayerOverlay />
        
        {/* Content */}
        <div className="p-8">
          {/* Contact Content */}
          <div className="flex items-center justify-center min-h-96">
            <a href="mailto:phil@austincreative.uk" className="text-white hover:text-gray-400 transition-colors">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <Footer />
      </div>
    </main>
  )
}