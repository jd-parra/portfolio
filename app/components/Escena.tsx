"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";
import type { Arquitectura, Nodo } from "../data/arquitecturas";

// Three.js necesita el navegador: ssr: false solo es válido desde un Client Component.
const EscenaCanvas = dynamic(() => import("./EscenaCanvas"), { ssr: false });

const ESCRITORIO = "(min-width: 1024px)";

function suscribir(avisar: () => void) {
  const mq = window.matchMedia(ESCRITORIO);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
}

/** Se suscribe a matchMedia sin setState en un efecto. En el servidor no hay
 *  ventana, así que asumimos móvil: la órbita solo se activa en el cliente. */
function useEsEscritorio() {
  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(ESCRITORIO).matches,
    () => false,
  );
}

export default function Escena({ arq }: { arq: Arquitectura }) {
  const [sel, setSel] = useState<Nodo | null>(null);
  const esEscritorio = useEsEscritorio();

  return (
    <div>
      <div className="h-72 w-full">
        <EscenaCanvas
          arq={arq}
          sel={sel}
          onSelect={setSel}
          orbita={esEscritorio}
        />
      </div>

      {/* min-h fija la altura: sin ella la página salta al seleccionar. */}
      <div className="font-body mt-2 min-h-[3.5rem] text-base leading-snug text-[#3C4340]">
        {sel ? (
          <p>
            <span className="font-display font-semibold text-[#14181A]">
              {sel.label}.
            </span>{" "}
            {sel.desc}
          </p>
        ) : (
          <p className="text-[#5A625F]">Toca una pieza para ver qué hace.</p>
        )}
      </div>
    </div>
  );
}
