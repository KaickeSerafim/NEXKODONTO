import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import DialogAddPaciente from "./dialog-add-paciente";

export default function ButtonAddPaciente() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <Button
            onClick={() => setIsOpen(true)}
            className="gap-2 shadow-md bg-primary hover:bg-primary/90 text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
            <Plus className="w-4 h-4" />
            Novo Paciente
        </Button>
        <DialogAddPaciente open={isOpen} onOpenChange={setIsOpen} />
    </>
    );
}