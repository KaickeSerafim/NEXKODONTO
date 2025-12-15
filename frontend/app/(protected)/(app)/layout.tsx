"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

import UserProfile from "./(components)/profile/user-profile";
import LougoutUser from "./(components)/logout/logout";


const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Agendamentos", href: "/agendamentos" },
  { icon: Users, label: "Pacientes", href: "/pacientes" },
  { icon: FileText, label: "Prontuários", href: "/prontuarios" },
  { icon: Settings, label: "Configurações", href: "/configuracoes" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.aside 
        initial={{ x: -264 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-white border-r flex flex-col"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 border-b"
        >
          <h1 className="text-2xl font-bold text-primary">
            <UserProfile />
          </h1>
        </motion.div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.li 
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive ? "bg-primary text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-4 border-t"
        >
          <LougoutUser />
        </motion.div>
      </motion.aside>
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 overflow-auto"
      >
        <div className="p-8">{children}</div>
      </motion.main>
    </div>
  );
}
