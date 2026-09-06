"use client";

import { useEffect, useRef } from "react";

/** Un resplandor tenue que sigue al cursor con retardo. Deliberadamente
 *  flojo: da atmósfera sin competir con el texto. */
export function FondoReactivo() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let destinoX = window.innerWidth / 2;
    let destinoY = window.innerHeight / 2;
    let x = destinoX;
    let y = destinoY;

    const alMover = (e: PointerEvent) => {
      destinoX = e.clientX;
      destinoY = e.clientY;
    };
    const bucle = () => {
      x += (destinoX - x) * 0.08;
      y += (destinoY - y) * 0.08;
      el.style.background = `radial-gradient(420px circle at ${x}px ${y}px, var(--link) 0%, transparent 65%)`;
      raf = requestAnimationFrame(bucle);
    };

    window.addEventListener("pointermove", alMover);
    bucle();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", alMover);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] transition-opacity duration-700"
    />
  );
}
