

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface DialogAddPacienteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DialogAddPaciente({ open, onOpenChange }: DialogAddPacienteProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo Paciente</DialogTitle>
                    <DialogDescription>
                        Preencha as informações para adicionar um novo paciente.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}