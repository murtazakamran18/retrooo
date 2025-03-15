"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Github, Linkedin, Send } from "lucide-react"

export default function ContactChannel() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert("Thanks for your message! This is a demo, so no message was actually sent.")
    setFormState({
      name: "",
      email: "",
      message: "",
    })
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-yellow-800 to-orange-900 p-4 overflow-y-auto">
      {/* Commercial Header */}
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1 }}
          className="bg-red-600 text-white px-4 py-2 text-xl md:text-2xl font-bold"
        >
          CALL NOW!
        </motion.div>
        <div className="bg-white text-black px-2 py-1 text-xs font-bold">CHANNEL 4</div>
      </div>

      {/* Commercial Content */}
      <div className="mt-6">
        <div className="bg-black/30 p-6 rounded-lg">
          <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-6">DON'T WAIT! CONTACT TODAY!</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 rounded-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-white text-sm">CALL US AT</div>
                  <div className="text-white font-bold">555-PORTFOLIO</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 rounded-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-white text-sm">EMAIL US AT</div>
                  <div className="text-white font-bold">hello@portfolio.com</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 rounded-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Github className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-white text-sm">GITHUB</div>
                  <div className="text-white font-bold">github.com/portfolio</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 rounded-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-white text-sm">LINKEDIN</div>
                  <div className="text-white font-bold">linkedin.com/in/portfolio</div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-white font-bold text-xl mb-4">SEND A MESSAGE NOW!</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-white text-sm block mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:border-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-white text-sm block mb-1">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:border-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-white text-sm block mb-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:border-yellow-500"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-3 rounded flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  SEND MESSAGE NOW!
                </motion.button>
              </form>
            </div>
          </div>

          {/* Commercial Disclaimer */}
          <div className="mt-8 text-center text-white text-xs opacity-70">
            *Operators are standing by. Message and data rates may apply. Not valid where prohibited.
          </div>
        </div>
      </div>

      {/* Flashing CTA */}
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        className="mt-6 text-center"
      >
        <div className="inline-block bg-white text-red-600 font-bold px-6 py-3 rounded-lg text-xl">
          LIMITED TIME OFFER! CONTACT NOW!
        </div>
      </motion.div>
    </div>
  )
}

