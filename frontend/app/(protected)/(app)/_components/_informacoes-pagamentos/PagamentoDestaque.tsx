import { Pagamento } from "@/app/schemas/pagamento/pagamento";
import { PagamentoCard } from "./PagamentoCard";

interface PagamentoDestaqueProps {
  pagamento: Pagamento | null;
}

export function PagamentoDestaque({ pagamento }: PagamentoDestaqueProps) {
  if (!pagamento) {
    return (
      <div className="p-4 rounded-lg border border-dashed bg-muted/30 text-center">
        <p className="text-sm text-muted-foreground">
          Nenhum pagamento registrado para este agendamento
        </p>
      </div>
    );
  }

  return <PagamentoCard pagamento={pagamento} isDestaque />;
}
