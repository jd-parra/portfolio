"use client";

import { createContext, useContext, useMemo, useState } from "react";

const BASE = "Hola, soy tu guía.\nDame un clic.";

type Guia = {
  mensaje: string;
  /** Lo que dicta el scroll: dónde está el lector. null vuelve al saludo. */
  situar: (m: string | null) => void;
  /** Lo que dicta el ratón. Pisa a lo anterior mientras dure; null lo suelta. */
  decir: (m: string | null) => void;
};

const Contexto = createContext<Guia>({
  mensaje: BASE,
  situar: () => {},
  decir: () => {},
});

export function ProveedorGuia({ children }: { children: React.ReactNode }) {
  const [seccion, setSeccion] = useState<string | null>(null);
  const [foco, setFoco] = useState<string | null>(null);

  const valor = useMemo(
    () => ({
      // El foco manda: si el ratón está sobre algo concreto, eso es lo que
      // interesa. Al soltarlo vuelve a asomar dónde estás leyendo.
      mensaje: foco ?? seccion ?? BASE,
      situar: setSeccion,
      decir: setFoco,
    }),
    [foco, seccion],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export const useGuia = () => useContext(Contexto);
