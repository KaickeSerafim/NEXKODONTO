import { Pagamento } from "@/app/schemas/pagamento/pagamento";
import { PagamentoCard } from "./PagamentoCard";
import { User } from "lucide-react";

interface HistoricoPagamentosProps {
  pagamentos: Pagamento[];
}

export function HistoricoPagamentos({ pagamentos }: HistoricoPagamentosProps) {
  if (pagamentos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pt-4 border-t">
        <User className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium text-sm">
          Histórico de Pagamentos do Paciente ({pagamentos.length})
        </h3>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {pagamentos.map((pagamento) => (
          <PagamentoCard key={pagamento.id} pagamento={pagamento} />
        ))}
      </div>
    </div>
  );
}
