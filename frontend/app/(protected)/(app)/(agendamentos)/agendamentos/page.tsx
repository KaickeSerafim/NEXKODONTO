"use client";

import { motion } from "framer-motion";
import { Plus, Users, CheckCircle2, Clock as ClockIcon, AlertCircle } from "lucide-react";
import CalendarioAgendamento from "../_components";
import { Button } from "@/components/ui/button";
import { useListAgendamentos } from "@/hooks/agendamento/useListAgendamentos";
import { Skeleton } from "@/components/ui/skeleton";
import ButtonAddAgendamento from "../../_components/_agendamento/add-agendamento";

export default function AgendamentosPage() {
  const { data: apiResponse, isLoading, isError, error } = useListAgendamentos({ view: "minimal" });



  const stats = [
    { label: "Total", value: apiResponse?.data?.length || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Confirmados", value: apiResponse?.data?.filter(a => a.status === "confirmada").length || 0, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pendentes", value: apiResponse?.data?.filter(a => a.status && ["agendada", "pendente"].includes(a.status)).length || 0, icon: ClockIcon, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-red-50 rounded-2xl border border-red-100">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-red-900">Erro ao carregar agendamentos</h2>
        <p className="text-red-700 mt-2">{error?.message || "Ocorreu um problema inesperado."}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="mt-6 border-red-200 text-red-700 hover:bg-red-100">
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Agenda de Pacientes</h1>
          <p className="text-gray-500 mt-1">Gerencie seus atendimentos e horários</p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
        >
   <ButtonAddAgendamento />
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              {isLoading ? (
                <Skeleton className="h-8 w-12 mt-1" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[600px] w-full rounded-2xl" />
          </div>
        ) : (
          <CalendarioAgendamento agendamentos={apiResponse?.data || []} />
        )}
      </motion.div>
    </div>
  );
}
