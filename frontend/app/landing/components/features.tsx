"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  FileText,
  BarChart3,
  Clock,
  Shield,
  LayoutTemplate,

  
} from "lucide-react";

const featuresSaas = [
  {
    icon: Calendar,
    title: "Agendamento",
    description: "Gerencie consultas e horários com facilidade"
  },
  {
    icon: Users,
    title: "Pacientes",
    description: "Cadastro completo e histórico de atendimentos"
  },
  {
    icon: FileText,
    title: "Prontuários",
    description: "Prontuários digitais seguros e organizados"
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    description: "Análises e métricas da sua clínica"
  },
  {
    icon: Clock,
    title: "Lembretes",
    description: "Notificações automáticas para pacientes"
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Dados protegidos e conformidade LGPD"
  }
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Recursos Completos</h2>
          <p className="text-muted-foreground text-lg">
            Tudo que você precisa para gerenciar sua clínica
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuresSaas.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border hover:border-primary hover:shadow-lg transition"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-9xl font-bold mb-4">+</h2>
        </motion.div>
      </div>
      <div className="container mx-auto  grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl ">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2 * 0.1 }}
            className="p-6 rounded-lg border hover:border-primary hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {" "}
              LandingPage Profissional{" "}
            </h3>
            <p className="text-muted-foreground">
              Tenha uma pagina na web profissional e sua{" "}
            </p>
          </motion.div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2 * 0.1 }}
            className="p-6 rounded-lg border hover:border-primary hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {" "}
              LandingPage Profissional{" "}
            </h3>
            <p className="text-muted-foreground">
              Tenha uma pagina na web profissional e sua{" "}
            </p>
          </motion.div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2 * 0.1 }}
            className="p-6 rounded-lg border hover:border-primary hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {" "}
              LandingPage Profissional{" "}
            </h3>
            <p className="text-muted-foreground">
              Tenha uma pagina na web profissional e sua{" "}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
