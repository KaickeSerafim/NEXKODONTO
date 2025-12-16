"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { EditarAgendamento } from "./actions/edit";
import { ArquivosDialog } from "./actions/arquivos";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";

interface ActionsProxAtendimentoProps {
  agendamento: Agendamento;
}

export default function ActionsProxAtendimento({ agendamento }: ActionsProxAtendimentoProps) {
  const [editarOpen, setEditarOpen] = useState(false);
  const [arquivoOpen, setArquivoOpen] = useState(false);
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
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Contatar </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>Ficha do paciente</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setArquivoOpen(true)}>
            Arquivos
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditarOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem> Ver informações de pagamento</DropdownMenuItem>
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
    </>
  );
}
