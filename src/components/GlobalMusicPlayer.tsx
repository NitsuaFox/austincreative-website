'use client'

import { useState, useRef, useEffect } from 'react'

interface Song {
  title: string
  artist: string
  filename: string
}

interface GlobalMusicPlayerProps {
  currentSong: Song | null
  isPlaying: boolean
  onPlayPause: () => void
  onStop: () => void
  progress: number
  duration: number
  onSeek: (time: number) => void
}

export default function GlobalMusicPlayer({
  currentSong,
  isPlaying,
  onPlayPause,
  onStop,
  progress,
  duration,
  onSeek
}: GlobalMusicPlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  if (!currentSong) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration
    onSeek(newTime)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-gray-900 border border-gray-600 rounded-lg shadow-lg transition-all duration-300 ${
        isMinimized ? 'w-16 h-16' : 'w-80 h-24'
      }`}>
        {isMinimized ? (
          // Minimized view
          <div className="flex items-center justify-center h-full">
            <button
              onClick={() => setIsMinimized(false)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              🎵
            </button>
          </div>
        ) : (
          // Full view
          <div className="p-3">
            {/* Header with minimize button */}
            <div className="flex justify-between items-center mb-2">
              <div className="text-white text-sm font-semibold truncate flex-1">
                {currentSong.title} - {currentSong.artist}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-white transition-colors text-xs"
                >
                  ➖
                </button>
                <button
                  onClick={onStop}
                  className="text-gray-400 hover:text-white transition-colors text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mb-2">
              <div 
                className="w-full bg-gray-700 rounded-full h-1 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="bg-white h-1 rounded-full transition-all duration-100"
                  style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex justify-center">
              <button
                onClick={onPlayPause}
                className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition-colors font-semibold text-sm"
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}