"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function LandingHeader() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          NEXKODONTO
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="hover:text-primary transition">
            Recursos
          </Link>
          <Link href="#about" className="hover:text-primary transition">
            Sobre
          </Link>
          <Link href="#contact" className="hover:text-primary transition">
            Contato
          </Link>
        </nav>
        <div className="flex gap-3">
          <Link 
            href="/login" 
            className="px-4 py-2 hover:bg-gray-100 rounded-md transition"
          >
            Entrar
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
          >
            Começar
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
