'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import MusicList from '../../components/MusicList'
import MusicPlayerOverlay from '../../components/MusicPlayerOverlay'
import WaveAnimation from '../../components/WaveAnimation'
import Footer from '../../components/Footer'

export default function Music() {
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
          <div className="hidden md:flex space-x-4 text-base">
            <button onClick={() => { router.push('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-gray-400 transition-colors whitespace-nowrap px-3 py-2">PROJECTS</button>
            <Link href="/about" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap px-3 py-2 block">ABOUT</Link>
            <Link href="/music" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap px-3 py-2 block">MUSIC</Link>
            <Link href="/contact" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap px-3 py-2 block">CONTACT</Link>
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
            <div className="flex flex-col p-4">
              <button onClick={() => { router.push('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); setMobileMenuOpen(false); }} className="text-white hover:text-gray-400 transition-colors text-left py-3 px-2">PROJECTS</button>
              <Link href="/about" className="text-white hover:text-gray-400 transition-colors py-3 px-2 block" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
              <Link href="/music" className="text-white hover:text-gray-400 transition-colors py-3 px-2 block" onClick={() => setMobileMenuOpen(false)}>MUSIC</Link>
              <Link href="/contact" className="text-white hover:text-gray-400 transition-colors py-3 px-2 block" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
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
          {/* Music Content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-8">
              My Music
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              A collection of my musical creations and remixes over the years.
            </p>
          </div>
          
          {/* Music List */}
          <MusicList />
        </div>
        
        <Footer />
      </div>
    </main>
  )
}