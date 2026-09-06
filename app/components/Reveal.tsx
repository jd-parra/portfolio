"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

/** Aparece con un desplazamiento sutil al entrar en pantalla. Se desobserva
 *  al primer disparo: no tiene sentido volver a animar lo ya visto. */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  id,
}: {
  children: React.ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisible(true);
            observador.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  // ElementType a secas colapsa los props a never al combinar todas las
  // etiquetas posibles: se acota a la forma que aquí se usa.
  const Componente = Tag as React.ComponentType<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;

  return (
    <Componente
      ref={ref}
      id={id}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Componente>
  );
}
