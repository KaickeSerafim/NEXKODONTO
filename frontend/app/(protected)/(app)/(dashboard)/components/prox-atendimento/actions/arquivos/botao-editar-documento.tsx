"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDocumentosUpdate } from "@/hooks/documents/useDocumentosUpdate";
import { Documento } from "@/app/schemas/documents/documents";
import { Checkbox } from "@/components/ui/checkbox";
import { useListAgendamentos } from "@/hooks/agendamento/useListAgendamentos";

interface BotaoEditarDocumentoProps {
  documento: Documento;
  agendamentoId?: number;
}

export function BotaoEditarDocumento({ documento, agendamentoId }: BotaoEditarDocumentoProps) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(documento.nome);
  const [descricao, setDescricao] = useState(documento.descricao || "");
  const [tipo, setTipo] = useState(documento.tipo);
  const [vincularAgendamento, setVincularAgendamento] = useState(!!documento.agendamento);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<number | null>(documento.agendamento);
  const { mutate: updateDoc } = useDocumentosUpdate();
  const { data: agendamentosData } = useListAgendamentos({ paciente: documento.paciente });
  const agendamentos = agendamentosData?.data || [];

  const isFromAgendamento = agendamentoId !== undefined;

  const handleUpdate = () => {
    const agendamento = isFromAgendamento 
      ? (vincularAgendamento ? agendamentoId : null)
      : agendamentoSelecionado;
    
    updateDoc({ id: documento.id, nome, descricao, tipo, agendamento });
    setOpen(false);
  };

  return (
    <>
      <Button size="sm"  onClick={() => setOpen(true)}>
        <Edit className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Documento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exame">Exame</SelectItem>
                  <SelectItem value="raio_x">Raio-X</SelectItem>
                  <SelectItem value="foto">Foto</SelectItem>
                  <SelectItem value="documento">Documento</SelectItem>
                  <SelectItem value="comprovante">Comprovante</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Descrição</Label>
              <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            {isFromAgendamento ? (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={vincularAgendamento} 
                  onCheckedChange={(checked) => setVincularAgendamento(!!checked)}
                />
                <Label>Vincular a este agendamento</Label>
              </div>
            ) : (
              <div>
                <Label>Agendamento</Label>
                <Select 
                  value={agendamentoSelecionado?.toString() || "nenhum"} 
                  onValueChange={(value) => setAgendamentoSelecionado(value === "nenhum" ? null : Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nenhum">Nenhum</SelectItem>
                    {agendamentos.map((ag) => (
                      <SelectItem key={ag.id} value={ag.id.toString()}>
                        {ag.motivo} - {new Date(ag.data_hora).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button onClick={handleUpdate}>Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
