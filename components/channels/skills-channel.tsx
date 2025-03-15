"use client"

import { motion } from "framer-motion"
import { Code, Palette, Lightbulb, Database } from "lucide-react"

export default function SkillsChannel() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-800 p-4 overflow-y-auto">
      {/* Infomercial Header */}
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-yellow-300 font-bold text-2xl md:text-3xl italic"
        >
          AMAZING SKILLS!
        </motion.div>
        <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">CHANNEL 2</div>
      </div>

      {/* Infomercial Content */}
      <div className="mt-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 p-4 rounded-lg border-2 border-yellow-400"
        >
          <h2 className="text-center text-white text-xl md:text-2xl font-bold mb-4">BUT WAIT, THERE'S MORE!</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skill Category 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-8 h-8 text-white" />
                <h3 className="text-white font-bold text-lg">Frontend Development</h3>
              </div>
              <ul className="text-white space-y-2 ml-10">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> React & Next.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Framer Motion
                </li>
              </ul>
              <div className="mt-4 text-center">
                <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm animate-pulse">
                  EXPERT LEVEL!
                </div>
              </div>
            </motion.div>

            {/* Skill Category 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-green-600 to-green-800 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-8 h-8 text-white" />
                <h3 className="text-white font-bold text-lg">Backend Development</h3>
              </div>
              <ul className="text-white space-y-2 ml-10">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Node.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Express
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> MongoDB
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> PostgreSQL
                </li>
              </ul>
              <div className="mt-4 text-center">
                <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm animate-pulse">
                  ADVANCED LEVEL!
                </div>
              </div>
            </motion.div>

            {/* Skill Category 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-red-600 to-red-800 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-8 h-8 text-white" />
                <h3 className="text-white font-bold text-lg">Design & UI/UX</h3>
              </div>
              <ul className="text-white space-y-2 ml-10">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Figma
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Adobe XD
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Responsive Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Animation
                </li>
              </ul>
              <div className="mt-4 text-center">
                <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm animate-pulse">
                  PROFICIENT LEVEL!
                </div>
              </div>
            </motion.div>

            {/* Skill Category 4 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="w-8 h-8 text-white" />
                <h3 className="text-white font-bold text-lg">Other Skills</h3>
              </div>
              <ul className="text-white space-y-2 ml-10">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Git & GitHub
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> CI/CD
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Testing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300 font-bold">★</span> Agile Methodology
                </li>
              </ul>
              <div className="mt-4 text-center">
                <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm animate-pulse">
                  EXPERT LEVEL!
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
              }}
              className="inline-block bg-red-600 text-white font-bold px-6 py-3 rounded-lg text-xl shadow-lg"
            >
              HIRE NOW! LIMITED TIME OFFER!
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Infomercial Footer */}
      <div className="mt-6 text-center text-white text-xs opacity-70">
        *Skills shown are representative. Results may vary. Not available in all areas.
      </div>
    </div>
  )
}

