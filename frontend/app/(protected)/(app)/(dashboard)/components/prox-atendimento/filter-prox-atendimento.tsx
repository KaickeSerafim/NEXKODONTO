"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface FilterProxAtendimentoProps {
  onFilterChange: (filters: { motivo?: string; pagamento?: string; periodo?: string; status?: string }) => void;
}

export function FilterProxAtendimento({ onFilterChange }: FilterProxAtendimentoProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>
      
      <Select onValueChange={(value) => onFilterChange({ motivo: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Motivo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="consulta">Consulta</SelectItem>
          <SelectItem value="limpeza">Limpeza</SelectItem>
          <SelectItem value="emergencia">Emergência</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange({ pagamento: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pagamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="pago">Pago</SelectItem>
          <SelectItem value="pendente">Pendente</SelectItem>
          <SelectItem value="cancelado">Cancelado</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange({ periodo: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Horário" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="07">07:00 - 08:00</SelectItem>
          <SelectItem value="08">08:00 - 09:00</SelectItem>
          <SelectItem value="09">09:00 - 10:00</SelectItem>
          <SelectItem value="10">10:00 - 11:00</SelectItem>
          <SelectItem value="11">11:00 - 12:00</SelectItem>
          <SelectItem value="12">12:00 - 13:00</SelectItem>
          <SelectItem value="13">13:00 - 14:00</SelectItem>
          <SelectItem value="14">14:00 - 15:00</SelectItem>
          <SelectItem value="15">15:00 - 16:00</SelectItem>
          <SelectItem value="16">16:00 - 17:00</SelectItem>
          <SelectItem value="17">17:00 - 18:00</SelectItem>
          <SelectItem value="18">18:00 - 19:00</SelectItem>
          <SelectItem value="19">19:00 - 20:00</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange({ status: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="confirmada">Confirmada</SelectItem>
          <SelectItem value="cancelada">Cancelada</SelectItem>
          <SelectItem value="pendente">Pendente</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}