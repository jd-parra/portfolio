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
    const observador = new IntersectionObserver(
      (entradas) => {
        const dentro = entradas.filter((e) => e.isIntersecting);
        if (dentro.length > 0) setActiva(dentro[0].target.id);
      },
      // Banda estrecha en el centro: solo una sección la cruza a la vez.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    SECCIONES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observador.observe(el);
    });

    return () => observador.disconnect();
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
