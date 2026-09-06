"use client";

import dynamic from "next/dynamic";
import type { Arquitectura } from "../data/arquitecturas";

// Three.js necesita el navegador: ssr: false solo es válido desde un Client Component.
const EscenaCanvas = dynamic(() => import("./EscenaCanvas"), { ssr: false });

export default function Escena({ arq }: { arq: Arquitectura }) {
  return (
    <div className="h-72 w-full">
      <EscenaCanvas arq={arq} />
    </div>
  );
}
