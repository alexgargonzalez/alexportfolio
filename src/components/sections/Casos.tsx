"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Smartphone, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Casos() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isReduced = useReducedMotion();
  const shouldReduceMotion = mounted && isReduced;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" as const
      } 
    },
  };

  return (
    <section id="casos" className="py-24 bg-surface-subtle border-b border-foreground/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-bold tracking-wider text-brand-accent uppercase">
            [ CASOS DE ÉXITO ]
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-3 mb-6">
            Sistemas reales funcionando para negocios reales.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            No solo diseño páginas bonitas. Construyo engranajes digitales que trabajan para tu negocio las 24 horas del día. Estos son algunos ejemplos de automatizaciones que puedes implementar:
          </p>
        </motion.div>

        {/* Portfolio Cards Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Case 1: Sistema de Reservas para Clínica */}
          <motion.a 
            variants={cardVariants}
            href="#contacto"
            className="group flex flex-col justify-between rounded-3xl border border-foreground/5 bg-background p-8 lg:p-10 shadow-sm transition-all duration-200 hover:-translate-y-2 hover:shadow-lg hover:border-brand-accent/20 cursor-pointer"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent mb-6">
                <CalendarDays className="w-6 h-6" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-brand-accent transition-colors flex items-center gap-1">
                <span>Portal Clínico con Reservas Activas</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </h3>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Desarrollo de una landing page rápida para una clínica de fisioterapia. Se integró un asistente de citas conectado directamente a Google Calendar que permite al paciente reservar y pagar la sesión sin intermediarios.
              </p>

              <div className="bg-surface-subtle border border-foreground/5 rounded-2xl p-5 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-foreground/50 font-semibold uppercase block">Impacto</span>
                    <span className="text-base font-bold text-foreground">+140 citas/mes</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-foreground/50 font-semibold uppercase block">Llamadas evitadas</span>
                    <span className="text-base font-bold text-foreground">-45% de tiempo</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-foreground/40 block mb-2 uppercase tracking-wider">
                TECNOLOGÍAS UTILIZADAS:
              </span>
              <div className="text-[11px] font-semibold text-brand-accent tracking-wider">
                NEXT.JS • REACT • GOOGLE CALENDAR API • STRIPE
              </div>
            </div>
          </motion.a>

          {/* Case 2: Agente de WhatsApp */}
          <motion.a 
            variants={cardVariants}
            href="#contacto"
            className="group flex flex-col justify-between rounded-3xl border border-foreground/5 bg-background p-8 lg:p-10 shadow-sm transition-all duration-200 hover:-translate-y-2 hover:shadow-lg hover:border-brand-accent/20 cursor-pointer"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-brand-accent transition-colors flex items-center gap-1">
                <span>Agente de WhatsApp para Gimnasio</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </h3>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Integración de un chatbot inteligente en el canal oficial de WhatsApp Business de un centro deportivo. Responde a preguntas complejas de precios, disciplinas y suscripciones, derivando a la web solo para finalizar la compra.
              </p>

              <div className="bg-surface-subtle border border-foreground/5 rounded-2xl p-5 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-foreground/50 font-semibold uppercase block">Automatización</span>
                    <span className="text-base font-bold text-foreground">80% de chats</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-foreground/50 font-semibold uppercase block">Horas de soporte</span>
                    <span className="text-base font-bold text-foreground">-15h semanales</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-foreground/40 block mb-2 uppercase tracking-wider">
                TECNOLOGÍAS UTILIZADAS:
              </span>
              <div className="text-[11px] font-semibold text-brand-accent tracking-wider">
                NODE.JS • META CLOUD API • CLAUDE API • POSTGRESQL
              </div>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
