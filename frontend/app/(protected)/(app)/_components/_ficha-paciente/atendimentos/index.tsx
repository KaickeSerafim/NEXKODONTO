"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConsultaData {
  id: number;
  data: string;
  tipo: string;
  dentista: string;
  status: string;
  observacoes?: string;
}

interface AtendimentosProps {
  consultas: ConsultaData[];
}

export function Atendimentos({ consultas }: AtendimentosProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Consultas Anteriores</CardTitle>
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
                    <h4 className="font-semibold">{consulta.tipo}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(consulta.data).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <Badge variant="outline">{consulta.status}</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Dentista:</span>{" "}
                    {consulta.dentista}
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