"use client";

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // The transition happens as we scroll through the viewport height
      
      // Calculate progress between 0 and 1
      const p = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setProgress(p);
    };

    // Calculate once on mount in case the page is already scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
