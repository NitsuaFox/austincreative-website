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
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors font-semibold"
                >
                  {isCurrentSong(song.filename) && isPlaying ? '⏸️ Pause' : '▶️ Play'}
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
                  className="bg-white text-black px-2 py-1 rounded hover:bg-gray-200 transition-colors font-semibold text-sm"
                >
                  {isCurrentSong(song.filename) && isPlaying ? '⏸️' : '▶️'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}