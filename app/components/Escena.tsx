"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Arquitectura, Nodo } from "../data/arquitecturas";
import { useGuia } from "./guia";
import { CON_RATON, SIN_MOVIMIENTO, useMediaQuery } from "./useMediaQuery";

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
      { rootMargin: "50% 0px", threshold: 0 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [ref]);

  return visible;
}

export default function Escena({ arq }: { arq: Arquitectura }) {
  const [sel, setSel] = useState<Nodo | null>(null);
  const contenedorRef = useRef<HTMLDivElement>(null);

  const visible = useVisible(contenedorRef);
  const conRaton = useMediaQuery(CON_RATON);
  const { decir } = useGuia();
  const sinMovimiento = useMediaQuery(SIN_MOVIMIENTO);

  return (
    // Sin marco ni panel: el canvas es transparente y el diagrama flota sobre
    // el color de la página. Ancho completo, más alto que la columna de texto.
    <figure className="mt-8">
      <div
        ref={contenedorRef}
        className="h-64 w-full sm:h-72 lg:h-80"
        // La guía del lateral explica el diagrama mientras el ratón está
        // encima. En táctil no se dispara y queda el pie, que dice lo mismo.
        onPointerEnter={(e) => {
          if (e.pointerType === "touch") return;
          decir(
            "Arrastra para girar el diagrama.\nPasa por una pieza para ver qué hace.",
          );
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "touch") return;
          decir(null);
        }}
      >
        <EscenaCanvas
          arq={arq}
          sel={sel}
          onSelect={(n) => {
            setSel(n);
            if (conRaton) decir(`${n.label}.\n${n.desc}`);
          }}
          orbita={conRaton}
          visible={visible}
          sinMovimiento={sinMovimiento}
          contenedorRef={contenedorRef}
        />
      </div>

      {/* min-h fija la altura: sin ella la página salta al seleccionar. */}
      <div className="mt-1 min-h-13 max-w-[62ch]">
        {sel ? (
          <p className="text-base leading-snug">
            <span className="font-sans font-semibold">{sel.label}.</span>{" "}
            {sel.desc}
          </p>
        ) : (
          <p className="text-base leading-snug text-muted-foreground">
            {conRaton
              ? "Pasa el ratón por una pieza para ver qué hace."
              : "Toca una pieza para ver qué hace."}
          </p>
        )}
      </div>
    </figure>
  );
}
