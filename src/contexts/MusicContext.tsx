'use client'

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'

interface Song {
  title: string
  artist: string
  filename: string
}

interface MusicContextType {
  currentSong: Song | null
  isPlaying: boolean
  progress: number
  duration: number
  playSong: (song: Song) => void
  pauseSong: () => void
  resumeSong: () => void
  stopSong: () => void
  seekTo: (time: number) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress(audio.currentTime)
    }

    const updateDuration = () => {
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSong])

  const playSong = (song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    const audio = new Audio(`/music/${song.filename}`)
    audioRef.current = audio
    setCurrentSong(song)
    setIsPlaying(true)
    setProgress(0)
    
    audio.play().catch(console.error)
  }

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resumeSong = () => {
    if (audioRef.current && currentSong) {
      audioRef.current.play().catch(console.error)
      setIsPlaying(true)
    }
  }

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setCurrentSong(null)
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  return (
    <MusicContext.Provider value={{
      currentSong,
      isPlaying,
      progress,
      duration,
      playSong,
      pauseSong,
      resumeSong,
      stopSong,
      seekTo
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}