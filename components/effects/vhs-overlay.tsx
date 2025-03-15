"use client"

import { useEffect, useState, useRef } from "react"

export default function VhsOverlay() {
  const [offset, setOffset] = useState(0)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  // Use requestAnimationFrame for smoother animations
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      // Add random jitter occasionally
      if (Math.random() > 0.98) {
        setOffset(Math.random() * 6 - 3)
      } else if (Math.random() > 0.95) {
        setOffset(0)
      }
    }

    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Color bleeding effect */}
      <div
        className="absolute inset-0 pointer-events-none z-30 mix-blend-screen will-change-transform"
        style={{
          background: "linear-gradient(90deg, rgba(255,0,0,0.1) 0%, rgba(0,255,0,0.1) 50%, rgba(0,0,255,0.1) 100%)",
          transform: `translateY(${offset}px)`,
          transition: offset === 0 ? "transform 0.5s ease-out" : "none",
        }}
      />

      {/* VHS artifacts - using CSS background instead of SVG for better performance */}
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-30"
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent 97%, rgba(255,255,255,0.1) 98%, transparent 100%)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* Occasional horizontal glitch line - only show sometimes */}
      {Math.random() > 0.7 && (
        <div
          className="absolute left-0 right-0 h-px bg-white/50 pointer-events-none z-40 will-change-transform"
          style={{
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
          }}
        />
      )}
    </>
  )
}

