'use client'

import Image from 'next/image'
import { useState } from 'react'
import WaveAnimation from '../components/WaveAnimation'
import ProjectList from '../components/ProjectList'
import MusicPlayerOverlay from '../components/MusicPlayerOverlay'

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
          <div className="hidden md:flex space-x-8 text-base">
            <a href="#projects" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>PROJECTS</a>
            <a href="/about" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">ABOUT</a>
            <a href="/music" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">MUSIC</a>
            <a href="#contact" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>CONTACT</a>
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
              <a href="#projects" className="text-white hover:text-gray-400 transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}>PROJECTS</a>
              <a href="/about" className="text-white hover:text-gray-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>ABOUT</a>
              <a href="/music" className="text-white hover:text-gray-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>MUSIC</a>
              <a href="#contact" className="text-white hover:text-gray-400 transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}>CONTACT</a>
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
      
        {/* Copyright */}
        <div id="contact" className="text-center">
          <div className="flex justify-center">
            <span className="text-gray-400">
              AustinCreative.uk © 2010-2025
            </span>
          </div>
        </div>
        </div>
      </div>
    </main>
  )
}