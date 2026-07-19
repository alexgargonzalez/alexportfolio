"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Skeleton, configureBoneyard } from "boneyard-js/react";
import Tooltip from "@/components/ui/Tooltip";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { toast } from "sonner";

configureBoneyard({
  color: "#f1f5f9",
  animate: "shimmer",
});

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  isSkeleton?: boolean;
}

type BookingState = "idle" | "awaiting_service" | "awaiting_time" | "awaiting_name" | "awaiting_phone";

export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "bot",
      text: "¡Hola! Bienvenido a Peluquería Estilo. Soy su asistente virtual inteligente de reservas. ¿Desea agendar una cita o tiene alguna pregunta sobre nuestros horarios y precios?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // State machine for booking flow
  const [bookingState, setBookingState] = useState<BookingState>("idle");
  const [bookingDetails, setBookingDetails] = useState({
    service: "",
    time: "",
    name: "",
    phone: "",
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [animationParentRef] = useAutoAnimate();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isReduced = useReducedMotion();
  const shouldReduceMotion = mounted && isReduced;

  // Auto-scroll to bottom of chat container (only when new messages are sent/received)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userText = textToSend;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };

    // Helper to map user input to the actual service name
    const parseService = (input: string): string => {
      const normalized = input.toLowerCase().trim();
      if (normalized.includes("1") || normalized.includes("primera") || normalized.includes("primero") || normalized.includes("clásico") || normalized.includes("clasico")) {
        return "Corte Clásico (15€)";
      }
      if (normalized.includes("2") || normalized.includes("segunda") || normalized.includes("segundo") || normalized.includes("lavado") || normalized.includes("peinado")) {
        return "Lavado + Corte + Peinado (22€)";
      }
      if (normalized.includes("3") || normalized.includes("tercera") || normalized.includes("tercero") || normalized.includes("barba") || normalized.includes("arreglo")) {
        return "Arreglo de Barba (10€)";
      }
      if (normalized.includes("4") || normalized.includes("cuarta") || normalized.includes("cuarto") || normalized.includes("pack") || normalized.includes("completo") || normalized.includes("premium")) {
        return "Pack Completo Premium (30€)";
      }
      return input;
    };

    // Helper to clean up time selection input (e.g. "mañana 10:30" -> "10:30")
    const parseTime = (input: string): string => {
      const normalized = input.toLowerCase().trim();
      const match = normalized.match(/\d{2}:\d{2}/);
      if (match) {
        return match[0];
      }
      return input;
    };

    let botResponse = "";
    const normalizedText = userText.toLowerCase().trim();
    let nextState: BookingState = bookingState;
    let nextDetails = { ...bookingDetails };

    // Stateful booking flow logic
    if (bookingState === "awaiting_service") {
      const resolvedService = parseService(userText);
      nextDetails.service = resolvedService;
      nextState = "awaiting_time";
      botResponse = `¡Perfecto! Hemos seleccionado: "${resolvedService}".\n\n¿Qué hora te viene mejor para mañana? Tenemos disponibles estos huecos:\n• Mañana: 10:30 o 11:45\n• Tarde: 16:30 o 18:00`;
    } 
    
    else if (bookingState === "awaiting_time") {
      const resolvedTime = parseTime(userText);
      nextDetails.time = resolvedTime;
      nextState = "awaiting_name";
      botResponse = `Agendado para mañana a las ${resolvedTime}. Ahora, para registrar la cita en nuestro sistema, ¿a nombre de quién realizo la reserva?`;
    } 
    
    else if (bookingState === "awaiting_name") {
      nextDetails.name = userText;
      nextState = "awaiting_phone";
      botResponse = `Muchas gracias, ${userText}. Por último, por favor facilítame tu número de WhatsApp para poder enviarte la confirmación y un recordatorio automático 2 horas antes de tu cita.`;
    } 
    
    else if (bookingState === "awaiting_phone") {
      const cleanedPhone = userText.replace(/\s+/g, "").replace(/-+/g, "");
      const phoneRegex = /^\+?[0-9]{9,15}$/;
      if (!phoneRegex.test(cleanedPhone)) {
        nextState = "awaiting_phone";
        botResponse = "Por favor, introduce un número de teléfono de WhatsApp válido (mínimo 9 dígitos, ej: +34 612 345 678 o 612345678).";
        nextDetails = { ...bookingDetails };
      } else {
        const finalDetails = { ...bookingDetails, phone: userText };
        nextDetails = { service: "", time: "", name: "", phone: "" };
        nextState = "idle";
        botResponse = `¡Reserva completada con éxito! 🎉\n\n📅 Fecha: Mañana\n🕒 Hora: ${finalDetails.time}\n💈 Servicio: ${finalDetails.service}\n👤 Cliente: ${finalDetails.name}\n📱 WhatsApp: ${userText}\n\nTe acabamos de enviar los detalles y la confirmación a tu móvil. ¡Te esperamos!`;
        
        toast.success("¡Reserva completada con éxito!", {
          description: `Servicio: ${finalDetails.service} | Hora: ${finalDetails.time}`,
        });
      }
    } 
    
    else {
      // IDLE State: Intent routing based on keywords
      if (
        normalizedText.includes("reserva") || 
        normalizedText.includes("cita") || 
        normalizedText.includes("agendar") || 
        normalizedText.includes("ir") ||
        normalizedText.includes("corte") ||
        normalizedText.includes("turno")
      ) {
        nextState = "awaiting_service";
        botResponse = "¡Estupendo! Vamos a gestionar tu reserva. ¿Qué servicio deseas contratar?\n\n• Corte Clásico (15€)\n• Lavado + Corte + Peinado (22€)\n• Arreglo de Barba (10€)\n• Pack Completo Premium (30€)";
      } 
      
      else if (
        normalizedText.includes("horario") || 
        normalizedText.includes("hora") || 
        normalizedText.includes("abierto") || 
        normalizedText.includes("cerrado") ||
        normalizedText.includes("cuándo")
      ) {
        botResponse = "Nuestro horario de apertura es de lunes a viernes de 9:00 a 20:00 (no cerramos a mediodía) y los sábados de 9:00 a 14:00. Domingos cerrado.\n\n¿Te gustaría que te reservemos una cita?";
      } 
      
      else if (
        normalizedText.includes("precio") || 
        normalizedText.includes("tarifa") || 
        normalizedText.includes("cuesta") || 
        normalizedText.includes("servicios")
      ) {
        botResponse = "Nuestras tarifas actuales son:\n• Corte Clásico: 15€\n• Lavado + Corte + Peinado: 22€\n• Arreglo de Barba: 10€\n• Pack Completo Premium: 30€\n\n¿Quieres que agendemos tu cita para alguno de estos servicios?";
      } 
      
      else if (
        normalizedText.includes("hola") || 
        normalizedText.includes("buenas") || 
        normalizedText.includes("saludos") ||
        normalizedText.includes("ey")
      ) {
        botResponse = "¡Hola! Es un placer saludarte. ¿En qué te puedo ayudar hoy? ¿Te gustaría agendar una cita o consultar nuestras tarifas y horarios?";
      } 
      
      else {
        botResponse = "Como asistente inteligente de demostración de Peluquería Estilo, estoy entrenado para ayudarte a reservar citas, darte información de precios o indicarte nuestros horarios.\n\nPrueba a escribir 'quiero reservar una cita' para ver el flujo en acción.";
      }
    }

    const botMsgId = `bot-${Date.now()}`;
    const botMsg: Message = {
      id: botMsgId,
      sender: "bot",
      text: botResponse,
      timestamp: new Date(),
      isSkeleton: true,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId ? { ...msg, isSkeleton: false } : msg
        )
      );
      setBookingState(nextState);
      setBookingDetails(nextDetails);
      setIsTyping(false);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSendMessage(inputValue);
  };

  // Get dynamic suggestions buttons based on the current state of the conversation
  const getSuggestions = () => {
    switch (bookingState) {
      case "awaiting_service":
        return ["Corte Clásico (15€)", "Arreglo de Barba (10€)", "Pack Premium (30€)"];
      case "awaiting_time":
        return ["10:30 (Mañana)", "11:45 (Mañana)", "16:30 (Tarde)", "18:00 (Tarde)"];
      case "awaiting_name":
        return ["Carlos Gómez", "Sofía Martín", "Alejandro Pérez"];
      case "awaiting_phone":
        return ["+34 612 345 678", "+34 699 887 766"];
      default:
        return [
          "¿Qué horarios tenéis?",
          "¿Cuáles son las tarifas?",
          "Quiero reservar una cita",
        ];
    }
  };

  return (
    <section id="demo" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text block */}
          <motion.div 
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 max-w-xl"
          >
            <span className="text-xs font-bold tracking-wider text-brand-accent uppercase">
              [ DEMO INTERACTIVA ]
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-3 mb-6">
              Pruébalo tú mismo en tiempo real.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              A la derecha tienes una simulación de un **asistente de IA para una peluquería**. Puedes interactuar con él igual que lo haría un cliente real.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Pregúntale por los precios de un corte, cuándo está abierto, o intenta agendar una cita para comprobar cómo responde y recopila los datos en segundos.
            </p>

            {/* Dynamic context suggestion list */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-foreground/50 block">
                {bookingState !== "idle" ? "PASO DE RESERVA - SELECCIONA O ESCRIBE:" : "PREGUNTAS SUGERIDAS QUE PUEDES PROBAR:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {getSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion.split(" (")[0])}
                    className="rounded-lg border border-foreground/5 bg-surface-subtle px-3 py-1.5 text-xs text-foreground/80 transition hover:border-brand-accent/30 hover:bg-accent-soft active:scale-95 cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat simulator mockup container */}
          <motion.div 
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex justify-center"
          >
            <div className="w-full max-w-md h-[550px] flex flex-col rounded-3xl border border-foreground/10 bg-surface-subtle shadow-xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-[#0A0A0A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0A0A0A]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Estilo IA</h4>
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                      ASISTENTE AUTÓNOMO
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[9px] font-semibold text-white/60 tracking-wider">
                  <Sparkles className="w-3 h-3 text-brand-accent animate-pulse" />
                  <span>PREMIUM</span>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 bg-white/50"
              >
                <div ref={animationParentRef} className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 max-w-[85%] ${
                        msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full text-[10px] font-semibold ${
                          msg.sender === "user"
                            ? "bg-foreground text-background"
                            : "bg-brand-accent/10 text-brand-accent"
                        }`}
                      >
                        {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>

                      {msg.sender === "bot" ? (
                        <Skeleton name="chat-message" loading={!!msg.isSkeleton}>
                          <div
                            className="rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed shadow-sm bg-background text-foreground rounded-tl-none border border-foreground/5"
                          >
                            {msg.text}
                          </div>
                        </Skeleton>
                      ) : (
                        <div
                          className="rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed shadow-sm bg-foreground text-background rounded-tr-none"
                        >
                          {msg.text}
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && !messages.some(msg => msg.isSkeleton) && (
                    <div className="flex items-start gap-2.5 max-w-[80%] mr-auto">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="bg-background border border-foreground/5 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleFormSubmit} className="p-4 bg-background border-t border-foreground/5 flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    bookingState === "awaiting_service" ? "Escribe o elige un servicio..." :
                    bookingState === "awaiting_time" ? "Escribe o elige una hora..." :
                    bookingState === "awaiting_name" ? "Escribe tu nombre..." :
                    bookingState === "awaiting_phone" ? "Escribe tu WhatsApp..." :
                    "Escribe un mensaje de prueba..."
                  }
                  className="flex-1 rounded-xl border border-foreground/10 px-4 py-2 text-sm text-foreground bg-surface-subtle focus:border-brand-accent focus:bg-background focus:outline-none"
                  disabled={isTyping}
                  aria-label="Mensaje para el asistente virtual"
                />
                <Tooltip content="Enviar mensaje">
                  <button
                    type="submit"
                    disabled={isTyping || !inputValue.trim()}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background transition hover:bg-brand-accent hover:text-foreground disabled:opacity-40 disabled:hover:bg-foreground disabled:hover:text-background cursor-pointer"
                    aria-label="Enviar mensaje"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </Tooltip>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
