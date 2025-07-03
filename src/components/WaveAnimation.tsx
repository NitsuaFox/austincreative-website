'use client'

import { useEffect, useRef, useState } from 'react'
import { useMusic } from '../contexts/MusicContext'

interface Pluck {
  x: number
  waveIndex: number
  amplitude: number
  time: number
  decay: number
}

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  gravity: number
}

export default function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isOver: false })
  const plucksRef = useRef<Pluck[]>([])
  const dotsRef = useRef<Dot[]>([])
  const lastMousePos = useRef({ x: 0, y: 0 })
  const { audioData, isPlaying } = useMusic()
  
  // Debug audio data
  useEffect(() => {
    if (isPlaying && audioData.length > 0) {
      const maxValue = Math.max(...audioData)
      if (maxValue > 0.01) {
        console.log('Audio data detected:', maxValue, audioData.slice(0, 5))
      }
    }
  }, [audioData, isPlaying])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Wave parameters
    let time = 0
    const speed = 0.03

    // Multiple wave layers with different colors and properties - each wave gets its own frequency band
    const waves = [
      { amplitude: 12, frequency: 0.02, color: '#FF6B6B', opacity: 0.7, offset: 0, sensitivity: 1.2, freqRange: [0, 12] },       // Red - Deep bass & bass
      { amplitude: 8, frequency: 0.025, color: '#4ECDC4', opacity: 0.6, offset: Math.PI / 3, sensitivity: 0.8, freqRange: [12, 24] },  // Teal - Low-mid
      { amplitude: 15, frequency: 0.015, color: '#45B7D1', opacity: 0.5, offset: Math.PI / 2, sensitivity: 1.5, freqRange: [24, 36] }, // Blue - Mid
      { amplitude: 10, frequency: 0.03, color: '#96CEB4', opacity: 0.6, offset: Math.PI, sensitivity: 1.0, freqRange: [36, 48] },      // Green - High-mid
      { amplitude: 6, frequency: 0.035, color: '#FFEAA7', opacity: 0.8, offset: Math.PI * 1.5, sensitivity: 0.9, freqRange: [48, 64] } // Yellow - Highs
    ]

    // Mouse tracking with pluck detection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const newMousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isOver: true
      }
      
      // Detect when cursor crosses through wave lines
      const mouseDelta = Math.abs(newMousePos.x - lastMousePos.current.x)
      const mouseSpeed = mouseDelta
      
      // Only pluck if mouse is moving with some speed
      if (mouseSpeed > 2) {
        waves.forEach((wave, waveIndex) => {
          // Calculate where this wave would be at mouse X position
          const waveY = canvas.offsetHeight / 2 + 
                       wave.amplitude * Math.sin(wave.frequency * newMousePos.x + wave.offset) * 
                       Math.sin(time * speed + wave.offset)
          
          // Check if cursor is near this wave line
          const distanceToWave = Math.abs(newMousePos.y - waveY)
          
          if (distanceToWave < 15) { // Close enough to "pluck"
            // Create a pluck effect
            plucksRef.current.push({
              x: newMousePos.x,
              waveIndex,
              amplitude: (mouseSpeed * 0.5 + 10) * wave.sensitivity,
              time: 0,
              decay: 0.95
            })
          }
        })
      }
      
      lastMousePos.current = { x: newMousePos.x, y: newMousePos.y }
      setMousePos(newMousePos)
    }

    const handleMouseLeave = () => {
      setMousePos(prev => ({ ...prev, isOver: false }))
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top
      
      // Random color from wave colors
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      
      // Create a new dot
      dotsRef.current.push({
        x: clickX,
        y: clickY,
        vx: (Math.random() - 0.5) * 2, // Small random horizontal velocity
        vy: Math.random() * -2 - 1, // Initial upward velocity
        color: randomColor,
        size: 4 + Math.random() * 4, // Random size between 4-8px
        gravity: 0.3 + Math.random() * 0.1 // Increased gravity
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      
      // Update and clean up plucks
      plucksRef.current = plucksRef.current.filter(pluck => {
        pluck.time += 1
        pluck.amplitude *= pluck.decay
        return pluck.amplitude > 0.5 // Remove very small plucks
      })
      
      // Update dots physics
      dotsRef.current = dotsRef.current.filter(dot => {
        // Store previous position for collision detection
        const prevY = dot.y
        
        // Apply gravity
        dot.vy += dot.gravity
        
        // Update position
        dot.x += dot.vx
        dot.y += dot.vy
        
        // Calculate wave height at dot's current X position including pluck effects
        let waveHeightAtDot = height / 2
        let totalWaveForce = 0
        
        waves.forEach((wave, waveIndex) => {
          let waveY = wave.amplitude * Math.sin(wave.frequency * dot.x + wave.offset) * 
                     Math.sin(time * speed + wave.offset)
          
          // Add pluck effects to this wave
          let pluckEffect = 0
          plucksRef.current.forEach(pluck => {
            if (pluck.waveIndex === waveIndex) {
              const distanceFromPluck = Math.abs(dot.x - pluck.x)
              const maxDistance = 100
              
              if (distanceFromPluck < maxDistance) {
                const influence = (maxDistance - distanceFromPluck) / maxDistance
                const vibration = pluck.amplitude * influence * 
                                Math.sin(pluck.time * 0.3) * 
                                Math.exp(-distanceFromPluck * 0.02)
                pluckEffect += vibration
                
                // Calculate force from pluck vibration on dot
                const pluckForce = vibration * influence * 0.05
                totalWaveForce += pluckForce
              }
            }
          })
          
          waveY += pluckEffect
          waveHeightAtDot += waveY
        })
        
        // Apply wave forces to dot velocity (pluck effects push dots around)
        if (Math.abs(totalWaveForce) > 0.1) {
          dot.vy += totalWaveForce * 0.3 // Vertical force from wave vibrations
          dot.vx += totalWaveForce * 0.1 // Small horizontal force too
        }
        
        // Enhanced collision detection - prevent passing through waves
        const dotBottom = dot.y + dot.size / 2
        const dotTop = dot.y - dot.size / 2
        
        // Check if dot is crossing through or below the wave surface
        if (dotBottom >= waveHeightAtDot) {
          // If the dot was above the wave in the previous frame and is now below,
          // it's trying to pass through - place it exactly on the surface
          if (prevY + dot.size / 2 < waveHeightAtDot) {
            dot.y = waveHeightAtDot - dot.size / 2
            dot.vy = -Math.abs(dot.vy) * 0.7 // Bounce with energy loss
            dot.vx *= 0.9 // Friction when bouncing
          } else {
            // Dot is resting on or sliding along the wave
            dot.y = waveHeightAtDot - dot.size / 2
            if (dot.vy > 0) { // Only reverse if moving downward
              dot.vy = -Math.abs(dot.vy) * 0.7
            }
            dot.vx *= 0.95 // Slight friction when on surface
          }
        }
        
        // Additional check: if dot somehow gets below the wave, force it back up
        if (dot.y + dot.size / 2 > waveHeightAtDot) {
          dot.y = waveHeightAtDot - dot.size / 2
          dot.vy = Math.min(dot.vy, -1) // Ensure upward velocity
        }
        
        // Cull dots that are off screen
        return dot.x > -20 && dot.x < width + 20 && dot.y < height + 50
      })
      
      // Draw multiple wave layers
      waves.forEach((wave, waveIndex) => {
        ctx.beginPath()
        ctx.strokeStyle = wave.color
        ctx.globalAlpha = wave.opacity
        ctx.lineWidth = 2 + waveIndex * 0.5
        ctx.lineCap = 'round'
        
        // Calculate audio influence for this wave based on its frequency range
        let audioInfluence = 0
        if (isPlaying && audioData.length > 0) {
          const [startFreq, endFreq] = wave.freqRange
          let sum = 0
          for (let i = startFreq; i < Math.min(endFreq, audioData.length); i++) {
            sum += audioData[i]
          }
          // Scale influence for each dedicated frequency range - boost sensitivity
          let baseScale
          if (waveIndex === 0) baseScale = 150 // Red wave (deep bass & bass) - very high
          else if (waveIndex === 1) baseScale = 120  // Teal wave (low-mid) - high
          else if (waveIndex === 2) baseScale = 100  // Blue wave (mid) - medium-high
          else if (waveIndex === 3) baseScale = 130  // Green wave (high-mid) - high
          else baseScale = 140 // Yellow wave (highs) - very high
          
          audioInfluence = (sum / (endFreq - startFreq)) * baseScale
        }
        
        // Create smooth wave with pluck effects and audio reactivity
        for (let x = 0; x <= width; x += 1) {
          // Base wave animation (always present)
          let y = height / 2 + 
                  wave.amplitude * Math.sin(wave.frequency * x + wave.offset) * 
                  Math.sin(time * speed + wave.offset)
          
          // Add audio reactivity on top of base animation - make each frequency band affect different parts of the wave
          if (audioInfluence > 0) {
            const freqPosition = (x / width) * (wave.freqRange[1] - wave.freqRange[0]) + wave.freqRange[0]
            const freqIndex = Math.floor(freqPosition)
            if (freqIndex < audioData.length) {
              // Smooth interpolation between frequency bins to avoid jumps
              const freqStrength1 = audioData[freqIndex] || 0
              const freqStrength2 = audioData[Math.min(freqIndex + 1, audioData.length - 1)] || 0
              const t = freqPosition - freqIndex
              const smoothFreqStrength = freqStrength1 * (1 - t) + freqStrength2 * t
              
              // Layer audio effect on top of base wave, don't replace it
              // Make bass more prominent and responsive
              const responsiveness = waveIndex === 0 ? 0.8 : 0.5 // Bass wave gets higher responsiveness
              // Use smoother sine wave modulation to avoid harsh transitions - increase sensitivity
              const audioEffect = smoothFreqStrength * audioInfluence * Math.sin(time * 0.02 + x * 0.005) * responsiveness * 0.6
              y += audioEffect
            }
          }
          
          // Apply pluck effects for this wave
          plucksRef.current.forEach(pluck => {
            if (pluck.waveIndex === waveIndex) {
              const distanceFromPluck = Math.abs(x - pluck.x)
              const maxDistance = 100
              
              if (distanceFromPluck < maxDistance) {
                // Guitar string vibration: oscillation that decays with distance and time
                const influence = (maxDistance - distanceFromPluck) / maxDistance
                const vibration = pluck.amplitude * influence * 
                                Math.sin(pluck.time * 0.3) * 
                                Math.exp(-distanceFromPluck * 0.02) // Exponential decay with distance
                
                y += vibration
              }
            }
          })
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()
      })
      
      // Draw dots
      dotsRef.current.forEach(dot => {
        ctx.beginPath()
        ctx.fillStyle = dot.color
        ctx.globalAlpha = 0.8
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add a subtle glow effect
        ctx.beginPath()
        ctx.fillStyle = dot.color
        ctx.globalAlpha = 0.3
        ctx.arc(dot.x, dot.y, dot.size + 2, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // Reset alpha
      ctx.globalAlpha = 1
      
      // Update time for animation
      time += 1
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioData, isPlaying])

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}