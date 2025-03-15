"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, Power, Info, Briefcase, Mail, Star, Menu } from "lucide-react"
import AboutChannel from "@/components/channels/about-channel"
import SkillsChannel from "@/components/channels/skills-channel"
import ProjectsChannel from "@/components/channels/projects-channel"
import ContactChannel from "@/components/channels/contact-channel"
import EasterEggChannel from "@/components/channels/easter-egg-channel"
import StaticOverlay from "@/components/effects/static-overlay"
import ScanLines from "@/components/effects/scan-lines"
import VhsOverlay from "@/components/effects/vhs-overlay"
import RemoteControl from "@/components/ui/remote-control"

// Lazy load Howler to improve initial load time
const loadHowler = async () => {
  const { Howl } = await import("howler")
  return Howl
}

export default function RetroTvPortfolio() {
  const [isPowered, setIsPowered] = useState(true)
  const [currentChannel, setCurrentChannel] = useState(1)
  const [volume, setVolume] = useState(50)
  const [isChangingChannel, setIsChangingChannel] = useState(false)
  const [showRemote, setShowRemote] = useState(false)
  const [vhsMode, setVhsMode] = useState(false)
  const dialRef = useRef<HTMLDivElement>(null)
  const soundsRef = useRef<any>({})
  const staticSoundRef = useRef<any>(null)

  // Initialize sound effects
  useEffect(() => {
    let isMounted = true

    const initSounds = async () => {
      if (!isMounted) return

      const Howl = await loadHowler()

      soundsRef.current = {
        dial: new Howl({ src: ["/sounds/dial-click.mp3"], volume: 0.5, preload: false }),
        button: new Howl({ src: ["/sounds/button-click.mp3"], volume: 0.5, preload: false }),
        powerOn: new Howl({ src: ["/sounds/power-on.mp3"], volume: 0.5, preload: false }),
        powerOff: new Howl({ src: ["/sounds/power-off.mp3"], volume: 0.5, preload: false }),
        channelChange: new Howl({ src: ["/sounds/channel-change.mp3"], volume: 0.5, preload: false }),
      }

      staticSoundRef.current = new Howl({
        src: ["/sounds/static.mp3"],
        volume: 0.2 * (volume / 500),
        loop: true,
        preload: true,
      })

      if (isPowered) {
        staticSoundRef.current.play()
      }
    }

    initSounds()

    return () => {
      isMounted = false
      if (staticSoundRef.current) {
        staticSoundRef.current.stop()
      }
    }
  }, [])

  // Update static sound volume when volume changes
  useEffect(() => {
    if (staticSoundRef.current) {
      staticSoundRef.current.volume(volume / 500)
    }
  }, [volume])

  // Handle power state changes
  useEffect(() => {
    if (staticSoundRef.current) {
      if (isPowered) {
        staticSoundRef.current.play()
      } else {
        staticSoundRef.current.pause()
      }
    }
  }, [isPowered])

  // Handle power button click
  const togglePower = () => {
    if (isPowered) {
      if (soundsRef.current.powerOff) {
        soundsRef.current.powerOff.play()
      }
    } else {
      if (soundsRef.current.powerOn) {
        soundsRef.current.powerOn.play()
      }
    }
    setIsPowered(!isPowered)
  }

  // Handle channel change with debouncing
  const changeChannel = (channel: number) => {
    if (channel === currentChannel || !isPowered || isChangingChannel) return

    if (soundsRef.current.channelChange) {
      soundsRef.current.channelChange.play()
    }

    setIsChangingChannel(true)

    setTimeout(() => {
      setCurrentChannel(channel)
      setTimeout(() => {
        setIsChangingChannel(false)
      }, 500)
    }, 300)
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseInt(e.target.value)
    setVolume(newVolume)
    if (staticSoundRef.current) {
      staticSoundRef.current.volume(newVolume / 500)
    }
  }

  // Handle dial rotation with debouncing
  const handleDialRotation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dialRef.current || !isPowered || isChangingChannel) return

    const dial = dialRef.current
    const rect = dial.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
    const normalizedAngle = (angle + 360) % 360

    // Map angle to channel (5 channels, evenly distributed)
    const newChannel = Math.floor((normalizedAngle / 360) * 5) + 1

    if (newChannel !== currentChannel) {
      if (soundsRef.current.dial) {
        soundsRef.current.dial.play()
      }
      changeChannel(newChannel)

      // Rotate dial to match channel position
      dial.style.transform = `rotate(${(newChannel - 1) * 72}deg)`
    }
  }

  // Memoize channel content to prevent unnecessary re-renders
  const renderChannelContent = () => {
    switch (currentChannel) {
      case 1:
        return <AboutChannel />
      case 2:
        return <SkillsChannel />
      case 3:
        return <ProjectsChannel />
      case 4:
        return <ContactChannel />
      case 5:
        return <EasterEggChannel />
      default:
        return <AboutChannel />
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 p-4">
      {/* TV Container */}
      <div className="relative w-full max-w-4xl">
        {/* TV Frame */}
        <div className="relative bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-xl p-8 shadow-2xl border-t-8 border-zinc-600">
          {/* TV Brand Logo */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-zinc-400 text-xs font-bold tracking-widest">
            PORTFOLIO-MATIC 2000
          </div>

          {/* Screen Container */}
          <div className="relative overflow-hidden rounded-lg aspect-video bg-black border-8 border-zinc-900 shadow-inner">
            {/* Power Off Effect */}
            {!isPowered && (
              <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
              </div>
            )}

            {/* Channel Change Static */}
            {isChangingChannel && (
              <div className="absolute inset-0 bg-black z-40 flex items-center justify-center">
                <StaticOverlay intensity={1} />
              </div>
            )}

            {/* Screen Content */}
            <div
              className={`relative w-full h-full ${isPowered ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
            >
              {/* Channel Content */}
              <div className="relative z-10 w-full h-full">{!isChangingChannel && renderChannelContent()}</div>

              {/* Screen Effects */}
              <ScanLines />
              {isPowered && !isChangingChannel && <StaticOverlay intensity={0.05} />}
              {vhsMode && !isChangingChannel && <VhsOverlay />}

              {/* Screen Glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="flex items-center justify-between mt-6 px-4">
            {/* Left Controls */}
            <div className="flex items-center gap-6">
              {/* Channel Dial */}
              <div className="relative">
                <div className="text-xs text-zinc-400 mb-1 text-center">CHANNEL</div>
                <div
                  ref={dialRef}
                  className="w-16 h-16 rounded-full bg-zinc-900 border-4 border-zinc-700 shadow-md flex items-center justify-center cursor-pointer relative"
                  onClick={handleDialRotation}
                >
                  <div className="absolute w-2 h-8 bg-zinc-600 rounded-full top-1"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-zinc-600 opacity-50"></div>
                </div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-zinc-400">{currentChannel}</div>
              </div>

              {/* Quick Access Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <div className="text-xs text-zinc-400 col-span-2 text-center mb-1">QUICK ACCESS</div>
                <button
                  className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  onClick={() => {
                    if (soundsRef.current.button) {
                      soundsRef.current.button.play()
                    }
                    changeChannel(1)
                  }}
                >
                  <Info className="w-5 h-5 text-zinc-400" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  onClick={() => {
                    if (soundsRef.current.button) {
                      soundsRef.current.button.play()
                    }
                    changeChannel(2)
                  }}
                >
                  <Star className="w-5 h-5 text-zinc-400" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  onClick={() => {
                    if (soundsRef.current.button) {
                      soundsRef.current.button.play()
                    }
                    changeChannel(3)
                  }}
                >
                  <Briefcase className="w-5 h-5 text-zinc-400" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  onClick={() => {
                    if (soundsRef.current.button) {
                      soundsRef.current.button.play()
                    }
                    changeChannel(4)
                  }}
                >
                  <Mail className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-6">
              {/* Volume Control */}
              <div className="relative">
                <div className="text-xs text-zinc-400 mb-1 text-center">VOLUME</div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-zinc-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-400"
                  />
                </div>
              </div>

              {/* VHS Mode Toggle */}
              <div className="relative">
                <div className="text-xs text-zinc-400 mb-1 text-center">VHS MODE</div>
                <button
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${vhsMode ? "bg-red-500 justify-end" : "bg-zinc-700 justify-start"}`}
                  onClick={() => {
                    if (soundsRef.current.button) {
                      soundsRef.current.button.play()
                    }
                    setVhsMode(!vhsMode)
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-zinc-200"></div>
                </button>
              </div>

              {/* Power Button */}
              <div className="relative">
                <div className="text-xs text-zinc-400 mb-1 text-center">POWER</div>
                <button
                  className={`w-12 h-12 rounded-full ${isPowered ? "bg-red-500" : "bg-zinc-700"} border-4 border-zinc-600 flex items-center justify-center shadow-md hover:brightness-110 transition-all`}
                  onClick={togglePower}
                >
                  <Power className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Speaker Grilles */}
          <div className="flex justify-between mt-6">
            <div className="w-1/4 h-8 bg-zinc-900 rounded-md grid grid-cols-8 gap-1 p-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-zinc-800 rounded-full"></div>
              ))}
            </div>
            <button
              className="text-zinc-400 hover:text-zinc-300 transition-colors"
              onClick={() => {
                if (soundsRef.current.button) {
                  soundsRef.current.button.play()
                }
                setShowRemote(!showRemote)
              }}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-1/4 h-8 bg-zinc-900 rounded-md grid grid-cols-8 gap-1 p-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-zinc-800 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* TV Stand */}
        <div className="w-1/3 h-8 bg-zinc-800 mx-auto rounded-b-lg shadow-md"></div>
        <div className="w-1/4 h-16 bg-gradient-to-b from-zinc-800 to-zinc-900 mx-auto"></div>

        {/* Remote Control (Mobile Mode) */}
        {showRemote && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <RemoteControl
              onChannelChange={changeChannel}
              onPowerToggle={togglePower}
              onVolumeChange={handleVolumeChange}
              onVhsToggle={() => setVhsMode(!vhsMode)}
              currentChannel={currentChannel}
              isPowered={isPowered}
              volume={volume}
              vhsMode={vhsMode}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

