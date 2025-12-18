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

interface PacienteData {
  id: number;
  nome: string;
  telefone: string | null;
  email: string | null;
  dentista: number;
  dataNascimento?: string;
  cpf?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  observacoes?: string;
}

interface FichaPacienteProps {
  pacienteId?: number;
  pacienteData?: PacienteData;
  isLoading?: boolean;
}

export default function FichaPaciente({ 
  pacienteId, 
  pacienteData,
  isLoading = false 
}: FichaPacienteProps) {
  
  // Mock data para demonstração - substitua com dados reais da API
  const mockPaciente: PacienteData = pacienteData || {
    id: pacienteId || 1,
    nome: "Maria Silva Santos",
    telefone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    dentista: 1,
    dataNascimento: "1985-03-15",
    cpf: "123.456.789-00",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    observacoes: "Paciente com histórico de sensibilidade dentária"
  };

  const historicoConsultas = [
    {
      id: 1,
      data: "2024-01-10",
      tipo: "Limpeza",
      dentista: "Dr. João Silva",
      status: "Concluída",
      observacoes: "Limpeza completa realizada"
    },
    {
      id: 2,
      data: "2023-12-15",
      tipo: "Consulta",
      dentista: "Dr. João Silva",
      status: "Concluída",
      observacoes: "Avaliação geral"
    },
    {
      id: 3,
      data: "2023-11-20",
      tipo: "Tratamento Canal",
      dentista: "Dr. João Silva",
      status: "Concluída",
      observacoes: "Canal no dente 16"
    }
  ];

  const planoTratamento = [
    {
      id: 1,
      procedimento: "Restauração",
      dente: "26",
      status: "Pendente",
      prioridade: "Alta",
      valor: "R$ 250,00"
    },
    {
      id: 2,
      procedimento: "Limpeza",
      dente: "-",
      status: "Agendado",
      prioridade: "Média",
      valor: "R$ 150,00"
    }
  ];

  const historicoMedico = {
    alergias: ["Penicilina"],
    medicamentosUso: ["Losartana 50mg"],
    condicoesPreexistentes: ["Hipertensão"],
    cirurgiasAnteriores: ["Apendicectomia (2010)"]
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
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
                <CardTitle className="text-2xl">{mockPaciente.nome}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Paciente ID: #{mockPaciente.id}
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
                  {mockPaciente.telefone || "-"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="text-sm font-medium">
                  {mockPaciente.email || "-"}
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
                  {mockPaciente.dataNascimento
                    ? new Date(mockPaciente.dataNascimento).toLocaleDateString(
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
          <DadosPessoais paciente={mockPaciente} />
        </TabsContent>

        <TabsContent
          value="historico-medico"
          className="space-y-4 border-2 border-slate-800 rounded-lg"
        >
          <HistoricoMedico historicoMedico={historicoMedico} />
        </TabsContent>

        <TabsContent
          value="atendimentos"
          className="space-y-4 border-2 border-slate-800 rounded-lg"
        >
          <Atendimentos consultas={historicoConsultas} />
        </TabsContent>

        <TabsContent
          value="tratamentos"
          className="space-y-4 border-2 border-slate-800 rounded-lg"
        >
          <Tratamentos tratamentos={planoTratamento} />
        </TabsContent>
      </Tabs>
    </div>
  );
}