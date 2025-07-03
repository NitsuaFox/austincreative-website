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
    <div className="w-full bg-black border-t border-gray-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
          {/* Song info and controls */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-white font-semibold truncate flex-1">
              {currentSong.title} - {currentSong.artist}
            </div>
            <button
              onClick={onStop}
              className="text-gray-400 hover:text-white transition-colors ml-4"
            >
              ✕
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mb-3">
            <div 
              className="w-full bg-gray-700 rounded-full h-2 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="bg-white h-2 rounded-full transition-all duration-100"
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
              className="w-12 h-12 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}