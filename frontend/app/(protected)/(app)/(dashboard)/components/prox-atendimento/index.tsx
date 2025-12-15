"use client";

import { Atendimento } from "@/app/schemas/atendimento/atendimento";
import ObsProxAtendimento from "./popover-obs-prox-atendimento";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import ActionsProxAtendimento from "./action-prox-atendimento";

export default function ProximosAtendimentos({ atendimentos }: { atendimentos: Atendimento[] }) {
  return (
    <div className="w-full space-y-4">
      {atendimentos.map((atendimento: Atendimento, index) => (
        <motion.div
          key={atendimento.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          whileHover={{ scale: 1.01 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition gap-3"
        >
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-lg">
                {atendimento.nome_paciente}
              </h3>
              <h4 className="text-sm font-semibold border-b-2 text-gray-500">
                - {atendimento.tipo_atendimento}
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{atendimento.data_atendimento}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{atendimento.hora_atendimento}</span>
              </div>
            </div>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full border  ${
              atendimento.status_atendimento === "confirmado"
                ? "bg-green-100 text-green-700 border-green-800"
                : "bg-yellow-100 text-yellow-700 border-yellow-800"
            }`}
          >
            {atendimento.status_atendimento === "confirmado" ? "Confirmado" : "Pendente"}
          </span>
          <ObsProxAtendimento
            observacao={atendimento.observacao_atendimento || ""}
          />
          <ActionsProxAtendimento />
        </motion.div>
      ))}
    </div>
  );
}
