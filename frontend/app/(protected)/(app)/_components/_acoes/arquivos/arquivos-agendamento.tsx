"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useListDocumentos } from "@/hooks/documents/useListDocumentos";
import LoadingLogoNexk from "@/components/loading/loading-logo-nexk";
import { BotaoUploadArquivos } from "./botao-upload-arquivos";
import { useDocumentosDownload } from "@/hooks/documents/useDocumentosDownload";
import { formatarDataHora } from "@/app/functions/utils/formatar-data-hora";
import { BotaoEditarDocumento } from "./botao-editar-documento";
import { BotaoExcluirDocumento } from "./botao-excluir-documento";
import { BotaoDonwnloadDocumento } from "./botao-download-arquivo";

interface ArquivosAgendamentoProps {
  agendamentoId: number;
  pacienteId: number;
}

export function ArquivosAgendamento({ agendamentoId, pacienteId }: ArquivosAgendamentoProps) {
  const { data, isLoading } = useListDocumentos({ agendamento: agendamentoId });
  const documentosAgendamento = data?.data || [];


  if (isLoading) {
    return <LoadingLogoNexk />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Arquivos deste Agendamento</h3>
        <BotaoUploadArquivos
          pacienteId={pacienteId}
          agendamentoId={agendamentoId}
        />
      </div>

      <div className="space-y-2">
        {documentosAgendamento.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            Nenhum arquivo encontrado
          </p>
        ) : (
          documentosAgendamento.map((doc) => (
            <Card
              key={doc.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-500" />
                <div className="text-sm">{doc.nome}</div>
                <div className="border-l-2 ml-4 pl-4  border-l-slate-900">
                  <p className="font-medium text-sm">
                    Tipo de documento: <span>{doc.tipo}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Enviado por:{" "}
                    <span>{doc.enviado_por_detail?.nome || "-"}</span> <br />{" "}
                    em: <span>{formatarDataHora(doc.criado_em)}</span>
                  </p>
                </div>
                <div className="border-l-2 ml-4 pl-4   border-l-slate-900">
                  <p className=""></p>
                  <p className="text-center text-xs text-gray-500">
                    Descricao: <br /> <span>{doc.descricao || "-"}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ">
                <BotaoEditarDocumento documento={doc} />
                <BotaoDonwnloadDocumento documentoId={doc.id} />
                <BotaoExcluirDocumento documentoId={doc.id} />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
