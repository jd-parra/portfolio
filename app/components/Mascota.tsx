"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { CON_RATON, SIN_MOVIMIENTO, useMediaQuery } from "./useMediaQuery";

// layout y page son Server Components: el ssr: false vive aquí.
const MascotaCanvas = dynamic(() => import("./MascotaCanvas"), { ssr: false });

export default function Mascota() {
  const punteroRef = useRef({ x: 0, y: 0 });
  const saludoRef = useRef(0);
  const conRaton = useMediaQuery(CON_RATON);
  const sinMovimiento = useMediaQuery(SIN_MOVIMIENTO);

  // El puntero va en un ref y no en estado: se mueve a 60 fps y no debe
  // provocar un render por fotograma.
  useEffect(() => {
    const alMover = (e: PointerEvent) => {
      punteroRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", alMover, { passive: true });
    return () => window.removeEventListener("pointermove", alMover);
  }, []);

  if (!conRaton) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => {
          saludoRef.current += 1;
        }}
        aria-label="Saludar a la mascota"
        className="size-16 shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
      >
        {/* El canvas no recibe eventos: el botón de fuera es quien responde,
            y así el teclado funciona sin inventar nada. */}
        <span className="pointer-events-none block size-full">
          <MascotaCanvas
            punteroRef={punteroRef}
            saludoRef={saludoRef}
            sinMovimiento={sinMovimiento}
          />
        </span>
      </button>

      <p className="font-sans text-xs leading-relaxed text-muted-foreground">
        Hola, soy tu guía.
        <br />
        Dame un clic.
      </p>
    </div>
  );
}
