"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useDocumentosUpload } from "@/hooks/documents/useDocumentosUpload";
import { toast } from "sonner";

interface BotaoUploadArquivosProps {
  pacienteId: number;
  agendamentoId?: number;
}

export function BotaoUploadArquivos({ pacienteId, agendamentoId }: BotaoUploadArquivosProps) {
  const isFromAgendamento = agendamentoId !== undefined;
  const [open, setOpen] = useState(false);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [usarNomeArquivo, setUsarNomeArquivo] = useState(false);
  const [vincularAgendamento, setVincularAgendamento] = useState(false);
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const { mutate, isPending } = useDocumentosUpload();

  const handleSubmit = () => {
    if (!arquivo || !tipo) {
      toast.error("Selecione um arquivo e o tipo");
      return;
    }

    const nomeDocumento = usarNomeArquivo ? arquivo.name : nome;

    if (!nomeDocumento) {
      toast.error("Informe um nome para o documento");
      return;
    }

    try {
      mutate(
        {
          nome: nomeDocumento,
          paciente: pacienteId,
          agendamento: isFromAgendamento && vincularAgendamento ? agendamentoId : undefined,
          arquivo,
          tipo: tipo as "exame" | "raio_x" | "foto" | "documento" | "comprovante",
          descricao,
        },
        {
          onSuccess: () => {
            toast.success("Arquivo enviado com sucesso!");
            setOpen(false);
            setArquivo(null);
            setNome("");
            setUsarNomeArquivo(false);
            setVincularAgendamento(false);
            setTipo("");
            setDescricao("");
          },
          onError: (error: any) => {
            toast.error(error.message || "Erro ao enviar arquivo");
          },
        }
      );
    } catch (error: any) {
      toast.error(error.message || "Erro de validação");
    }
  };

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Upload className="w-4 h-4 mr-2" />
        Upload
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload de Arquivo</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Arquivo</Label>
              <Input
                type="file"
                accept=".pdf,.txt,.png,.jpg,.jpeg,.doc,.docx"
                onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-gray-500">
                Máximo 10MB. Formatos: PDF, TXT, PNG, JPG, Word
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="usarNomeArquivo"
                checked={usarNomeArquivo}
                onChange={(e) => setUsarNomeArquivo(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="usarNomeArquivo" className="cursor-pointer">
                Usar nome do arquivo
              </Label>
            </div>

            {isFromAgendamento && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="vincularAgendamento"
                  checked={vincularAgendamento}
                  onChange={(e) => setVincularAgendamento(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="vincularAgendamento" className="cursor-pointer">
                  Vincular a este agendamento
                </Label>
              </div>
            )}

            {!usarNomeArquivo && (
              <div className="space-y-2">
                <Label>Nome do Documento</Label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome do documento"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
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

            <div className="space-y-2">
              <Label>Descrição (opcional)</Label>
              <Textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
