import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "../../bones/registry";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexportfolio - Desarrollo Web e IA para Negocios Locales",
  description: "Desarrollo de páginas web rápidas y automatizaciones con IA (chatbots, reservas, atención 24/7) para peluquerías, clínicas, gimnasios y restaurantes.",
  openGraph: {
    title: "Alexportfolio - Desarrollo Web e IA para Negocios Locales",
    description: "Multiplica tus clientes con webs modernas y agentes de IA autónomos que atienden y reservan 24/7.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground font-sans antialiased selection:bg-brand-accent/20 selection:text-brand-accent">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
