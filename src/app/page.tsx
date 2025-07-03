import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-64 h-64 mx-auto mb-4 relative">
          <Image
            src="/logo4.png"
            alt="Austin Creative Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Intro */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-black mb-4">
          Hello, I&apos;m Phil
        </h1>
        <p className="text-gray-600">
          Here&apos;s some stuff I made
        </p>
      </div>
      
      {/* Projects */}
      <div className="mb-12">
        {/* Headers */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b-2 border-gray-300 font-semibold text-black">
          <div>Title</div>
          <div>Category</div>
          <div>Description</div>
          <div>Date Added</div>
          <div>URL</div>
        </div>
        
        {/* Project List */}
        <div className="space-y-0">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200">
            <div className="font-semibold text-black">Blockfall</div>
            <div className="text-gray-600">Game</div>
            <div className="text-gray-600">Puzzle game</div>
            <div className="text-gray-600">2nd July 2025</div>
            <div>
              <a 
                href="https://blockfall.austincreative.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600 transition-colors"
              >
                Visit →
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Links */}
      <div className="text-center">
        <div className="flex justify-center space-x-6">
          <a 
            href="mailto:hello@austincreative.uk" 
            className="text-black hover:text-gray-600 transition-colors"
          >
            Email
          </a>
          <a 
            href="https://github.com/nitsuafox" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}