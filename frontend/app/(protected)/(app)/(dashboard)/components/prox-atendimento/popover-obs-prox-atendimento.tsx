import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function ObsProxAtendimento({ observacao }: { observacao: string | null }) {
  return (
    <Popover>
      <PopoverTrigger className="bg-slate-800 text-white border text-sm rounded-lg  p-3">
        Obs. do atendimento
      </PopoverTrigger>
      <PopoverContent>{observacao ? observacao : "Sem observações"}</PopoverContent>
    </Popover>
  );
}
      