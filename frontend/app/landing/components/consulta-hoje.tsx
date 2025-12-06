"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User } from "lucide-react"
import ConsultaSituacao from "./utils/consulta-situacao";
import { Button } from "@/components/ui/button";
import ButtonAction from "./utils/button-actions";

const consultas = [
  {
    id: 1,
    paciente: "Maria Silva",
    horario: "09:00",
    tipo: "Limpeza",
    situacao: "Confirmado",
    descricao: "Fazer a limpeza do paciiente completa",
  },
  {
    id: 2,
    paciente: "João Santos",
    horario: "10:30",
    tipo: "Consulta",
    situacao: "Confirmado",
    descricao: "Descrição da consulta",
  },
  {
    id: 3,
    paciente: "Ana Costa",
    horario: "14:00",
    tipo: "Tratamento",
    situacao: "Pendente",
    descricao: "Descrição da consulta",
  },
  {
    id: 4,
    paciente: "Pedro Lima",
    horario: "15:30",
    tipo: "Retorno",
    situacao: "Confirmado",
    descricao: "Descrição da consulta",
  },
];

export function LandingConsultaHoje() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Consultas de Hoje</h2>
          <p className="text-muted-foreground">
            Visualize e gerencie seus agendamentos do dia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {consultas.map((consulta, index) => (
            <motion.div
              key={consulta.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className=" items-center gap-2 mb-3">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm text-muted-foreground">
                        {consulta.horario}
                      </span>
                    </div>

                  <ButtonAction />
                  </div>
                  <span className="font-semibold">
                    <ConsultaSituacao consultaSituacao={consulta.situacao} />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{consulta.paciente}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {consulta.tipo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
