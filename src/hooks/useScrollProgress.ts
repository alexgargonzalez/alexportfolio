"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useLenis((lenis) => {
    const scrollY = lenis.scroll;
    const heroHeight = window.innerHeight; // The transition happens as we scroll through the viewport height
    
    // Calculate progress between 0 and 1
    const p = Math.min(Math.max(scrollY / heroHeight, 0), 1);
    setProgress(p);
  });

  return progress;
}
