"use client";

import { useCallback, useSyncExternalStore } from "react";

/** El tema vive como clase en <html>, la pone un script antes del primer
 *  pintado y la cambia el toggle. Un MutationObserver es la única forma de
 *  enterarse desde React sin duplicar el estado. */
export function useTema() {
  const suscribir = useCallback((avisar: () => void) => {
    const observador = new MutationObserver(avisar);
    observador.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observador.disconnect();
  }, []);

  return useSyncExternalStore(
    suscribir,
    () => (document.documentElement.classList.contains("dark") ? "oscuro" : "claro"),
    () => "claro" as const,
  );
}
