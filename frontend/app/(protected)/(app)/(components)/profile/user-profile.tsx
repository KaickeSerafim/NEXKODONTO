"use client";

import { useUser } from "@/app/(protected)/user-context";
import Image from "next/image";
import { motion } from "framer-motion";

export default function UserProfile() {
  const data = useUser();
  const userData = data.data;
  const roles = userData?.roles || [];

  const fotoUrl = userData?.foto 
    ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}${userData.foto}`
    : null;

  const getRoleBadge = () => {
    if (roles.includes("dentista")) {
      return { label: "Dentista", color: "bg-green-500" };
    }
    if (roles.includes("secretaria")) {
      return { label: "Secretária", color: "bg-blue-500" };
    }
    if (roles.includes("admin_sistema")) {
      return { label: "Admin", color: "bg-purple-500" };
    }
    return null;
  };

  const roleBadge = getRoleBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        {fotoUrl ? (
          <Image
            width={48}
            height={48}
            src={fotoUrl}
            alt="Foto do usuário"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
            unoptimized
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {userData?.first_name?.[0] || userData?.username?.[0] || "U"}
          </div>
        )}
      </motion.div>

      <div className="flex flex-col">
        {roleBadge && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xs ${roleBadge.color} text-white px-2 py-0.5 rounded-full w-fit mb-1`}
          >
            {roleBadge.label}
          </motion.span>
        )}
        <span className="text-sm font-medium text-gray-800">
          {userData?.first_name || userData?.username} {userData?.last_name}
        </span>
      </div>
    </motion.div>
  );
}
