"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { useUpdateAgendamento } from "@/hooks/agendamento/useUpdateAgendamento";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ButtonDeclineAgendamentoProps {
    agendamentoId: number;
}

export function ButtonDeclineAgendamento({ 
    agendamentoId,
}: ButtonDeclineAgendamentoProps) {
    const [open, setOpen] = useState(false);
    const { mutate: updateAgendamento, isPending } = useUpdateAgendamento();

    const handleConfirm = () => {
        updateAgendamento(
            { id: agendamentoId, data: { status: "faltou" } },
            {
                onSuccess: () => {
                    toast.warning("Consulta marcada como não realizada (Falta).");
                    setOpen(false);
                },
                onError: (error) => {
                    toast.error("Erro ao atualizar o status do agendamento.");
                    console.error(error);
                }
            }
        );
    };

    return (
        <>
            <DropdownMenuItem 
                className="p-3 cursor-pointer gap-3 focus:bg-red-50 text-red-600 border-b border-slate-800 w-full"
                onSelect={(e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                <XCircle className="w-4 h-4" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold">Agendamento Não Feita</span>
                    <span className="text-[10px] opacity-70">Marcar como falta</span>
                </div>
            </DropdownMenuItem>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <XCircle className="w-5 h-5" />
                            Agendamento Não Feita
                        </DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja marcar este agendamento como não feito? O paciente será registrado como ausente (Falta).
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button 
                            variant="outline" 
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Voltar
                        </Button>
                        <Button 
                            variant="destructive"
                            className="font-bold"
                            onClick={handleConfirm}
                            disabled={isPending}
                        >
                            {isPending ? "Processando..." : "Sim, confirmar falta"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
