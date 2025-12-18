"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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

interface DadosPessoaisProps {
  paciente: PacienteData;
}

export function DadosPessoais({ paciente }: DadosPessoaisProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Nome Completo</Label>
              <p className="font-medium">{paciente.nome}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">CPF</Label>
              <p className="font-medium">{paciente.cpf || "-"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Data de Nascimento</Label>
              <p className="font-medium">
                {paciente.dataNascimento 
                  ? new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")
                  : "-"}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Telefone</Label>
              <p className="font-medium">{paciente.telefone || "-"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{paciente.email || "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Endereço</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label className="text-muted-foreground">Logradouro</Label>
              <p className="font-medium">{paciente.endereco || "-"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Cidade</Label>
              <p className="font-medium">{paciente.cidade || "-"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Estado</Label>
              <p className="font-medium">{paciente.estado || "-"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">CEP</Label>
              <p className="font-medium">{paciente.cep || "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {paciente.observacoes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{paciente.observacoes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}