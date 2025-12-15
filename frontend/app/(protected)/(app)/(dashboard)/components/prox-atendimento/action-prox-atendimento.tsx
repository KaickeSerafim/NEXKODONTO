import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function ActionsProxAtendimento() {
    return (


     <DropdownMenu>
       <DropdownMenuTrigger asChild>
         <Button className="font-medium  text-sm border border-primary/40 hover:bg-primary/10 hover:text-primary transition flex items-center gap-2">
           Ações
           <ChevronDown className="w-4 h-4" />
         </Button>
       </DropdownMenuTrigger>

       <DropdownMenuContent align="end" className="w-40 bg-slate-800  text-white">
         <DropdownMenuLabel>Ações</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuItem>Contatar </DropdownMenuItem>

         <DropdownMenuSeparator />
         <DropdownMenuItem>Ficha do paciente</DropdownMenuItem>
         <DropdownMenuItem>Arquivos</DropdownMenuItem>
         <DropdownMenuItem>Editar</DropdownMenuItem>
         <DropdownMenuSeparator />
         <DropdownMenuItem > Cancelar</DropdownMenuItem>
       </DropdownMenuContent>
     </DropdownMenu>



    )
}
