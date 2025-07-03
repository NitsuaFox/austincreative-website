'use client'

import { useEffect, useRef, useState } from 'react'

interface Pluck {
  x: number
  waveIndex: number
  amplitude: number
  time: number
  decay: number
}

export default function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isOver: false })
  const plucksRef = useRef<Pluck[]>([])
  const lastMousePos = useRef({ x: 0, y: 0 })

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

    // Multiple wave layers with different colors and properties
    const waves = [
      { amplitude: 12, frequency: 0.02, color: '#FF6B6B', opacity: 0.7, offset: 0, sensitivity: 1.2 },
      { amplitude: 8, frequency: 0.025, color: '#4ECDC4', opacity: 0.6, offset: Math.PI / 3, sensitivity: 0.8 },
      { amplitude: 15, frequency: 0.015, color: '#45B7D1', opacity: 0.5, offset: Math.PI / 2, sensitivity: 1.5 },
      { amplitude: 10, frequency: 0.03, color: '#96CEB4', opacity: 0.6, offset: Math.PI, sensitivity: 1.0 },
      { amplitude: 6, frequency: 0.035, color: '#FFEAA7', opacity: 0.8, offset: Math.PI * 1.5, sensitivity: 0.9 }
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
      if (mousePos.isOver) {
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
      }
      
      lastMousePos.current = { x: newMousePos.x, y: newMousePos.y }
      setMousePos(newMousePos)
    }

    const handleMouseLeave = () => {
      setMousePos(prev => ({ ...prev, isOver: false }))
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

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
      
      // Draw multiple wave layers
      waves.forEach((wave, waveIndex) => {
        ctx.beginPath()
        ctx.strokeStyle = wave.color
        ctx.globalAlpha = wave.opacity
        ctx.lineWidth = 2 + waveIndex * 0.5
        ctx.lineCap = 'round'
        
        // Create smooth wave with pluck effects
        for (let x = 0; x <= width; x += 2) {
          let y = height / 2 + 
                  wave.amplitude * Math.sin(wave.frequency * x + wave.offset) * 
                  Math.sin(time * speed + wave.offset)
          
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos])

  return (
    <div className="w-full h-20 my-8">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}