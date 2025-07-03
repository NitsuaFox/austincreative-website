'use client'

import { useState } from 'react'

interface Project {
  title: string
  category: string
  description: string
  date: string
  url: string
}

const projects: Project[] = [
  {
    title: "Blockfall",
    category: "Game",
    description: "Puzzle game",
    date: "2nd July 2025",
    url: "https://blockfall.austincreative.uk"
  },
  {
    title: "Island Maths",
    category: "Game", 
    description: "Educational math game",
    date: "June 2023",
    url: "https://philipaustin.itch.io/island-maths"
  }
]

export default function ProjectList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  // Get unique categories
  const categories = Array.from(new Set(projects.map(project => project.category)))
  
  // Filter projects based on selected categories
  const filteredProjects = selectedCategories.length === 0 
    ? projects 
    : projects.filter(project => selectedCategories.includes(project.category))
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    )
  }

  return (
    <div id="projects" className="mb-12">
      {/* Category Filters */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Filter by Category:</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-white bg-gray-700 border-gray-600 rounded focus:ring-white focus:ring-2"
              />
              <span className="text-white">{category}</span>
            </label>
          ))}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="text-gray-400 hover:text-white transition-colors text-sm underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

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
        {filteredProjects.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No projects match the selected filters.
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <div key={index}>
              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b border-gray-700">
                <div className="font-semibold text-white">{project.title}</div>
                <div className="text-gray-400">{project.category}</div>
                <div className="text-gray-400">{project.description}</div>
                <div className="text-gray-400">{project.date}</div>
                <div>
                  <a 
                    href={project.url} 
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
                <div className="font-semibold text-white">{project.title}</div>
                <div className="text-gray-400">{project.category}</div>
                <div className="text-gray-400 text-sm">{project.date}</div>
                <div>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-400 transition-colors"
                  >
                    Visit →
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}