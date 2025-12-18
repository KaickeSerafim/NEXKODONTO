"use client";

import ObsProxAtendimento from "./popover-obs-prox-atendimento";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Check,
  AlertCircle,
  XCircle,
  Info,
} from "lucide-react";

import {
  Agendamento,
  AgendamentoResponse,
} from "@/app/schemas/agendamento/agendamento";
import { useListAgendamentos } from "@/hooks/agendamento/useListAgendamentos";
import { getStatusConfig } from "@/app/functions/utils/get-status-config";
import { formatarDataHora } from "@/app/functions/utils/formatar-data-hora";
import { getStatusPagamentoConfig } from "@/app/functions/utils/get-status-pagamento-config";
import Loading from "@/components/loading/Loading";
import { FilterProxAtendimento } from "./filter-prox-atendimento";
import { useState } from "react";
import ActionsProxAtendimento from "../../../_components/_acoes";

export default function ProximosAtendimentos({
  agendamentos,
}: {
  agendamentos?: AgendamentoResponse;
}) {
  const [filters, setFilters] = useState<{
    motivo?: string;
    pagamento?: string;
    periodo?: string;
    status?: string;
  }>({});
  const { data, error, isLoading } = useListAgendamentos({
    ...filters,
    futuros: true,
  });

  const agendamentosList = data?.data || agendamentos?.data || [];

  if (isLoading) {
    return <Loading />;
  }

  if (!agendamentosList.length) {
    return (
      <div className="w-full space-y-4">
        <FilterProxAtendimento
          onFilterChange={(newFilters) =>
            setFilters({ ...filters, ...newFilters })
          }
        />
        <div className="text-center text-gray-500 py-8">
          Nenhum agendamento encontrado para hoje
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <FilterProxAtendimento
        onFilterChange={(newFilters) =>
          setFilters({ ...filters, ...newFilters })
        }
      />
      {agendamentosList.map((atendimento: Agendamento, index: number) => {
        const statusConfig = getStatusConfig(atendimento.status);
        const statusPagamentoConfig = getStatusPagamentoConfig(
          atendimento.pagamento[0]?.status || "pendente"
        );
        const IconPagamento =
          statusPagamentoConfig.icon === "Check"
            ? Check
            : statusPagamentoConfig.icon === "AlertCircle"
            ? AlertCircle
            : statusPagamentoConfig.icon === "XCircle"
            ? XCircle
            : Info;
        return (
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
                  {atendimento.paciente_detail.nome}
                </h3>
                <h4 className="text-sm font-semibold  text-gray-500 border rounded-lg pr-4 pl-2 bg-cyan-300">
                  -{" "}
                  {atendimento.motivo
                    ? "" + atendimento.motivo
                    : "Nao informado"}
                </h4>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 ">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatarDataHora(atendimento.data_hora)}</span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${statusConfig.className}`}
                >
                  {statusConfig.label}
                </span>
                <span className=" grid text-xs text-gray-500">
                  <span className="flex gap-1">
                    Criado por:{"  "}
                    <p className="font-bold">
                      {atendimento.criado_por_detail
                        ? atendimento.criado_por_detail.nome_completo
                        : "-"}
                    </p>
                  </span>

                  <span>
                    em:{"  "}
                    {atendimento.criado_em
                      ? formatarDataHora(atendimento.criado_em)
                      : "-"}
                  </span>
                </span>
                <span>
                  | <br />|
                </span>
                <span className=" grid text-xs text-gray-500">
                  <span className="flex gap-1">
                    Ultima alteracao:{"  "}
                    <p className="font-bold">
                      {atendimento.updated_by_detail?.nome_completo
                        ? atendimento.updated_by_detail.nome_completo
                        : "-"}
                    </p>
                  </span>

                  <span>
                    em:{"  "}
                    {atendimento.atualizado_em
                      ? formatarDataHora(atendimento.atualizado_em)
                      : "-"}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-[200px]">
              <h3 className="text-sm font-semibold whitespace-nowrap">
                Pagamento:
              </h3>
              <div className="flex flex-col gap-1">
                <span
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${statusPagamentoConfig.className}`}
                >
                  <IconPagamento className="w-3 h-3" />
                  {statusPagamentoConfig.label}
                </span>
                <span className="text-xs text-gray-500">
                  {atendimento.pagamento[0]?.pago_em
                    ? formatarDataHora(atendimento.pagamento[0]?.pago_em)
                    : "-"}
                </span>
              </div>
            </div>
            <ObsProxAtendimento observacao={atendimento.observacoes || ""} />
            <ActionsProxAtendimento agendamento={atendimento} />
          </motion.div>
        );
      })}
    </div>
  );
}
