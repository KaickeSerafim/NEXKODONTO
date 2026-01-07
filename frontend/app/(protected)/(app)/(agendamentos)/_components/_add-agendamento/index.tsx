"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogAddAgendamento } from "./dialog-add-agendamento";

export default function ButtonAddAgendamento() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className="gap-2 shadow-md bg-primary hover:bg-primary/90 text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Plus className="w-4 h-4" />
        Novo Agendamento
      </Button>

      <DialogAddAgendamento 
        open={isOpen} 
        onOpenChange={setIsOpen} 
      />
    </>
  );
}