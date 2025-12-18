"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { formatarMoeda } from "@/app/functions/utils/formatar-moeda";
import { usePlanosTratamento } from "@/hooks/ficha-paciente/plano-tratamento/usePlanosTratamento";
import { PlanoTratamento, PrioridadeTratamentoLabels } from "@/app/schemas/ficha-paciente/planoTratamento";

interface TratamentosProps {
  pacienteId: number;
  initialData?: PlanoTratamento[];
}

export function Tratamentos({ pacienteId, initialData }: TratamentosProps) {
  // Hook próprio para atualizações
  const { data } = usePlanosTratamento({ pacienteId });
  
  // Usa dados do hook ou fallback para initialData
  const tratamentos = data?.data || initialData || [];

  const getPrioridadeVariant = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "destructive";
      case "media":
        return "default";
      case "baixa":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Planos de Tratamento</CardTitle>
      </CardHeader>
      <CardContent>
        {tratamentos.length > 0 ? (
          <div className="space-y-4">
            {tratamentos.map((plano) => (
              <div
                key={plano.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{plano.descricao || "Sem descrição"}</h4>
                    <p className="text-sm text-muted-foreground">
                      Dentista: {plano.dentista_nome || "Não atribuído"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getPrioridadeVariant(plano.prioridade)}>
                      {PrioridadeTratamentoLabels[plano.prioridade]}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm font-medium text-primary">
                    {formatarMoeda(plano.custo_estimado)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Nenhum plano de tratamento registrado
          </p>
        )}
      </CardContent>
    </Card>
  );
}