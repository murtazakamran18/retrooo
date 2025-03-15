"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { User, Calendar, MapPin, Briefcase, Award } from "lucide-react"

export default function AboutChannel() {
  const [tickerText, setTickerText] = useState("")
  const tickerIntervalRef = useRef<NodeJS.Timeout>()

  // Simulate news ticker with optimized animation
  useEffect(() => {
    const text =
      "BREAKING NEWS: Creative developer with 5+ years of experience specializing in interactive web experiences and unique digital solutions. Passionate about combining technology with artistic vision to create memorable user experiences. • Graduated with honors in Computer Science • Previously worked with top agencies and startups • Seeking new opportunities to create innovative digital experiences • "
    let currentIndex = 0

    // Clear any existing interval
    if (tickerIntervalRef.current) {
      clearInterval(tickerIntervalRef.current)
    }

    // Use a slower interval for better performance
    tickerIntervalRef.current = setInterval(() => {
      setTickerText(
        text.substring(0, currentIndex) +
          text.substring(0, currentIndex + 100 - text.substring(0, currentIndex).length),
      )
      currentIndex = (currentIndex + 1) % text.length
    }, 150) // Slower ticker speed

    return () => {
      if (tickerIntervalRef.current) {
        clearInterval(tickerIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full h-full bg-blue-900 p-4 flex flex-col">
      {/* News Channel Header */}
      <div className="flex justify-between items-center bg-red-600 text-white p-2 rounded">
        <div className="font-bold text-xl">PORTFOLIO NEWS</div>
        <div className="text-sm">CHANNEL 1</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 mt-4 flex-1">
        {/* Profile Image */}
        <div className="w-full md:w-1/3 bg-gray-800 rounded overflow-hidden">
          <div className="relative aspect-square">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
              <User className="w-24 h-24 text-gray-400" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white p-1 text-sm font-bold">
              LIVE: DEVELOPER PROFILE
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="w-full md:w-2/3 bg-gray-800 rounded p-4 text-white">
          <h2 className="text-2xl font-bold mb-4 text-red-400">About Me</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-sm md:text-base">
              Hello! I'm a passionate developer with a love for creating unique digital experiences. I specialize in
              front-end development with a focus on interactive and immersive web applications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-400" />
                <span>5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-red-400" />
                <span>Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-red-400" />
                <span>BS Computer Science</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* News Ticker - with hardware acceleration */}
      <div className="bg-black text-white mt-4 p-2 overflow-hidden">
        <div className="whitespace-nowrap font-mono text-sm will-change-transform">{tickerText}</div>
      </div>
    </div>
  )
}

