"use client";

import { useEffect, useState } from "react";

const SECCIONES = [
  { id: "sobre", label: "Sobre mí", hijos: [] },
  {
    id: "trabajo",
    label: "En lo que he trabajado",
    hijos: [
      { id: "proyecto-leneo", label: "Leneo" },
      { id: "proyecto-amigapp", label: "Amigapp" },
      { id: "proyecto-maat", label: "maat.ai" },
    ],
  },
  { id: "mas", label: "Y algunas cosas más", hijos: [] },
  { id: "stack", label: "Stack", hijos: [] },
];

/** En orden de aparición en la página: es lo que decide cuál ya has pasado. */
const EN_ORDEN = SECCIONES.flatMap((s) => [s.id, ...s.hijos.map((h) => h.id)]);

export default function NavSecciones() {
  const [activa, setActiva] = useState("");

  useEffect(() => {
    const anclas = EN_ORDEN.map((id) => document.getElementById(id)).filter(
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
      for (const el of anclas) {
        if (el.getBoundingClientRect().top <= franja) actual = el.id;
      }

      // Al final de la página la última sección puede no llegar nunca a la
      // franja: si no hay más recorrido, es la activa por definición.
      const fondo =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (fondo && anclas.length > 0) actual = anclas[anclas.length - 1].id;

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
          const enHijo = s.hijos.some((h) => h.id === activa);
          const on = activa === s.id || enHijo;

          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={activa === s.id ? "true" : undefined}
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

              {s.hijos.length > 0 && (
                // Las ramas cuelgan alineadas bajo el marcador del padre.
                <ul className="ml-[15px] mt-2 border-l border-border">
                  {s.hijos.map((h) => {
                    const hOn = activa === h.id;
                    return (
                      <li key={h.id} className="relative py-1 pl-5">
                        <span className="absolute left-0 top-1/2 h-px w-3 bg-border" />
                        <span
                          className={`nav-marker absolute left-[9px] top-1/2 size-[6px] -translate-y-1/2 rounded-full ${
                            hOn ? "bg-link" : "bg-muted-foreground/40"
                          }`}
                        />
                        <a
                          href={`#${h.id}`}
                          aria-current={hOn ? "true" : undefined}
                          className={`font-sans text-xs transition-colors ${
                            hOn
                              ? "text-link"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {h.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
