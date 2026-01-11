"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Loader2, X, ChevronRight, Clock, DollarSign } from "lucide-react";
import { useProcedimentos } from "@/hooks/procedimento/useProcedimentos";
import { useDebounce } from "@/hooks/useDebounce";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/utils";
import { Procedimento } from "@/app/schemas/procedimento/procedimento";

interface InputSearchProcedimentoProps {
    onSelect?: (procedimento: Procedimento) => void;
    className?: string;
    placeholder?: string;
}

export default function InputSearchProcedimento({ 
    onSelect, 
    className,
    placeholder = "Buscar procedimento..." 
}: InputSearchProcedimentoProps) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProcedimento, setSelectedProcedimento] = useState<Procedimento | null>(null);
    const debouncedSearch = useDebounce(search, 400);
    
    // Fetch procedures. When search is empty, it fetch the latest (default pagination ordering is -criado_em)
    const { data: response, isLoading } = useProcedimentos(debouncedSearch);
    const procedimentos = response?.data?.results || [];

    const handleSelect = (procedimento: Procedimento) => {
        setSearch(procedimento.nome);
        setSelectedProcedimento(procedimento);
        setIsOpen(false);
        if (onSelect) {
            onSelect(procedimento);
        }
    };

    const handleClear = () => {
        setSearch("");
        setSelectedProcedimento(null);
        if (onSelect) {
            onSelect({} as Procedimento);
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
                                <Briefcase className="h-4 w-4" />
                            )}
                        </div>
                        <Input
                            type="text"
                            placeholder={placeholder}
                            className={cn(
                                "pl-10 pr-10 h-11 bg-white border-gray-200 focus:border-primary/50 focus:ring-primary/10 transition-all rounded-xl shadow-sm font-medium",
                                isOpen && "ring-2 ring-primary/10 border-primary/50",
                                selectedProcedimento && !isOpen && "border-blue-100 bg-blue-50/30"
                            )}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setSelectedProcedimento(null);
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
                            {isLoading && procedimentos.length === 0 ? (
                                <div className="p-8 flex flex-col items-center justify-center space-y-3">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                        <Loader2 className="h-8 w-8 text-primary animate-spin relative" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500">Buscando na base de dados...</span>
                                </div>
                            ) : procedimentos.length > 0 ? (
                                <div className="p-1">
                                    {procedimentos.map((proc, index) => (
                                        <motion.button
                                            key={proc.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="group w-full flex items-center justify-between p-3 hover:bg-primary/5 rounded-xl transition-all duration-200 text-left"
                                            onClick={() => handleSelect(proc)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <Briefcase className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                                                        {proc.nome}
                                                    </span>
                                                    <div className="flex items-center space-x-3 text-[11px] text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {proc.duracao_minutos} min
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <DollarSign className="w-3 h-3" />
                                                            R$ {parseFloat(proc.preco_base).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                        </span>
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
                                    <h3 className="text-sm font-semibold text-gray-900">Nenhum procedimento encontrado</h3>
                                    <p className="text-xs text-gray-500 mt-1 max-w-[180px]">
                                        Tente buscar por outro nome
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