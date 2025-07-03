'use client'

import { useEffect, useRef, useState } from 'react'

export default function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isOver: false })

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

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isOver: true
      })
    }

    const handleMouseLeave = () => {
      setMousePos(prev => ({ ...prev, isOver: false }))
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

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
        
        // Create smooth wave with mouse interaction
        for (let x = 0; x <= width; x += 2) {
          let y = height / 2 + 
                  wave.amplitude * Math.sin(wave.frequency * x + wave.offset) * 
                  Math.sin(time * speed + wave.offset)
          
          // Mouse influence
          if (mousePos.isOver) {
            const distanceToMouse = Math.abs(x - mousePos.x)
            const maxInfluence = 150 // pixels
            
            if (distanceToMouse < maxInfluence) {
              const influence = (maxInfluence - distanceToMouse) / maxInfluence
              const mouseInfluence = (mousePos.y - height / 2) * influence * wave.sensitivity * 0.3
              
              // Add some ripple effect
              const ripple = Math.sin(distanceToMouse * 0.1 - time * 0.1) * influence * 10
              
              y += mouseInfluence + ripple
            }
          }
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()
      })
      
      // Draw mouse interaction indicator (subtle glow)
      if (mousePos.isOver) {
        const gradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, 50
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(mousePos.x - 50, mousePos.y - 50, 100, 100)
      }
      
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
        className="w-full h-full cursor-none"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}