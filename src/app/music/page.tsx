import Image from 'next/image'
import Link from 'next/link'
import MusicList from '../../components/MusicList'
import MusicPlayerOverlay from '../../components/MusicPlayerOverlay'

export default function Music() {
  return (
    <main className="min-h-screen bg-gray-800">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto bg-black min-h-screen">
        {/* Hero Navigation Bar */}
        <nav className="flex items-center justify-between p-6">
          {/* Logo - Left */}
          <Link href="/">
            <div className="w-40 h-40 relative cursor-pointer">
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
          <div className="flex space-x-8">
            <Link href="/#projects" className="text-white hover:text-gray-400 transition-colors">PROJECTS</Link>
            <Link href="/about" className="text-white hover:text-gray-400 transition-colors">ABOUT</Link>
            <Link href="/music" className="text-white hover:text-gray-400 transition-colors">MUSIC</Link>
            <Link href="/#contact" className="text-white hover:text-gray-400 transition-colors">CONTACT</Link>
          </div>
        </nav>
        
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