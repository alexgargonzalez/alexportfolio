"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        lerp: 0.08, // Subtle easing, not too floaty
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
