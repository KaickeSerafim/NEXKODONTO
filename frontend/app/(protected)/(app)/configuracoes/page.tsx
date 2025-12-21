"use client";

import Link from "next/link";
import { MessageSquare, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ConfiguracoesPage() {
  const settingsOptions = [
    {
      title: "WhatsApp",
      description: "Configure a integração com o WhatsApp para envio de mensagens.",
      href: "/configuracoes/whatsapp",
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
    },
    // Aqui podem ser adicionadas mais configurações futuramente
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do seu sistema.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settingsOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={option.href}
              className="flex items-center gap-4 p-4 transition-all bg-white border rounded-xl hover:shadow-md hover:border-primary/20 group"
            >
              <div className={`p-3 rounded-lg ${option.color}`}>
                <option.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
