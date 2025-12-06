import { Check, Clock } from "lucide-react";

export default function ConsultaSituacao({
  consultaSituacao,
}: {
  consultaSituacao: string;
}) {
  return (
    <>
      {consultaSituacao === "Confirmado" && (
        <span className="text-green-600 font-semibold flex gap-2 text-sm">Confirmado <Check /></span>
      )}
    {consultaSituacao === "Pendente" && (
        <span className="text-yellow-400 font-semibold flex gap-2 text-sm">Pendente <Clock size={16} /></span>
      )}
    </>
  );
}
