'use client'

import Image from 'next/image'
import { useState } from 'react'
import WaveAnimation from '../components/WaveAnimation'
import ProjectList from '../components/ProjectList'
import MusicPlayerOverlay from '../components/MusicPlayerOverlay'
import Footer from '../components/Footer'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <main className="min-h-screen bg-gray-800">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto bg-black min-h-screen">
        {/* Hero Navigation Bar */}
        <nav className="flex items-center justify-between p-4 md:p-4">
          {/* Logo - Left */}
          <div className="w-20 h-20 md:w-32 md:h-32 relative flex-shrink-0">
            <Image
              src="/logo7.png"
              alt="Austin Creative Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Desktop Menu - Right */}
          <div className="hidden md:flex space-x-4 text-base">
            <button onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white hover:text-gray-400 transition-colors whitespace-nowrap px-3 py-2">PROJECTS</button>
            <a href="/about" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap px-3 py-2 block">ABOUT</a>
            <a href="/music" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap px-3 py-2 block">MUSIC</a>
            <button onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white hover:text-gray-400 transition-colors whitespace-nowrap px-3 py-2">CONTACT</button>
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
              <button onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-white hover:text-gray-400 transition-colors text-left py-3 px-2">PROJECTS</button>
              <a href="/about" className="text-white hover:text-gray-400 transition-colors py-3 px-2 block" onClick={() => setMobileMenuOpen(false)}>ABOUT</a>
              <a href="/music" className="text-white hover:text-gray-400 transition-colors py-3 px-2 block" onClick={() => setMobileMenuOpen(false)}>MUSIC</a>
              <a href="/contact" className="text-white hover:text-gray-400 transition-colors py-3 px-2 block" onClick={() => setMobileMenuOpen(false)}>CONTACT</a>
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
      
      {/* Intro */}
      <div id="about" className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          Hello, I&apos;m Phil
        </h1>
        <p className="text-gray-400">
          In my spare time, I freelance, and make stuff, check out my creations below
        </p>
      </div>
      
      {/* Projects */}
      <div id="projects">
        <ProjectList />
      </div>
        </div>
        
        {/* Contact anchor for smooth scrolling */}
        <div id="contact"></div>
        
        <Footer />
      </div>
    </main>
  )
}