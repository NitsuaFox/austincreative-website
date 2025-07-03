import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-black">Austin Creative</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-black hover:text-gray-600 transition-colors">Home</a>
              <a href="#projects" className="text-black hover:text-gray-600 transition-colors">Projects</a>
              <a href="#about" className="text-black hover:text-gray-600 transition-colors">About</a>
              <a href="#contact" className="text-black hover:text-gray-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main logo/image */}
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto mb-8 relative">
              <Image
                src="/logo.png"
                alt="Austin Creative Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Discover the magic of creation
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Boundless creativity, unique digital experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#projects" 
              className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              View My Projects
            </a>
            <a 
              href="#about" 
              className="border-2 border-black text-black px-8 py-4 rounded-lg hover:bg-black hover:text-white transition-colors font-semibold"
            >
              About Me
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blockfall Project */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">Blockfall</h3>
                <p className="text-gray-600 mb-4">
                  An engaging puzzle game built with modern web technologies.
                </p>
                <a 
                  href="https://blockfall.austincreative.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black font-semibold hover:text-gray-600 transition-colors"
                >
                  Visit Project →
                </a>
              </div>
            </div>

            {/* Placeholder Projects */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">Project Two</h3>
                <p className="text-gray-600 mb-4">
                  Description of your next amazing project.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-black font-semibold hover:text-gray-600 transition-colors"
                >
                  Coming Soon →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">Project Three</h3>
                <p className="text-gray-600 mb-4">
                  Another creative project showcase.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-black font-semibold hover:text-gray-600 transition-colors"
                >
                  Coming Soon →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            About Austin Creative
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            I&apos;m a creative developer and designer passionate about building unique digital experiences. 
            With a focus on clean design and innovative technology, I create projects that blend 
            artistry with functionality.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            From interactive games to web applications, I enjoy exploring the intersection of 
            creativity and code to bring ideas to life.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Interested in working together or have a project in mind?
          </p>
          <a 
            href="mailto:hello@austincreative.uk" 
            className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold inline-block"
          >
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Austin Creative UK. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}