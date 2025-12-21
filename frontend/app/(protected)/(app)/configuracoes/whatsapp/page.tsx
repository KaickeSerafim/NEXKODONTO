"use client";

import { useEffect, useState } from "react";
import { getWhatsAppStatus, startWhatsAppSession, logoutWhatsAppSession, WhatsAppStatus } from "@/lib/api/whatsapp";
import { Button } from "@/components/ui/button";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, LogOut, Smartphone } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function WhatsAppConfigPage() {
  const [status, setStatus] = useState<WhatsAppStatus['status']>('UNKNOWN');
  const [qrCode, setQrCode] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      // setLoading(true); // Opcional: não mostrar loading em refresh manual para não piscar
      const data = await getWhatsAppStatus();
      setStatus(data.status);
      setQrCode(data.qrCode);
    } catch (error) {
        console.error(error);
      toast.error("Erro ao verificar status do WhatsApp");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Opcional: Polling para atualizar o status automaticamente se estiver esperando QR Code ou conectando
    const interval = setInterval(() => {
        if (status === 'STARTING' || status === 'SCAN_QR_CODE') {
            fetchStatus();
        }
    }, 5000);
    return () => clearInterval(interval);
  }, [status]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await startWhatsAppSession();
      toast.success("Sessão iniciada. Aguarde o QR Code.");
      fetchStatus();
    } catch (error) {
        console.error(error);
      toast.error("Erro ao iniciar sessão.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutWhatsAppSession();
      toast.success("Desconectado com sucesso.");
      fetchStatus();
    } catch (error) {
        console.error(error);
      toast.error("Erro ao desconectar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuração WhatsApp</h1>
        <p className="text-muted-foreground">
          Gerencie a conexão do seu chatbot com o WhatsApp.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status da Conexão</CardTitle>
          
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                status === 'CONNECTED' ? 'bg-green-500' : 
                status === 'SCAN_QR_CODE' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="font-medium">
                {status === 'CONNECTED' ? 'Conectado' : 
                 status === 'SCAN_QR_CODE' ? 'Aguardando Leitura do QR Code' :
                 status === 'STARTING' ? 'Iniciando...' :
                 status === 'DISCONNECTED' ? 'Desconectado' : 'Status Desconhecido'}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={fetchStatus} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>

          {status === 'SCAN_QR_CODE' && qrCode && (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <h3 className="mb-4 font-semibold text-center">Escaneie o QR Code com seu WhatsApp</h3>
              <div className="relative w-64 h-64 bg-white p-2 shadow-sm rounded-lg overflow-hidden">
                {/* Assumindo que o qrCode vem como base64 data url, se não, ajustar src */}
                <Image 
                  src={qrCode} 
                  alt="QR Code WhatsApp" 
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">Abra o WhatsApp no seu celular {'>'} Aparelhos conectados {'>'} Conectar aparelho</p>
            </div>
          )}

          <div className="flex gap-4">
            {status !== 'CONNECTED' && status !== 'SCAN_QR_CODE' && status !== 'STARTING' && (
              <Button onClick={handleConnect} disabled={loading}>
                <Smartphone className="w-4 h-4 mr-2" />
                Conectar WhatsApp
              </Button>
            )}

            {(status === 'CONNECTED' || status === 'SCAN_QR_CODE') && (
              <Button variant="destructive" onClick={handleLogout} disabled={loading}>
                <LogOut className="w-4 h-4 mr-2" />
                Desconectar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
