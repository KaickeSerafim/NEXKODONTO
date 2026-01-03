"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { Atendimento } from "@/app/schemas/ficha-paciente/atendimento";
import { formatarDataHora } from "@/app/functions/utils/formatar-data-hora";
import { getStatusConfig } from "@/app/functions/utils/get-status-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Calendar, FileText } from "lucide-react";

interface AtendimentosProps {
  pacienteId: number;
  consultas?: Agendamento[];
  atendimentos?: Atendimento[];
}

export function Atendimentos({ pacienteId, consultas = [], atendimentos = [] }: AtendimentosProps) {
  return (
    <div className="p-4">
      <Tabs defaultValue="historico" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="historico" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Histórico Clínico
          </TabsTrigger>
          <TabsTrigger value="agenda" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Agenda Completa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Histórico de Atendimentos e Cancelamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {atendimentos.length > 0 ? (
                <div className="space-y-4">
                  {atendimentos.map((at) => (
                    <div
                      key={at.id}
                      className="border rounded-xl p-4 bg-white hover:shadow-md transition-all border-l-4 border-l-primary/40"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                            {formatarDataHora(at.agendamento_data)}
                          </p>
                          <h4 className="font-bold text-gray-900">{at.diagnostico}</h4>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase">Procedimento / Conduta:</p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">
                          {at.tratamento_realizado}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                  <p>Nenhum atendimento clínico registrado no histórico.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agenda">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Registro de Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              {consultas.length > 0 ? (
                <div className="space-y-3">
                  {consultas.map((consulta) => (
                    <div
                      key={consulta.id}
                      className="border rounded-lg p-3 hover:bg-muted/50 transition flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground font-medium">
                          {formatarDataHora(consulta.data_hora)}
                        </span>
                        <h4 className="font-bold text-sm">{consulta.motivo || "Consulta Geral"}</h4>
                      </div>
                      <Badge className={getStatusConfig(consulta.status).className}>
                        {getStatusConfig(consulta.status).label}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma consulta agendada
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}