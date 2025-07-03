'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import MusicPlayerOverlay from '../../components/MusicPlayerOverlay'
import WaveAnimation from '../../components/WaveAnimation'
import Footer from '../../components/Footer'

export default function About() {
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
        {/* About Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-8">
            About Phil
          </h1>
          
          <div className="text-left max-w-2xl mx-auto space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I live in NE, England where I balance my time between family life and creative pursuits. 
              As a father, I understand the importance of creating meaningful experiences and bringing 
              ideas to life.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              When I&apos;m not working on projects, you&apos;ll often find me gaming. This passion for 
              interactive experiences directly influences my creative work, helping me understand what 
              makes digital products engaging and enjoyable.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Through Austin Creative UK, I combine my technical skills with creative vision to 
              develop unique digital experiences, from interactive games to web applications.
            </p>
          </div>
          
          <div className="mt-12">
            <Link 
              href="/" 
              className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold inline-block"
            >
              View My Projects
            </Link>
          </div>
        </div>
        </div>
        
        <Footer />
      </div>
    </main>
  )
}