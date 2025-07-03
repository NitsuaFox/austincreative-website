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
    const amplitude = 15
    const frequency = 0.01
    const speed = 0.02

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      
      // Draw wave
      ctx.beginPath()
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      
      // Create smooth wave using sine function
      for (let x = 0; x <= width; x++) {
        const y = height / 2 + amplitude * Math.sin(frequency * x + time)
        
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      
      // Update time for animation
      time += speed
      
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
    <div className="w-full h-16 my-8">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}