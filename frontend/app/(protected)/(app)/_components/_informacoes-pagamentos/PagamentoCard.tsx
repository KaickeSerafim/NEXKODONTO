import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MetodoPagamentoLabels, StatusPagamentoLabels, Pagamento } from "@/app/schemas/pagamento/pagamento";
import { FileText, Calendar } from "lucide-react";
import { getStatusPagamentoConfig } from "@/app/functions/utils/get-status-pagamento-config";
import { formatarMoeda } from "@/app/functions/utils/formatar-moeda";
import { formatarDataHora } from "@/app/functions/utils/formatar-data-hora";

interface PagamentoCardProps {
  pagamento: Pagamento;
  isDestaque?: boolean;
}

export function PagamentoCard({ pagamento, isDestaque = false }: PagamentoCardProps) {
  return (
    <div 
      className={`space-y-4 p-4 rounded-lg border ${
        isDestaque ? 'bg-primary/5 border-primary' : 'bg-muted/50'
      }`}
    >
      {isDestaque && (
        <div className="flex items-center gap-2 text-primary font-medium mb-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Pagamento deste Agendamento</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Valor</Label>
          <p className={`font-semibold ${isDestaque ? 'text-xl' : 'text-lg'}`}>
            {formatarMoeda(pagamento.valor)}
          </p>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Status</Label>
          <div>
            <Badge className={getStatusPagamentoConfig(pagamento.status).className}>
              {getStatusPagamentoConfig(pagamento.status).label}
            </Badge>
          </div>
        </div>
      </div>

      {pagamento.metodo && (
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Método de Pagamento</Label>
          <p className="text-sm">{MetodoPagamentoLabels[pagamento.metodo]}</p>
        </div>
      )}

      {pagamento.pago_em && (
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Data de Pagamento</Label>
          <p className="text-sm">{formatarDataHora(pagamento.pago_em)}</p>
        </div>
      )}

      {pagamento.comprovante && typeof pagamento.comprovante === 'string' && (
        <a 
          href={pagamento.comprovante} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <FileText className="h-3 w-3" />
          Ver comprovante
        </a>
      )}

      {pagamento.observacoes && (
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Observações</Label>
          <p className="text-sm whitespace-pre-wrap bg-background p-2 rounded">
            {pagamento.observacoes}
          </p>
        </div>
      )}
    </div>
  );
}
