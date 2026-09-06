"use client";

import { useTema } from "./useTema";

export function ThemeToggle() {
  // useSyncExternalStore devuelve "claro" en el servidor y el valor real tras
  // hidratar, sin desajuste: no hace falta un flag de montado.
  const oscuro = useTema() === "oscuro";

  const alternar = () => {
    const raiz = document.documentElement;
    const siguiente = !raiz.classList.contains("dark");
    raiz.classList.toggle("dark", siguiente);
    raiz.classList.toggle("light", !siguiente);
    try {
      localStorage.setItem("theme", siguiente ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="group relative inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
    >
      <span suppressHydrationWarning>
        <span className="relative block size-[18px]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden
            className={`absolute inset-0 size-[18px] transition-all duration-500 ${
              oscuro
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={`absolute inset-0 size-[18px] transition-all duration-500 ${
              oscuro
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
