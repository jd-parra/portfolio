"use client";

import { useCallback, useSyncExternalStore } from "react";

/** matchMedia sin setState en un efecto, que react-hooks prohíbe en React 19.
 *  En el servidor no hay ventana: devolvemos false y decide el cliente. */
export function useMediaQuery(consulta: string) {
  const suscribir = useCallback(
    (avisar: () => void) => {
      const mq = window.matchMedia(consulta);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    [consulta],
  );

  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}

/** Hay ratón: es lo que decide si la órbita tiene sentido, no el ancho.
 *  Un portátil con la ventana a medias seguía siendo un portátil. */
export const CON_RATON = "(hover: hover) and (pointer: fine)";
export const SIN_MOVIMIENTO = "(prefers-reduced-motion: reduce)";
