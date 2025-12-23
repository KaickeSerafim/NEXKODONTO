"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MESES } from "@/lib/calendar-utils";

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function CalendarioHeader({ month, year, onPrev, onNext, onToday }: CalendarHeaderProps) {
  return (
    <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
      <div className="flex items-center gap-5">
        <div className="bg-primary/10 p-3 rounded-2xl">
          <CalendarIcon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {MESES[month]}
          </h2>
          <p className="text-gray-400 font-medium">{year}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToday} 
          className="font-semibold text-gray-600 hover:text-primary transition-colors"
        >
          Hoje
        </Button>
        <div className="w-[1px] h-6 bg-gray-200" />
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrev} 
            className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNext} 
            className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
