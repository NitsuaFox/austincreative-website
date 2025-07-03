import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
      {/* Top Left Logo */}
      <div className="absolute top-4 left-4">
        <div className="w-12 h-12 relative">
          <Image
            src="/logo2.png"
            alt="Austin Creative Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Center Logo */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-4 relative">
          <Image
            src="/logo.png"
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
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-black">Blockfall</h3>
              <p className="text-gray-600 text-sm">Puzzle game</p>
            </div>
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