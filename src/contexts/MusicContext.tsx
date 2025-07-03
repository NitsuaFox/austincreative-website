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
  audioData: number[]
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
  const [audioData, setAudioData] = useState<number[]>(new Array(32).fill(0))
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationRef = useRef<number>()

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
    
    // Set up Web Audio API for frequency analysis
    const setupAudioAnalysis = () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
        
        // Resume context if suspended (required by browsers)
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume()
        }
        
        if (!analyserRef.current) {
          analyserRef.current = audioContextRef.current.createAnalyser()
          analyserRef.current.fftSize = 64 // 32 frequency bins
          analyserRef.current.smoothingTimeConstant = 0.8
        }
        
        // Create source and connect to analyser
        if (sourceRef.current) {
          sourceRef.current.disconnect()
        }
        sourceRef.current = audioContextRef.current.createMediaElementSource(audio)
        sourceRef.current.connect(analyserRef.current)
        analyserRef.current.connect(audioContextRef.current.destination)
        
        console.log('Web Audio API setup complete')
        
        // Start frequency data animation
        const updateFrequencyData = () => {
          if (analyserRef.current) {
            const bufferLength = analyserRef.current.frequencyBinCount
            const dataArray = new Uint8Array(bufferLength)
            analyserRef.current.getByteFrequencyData(dataArray)
            
            // Convert to normalized array (0-1) and smooth the data
            const normalizedData = Array.from(dataArray).map(value => value / 255)
            setAudioData(normalizedData)
            
            animationRef.current = requestAnimationFrame(updateFrequencyData)
          }
        }
        updateFrequencyData()
      } catch (error) {
        console.error('Web Audio API setup failed:', error)
      }
    }
    
    // Set up audio analysis after audio starts playing
    audio.addEventListener('canplay', setupAudioAnalysis, { once: true })
    
    audio.play().catch(console.error)
  }

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const resumeSong = () => {
    if (audioRef.current && currentSong) {
      audioRef.current.play().catch(console.error)
      setIsPlaying(true)
      
      // Resume frequency data animation
      const updateFrequencyData = () => {
        if (analyserRef.current) {
          const bufferLength = analyserRef.current.frequencyBinCount
          const dataArray = new Uint8Array(bufferLength)
          analyserRef.current.getByteFrequencyData(dataArray)
          
          const normalizedData = Array.from(dataArray).map(value => value / 255)
          setAudioData(normalizedData)
          
          animationRef.current = requestAnimationFrame(updateFrequencyData)
        }
      }
      updateFrequencyData()
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
    setAudioData(new Array(32).fill(0))
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
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
      audioData,
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