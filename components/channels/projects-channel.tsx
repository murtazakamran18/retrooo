"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Info, ExternalLink } from "lucide-react"
import Image from "next/image"

// Sample project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart, checkout, and payment processing.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for tracking social media performance across platforms.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "TypeScript", "Chart.js"],
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "React Native application for tracking workouts and nutrition.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React Native", "Firebase", "Redux"],
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "Web app that uses AI to generate marketing content and social media posts.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Python", "TensorFlow", "React"],
  },
]

export default function ProjectsChannel() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 p-4 overflow-y-auto">
      {/* VHS Style Header */}
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-xl md:text-2xl">PROJECT SHOWCASE</div>
        <div className="bg-white text-black px-2 py-1 text-xs font-bold">CHANNEL 3</div>
      </div>

      {/* VHS Recording Indicator */}
      <div className="flex items-center gap-2 mt-2">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
        <div className="text-red-500 text-xs font-mono">REC</div>
        <div className="text-white text-xs font-mono ml-2">00:12:34</div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.03 }}
            className="relative bg-black rounded-lg overflow-hidden border border-gray-700"
          >
            {/* Project Thumbnail */}
            <div className="relative aspect-video">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />

              {/* VHS Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Play Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </motion.button>

              {/* Project Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold text-lg">{project.title}</h3>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-3 bg-gray-800">
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-white font-bold text-xl">{projects.find((p) => p.id === selectedProject)?.title}</h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setSelectedProject(null)}>
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <div className="relative aspect-video mb-4">
                <Image
                  src={projects.find((p) => p.id === selectedProject)?.image || ""}
                  alt={projects.find((p) => p.id === selectedProject)?.title || ""}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <p className="text-gray-300 mb-4">{projects.find((p) => p.id === selectedProject)?.description}</p>

              <div className="flex justify-between">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  <Info className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                  <ExternalLink className="w-4 h-4" />
                  Visit Project
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* VHS Tracking Lines */}
      <div className="fixed bottom-4 left-4 right-4">
        <div className="h-1 bg-white/10"></div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <div>PLAY</div>
          <div>SP</div>
          <div>LP</div>
        </div>
      </div>
    </div>
  )
}

