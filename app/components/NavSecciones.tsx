"use client";

import { useEffect, useState } from "react";

const SECCIONES = [
  { id: "sobre", label: "Sobre mí" },
  { id: "trabajo", label: "En lo que he trabajado" },
  { id: "mas", label: "Y algunas cosas más" },
  { id: "stack", label: "Stack" },
];

export default function NavSecciones() {
  const [activa, setActiva] = useState("");

  useEffect(() => {
    const titulos = SECCIONES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    let pedido = false;

    const calcular = () => {
      pedido = false;
      // El último título que ya ha pasado la franja de lectura. Un
      // IntersectionObserver sobre los h2 no vale: miden una línea, casi nunca
      // están dentro de la banda, y el resaltado se queda con el último visto.
      const franja = window.innerHeight * 0.35;
      let actual = "";
      for (const el of titulos) {
        if (el.getBoundingClientRect().top <= franja) actual = el.id;
      }

      // Al final de la página la última sección puede no llegar nunca a la
      // franja: si no hay más recorrido, es la activa por definición.
      const fondo =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (fondo && titulos.length > 0) actual = titulos[titulos.length - 1].id;

      setActiva(actual);
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
  }, []);

  return (
    <nav aria-label="Secciones" className="hidden lg:block">
      <ul className="flex flex-col gap-4">
        {SECCIONES.map((s) => {
          const on = activa === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                className="group flex items-center gap-3 font-sans text-sm"
              >
                <span
                  className={`nav-marker h-px shrink-0 ${
                    on
                      ? "w-8 bg-link"
                      : "w-3 bg-muted-foreground/50 group-hover:w-6"
                  }`}
                />
                <span
                  className={`transition-colors ${
                    on
                      ? "text-link"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
