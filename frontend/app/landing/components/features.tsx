"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  FileText,
  BarChart3,
  Clock,
  Shield,
  ArrowRight,
  Laptop,
  MessageSquare,
  Bot
} from "lucide-react"

const featuresSaas = [
  {
    icon: Calendar,
    title: "Agendamento",
    description: "Gerencie consultas e horários com facilidade"
  },
  {
    icon: Users,
    title: "Pacientes",
    description: "Cadastro completo e histórico de atendimentos"
  },
  {
    icon: FileText,
    title: "Prontuários",
    description: "Prontuários digitais seguros e organizados"
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    description: "Análises e métricas da sua clínica"
  },
  {
    icon: Clock,
    title: "Lembretes",
    description: "Notificações automáticas para pacientes"
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Dados protegidos e conformidade LGPD"
  }
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Recursos Completos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar sua clínica
          </p>
        </motion.div>

        {/* Grid de recursos principais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {featuresSaas.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-xl border bg-white hover:shadow-xl hover:border-blue-300 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Divisor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center my-16"
        >
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-300" />
            <span className="text-5xl font-bold text-blue-500">+</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-300" />
          </div>
        </motion.div>

        {/* Fluxo de integração */}
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
          >
            Presença Digital Completa
          </motion.h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 p-8 rounded-xl border bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Laptop className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Landing Page</h3>
              <p className="text-muted-foreground text-sm text-center">
                Página profissional para sua clínica
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <ArrowRight className="w-8 h-8 text-blue-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 p-8 rounded-xl border bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <MessageSquare className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">WhatsApp</h3>
              <p className="text-muted-foreground text-sm text-center">
                Integração direta com pacientes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden md:block"
            >
              <ArrowRight className="w-8 h-8 text-blue-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex-1 p-8 rounded-xl border bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Bot className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Chatbot IA</h3>
              <p className="text-muted-foreground text-sm text-center">
                Atendimento automatizado 24/7
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}