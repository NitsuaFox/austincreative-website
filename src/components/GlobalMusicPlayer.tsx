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

  if (!currentSong) return null

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration
    onSeek(newTime)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-8 pb-4">
      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={onPlayPause}
          className="w-8 h-8 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center flex-shrink-0"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        
        {/* Progress bar - full width */}
        <div 
          className="flex-1 bg-black h-1 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="bg-white h-1 transition-all duration-100"
            style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
          />
        </div>
        
        {/* Song title */}
        <div className="text-white text-sm truncate max-w-xs">
          {currentSong.title} - {currentSong.artist}
        </div>
      </div>
    </div>
  )
}