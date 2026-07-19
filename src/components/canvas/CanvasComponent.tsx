"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import InteractiveParticles from "./InteractiveParticles";

export default function CanvasComponent() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <ambientLight intensity={1.5} />
      <InteractiveParticles />
      <Preload all />
    </Canvas>
  );
}
