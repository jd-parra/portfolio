"use client";

import dynamic from "next/dynamic";
import { ESCRITORIO, SIN_MOVIMIENTO, useMediaQuery } from "./useMediaQuery";

// layout.tsx es Server Component: el ssr: false tiene que vivir aquí.
const FondoCanvas = dynamic(() => import("./FondoCanvas"), { ssr: false });

export default function Fondo() {
  const esEscritorio = useMediaQuery(ESCRITORIO);
  const sinMovimiento = useMediaQuery(SIN_MOVIMIENTO);

  // En móvil apenas se ve y cuesta lo mismo: no se monta.
  if (!esEscritorio) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <FondoCanvas sinMovimiento={sinMovimiento} />
    </div>
  );
}
