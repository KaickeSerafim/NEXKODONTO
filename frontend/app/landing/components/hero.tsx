"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function LandingHero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Gestão Odontológica
          <br />
          <span className="text-primary">Simplificada</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Sistema completo para gerenciar sua clínica odontológica com
          eficiência e praticidade
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Link
            href="/register"
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-lg"
          >
            Começar Agora
          </Link>
          <Link
            href="#demo"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition text-lg"
          >
            Ver Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
