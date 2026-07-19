"use client";

import { useState, useEffect } from "react";
import { Clock, Tag, Milestone, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Oferta() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isReduced = useReducedMotion();
  const shouldReduceMotion = mounted && isReduced;

  return (
    <section id="oferta" className="py-24 bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* Decorative dark grid lines */}
      <div className="absolute inset-0 tech-grid opacity-[0.02] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Pitch info */}
          <motion.div 
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <span className="text-xs font-bold tracking-wider text-brand-accent uppercase">
              [ LA PROPUESTA ]
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-3 mb-6">
              Una web que trabaja por ti, lista en tiempo récord.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              No tienes que pasar meses definiendo una web. Diseñamos, redactamos y programamos tu sistema en dos semanas. Un proceso ágil y transparente, sin sorpresas en el precio final.
            </p>

            {/* What is included */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Código y SEO a medida</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Cero plantillas lentas. Web hecha en Next.js optimizada para posicionar en tu ciudad.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Agente de IA Integrado</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Cerebro entrenado con tus horarios, precios y preguntas frecuentes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Reservas en Calendar</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Tus clientes eligen hora en la web y el evento aparece en tu Google Calendar al instante.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Hosting & VPS el 1er Año</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Montado en servidor virtual propio ultrarrápido. Configuración técnica incluida.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing / Timeline card */}
          <motion.div 
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-6">Proyecto Web + IA</h3>
                
                {/* Timeline */}
                <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
                  <div className="rounded-xl bg-white/5 p-3 text-brand-accent">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Plazo de entrega</span>
                    <span className="text-lg font-extrabold text-white">14 DÍAS MÁX.</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 pb-4">
                  <div className="rounded-xl bg-white/5 p-3 text-brand-accent">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Inversión fija</span>
                    <span className="text-2xl font-extrabold text-brand-accent">DESDE 990€</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#contacto"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-center text-sm font-bold text-[#0A0A0A] transition hover:bg-brand-accent hover:text-foreground active:scale-95"
                >
                  <Milestone className="w-4 h-4" />
                  <span>Empezar mi proyecto</span>
                </a>
                <span className="text-[9px] text-center block mt-3 text-gray-500 font-semibold tracking-wider">
                  * FACTURACIÓN CLARA CON CONTRATO Y GARANTÍA DE PLAZO
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
