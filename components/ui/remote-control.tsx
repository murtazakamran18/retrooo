"use client"

import type React from "react"

import { Power, ChevronUp, ChevronDown, Volume2, VolumeX, Tv } from "lucide-react"

interface RemoteControlProps {
  onChannelChange: (channel: number) => void
  onPowerToggle: () => void
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onVhsToggle: () => void
  currentChannel: number
  isPowered: boolean
  volume: number
  vhsMode: boolean
}

export default function RemoteControl({
  onChannelChange,
  onPowerToggle,
  onVolumeChange,
  onVhsToggle,
  currentChannel,
  isPowered,
  volume,
  vhsMode,
}: RemoteControlProps) {
  return (
    <div className="bg-zinc-800 rounded-3xl p-4 shadow-2xl border-2 border-zinc-700 w-64">
      <div className="text-center text-zinc-400 text-xs mb-4">REMOTE CONTROL</div>

      {/* Power Button */}
      <div className="flex justify-center mb-6">
        <button
          className={`w-12 h-12 rounded-full ${isPowered ? "bg-red-500" : "bg-zinc-700"} flex items-center justify-center shadow-md hover:brightness-110 transition-all`}
          onClick={onPowerToggle}
        >
          <Power className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Channel Controls */}
      <div className="mb-6">
        <div className="text-center text-zinc-400 text-xs mb-2">CHANNEL</div>
        <div className="flex justify-center items-center gap-4">
          <button
            className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center shadow-md hover:bg-zinc-600 transition-colors"
            onClick={() => onChannelChange(currentChannel > 1 ? currentChannel - 1 : 5)}
            disabled={!isPowered}
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>

          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold">
            {currentChannel}
          </div>

          <button
            className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center shadow-md hover:bg-zinc-600 transition-colors"
            onClick={() => onChannelChange(currentChannel < 5 ? currentChannel + 1 : 1)}
            disabled={!isPowered}
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="mb-6">
        <div className="text-center text-zinc-400 text-xs mb-2">VOLUME</div>
        <div className="flex items-center gap-2 px-4">
          <VolumeX className="w-4 h-4 text-zinc-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onVolumeChange}
            disabled={!isPowered}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-400"
          />
          <Volume2 className="w-4 h-4 text-zinc-400" />
        </div>
      </div>

      {/* VHS Mode Toggle */}
      <div>
        <div className="text-center text-zinc-400 text-xs mb-2">VHS MODE</div>
        <div className="flex justify-center">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${vhsMode ? "bg-red-500 text-white" : "bg-zinc-700 text-zinc-300"}`}
            onClick={onVhsToggle}
            disabled={!isPowered}
          >
            <Tv className="w-4 h-4" />
            {vhsMode ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Remote Control Branding */}
      <div className="mt-6 text-center text-zinc-500 text-[10px]">PORTFOLIO-MATIC™ REMOTE v1.0</div>
    </div>
  )
}

