"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Upload } from "lucide-react";

export function ArquivosPaciente() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Arquivos do Paciente</h3>
        <Button size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="space-y-2">
        {[1, 2, 3].map((item) => (
          <Card
            key={item}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-sm">Documento_{item}.pdf</p>
                <p className="text-xs text-gray-500">Enviado em 15/01/2024</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
