'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MusicList from '../../components/MusicList'
import MusicPlayerOverlay from '../../components/MusicPlayerOverlay'
import WaveAnimation from '../../components/WaveAnimation'

export default function Music() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-gray-800">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto bg-black min-h-screen">
        {/* Hero Navigation Bar */}
        <nav className="flex items-center justify-between p-4 md:p-6">
          {/* Logo - Left */}
          <Link href="/">
            <div className="w-24 h-24 md:w-40 md:h-40 relative cursor-pointer flex-shrink-0">
              <Image
                src="/logo7.png"
                alt="Austin Creative Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Menu - Right */}
          <div className="flex space-x-2 md:space-x-8 text-xs md:text-base">
            <button onClick={() => { router.push('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">PROJECTS</button>
            <Link href="/about" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">ABOUT</Link>
            <Link href="/music" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">MUSIC</Link>
            <button onClick={() => { router.push('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">CONTACT</button>
          </div>
        </nav>
        
        {/* Wave Animation - Fixed Height */}
        <div className="w-full h-32">
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
      </div>
    </main>
  )
}