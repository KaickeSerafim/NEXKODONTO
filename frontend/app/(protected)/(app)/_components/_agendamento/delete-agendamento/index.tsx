
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { useDesmarcarAgendamentos } from "@/hooks/agendamento/useDesmarcarAgendamentos";
import { handleDesmarcarSuccess, handleDesmarcarError } from "../../../(agendamentos)/_components/_opcoes-dia/_desmarcar";

export default function DeleteAgendamento({ 
    open,
    onOpenChange,
    agendamentoId,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    agendamentoId: number | string;
}) {
    const { mutate: desmarcarAgendamento, isPending } = useDesmarcarAgendamentos();

    const handleDelete = () => {
        desmarcarAgendamento(
            { agendamento_id: Number(agendamentoId) },
            {
                onSuccess: (data) => {
                    handleDesmarcarSuccess(data);
                    onOpenChange(false);
                },
                onError: (error: any) => {
                    handleDesmarcarError(error);
                }
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancelar Agendamento</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso cancelará permanentemente o agendamento.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                    <Label>Tem certeza que deseja cancelar este agendamento?</Label>
                </div>

                <DialogFooter>
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                    >
                        Voltar
                    </Button>
                    <Button 
                        variant="destructive" 
                        className="text-sm" 
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? (
                            "Cancelando..."
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Cancelar Agendamento
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
