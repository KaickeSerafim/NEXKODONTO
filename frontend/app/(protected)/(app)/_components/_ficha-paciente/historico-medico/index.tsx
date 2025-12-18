"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface HistoricoMedicoData {
  alergias: string[];
  medicamentosUso: string[];
  condicoesPreexistentes: string[];
  cirurgiasAnteriores: string[];
}

interface HistoricoMedicoProps {
  historicoMedico: HistoricoMedicoData;
}

export function HistoricoMedico({ historicoMedico }: HistoricoMedicoProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Alergias
          </CardTitle>
        </CardHeader>
        <CardContent>
          {historicoMedico.alergias.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {historicoMedico.alergias.map((alergia, index) => (
                <Badge key={index} variant="destructive">
                  {alergia}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma alergia registrada</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Medicamentos em Uso</CardTitle>
        </CardHeader>
        <CardContent>
          {historicoMedico.medicamentosUso.length > 0 ? (
            <ul className="space-y-2">
              {historicoMedico.medicamentosUso.map((medicamento, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">{medicamento}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum medicamento registrado</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Condições Pré-existentes</CardTitle>
        </CardHeader>
        <CardContent>
          {historicoMedico.condicoesPreexistentes.length > 0 ? (
            <ul className="space-y-2">
              {historicoMedico.condicoesPreexistentes.map((condicao, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-sm">{condicao}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma condição registrada</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cirurgias Anteriores</CardTitle>
        </CardHeader>
        <CardContent>
          {historicoMedico.cirurgiasAnteriores.length > 0 ? (
            <ul className="space-y-2">
              {historicoMedico.cirurgiasAnteriores.map((cirurgia, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm">{cirurgia}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma cirurgia registrada</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}