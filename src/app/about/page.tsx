import Image from 'next/image'
import Link from 'next/link'
import MusicPlayerOverlay from '../../components/MusicPlayerOverlay'

export default function About() {
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
            <Link href="/" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">PROJECTS</Link>
            <Link href="/about" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">ABOUT</Link>
            <Link href="/music" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">MUSIC</Link>
            <Link href="/" className="text-white hover:text-gray-400 transition-colors whitespace-nowrap">CONTACT</Link>
          </div>
        </nav>
        
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
              href="/#projects" 
              className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold inline-block"
            >
              View My Projects
            </Link>
          </div>
        </div>
        </div>
      </div>
    </main>
  )
}