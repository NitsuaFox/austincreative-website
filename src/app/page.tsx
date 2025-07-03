import Image from 'next/image'
import WaveAnimation from '../components/WaveAnimation'
import ProjectList from '../components/ProjectList'
import MusicPlayerOverlay from '../components/MusicPlayerOverlay'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-800">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto bg-black min-h-screen">
        {/* Hero Navigation Bar */}
        <nav className="flex items-center justify-between p-4 md:p-6">
          {/* Logo - Left */}
          <div className="w-24 h-24 md:w-40 md:h-40 relative flex-shrink-0">
            <Image
              src="/logo7.png"
              alt="Austin Creative Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Menu - Right */}
          <div className="flex space-x-2 md:space-x-8 text-xs md:text-base">
            <a href="#projects" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>PROJECTS</a>
            <a href="/about" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">ABOUT</a>
            <a href="/music" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">MUSIC</a>
            <a href="#contact" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>CONTACT</a>
          </div>
        </nav>
        
        {/* Music Player */}
        <MusicPlayerOverlay />
        
        {/* Content */}
        <div className="p-8">
        {/* Wave Animation */}
        <div className="w-full h-32 mb-8">
          <WaveAnimation />
        </div>
      
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