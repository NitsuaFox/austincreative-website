'use client'

import { useMusic } from '../contexts/MusicContext'

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
  },
  {
    title: "Spanish Girl",
    artist: "Philip Austin feat. Mark Guthrie",
    remixed: true,
    date: "1st June 2025",
    filename: "spanishgirl.mp3"
  },
  {
    title: "Sunshine",
    artist: "Philip Austin",
    remixed: true,
    date: "10th Nov 2010",
    filename: "sunshine.mp3"
  }
]

export default function MusicList() {
  const { currentSong, isPlaying, playSong, pauseSong } = useMusic()

  const handlePlayPause = (song: Song) => {
    if (currentSong?.filename === song.filename && isPlaying) {
      pauseSong()
    } else {
      playSong({
        title: song.title,
        artist: song.artist,
        filename: song.filename
      })
    }
  }

  const isCurrentSong = (filename: string) => currentSong?.filename === filename

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
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b border-gray-700">
              <div className="font-semibold text-white">{song.title}</div>
              <div className="text-gray-400">{song.artist}</div>
              <div className="text-gray-400">{song.remixed ? 'Yes' : 'No'}</div>
              <div className="text-gray-400">{song.date}</div>
              <div>
                <button
                  onClick={() => handlePlayPause(song)}
                  className="w-10 h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center"
                >
                  {isCurrentSong(song.filename) && isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
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
                  onClick={() => handlePlayPause(song)}
                  className="w-8 h-8 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center"
                >
                  {isCurrentSong(song.filename) && isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}