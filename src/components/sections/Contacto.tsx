"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Video, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";

export default function Contacto() {
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

  const itemVariants = {
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
    <section id="contacto" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header content */}
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-xs font-bold tracking-wider text-brand-accent uppercase">
            [ CONTACTO ]
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground mt-3 mb-6">
            ¿Listo para poner tu web en piloto automático?
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Hablemos sin rodeos. Elige la opción que prefieras para agendar una sesión estratégica corta de 15 minutos o escribirme directamente.
          </p>
        </motion.div>

        {/* Action Buttons Container */}
        <motion.div 
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 justify-center items-stretch mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Button 1: WhatsApp */}
          <motion.a
            variants={itemVariants}
            href="https://wa.me/34600000000?text=Hola%20Alex,%20estoy%20interesado%20en%20una%20web%20con%20asistente%20de%20IA%20para%20mi%20negocio."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => toast.info("Abriendo chat de WhatsApp...", { description: "+34 600 000 000" })}
            className="flex-1 flex flex-col justify-between items-center text-center p-8 rounded-3xl border border-foreground/5 bg-surface-subtle shadow-sm transition hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] hover:shadow-md active:scale-[0.98] group cursor-pointer"
          >
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Escríbeme por WhatsApp</h3>
              <p className="text-xs text-text-secondary leading-normal max-w-[200px] mx-auto">
                Preguntas rápidas, ideas de automatizaciones o cotizaciones directas en minutos.
              </p>
            </div>
            <div className="mt-8 text-xs font-semibold text-emerald-600 tracking-wider">
              Chatear ahora →
            </div>
          </motion.a>

          {/* Button 2: Calendly / Video Call */}
          <motion.a
            variants={itemVariants}
            href="https://calendly.com/alexportfolio/15min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => toast.info("Abriendo Calendly...", { description: "Selecciona el mejor día y hora" })}
            className="flex-1 flex flex-col justify-between items-center text-center p-8 rounded-3xl border border-foreground/5 bg-surface-subtle shadow-sm transition hover:border-brand-accent/30 hover:bg-accent-soft hover:shadow-md active:scale-[0.98] group cursor-pointer"
          >
            <div className="h-14 w-14 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Reserva una videollamada</h3>
              <p className="text-xs text-text-secondary leading-normal max-w-[200px] mx-auto">
                Videollamada de 15 minutos en Calendly para analizar qué procesos de tu negocio podemos delegar en IA.
              </p>
            </div>
            <div className="mt-8 text-xs font-semibold text-brand-accent tracking-wider">
              Ver calendario →
            </div>
          </motion.a>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-foreground/5 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-text-secondary text-xs">
          <div className="flex items-center gap-1">
            <span>© 2026 alexportfolio. Built with Next.js & Claude.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-brand-accent transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </section>
  );
}
