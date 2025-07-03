'use client'

import { useEffect, useRef } from 'react'

export default function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

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
      { amplitude: 12, frequency: 0.02, color: '#FF6B6B', opacity: 0.7, offset: 0 },
      { amplitude: 8, frequency: 0.025, color: '#4ECDC4', opacity: 0.6, offset: Math.PI / 3 },
      { amplitude: 15, frequency: 0.015, color: '#45B7D1', opacity: 0.5, offset: Math.PI / 2 },
      { amplitude: 10, frequency: 0.03, color: '#96CEB4', opacity: 0.6, offset: Math.PI },
      { amplitude: 6, frequency: 0.035, color: '#FFEAA7', opacity: 0.8, offset: Math.PI * 1.5 }
    ]

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      
      // Draw multiple wave layers
      waves.forEach((wave, index) => {
        ctx.beginPath()
        ctx.strokeStyle = wave.color
        ctx.globalAlpha = wave.opacity
        ctx.lineWidth = 2 + index * 0.5
        ctx.lineCap = 'round'
        
        // Create smooth wave - stationary wave that moves up and down
        for (let x = 0; x <= width; x += 2) {
          const y = height / 2 + 
                   wave.amplitude * Math.sin(wave.frequency * x + wave.offset) * 
                   Math.sin(time * speed + wave.offset)
          
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

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