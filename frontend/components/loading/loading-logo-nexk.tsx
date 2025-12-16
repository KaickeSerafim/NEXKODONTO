"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingLogoNexk() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent"
        />
        <div className="w-20 h-20 bg-gradient-to-br from-black rounded-xl flex items-center justify-center">
          <Image alt="LOGO NEXK" width={60} height={60} src="/NEXK.png" />
        </div>
      </motion.div>
    </div>
  );
}
