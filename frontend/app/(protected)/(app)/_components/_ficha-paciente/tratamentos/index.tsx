"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TratamentoData {
  id: number;
  procedimento: string;
  dente: string;
  status: string;
  prioridade: string;
  valor: string;
}

interface TratamentosProps {
  tratamentos: TratamentoData[];
}

export function Tratamentos({ tratamentos }: TratamentosProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Procedimentos Planejados</CardTitle>
      </CardHeader>
      <CardContent>
        {tratamentos.length > 0 ? (
          <div className="space-y-4">
            {tratamentos.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{item.procedimento}</h4>
                    <p className="text-sm text-muted-foreground">
                      Dente: {item.dente}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        item.prioridade === "Alta"
                          ? "destructive"
                          : item.prioridade === "Média"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {item.prioridade}
                    </Badge>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm font-medium text-primary">{item.valor}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Nenhum tratamento planejado
          </p>
        )}
      </CardContent>
    </Card>
  );
}