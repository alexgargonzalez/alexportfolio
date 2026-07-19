import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problema from "@/components/sections/Problema";
import Demo from "@/components/sections/Demo";
import Casos from "@/components/sections/Casos";
import Oferta from "@/components/sections/Oferta";
import Contacto from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Problema />
        <Demo />
        <Casos />
        <Oferta />
        <Contacto />
      </main>
    </>
  );
}
