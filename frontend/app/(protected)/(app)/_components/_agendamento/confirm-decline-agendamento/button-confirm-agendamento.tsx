"use client";

import React, { useState } from "react";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ButtonConfirmAgendamentoProps {
    agendamentoId: number;
}

export function ButtonConfirmAgendamento({ 
    agendamentoId,
}: ButtonConfirmAgendamentoProps) {
    const [open, setOpen] = useState(false);
    const { mutate: updateAgendamento, isPending } = useUpdateAgendamento();

    const handleConfirm = () => {
        updateAgendamento(
            { id: agendamentoId, data: {
                status: "concluida",
            } },
            {
                onSuccess: () => {
                    toast.success("Agendamento concluído com sucesso!");
                    setOpen(false);
                },
                onError: (error) => {
                    toast.error("Erro ao marcar agendamento como concluído.");
                    console.error(error);
                }
            }
        );
    };

    return (
        <>
            <DropdownMenuItem 
                className="p-3 cursor-pointer gap-3 focus:bg-green-50 text-green-700 w-full"
                onSelect={(e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                <CheckCircle2 className="w-4 h-4" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold">Agendamento Feito</span>
                    <span className="text-[10px] opacity-70">Confirmar Agendamento</span>
                </div>
            </DropdownMenuItem>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            Confirmar Atendimento
                        </DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja marcar este agendamento como feito? Esta ação confirmará que o procedimento foi realizado.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button 
                            variant="outline" 
                            onClick={() => setOpen(false)}
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
        </>
    );
}
