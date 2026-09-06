"use client";

import dynamic from "next/dynamic";

// Three.js necesita el navegador: ssr: false solo es válido desde un Client Component.
const EscenaCanvas = dynamic(() => import("./EscenaCanvas"), { ssr: false });

export default function Escena() {
  return (
    <div className="h-64 w-full">
      <EscenaCanvas />
    </div>
  );
}
