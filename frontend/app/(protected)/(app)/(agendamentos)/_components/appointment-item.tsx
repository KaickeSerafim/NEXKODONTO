"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, DollarSign, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Actions from "../../_components/_acoes";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { getAgendamentoColors } from "@/app/functions/utils/get-agendamento-colors";
import { getStatusConfig } from "@/app/functions/utils/get-status-config";
import { getStatusPagamentoConfig } from "@/app/functions/utils/get-status-pagamento-config";
import { ButtonConfirmAgendamento } from "../../_components/_agendamento/confirm-decline-agendamento/button-confirm-agendamento";
import { ButtonDeclineAgendamento } from "../../_components/_agendamento/confirm-decline-agendamento/button-decline-agendamento";


interface AppointmentItemProps {
  agendamento: Agendamento;
}
export function AppointmentItem({ agendamento }: AppointmentItemProps) {
  const { statusColor, paymentStyles } = getAgendamentoColors(
    agendamento.status as any,
    agendamento.pagamento?.[0]?.status as any
  );
  const statusConfig = getStatusConfig(agendamento.status);
  const pagamentoConfig = getStatusPagamentoConfig(agendamento.pagamento?.[0]?.status || "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ y: -1, scale: 1.01 }}
          className={cn(
            "text-[10px] p-1.5 px-2 rounded-lg border shadow-sm cursor-pointer transition-all relative group/item flex items-center gap-2",
            statusColor
          )}
        >
          {/* Hora */}
          <span className="font-bold whitespace-nowrap opacity-80 border-r border-current/20 pr-1.5">
            {new Date(agendamento.data_hora).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {/* Nome */}
          <div className="font-bold truncate flex-1 uppercase tracking-tight">
            {agendamento.paciente_detail?.nome}
          </div>

          {/* Ícone $ com cor + bg dinâmicos */}
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full shrink-0",
              paymentStyles.bg
            )}
          >
            <DollarSign className={cn("h-3 w-3", paymentStyles.icon)} />
          </span>
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-56 rounded-xl shadow-2xl border-gray-100 "
      >
        <DropdownMenuLabel className="flex flex-col gap-1 p-3">
          <span className="text-xs text-gray-400 font-medium">Paciente</span>
          <span className="text-xs font-bold text-gray-900">
            {agendamento.paciente_detail?.nome}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="p-3 flex flex-col gap-2 border-b border-slate-800">
          <div className={cn("inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold border", statusConfig.className)}>
            Status: {statusConfig.label}
          </div>
          <div className={cn("inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold border", pagamentoConfig.className)}>
            Pagamento: {pagamentoConfig.label}
          </div>
        </div>



        <DropdownMenuSeparator />
        
        <ButtonConfirmAgendamento agendamentoId={agendamento.id} />
        <ButtonDeclineAgendamento agendamentoId={agendamento.id} />

        <DropdownMenuSeparator />
        <div className="flex justify-center p-3 w-full">
          <Actions agendamento={agendamento} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
