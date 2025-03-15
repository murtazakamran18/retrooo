"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function EasterEggChannel() {
  const [message, setMessage] = useState("")
  const messageIntervalRef = useRef<NodeJS.Timeout>()
  const secretMessage =
    "CONGRATULATIONS! YOU FOUND THE SECRET CHANNEL. THIS PORTFOLIO WAS CREATED WITH LOVE AND NOSTALGIA FOR THE GOLDEN AGE OF TELEVISION. THANK YOU FOR VISITING!"

  useEffect(() => {
    let currentIndex = 0
    let direction = 1
    let scrambleCount = 0

    // Clear any existing interval
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current)
    }

    messageIntervalRef.current = setInterval(() => {
      // Scramble effect
      if (scrambleCount < 5) {
        // Reduced scramble iterations
        const scrambledMessage = secretMessage
          .split("")
          .map((char, i) => {
            if (i < currentIndex) return char
            return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
          })
          .join("")

        setMessage(scrambledMessage)
        scrambleCount++
      } else {
        // Reveal one character at a time
        scrambleCount = 0
        currentIndex += direction

        // Reverse direction when reaching the end or beginning
        if (currentIndex >= secretMessage.length || currentIndex <= 0) {
          direction *= -1
        }

        setMessage(secretMessage.substring(0, currentIndex))
      }
    }, 200) // Slower animation speed

    return () => {
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glitch Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30 z-10 pointer-events-none"></div>

      {/* Reduced number of random glitch lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100}%`,
            height: `${1 + Math.random() * 3}px`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 0.5 + Math.random() * 0.5,
            delay: Math.random() * 5,
          }}
          className="absolute bg-white z-20 pointer-events-none will-change-transform"
        ></motion.div>
      ))}

      {/* Secret Message */}
      <motion.div
        animate={{
          y: [0, -3, 0], // Reduced movement
          x: [0, 2, -2, 0], // Reduced movement
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 0.5, // Faster animation
          repeatType: "mirror",
        }}
        className="bg-black/50 p-6 rounded-lg border border-green-500 max-w-2xl z-30"
      >
        <h2 className="text-green-500 font-mono text-center mb-4 text-xl">CHANNEL 5: CLASSIFIED</h2>
        <p className="text-green-400 font-mono text-center leading-relaxed tracking-wider">
          {message}
          <span className="animate-pulse">_</span>
        </p>
      </motion.div>

      {/* Channel Indicator */}
      <div className="absolute top-4 right-4 bg-green-500 text-black px-2 py-1 text-xs font-bold z-30">CHANNEL 5</div>

      {/* Simplified Interference Pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white h-px"
            style={{
              left: 0,
              right: 0,
              top: `${i * 5}%`, // Fewer lines, more spaced out
              opacity: Math.random(),
              height: `${Math.random() * 2}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

