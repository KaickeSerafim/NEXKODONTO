"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Briefcase } from "lucide-react";
import { useHistoricoMedico } from "@/hooks/ficha-paciente/historico-medico/useHistoricoMedico";

import { HistoricoMedicoType } from "@/app/schemas/ficha-paciente/historicoMedico";



interface HistoricoMedicoProps {
  pacienteId: number;
  initialData?: HistoricoMedicoType | null;
}

export function HistoricoMedico({ pacienteId, initialData }: HistoricoMedicoProps) {
  // Hook próprio para possíveis atualizações futuras
  const { data } = useHistoricoMedico({ pacienteId });
  
  // Usa dados do hook ou fallback para initialData
  const historico = data?.data || initialData;

  // Função auxiliar para converter string em array
  const parseToArray = (value?: string | null): string[] => {
    if (!value) return [];
    return value.split(',').map(item => item.trim()).filter(Boolean);
  };

  const alergias = parseToArray(historico?.alergias);
  const medicamentos = parseToArray(historico?.medicamentos);
  const condicoes = parseToArray(historico?.condicoes_medicas);

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
          {alergias.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {alergias.map((alergia, index) => (
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
          
          <CardTitle className="text-lg flex items-center gap-2">  <Briefcase />Medicamentos em Uso</CardTitle>
        </CardHeader>
        <CardContent>
          {medicamentos.length > 0 ? (
            <ul className="space-y-2">
              {medicamentos.map((medicamento, index) => (
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
          {condicoes.length > 0 ? (
            <ul className="space-y-2">
              {condicoes.map((condicao, index) => (
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
    </div>
  );
}