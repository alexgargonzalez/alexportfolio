"use client";

import { useState, useEffect } from "react";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Problema() {
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
    <section id="problema" className="py-24 bg-surface-subtle border-y border-foreground/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header info */}
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-bold tracking-wider text-brand-accent uppercase">
            [ EL RETO ]
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-3 mb-6">
            El 70% de tus clientes buscan y reservan fuera de tu horario comercial.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Una web tradicional es solo un folleto estático que no hace nada cuando estás cerrado. Si un cliente potencial tiene una pregunta o quiere agendar a las 22:00, quiere una respuesta ya. Si no la tiene, se va con tu competencia.
          </p>
        </motion.div>

        {/* Side-by-side comparison Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card A: Web Tradicional */}
          <motion.div 
            variants={cardVariants}
            className="flex flex-col justify-between rounded-3xl border border-foreground/5 bg-background p-8 lg:p-10 shadow-sm transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-red-50 p-2.5 text-red-500">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Web tradicional estática
                </h3>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
                  <p className="text-text-secondary text-sm">
                    <strong>Folleto inerte:</strong> Muestra horarios y teléfono, pero no puede interactuar con la visita.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
                  <p className="text-text-secondary text-sm">
                    <strong>Fuga fuera de horario:</strong> El cliente llama a las 21:00, da tono ocupado o apagado, y busca a otro negocio.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
                  <p className="text-text-secondary text-sm">
                    <strong>Formularios vacíos:</strong> Los formularios tradicionales se sienten burocráticos y tardas horas en contestar.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
                  <p className="text-text-secondary text-sm">
                    <strong>Pérdida de tracción:</strong> Ninguna analítica de qué querían comprar tus usuarios realmente.
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-foreground/5 pt-6">
              <span className="text-xs font-semibold text-red-500 uppercase">
                Resultado: Clientes que se van
              </span>
            </div>
          </motion.div>

          {/* Card B: Web con IA */}
          <motion.div 
            variants={cardVariants}
            className="flex flex-col justify-between rounded-3xl border-2 border-brand-accent bg-accent-soft p-8 lg:p-10 shadow-md transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-brand-accent/10 p-2.5 text-brand-accent">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Web inteligente con IA activa
                </h3>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-accent mt-2.5 shrink-0" />
                  <p className="text-foreground text-sm">
                    <strong>Atención inmediata 24/7:</strong> El asistente resuelve dudas al segundo, a cualquier hora del día o de la noche.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-accent mt-2.5 shrink-0" />
                  <p className="text-foreground text-sm">
                    <strong>Reservas automáticas:</strong> Conectado a tu calendario para que los clientes se agenden solos sin tu intervención.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-accent mt-2.5 shrink-0" />
                  <p className="text-foreground text-sm">
                    <strong>Captación fluida:</strong> Convierte visitas anónimas en clientes agendados y contactos de WhatsApp cualificados.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-accent mt-2.5 shrink-0" />
                  <p className="text-foreground text-sm">
                    <strong>Integración omnicanal:</strong> El mismo asistente que atiende la web puede gestionar tu WhatsApp Business.
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-brand-accent/20 pt-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-accent uppercase">
                Resultado: Reservas en piloto automático
              </span>
              <ArrowRight className="w-4 h-4 text-brand-accent animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
