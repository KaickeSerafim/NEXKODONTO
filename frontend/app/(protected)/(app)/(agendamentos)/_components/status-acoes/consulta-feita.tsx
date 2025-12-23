"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
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

interface ConsultaFeitaProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    agendamentoId: number;
}

export function ConsultaFeita({ 
    open,
    onOpenChange,
    agendamentoId,
}: ConsultaFeitaProps) {
    const { mutate: updateAgendamento, isPending } = useUpdateAgendamento();

    const handleConfirm = () => {
        updateAgendamento(
            { id: agendamentoId, data: { status: "concluida" } },
            {
                onSuccess: () => {
                    toast.success("Consulta concluída com sucesso!");
                    onOpenChange(false);
                },
                onError: (error) => {
                    toast.error("Erro ao marcar consulta como concluída.");
                    console.error(error);
                }
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Consulta Feita
                    </DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja marcar esta consulta como feita? Esta ação confirmará que o procedimento foi realizado.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                    >
                        Não, voltar
                    </Button>
                    <Button 
                        className="bg-green-600 hover:bg-green-700 text-white font-bold"
                        onClick={handleConfirm}
                        disabled={isPending}
                    >
                        {isPending ? "Processando..." : "Confirmar Atendimento"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
