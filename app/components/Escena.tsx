"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Arquitectura, Nodo } from "../data/arquitecturas";
import { ESCRITORIO, SIN_MOVIMIENTO, useMediaQuery } from "./useMediaQuery";

// Three.js necesita el navegador: ssr: false solo es válido desde un Client Component.
const EscenaCanvas = dynamic(() => import("./EscenaCanvas"), { ssr: false });

/** Un canvas fuera de pantalla no debe gastar un solo fotograma. */
function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setVisible(entrada.isIntersecting),
      { rootMargin: "200px" },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [ref]);

  return visible;
}

export default function Escena({ arq }: { arq: Arquitectura }) {
  const [sel, setSel] = useState<Nodo | null>(null);
  const contenedor = useRef<HTMLDivElement>(null);

  const visible = useVisible(contenedor);
  const esEscritorio = useMediaQuery(ESCRITORIO);
  const sinMovimiento = useMediaQuery(SIN_MOVIMIENTO);

  return (
    <div>
      <div ref={contenedor} className="h-72 w-full">
        <EscenaCanvas
          arq={arq}
          sel={sel}
          onSelect={setSel}
          orbita={esEscritorio}
          visible={visible}
          sinMovimiento={sinMovimiento}
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
          <p className="text-[#5A625F]">
            {esEscritorio
              ? "Pasa el ratón por una pieza para ver qué hace."
              : "Toca una pieza para ver qué hace."}
          </p>
        )}
      </div>
    </div>
  );
}
