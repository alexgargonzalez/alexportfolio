"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent hydration mismatch flashes

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Config spring dynamics for sutil trailing/lerp effect
  const springConfig = { damping: 30, stiffness: 350, mass: 0.3 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is touch-only or coarse pointer (mobile/tablet)
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Track element hovers to identify clickables
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".group"); // Tarjetas de casos / links group

      setIsHovered(!!isClickable);
    };

    if (!mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovered ? 1.6 : 1,
        backgroundColor: isHovered ? "rgba(39, 194, 245, 0.4)" : "#27C2F5",
        width: isHovered ? 16 : 8,
        height: isHovered ? 16 : 8,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-brand-accent/30 shadow-sm"
    />
  );
}
