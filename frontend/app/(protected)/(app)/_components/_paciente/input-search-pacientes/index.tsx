"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, User, Loader2, X, ChevronRight } from "lucide-react";
import { usePacientes } from "@/hooks/paciente/usePacientes";
import { useDebounce } from "@/hooks/useDebounce";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/utils";
import { Paciente } from "@/app/schemas/paciente/paciente";

interface InputSearchPacienteProps {
    onSelect?: (paciente: Paciente) => void;
    className?: string;
    placeholder?: string;
}

export default function InputSearchPaciente({ 
    onSelect, 
    className,
    placeholder = "Buscar paciente pelo nome ou CPF..." 
}: InputSearchPacienteProps) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
    const debouncedSearch = useDebounce(search, 400);
    
    // Fetch patients. When search is empty, it fetch the latest (default pagination ordering is -criado_em)
    const { data: response, isLoading } = usePacientes(debouncedSearch);
    const pacientes = response?.data?.results || [];

    const handleSelect = (paciente: Paciente) => {
        setSearch(paciente.nome);
        setSelectedPaciente(paciente);
        setIsOpen(false);
        if (onSelect) {
            onSelect(paciente);
        }
    };

    const handleClear = () => {
        setSearch("");
        setSelectedPaciente(null);
        if (onSelect) {
            onSelect({} as Paciente);
        }
    };

    return (
        <div className={cn("relative w-full", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <div className="relative group">
                        <div className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10",
                            isOpen ? "text-primary" : "text-gray-400"
                        )}>
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Search className="h-4 w-4" />
                            )}
                        </div>
                        <Input
                            type="text"
                            placeholder={placeholder}
                            className={cn(
                                "pl-10 pr-10 h-11 bg-white border-gray-200 focus:border-primary/50 focus:ring-primary/10 transition-all rounded-xl shadow-sm font-medium",
                                isOpen && "ring-2 ring-primary/10 border-primary/50",
                                selectedPaciente && !isOpen && "border-green-100 bg-green-50/30"
                            )}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setSelectedPaciente(null);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                        />
                        <AnimatePresence>
                            {search && (
                                <motion.button 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={handleClear}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
                                >
                                    <X className="h-3.5 w-3.5 text-gray-400" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </PopoverTrigger>
                <PopoverContent 
                    className="p-0 border-gray-100 shadow-2xl rounded-2xl overflow-hidden mt-2 bg-white/95 backdrop-blur-sm z-[100]" 
                    align="start"
                    sideOffset={5}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    style={{ width: 'var(--radix-popover-trigger-width)' }}
                >
                    <div className="flex flex-col max-h-[400px]">
                        <div className="p-3 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">
                                {search ? "Resultados da busca" : "Recém cadastrados"}
                            </span>
                            {isLoading && (
                                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                            )}
                        </div>
                        
                        <div className="overflow-y-auto custom-scrollbar">
                            {isLoading && pacientes.length === 0 ? (
                                <div className="p-8 flex flex-col items-center justify-center space-y-3">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                        <Loader2 className="h-8 w-8 text-primary animate-spin relative" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500">Buscando na base de dados...</span>
                                </div>
                            ) : pacientes.length > 0 ? (
                                <div className="p-1">
                                    {pacientes.map((paciente, index) => (
                                        <motion.button
                                            key={paciente.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="group w-full flex items-center justify-between p-3 hover:bg-primary/5 rounded-xl transition-all duration-200 text-left"
                                            onClick={() => handleSelect(paciente)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <User className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                                                        {paciente.nome}
                                                    </span>
                                                    <div className="flex items-center space-x-2 text-[11px] text-gray-500">
                                                        {paciente.cpf && (
                                                            <span className="px-1.5 py-0.5 bg-gray-100 rounded-md font-medium">{paciente.cpf}</span>
                                                        )}
                                                        {paciente.telefone && (
                                                            <span>• {paciente.telefone}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
                                        </motion.button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 flex flex-col items-center justify-center text-center">
                                    <div className="p-3 bg-gray-50 rounded-full mb-3">
                                        <Search className="h-6 w-6 text-gray-300" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-900">Nenhum paciente encontrado</h3>
                                    <p className="text-xs text-gray-500 mt-1 max-w-[180px]">
                                        Tente buscar por outro nome ou CPF
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}