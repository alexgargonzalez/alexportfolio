"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let rafId: number;
    function updateLoop(time: number) {
      lenisRef.current?.lenis?.raf(time);
      rafId = requestAnimationFrame(updateLoop);
    }
    rafId = requestAnimationFrame(updateLoop);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        lerp: 0.08, // Subtle easing, not too floaty
        smoothWheel: true,
        autoRaf: false, // Control ticks manually for peak synchronization
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
