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
    // max-w igual que la prosa: la figura se alinea con la columna de texto
    // en vez de invadir todo el ancho.
    <figure className="mt-8 max-w-[62ch]">
      <figcaption className="font-display mb-2 text-[0.6875rem] uppercase tracking-[0.16em] text-[#5A625F]">
        Arquitectura
      </figcaption>

      <div
        ref={contenedor}
        className="h-56 w-full border border-[#D5D9D3] bg-[#EDEFEC]"
      >
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
      <div className="mt-3 min-h-[3.25rem] border-l border-[#D5D9D3] pl-3">
        {sel ? (
          <p className="font-body text-base leading-snug text-[#3C4340]">
            <span className="font-display font-semibold text-[#14181A]">
              {sel.label}.
            </span>{" "}
            {sel.desc}
          </p>
        ) : (
          <p className="font-body text-base leading-snug text-[#5A625F]">
            {esEscritorio
              ? "Pasa el ratón por una pieza para ver qué hace."
              : "Toca una pieza para ver qué hace."}
          </p>
        )}
      </div>
    </figure>
  );
}
