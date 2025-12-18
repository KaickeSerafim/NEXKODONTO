"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { ArquivosDialog } from "./arquivos";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { EditarAgendamento } from "../_agendamento/edit-agendamento";
import { FichaPacienteDialog } from "../_ficha-paciente/ficha-paciente-dialog";
import InformacoesPagamento from "../_informacoes-pagamentos";

interface ActionsProxAtendimentoProps {
  agendamento: Agendamento;
}

export default function ActionsProxAtendimento({
  agendamento,
}: ActionsProxAtendimentoProps) {
  const [editarOpen, setEditarOpen] = useState(false);
  const [arquivoOpen, setArquivoOpen] = useState(false);
  const [fichaOpen, setFichaOpen] = useState(false);
  const [pagamentoOpen, setPagamentoOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="font-medium  text-sm border border-primary/40 hover:bg-primary/10 hover:text-primary transition flex items-center gap-2">
            Ações
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-40 bg-slate-800  text-white"
        >
          <DropdownMenuLabel className="text-center bg-slate-500">
            Ações
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Contatar </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setFichaOpen(true)}>Ficha do paciente</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setArquivoOpen(true)}>
            Arquivos
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditarOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setPagamentoOpen(true)}>Ver informações de pagamento</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem> Cancelar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditarAgendamento
        open={editarOpen}
        onOpenChange={setEditarOpen}
        agendamento={agendamento}
      />

      <ArquivosDialog
        open={arquivoOpen}
        onOpenChange={setArquivoOpen}
        agendamento={agendamento}
      />

      <FichaPacienteDialog
        open={fichaOpen}
        onOpenChange={setFichaOpen}
        agendamento={agendamento}
      />
      <InformacoesPagamento
        open={pagamentoOpen}
        onOpenChange={setPagamentoOpen}
        agendamentoPagamento={agendamento.id}
      />
    </>
  );
}
