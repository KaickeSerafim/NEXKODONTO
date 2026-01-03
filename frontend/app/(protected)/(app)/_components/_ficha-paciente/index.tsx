"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar,
  ClipboardList,
  History,
  Stethoscope
} from "lucide-react";

import { DadosPessoais } from "./dados-pessoais";
import { HistoricoMedico } from "./historico-medico";
import { Atendimentos } from "./atendimentos";
import { Tratamentos } from "./tratamentos";
import { useFichaPaciente } from "@/hooks/ficha-paciente/useFichaPaciente";
import Loading from "@/components/loading/Loading";



interface FichaPacienteProps {
  pacienteId: number;

}

export default function FichaPaciente({ 
  pacienteId, 
 
}: FichaPacienteProps) {
  
  // Estratégia Híbrida: Busca inicial completa
  const { data: ficha, isLoading, error } = useFichaPaciente({ 
    pacienteId,
    enabled: !!pacienteId 
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
    <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>Erro ao carregar ficha do paciente</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  // Usa dados da API ou fallback para pacienteData
  const paciente = ficha?.data 



  if (!paciente) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho com informações principais */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{paciente.nome}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Paciente ID: #{paciente.id}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              Ativo
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label className="text-xs text-muted-foreground">
                  Telefone
                </Label>
                <p className="text-sm font-medium">
                  {paciente.telefone || "-"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="text-sm font-medium">
                  {paciente.email || "-"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label className="text-xs text-muted-foreground">
                  Data de Nascimento
                </Label>
                <p className="text-sm font-medium">
                  {paciente.data_nascimento
                    ? new Date(paciente.data_nascimento).toLocaleDateString(
                        "pt-BR"
                      )
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs com informações detalhadas */}
      <Tabs defaultValue="dados-pessoais" className="w-full">
        <TabsList className="grid w-full grid-cols-4 ">
          <TabsTrigger
            value="dados-pessoais"
            className="bg-slate-800 text-white ml-2 focus:border-4 focus:border-slate-800"
          >
            <User className="w-4 h-4 mr-2" />
            Dados Pessoais
          </TabsTrigger>
          <TabsTrigger
            value="historico-medico"
            className="bg-slate-800 text-white ml-2 focus:border-4 focus:border-slate-800"
          >
            <Stethoscope className="w-4 h-4 mr-2" />
            Histórico Médico
          </TabsTrigger>
          <TabsTrigger
            value="atendimentos"
            className="bg-slate-800 text-white ml-2 focus:border-4 focus:border-slate-800"
          >
            <History className="w-4 h-4 mr-2" />
            Atendimentos
          </TabsTrigger>
          <TabsTrigger
            value="tratamentos"
            className="bg-slate-800 text-white ml-2 focus:border-4 focus:border-slate-800"
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Tratamento
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="dados-pessoais"
          className="space-y-4 border-2 border-slate-800 rounded-lg"
        >
          <DadosPessoais paciente={paciente} />
        </TabsContent>

        <TabsContent
          value="historico-medico"
          className="space-y-4 border-2 border-slate-800 rounded-lg"
        >
          <HistoricoMedico 
            pacienteId={pacienteId}
            initialData={ficha?.data.historico_medico}
          />
        </TabsContent>

        <TabsContent
          value="atendimentos"
          className="space-y-4 border-2 border-slate-800 rounded-lg"
        >
          <Atendimentos 
            pacienteId={pacienteId}
            consultas={ficha?.data.consultas}
            atendimentos={ficha?.data.atendimentos_historico}
          />
        </TabsContent>

        <TabsContent
          value="tratamentos"
          className="space-y-4 border-2 border-slate-800 rounded-lg"
        >
          <Tratamentos 
            pacienteId={pacienteId}
            initialData={ficha?.data.planos_tratamento}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}