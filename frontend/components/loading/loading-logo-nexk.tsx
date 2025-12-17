"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingLogoNexk() {
  return (
    // AnimatePresence permite que o componente anime ao ser removido do DOM
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[300px] gap-8 transition-all"
    >
      <div className="relative flex items-center justify-center">
        {/* Anéis de Pulsação de Fundo (Glow Effect) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-32 h-32 bg-primary/20 rounded-full blur-3xl"
        />

        {/* Anel Giratório Externo (Tracejado) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-28 h-28 border-2 border-dashed border-primary/30 rounded-full"
        />

        {/* Anel de Carga Principal */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 rounded-full border-[3px] border-transparent border-t-primary border-b-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
        />

        {/* Container do Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative z-10 w-20 h-20 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-[2px] shadow-2xl overflow-hidden"
        >
          {/* Brilho interno passando pelo logo */}
          <motion.div
            animate={{ x: [-100, 200] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 -skew-x-12"
          />

          <div className="flex items-center justify-center w-full h-full bg-black/90 rounded-[14px]">
            <Image
              alt="LOGO NEXK"
              width={55}
              height={55}
              src="/NEXK.png"
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Texto de Loading Interativo */}
      <div className="flex flex-col items-center gap-2">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm font-medium tracking-[0.2em] uppercase text-zinc-400"
        >
          Autenticando
        </motion.span>

        {/* Barra de progresso fake */}
        <div className="w-32 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: [-128, 128] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-primary shadow-[0_0_10px_#fff]"
          />
        </div>
      </div>
    </motion.div>
  );
}