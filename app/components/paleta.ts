/** three.js no entiende oklch(), así que los colores de las escenas no pueden
 *  salir de las variables CSS. Se mantienen a mano, emparejados con los
 *  tokens de cada tema. */
export const COLORES = {
  claro: {
    nodo: "#1F5F5B",
    activo: "#0F3330",
    linea: "#C6CFCB",
    hueco: "#FFFFFF",
  },
  oscuro: {
    nodo: "#6FC5BB",
    activo: "#B7E9E2",
    linea: "#3B4746",
    hueco: "#0F1414",
  },
} as const;

export type Paleta = (typeof COLORES)[keyof typeof COLORES];
