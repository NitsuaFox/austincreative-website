'use client'

import { useState, useRef, useEffect } from 'react'

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
  },
  {
    title: "Print Excellent",
    category: "Shop",
    description: "Etsy 3D Print Shop",
    date: "1st June 2019",
    url: "https://www.etsy.com/shop/PrintExcellent"
  }
]

export default function ProjectList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'none' | 'title' | 'category' | 'date'>('none')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Get unique categories
  const categories = Array.from(new Set(projects.map(project => project.category)))
  
  // Filter and sort projects
  let processedProjects = selectedCategories.length === 0 
    ? projects 
    : projects.filter(project => selectedCategories.includes(project.category))
  
  // Apply sorting
  if (sortBy !== 'none') {
    processedProjects = [...processedProjects].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'category':
          return a.category.localeCompare(b.category)
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        default:
          return 0
      }
    })
  }
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    )
    setOpenDropdown(null)
  }
  
  const handleSort = (field: 'title' | 'category' | 'date') => {
    setSortBy(field)
    setOpenDropdown(null)
  }
  
  const clearFilters = () => {
    setSelectedCategories([])
    setSortBy('none')
    setOpenDropdown(null)
  }
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const DropdownMenu = ({ column, items }: { column: string, items: { label: string, action: () => void }[] }) => (
    <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 min-w-32">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
        >
          {item.label}
        </button>
      ))}
    </div>
  )

  return (
    <div id="projects" className="mb-12" ref={dropdownRef}>
      {/* Active Filters Display */}
      {(selectedCategories.length > 0 || sortBy !== 'none') && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-400">Active:</span>
          {selectedCategories.map(category => (
            <span key={category} className="bg-gray-700 text-white px-2 py-1 rounded text-sm">
              {category}
            </span>
          ))}
          {sortBy !== 'none' && (
            <span className="bg-gray-700 text-white px-2 py-1 rounded text-sm">
              Sorted by {sortBy}
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-gray-400 hover:text-white transition-colors text-sm underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Headers - Desktop */}
      <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b-2 border-gray-600 font-semibold text-white">
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'title' ? null : 'title')}
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
          >
            <span>Title</span>
            <span className="text-xs">▼</span>
          </button>
          {openDropdown === 'title' && (
            <DropdownMenu
              column="title"
              items={[
                { label: 'Sort A-Z', action: () => handleSort('title') }
              ]}
            />
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
          >
            <span>Category</span>
            <span className="text-xs">▼</span>
          </button>
          {openDropdown === 'category' && (
            <DropdownMenu
              column="category"
              items={[
                { label: 'Sort A-Z', action: () => handleSort('category') },
                ...categories.map(category => ({
                  label: `Filter: ${category}`,
                  action: () => toggleCategory(category)
                }))
              ]}
            />
          )}
        </div>
        <div>Description</div>
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
          >
            <span>Date Added</span>
            <span className="text-xs">▼</span>
          </button>
          {openDropdown === 'date' && (
            <DropdownMenu
              column="date"
              items={[
                { label: 'Sort by Date', action: () => handleSort('date') }
              ]}
            />
          )}
        </div>
        <div>URL</div>
      </div>
      
      {/* Headers - Mobile */}
      <div className="md:hidden grid grid-cols-4 gap-4 p-4 border-b-2 border-gray-600 font-semibold text-white">
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'title-mobile' ? null : 'title-mobile')}
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors text-sm"
          >
            <span>Title</span>
            <span className="text-xs">▼</span>
          </button>
          {openDropdown === 'title-mobile' && (
            <DropdownMenu
              column="title-mobile"
              items={[
                { label: 'Sort A-Z', action: () => handleSort('title') }
              ]}
            />
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'category-mobile' ? null : 'category-mobile')}
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors text-sm"
          >
            <span>Category</span>
            <span className="text-xs">▼</span>
          </button>
          {openDropdown === 'category-mobile' && (
            <DropdownMenu
              column="category-mobile"
              items={[
                { label: 'Sort A-Z', action: () => handleSort('category') },
                ...categories.map(category => ({
                  label: `Filter: ${category}`,
                  action: () => toggleCategory(category)
                }))
              ]}
            />
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'date-mobile' ? null : 'date-mobile')}
            className="flex items-center space-x-1 hover:text-gray-300 transition-colors text-sm"
          >
            <span>Date</span>
            <span className="text-xs">▼</span>
          </button>
          {openDropdown === 'date-mobile' && (
            <DropdownMenu
              column="date-mobile"
              items={[
                { label: 'Sort by Date', action: () => handleSort('date') }
              ]}
            />
          )}
        </div>
        <div>URL</div>
      </div>
      
      {/* Project List */}
      <div className="space-y-0">
        {processedProjects.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No projects match the selected filters.
          </div>
        ) : (
          processedProjects.map((project, index) => (
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