"use client"

import { Calendar, Users, Clock, TrendingUp } from "lucide-react"

const stats = [
  { icon: Users, label: "Pacientes", value: "248", change: "+12%" },
  { icon: Calendar, label: "Consultas Hoje", value: "12", change: "+3%" },
  { icon: Clock, label: "Pendentes", value: "4", change: "-2%" },
  { icon: TrendingUp, label: "Receita Mensal", value: "R$ 45.2k", change: "+18%" },
]

const proximasConsultas = [
  { id: 1, paciente: "Maria Silva", horario: "09:00", tipo: "Limpeza" },
  { id: 2, paciente: "João Santos", horario: "10:30", tipo: "Consulta" },
  { id: 3, paciente: "Ana Costa", horario: "14:00", tipo: "Tratamento" },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-primary" />
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Próximas Consultas</h2>
        <div className="space-y-4">
          {proximasConsultas.map((consulta) => (
            <div key={consulta.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
              <div>
                <div className="font-medium">{consulta.paciente}</div>
                <div className="text-sm text-muted-foreground">{consulta.tipo}</div>
              </div>
              <div className="text-sm font-medium">{consulta.horario}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
