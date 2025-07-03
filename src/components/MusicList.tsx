'use client'

import { useState, useRef } from 'react'

interface Song {
  title: string
  artist: string
  remixed: boolean
  date: string
  filename: string
}

const songs: Song[] = [
  {
    title: "True Love",
    artist: "Philip Austin",
    remixed: true,
    date: "1st June 2011",
    filename: "truelove.mp3"
  }
]

export default function MusicList() {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  const playPause = (filename: string) => {
    const audio = audioRefs.current[filename]
    
    if (currentPlaying && currentPlaying !== filename) {
      // Stop currently playing song
      const currentAudio = audioRefs.current[currentPlaying]
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }
    }

    if (currentPlaying === filename) {
      // Pause current song
      if (audio) {
        audio.pause()
        setCurrentPlaying(null)
      }
    } else {
      // Play new song
      if (audio) {
        audio.play()
        setCurrentPlaying(filename)
      }
    }
  }

  const handleAudioEnd = (filename: string) => {
    setCurrentPlaying(null)
  }

  return (
    <div className="mb-12">
      {/* Headers - Desktop */}
      <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b-2 border-gray-600 font-semibold text-white">
        <div>Title</div>
        <div>Artist</div>
        <div>Remixed</div>
        <div>Date</div>
        <div>Play</div>
      </div>
      
      {/* Headers - Mobile */}
      <div className="md:hidden grid grid-cols-4 gap-4 p-4 border-b-2 border-gray-600 font-semibold text-white">
        <div>Title</div>
        <div>Artist</div>
        <div>Date</div>
        <div>Play</div>
      </div>
      
      {/* Music List */}
      <div className="space-y-0">
        {songs.map((song, index) => (
          <div key={index}>
            {/* Hidden audio elements */}
            <audio
              ref={(el) => {
                if (el) audioRefs.current[song.filename] = el
              }}
              onEnded={() => handleAudioEnd(song.filename)}
              preload="metadata"
            >
              <source src={`/music/${song.filename}`} type="audio/mpeg" />
            </audio>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b border-gray-700">
              <div className="font-semibold text-white">{song.title}</div>
              <div className="text-gray-400">{song.artist}</div>
              <div className="text-gray-400">{song.remixed ? 'Yes' : 'No'}</div>
              <div className="text-gray-400">{song.date}</div>
              <div>
                <button
                  onClick={() => playPause(song.filename)}
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors font-semibold"
                >
                  {currentPlaying === song.filename ? '⏸️ Pause' : '▶️ Play'}
                </button>
              </div>
            </div>
            
            {/* Mobile Layout */}
            <div className="md:hidden grid grid-cols-4 gap-4 p-4 border-b border-gray-700">
              <div className="font-semibold text-white">{song.title}</div>
              <div className="text-gray-400">{song.artist}</div>
              <div className="text-gray-400 text-sm">{song.date}</div>
              <div>
                <button
                  onClick={() => playPause(song.filename)}
                  className="bg-white text-black px-2 py-1 rounded hover:bg-gray-200 transition-colors font-semibold text-sm"
                >
                  {currentPlaying === song.filename ? '⏸️' : '▶️'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}