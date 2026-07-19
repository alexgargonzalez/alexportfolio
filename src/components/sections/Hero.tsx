"use client";

import { useState, useEffect } from "react";
import HeroCanvas from "../canvas/HeroCanvas";
import { ArrowDown, MessageSquare, Calendar } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isReduced = useReducedMotion();
  const shouldReduceMotion = mounted && isReduced;

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const
      }
    },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pt-28 pb-10">
      {/* Background grid overlay + 3D canvas */}
      <div className="absolute inset-0 tech-grid -z-20 opacity-70" />
      <HeroCanvas />
      
      {/* Spacer to align content nicely */}
      <div />

      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <motion.div 
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tech Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-accent mb-6"
          >
            <span>[ SYSTEM STATUS: ACTIVE ]</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.1] mb-6"
          >
            Tu negocio local. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-brand-accent to-brand-accent-hover">
              Atendiendo y reservando 24/7.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl"
          >
            Desarrollo de páginas web ultra rápidas y asistentes de IA autónomos que contestan dudas y gestionan reservas por ti. Para que no vuelvas a perder una venta fuera de tu horario comercial.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all hover:bg-brand-accent hover:text-foreground active:scale-95 shadow-lg shadow-foreground/5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Probar asistente demo</span>
            </a>
            
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-foreground/30 hover:bg-background active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar llamada rápida</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex flex-col items-center gap-2 text-text-secondary animate-bounce pointer-events-none self-center"
      >
        <span className="text-[10px] font-medium tracking-wider uppercase">Ver cómo funciona</span>
        <ArrowDown className="w-4 h-4 text-brand-accent" />
      </motion.div>
    </section>
  );
}
