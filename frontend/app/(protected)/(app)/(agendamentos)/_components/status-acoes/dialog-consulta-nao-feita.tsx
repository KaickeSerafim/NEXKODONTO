"use client";

import React from "react";
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

interface ConsultaNaoFeitaProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    agendamentoId: number;
}

export function ConsultaNaoFeita({ 
    open,
    onOpenChange,
    agendamentoId,
}: ConsultaNaoFeitaProps) {
    const { mutate: updateAgendamento, isPending } = useUpdateAgendamento();

    const handleConfirm = () => {
        updateAgendamento(
            { id: agendamentoId, data: { status: "faltou" } },
            {
                onSuccess: () => {
                    toast.warning("Consulta marcada como não realizada (Falta).");
                    onOpenChange(false);
                },
                onError: (error) => {
                    toast.error("Erro ao atualizar o status do agendamento.");
                    console.error(error);
                }
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <XCircle className="w-5 h-5" />
                        Consulta Não Feita
                    </DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja marcar esta consulta como não feita? O paciente será registrado como ausente (Falta).
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)}
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
    );
}
