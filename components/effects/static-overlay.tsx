"use client"

import { useEffect, useRef } from "react"

interface StaticOverlayProps {
  intensity?: number
}

export default function StaticOverlay({ intensity = 0.1 }: StaticOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Pre-generate static noise pattern
    const offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height)
    const offscreenCtx = offscreenCanvas.getContext("2d")

    if (offscreenCtx) {
      // Draw random noise to offscreen canvas
      for (let i = 0; i < (canvas.width * canvas.height * intensity) / 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2 + 1

        offscreenCtx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
        offscreenCtx.fillRect(x, y, size, size)
      }
    }

    // Draw static noise at a lower frame rate
    let frameCount = 0
    const drawStatic = () => {
      if (!ctx) return

      frameCount++

      // Only update every 3 frames for better performance
      if (frameCount % 3 === 0) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw pre-generated noise with slight offset for movement effect
        const offsetX = Math.random() * 10 - 5
        const offsetY = Math.random() * 10 - 5
        ctx.drawImage(offscreenCanvas, offsetX, offsetY)
      }

      requestAnimationFrame(drawStatic)
    }

    const animationId = requestAnimationFrame(drawStatic)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [intensity])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" style={{ opacity: intensity * 2 }} />
  )
}

