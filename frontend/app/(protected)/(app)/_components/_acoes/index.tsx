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
import { ChevronDown, File, FileBadge, MessageSquare, Pencil, Receipt, Trash2, UserRound} from "lucide-react";
import { useState } from "react";

import { ArquivosDialog } from "./arquivos";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { EditarAgendamento } from "../_agendamento/edit-agendamento";
import { FichaPacienteDialog } from "../_ficha-paciente/ficha-paciente-dialog";
import InformacoesPagamento from "../_informacoes-pagamentos";
import DeleteAgendamento from "../_agendamento/delete-agendamento";

interface ActionsProxAtendimentoProps {
  agendamento: Agendamento;
}

export default function Actions({
  agendamento,
}: ActionsProxAtendimentoProps) {
  const [editarOpen, setEditarOpen] = useState(false);
  const [arquivoOpen, setArquivoOpen] = useState(false);
  const [fichaOpen, setFichaOpen] = useState(false);
  const [pagamentoOpen, setPagamentoOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
          className="w-45 bg-slate-800  text-white"
        >
          <DropdownMenuLabel className="text-center bg-slate-500">
            Ações
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem> <MessageSquare />Contatar </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setFichaOpen(true)}> <FileBadge />Ficha do paciente</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setArquivoOpen(true)}>
            <File />   Arquivos
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditarOpen(true)}>
           <Pencil /> Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem  className="" onClick={() => setPagamentoOpen(true)}><Receipt />Ver informações de pagamento</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}> <Trash2 />Cancelar agendamento</DropdownMenuItem>
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
        agendamentoId={agendamento.id}
        pacienteId={agendamento.paciente_id || agendamento.paciente_detail?.id}
      />
      <DeleteAgendamento
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        agendamentoId={agendamento.id}
      />
    </>
  );
}
