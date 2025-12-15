"use client"

import { Button } from "@/components/ui/button";
import { LogoutUser } from "@/lib/api/logout/logout";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LougoutUser() {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const onLogout = async () => {
        setError(null);
        setIsLoading(true);
    
        try {
          await LogoutUser();
          router.replace("/"); 
        } catch (err: any) {
          setError(err.message ?? "Erro ao sair.");
        } finally {
          setIsLoading(false);
        }
      };
    
    return (
      <Button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-400 rounded-lg transition"
      >
        <LogOut className="w-5 h-5" />
        <span>Sair</span>
        {isLoading && <span>Saindo</span>}
      </Button>
    );
}