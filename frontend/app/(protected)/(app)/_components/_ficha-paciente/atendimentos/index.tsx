"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { formatarDataHora } from "@/app/functions/utils/formatar-data-hora";
import { getStatusConfig } from "@/app/functions/utils/get-status-config";

interface AtendimentosProps {
  pacienteId: number;
  consultas?: Agendamento[];
}

export function Atendimentos({ pacienteId, consultas = [] }: AtendimentosProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Consultas do Paciente</CardTitle>
      </CardHeader>
      <CardContent>
        {consultas.length > 0 ? (
          <div className="space-y-4">
            {consultas.map((consulta) => (
              <div
                key={consulta.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{consulta.motivo || "Consulta"}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatarDataHora(consulta.data_hora)}
                    </p>
                  </div>
                  <Badge className={getStatusConfig(consulta.status).className}>
                    {getStatusConfig(consulta.status).label}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Dentista:</span>{" "}
                    {consulta.dentista_detail?.nome_completo || "Não informado"}
                  </p>
                  {consulta.observacoes && (
                    <p>
                      <span className="text-muted-foreground">Observações:</span>{" "}
                      {consulta.observacoes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Nenhuma consulta registrada
          </p>
        )}
      </CardContent>
    </Card>
  );
}