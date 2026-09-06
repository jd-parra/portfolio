"use client";

import { useEffect } from "react";
import { useGuia } from "./guia";

/** Zonas de la página, en orden. La guía cuenta la última que has pasado. */
const ZONAS: { id: string; mensaje: string }[] = [
  { id: "sobre", mensaje: "Cinco años construyendo producto.\nEsto es el resumen." },
  { id: "trabajo", mensaje: "Tres proyectos, con su arquitectura\ndibujada y navegable." },
  { id: "proyecto-leneo", mensaje: "Leneo.\nCorrige tareas con IA, dentro de Moodle." },
  { id: "proyecto-amigapp", mensaje: "Amigapp.\nCada restaurante, su dominio y su menú." },
  { id: "proyecto-maat", mensaje: "maat.ai.\nValida identidades y arma expedientes." },
  { id: "mas", mensaje: "Cuarenta y pico proyectos,\nagrupados por lo que resuelven." },
  { id: "stack", mensaje: "Con lo que trabajo,\nrepartido por capas." },
];

export function GuiaScroll() {
  const { situar } = useGuia();

  useEffect(() => {
    const anclas = ZONAS.map((z) => ({
      mensaje: z.mensaje,
      el: document.getElementById(z.id),
    })).filter((z): z is { mensaje: string; el: HTMLElement } => z.el !== null);

    let pedido = false;

    const calcular = () => {
      pedido = false;
      // La última zona que ya cruzó la franja de lectura, igual que el índice
      // lateral: así siempre hay una respuesta y no se queda pegada.
      const franja = window.innerHeight * 0.4;
      let actual: string | null = null;
      for (const z of anclas) {
        if (z.el.getBoundingClientRect().top <= franja) actual = z.mensaje;
      }
      situar(actual);
    };

    const alMover = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(calcular);
    };

    alMover();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, [situar]);

  return null;
}
