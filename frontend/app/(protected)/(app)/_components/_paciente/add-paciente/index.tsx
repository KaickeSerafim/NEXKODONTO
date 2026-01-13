"use client";

import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogAddPaciente from "./dialog-add-paciente";

export default function ButtonAddPaciente() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button 
        type="button"
        onClick={() => setOpen(true)}
        className="font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all h-11 px-6 rounded-xl flex items-center gap-2 group"
      >
        <div className="p-1 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
            <UserPlus className="w-4 h-4" />
        </div>
        Novo Paciente
      </Button>

      <DialogAddPaciente open={open} onOpenChange={setOpen} />
    </>
  );
}
