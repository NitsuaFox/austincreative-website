import Image from 'next/image'
import WaveAnimation from '../components/WaveAnimation'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Navigation Bar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        {/* Logo - Left */}
        <div className="w-24 h-24 relative">
          <Image
            src="/logo7.png"
            alt="Austin Creative Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Menu - Right */}
        <div className="flex space-x-8">
          <a href="#projects" className="text-white hover:text-gray-400 transition-colors">Projects</a>
          <a href="#about" className="text-white hover:text-gray-400 transition-colors">About</a>
          <a href="#contact" className="text-white hover:text-gray-400 transition-colors">Contact</a>
        </div>
      </nav>
      
      {/* Content */}
      <div className="p-8 max-w-4xl mx-auto">
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
      <div id="projects" className="mb-12">
        {/* Headers - Desktop */}
        <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b-2 border-gray-600 font-semibold text-white">
          <div>Title</div>
          <div>Category</div>
          <div>Description</div>
          <div>Date Added</div>
          <div>URL</div>
        </div>
        
        {/* Headers - Mobile */}
        <div className="md:hidden grid grid-cols-4 gap-4 p-4 border-b-2 border-gray-600 font-semibold text-white">
          <div>Title</div>
          <div>Category</div>
          <div>Date</div>
          <div>URL</div>
        </div>
        
        {/* Project List */}
        <div className="space-y-0">
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b border-gray-700">
            <div className="font-semibold text-white">Blockfall</div>
            <div className="text-gray-400">Game</div>
            <div className="text-gray-400">Puzzle game</div>
            <div className="text-gray-400">2nd July 2025</div>
            <div>
              <a 
                href="https://blockfall.austincreative.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
              >
                Visit →
              </a>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden grid grid-cols-4 gap-4 p-4 border-b border-gray-700">
            <div className="font-semibold text-white">Blockfall</div>
            <div className="text-gray-400">Game</div>
            <div className="text-gray-400 text-sm">2nd July 2025</div>
            <div>
              <a 
                href="https://blockfall.austincreative.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
              >
                Visit →
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Links */}
      <div id="contact" className="text-center">
        <div className="flex justify-center">
          <a 
            href="mailto:hello@austincreative.uk" 
            className="text-white hover:text-gray-400 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
      </div>
    </main>
  )
}