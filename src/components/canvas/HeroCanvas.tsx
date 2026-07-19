"use client";

import dynamic from "next/dynamic";

const CanvasComponent = dynamic(() => import("./CanvasComponent"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />,
});

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden select-none pointer-events-none">
      <CanvasComponent />
    </div>
  );
}
