"use client"

import { Calendar, Users, Clock, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import ProximosAtendimentos from "../components/prox-atendimento"

const stats = [
  { icon: Users, label: "Pacientes", value: "248", change: "+12%" },
  { icon: Calendar, label: "Consultas Hoje", value: "12", change: "+3%" },
  { icon: Clock, label: "Pendentes", value: "4", change: "-2%" },
  { icon: TrendingUp, label: "Receita Mensal", value: "R$ 45.2k", change: "+18%" },
]



export default function DashboardPage() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Dashboard
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-primary" />
              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          Próximos Atendimentos
        </h2>
        <div className="space-y-4">
         <ProximosAtendimentos  />
        </div>
      </motion.div>
    </div>
  );
}
