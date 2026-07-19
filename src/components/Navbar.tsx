"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareCode } from "lucide-react";

export default function Navbar() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 md:px-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground"
        >
          <span className="text-brand-accent">alex</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-foreground/5 px-2 py-0.5 rounded text-foreground/70">
            dev + ia
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <a
            href="#contacto"
            onClick={handleScroll}
            className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-brand-accent hover:text-foreground active:scale-95 cursor-pointer"
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>Contactar</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
