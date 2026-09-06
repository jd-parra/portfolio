"use client";

import { createContext, useContext, useMemo, useState } from "react";

const BASE = "Hola, soy tu guía.\nDame un clic.";

type Guia = {
  mensaje: string;
  /** null vuelve al saludo de siempre. */
  decir: (m: string | null) => void;
};

const Contexto = createContext<Guia>({ mensaje: BASE, decir: () => {} });

export function ProveedorGuia({ children }: { children: React.ReactNode }) {
  const [mensaje, setMensaje] = useState<string | null>(null);

  const valor = useMemo(
    () => ({ mensaje: mensaje ?? BASE, decir: setMensaje }),
    [mensaje],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export const useGuia = () => useContext(Contexto);
