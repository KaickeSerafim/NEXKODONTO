"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { useUpdateAgendamento } from "@/hooks/agendamento/useUpdateAgendamento";
import { useState } from "react";
import { toast } from "sonner";

interface EditarAgendamentoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agendamento: Agendamento;
}

export function EditarAgendamento({ open, onOpenChange, agendamento }: EditarAgendamentoProps) {
  const { mutate, isPending } = useUpdateAgendamento();
  const [formData, setFormData] = useState<{
    data_hora: string;
    motivo: string;
    status: string;
    observacoes: string;
  }>({
    data_hora: agendamento.data_hora.slice(0, 16),
    motivo: agendamento.motivo || "",
    status: (agendamento.status ) || "",
    observacoes: agendamento.observacoes || "",
  });

  const handleSubmit = () => {
    mutate(
      { id: agendamento.id, data: formData },
      {
        onSuccess: () => {
          toast.success("Agendamento atualizado com sucesso!");
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast.error(error.message || "Erro ao atualizar agendamento");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Paciente</Label>
              <Input defaultValue={agendamento.paciente_detail.nome} disabled />
            </div>
            
            <div className="space-y-2">
              <Label>Data e Hora</Label>
              <Input 
                type="datetime-local" 
                value={formData.data_hora}
                onChange={(e) => setFormData({ ...formData, data_hora: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Motivo</Label>
            <Input 
              value={formData.motivo}
              onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value  })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agendada">Agendada</SelectItem>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea 
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
