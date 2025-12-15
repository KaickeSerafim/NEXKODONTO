"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone } from "lucide-react";

const agendamentos = [
  { id: 1, paciente: "Maria Silva", telefone: "(11) 98765-4321", data: "2024-01-15", horario: "09:00", tipo: "Limpeza", status: "confirmado" },
  { id: 2, paciente: "João Santos", telefone: "(11) 98765-1234", data: "2024-01-15", horario: "10:30", tipo: "Consulta", status: "confirmado" },
  { id: 3, paciente: "Ana Costa", telefone: "(11) 98765-5678", data: "2024-01-15", horario: "14:00", tipo: "Tratamento", status: "pendente" },
  { id: 4, paciente: "Pedro Lima", telefone: "(11) 98765-9012", data: "2024-01-16", horario: "09:30", tipo: "Retorno", status: "confirmado" },
  { id: 5, paciente: "Julia Mendes", telefone: "(11) 98765-3456", data: "2024-01-16", horario: "11:00", tipo: "Limpeza", status: "pendente" },
];

export default function AgendamentosPage() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Agendamentos
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Lista de Agendamentos</h2>
          <div className="space-y-3">
            {agendamentos.map((agendamento, index) => (
              <motion.div
                key={agendamento.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{agendamento.paciente}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        agendamento.status === "confirmado"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {agendamento.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {agendamento.telefone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {agendamento.data}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {agendamento.horario}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-primary">
                  {agendamento.tipo}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Calendário</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="text-center mb-4">
                <div className="text-lg font-semibold">Janeiro 2024</div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((dia, i) => (
                  <div key={i} className="font-semibold text-gray-600">
                    {dia}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                  <motion.div
                    key={dia}
                    whileHover={{ scale: 1.1 }}
                    className={`p-2 rounded cursor-pointer ${
                      dia === 15 || dia === 16
                        ? "bg-primary text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {dia}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Resumo</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold">{agendamentos.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confirmados</span>
                  <span className="font-semibold text-green-600">
                    {agendamentos.filter((a) => a.status === "confirmado").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pendentes</span>
                  <span className="font-semibold text-yellow-600">
                    {agendamentos.filter((a) => a.status === "pendente").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
