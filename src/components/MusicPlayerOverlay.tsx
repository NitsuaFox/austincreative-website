'use client'

import { useMusic } from '../contexts/MusicContext'
import GlobalMusicPlayer from './GlobalMusicPlayer'

export default function MusicPlayerOverlay() {
  const { currentSong, isPlaying, progress, duration, pauseSong, resumeSong, stopSong, seekTo } = useMusic()

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong()
    } else {
      resumeSong()
    }
  }

  return (
    <GlobalMusicPlayer
      currentSong={currentSong}
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onStop={stopSong}
      progress={progress}
      duration={duration}
      onSeek={seekTo}
    />
  )
}