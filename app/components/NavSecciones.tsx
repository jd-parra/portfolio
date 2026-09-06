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
    <nav className="font-display hidden text-sm lg:block">
      <ul className="space-y-1">
        {SECCIONES.map((s) => {
          const on = activa === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                className="group flex items-center gap-2 py-1"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    on
                      ? "w-6 bg-[#1F5F5B]"
                      : "w-2 bg-[#9AA5A0] group-hover:w-4 group-hover:bg-[#5A625F]"
                  }`}
                />
                <span
                  className={`transition-colors ${
                    on
                      ? "text-[#1F5F5B]"
                      : "text-[#5A625F] group-hover:text-[#14181A]"
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
