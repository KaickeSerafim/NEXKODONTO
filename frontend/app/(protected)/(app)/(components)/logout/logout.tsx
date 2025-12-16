"use client"

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/login-logout/useLogout";

export default function LougoutUser() {
  const { mutate: logout, isPending } = useLogout();
    
  return (
    <Button
      onClick={() => logout()}
      disabled={isPending}
      className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-400 rounded-lg transition"
    >
      <LogOut className="w-5 h-5" />
      <span>{isPending ? "Saindo..." : "Sair"}</span>
    </Button>
  );
}