"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Group, LineBasicMaterial, Mesh, PerspectiveCamera } from "three";
import { Vector3 } from "three";
import type { Arquitectura, Nodo } from "../data/arquitecturas";
import { useTema } from "./useTema";

const RADIO = 0.26;
const MARGEN = 0.1;
/** Extensión a encuadrar. Los datos ocupan 6 x 3.75, pero hay que sumar el
 *  radio del nodo crecido en hover (0.35) y la caída de la entrada (0.35),
 *  o el nodo de abajo se sale del marco. El margen sobrante lo achica, que
 *  es lo que se quiere en pantallas grandes. */
const ANCHO = 8;
const ALTO = 6;
/** Fuera del componente: si fuera un objeto nuevo en cada render, R3F
 *  re-aplicaría la cámara y desharía la órbita del usuario. */
const CAMARA = { position: [0, 0, 8] as [number, number, number], fov: 45 };

/** three.js no entiende oklch(), así que los colores del grafo no pueden
 *  salir de las variables CSS. Se mantienen a mano, emparejados con los
 *  tokens de cada tema. */
const COLORES = {
  claro: { nodo: "#1F5F5B", activo: "#0F3330", linea: "#C6CFCB" },
  oscuro: { nodo: "#6FC5BB", activo: "#B7E9E2", linea: "#3B4746" },
} as const;

const acotar = (x: number) => Math.max(0, Math.min(1, x));
/** smoothstep: entra y sale sin aristas. */
const suave = (x: number) => x * x * (3 - 2 * x);

type Progreso = { current: number };

function Encuadre() {
  // Vía get() y no useThree(s => s.camera): react-hooks no deja mutar lo que
  // devuelve un hook, y aquí hay que mover la cámara.
  const get = useThree((s) => s.get);
  const medidas = useThree((s) => s.size);
  const aplicadoRef = useRef("");

  useLayoutEffect(() => {
    // El efecto se dispara en cada render aunque las medidas no cambien.
    // Sin esta guarda, reencuadrar pisaba la órbita en cada hover.
    const clave = `${medidas.width}x${medidas.height}`;
    if (aplicadoRef.current === clave) return;
    aplicadoRef.current = clave;

    const camara = get().camera as PerspectiveCamera;
    const aspecto = medidas.width / medidas.height;
    const mitadFov = ((camara.fov / 2) * Math.PI) / 180;
    const porAlto = ALTO / 2 / Math.tan(mitadFov);
    const porAncho = ANCHO / 2 / Math.tan(mitadFov) / aspecto;

    // setLength y no position.z: conserva el ángulo desde el que estás
    // mirando y solo cambia la distancia. Asignar z te cruzaba al otro lado
    // de la escena si habías orbitado hasta detrás.
    camara.position.setLength(Math.max(porAlto, porAncho));
    camara.updateProjectionMatrix();
  }, [get, medidas]);

  return null;
}

/** Mide cuánto ha entrado la figura en la pantalla. Va primero entre sus
 *  hermanos para que los demás useFrame lean el valor de este fotograma. */
function MedirScroll({
  contenedorRef,
  progresoRef,
}: {
  contenedorRef: React.RefObject<HTMLDivElement | null>;
  progresoRef: Progreso;
}) {
  useFrame(() => {
    const el = contenedorRef.current;
    if (!el) return;
    const caja = el.getBoundingClientRect();
    const centro = caja.top + caja.height / 2;
    const alto = window.innerHeight;
    // 0 con la figura asomando por abajo, 1 con su centro en mitad de pantalla.
    progresoRef.current = acotar((alto * 1.1 - centro) / (alto * 0.6));
  });

  return null;
}

function Linea({
  par,
  entrada,
  progresoRef,
  color,
}: {
  par: Vector3[];
  entrada: number;
  progresoRef: Progreso;
  color: string;
}) {
  const material = useRef<LineBasicMaterial>(null);

  useFrame(() => {
    if (!material.current) return;
    material.current.opacity = suave(acotar((progresoRef.current - entrada) / 0.3));
  });

  return (
    <line>
      <bufferGeometry
        attach="geometry"
        onUpdate={(g) => g.setFromPoints(par)}
      />
      <lineBasicMaterial
        ref={material}
        attach="material"
        color={color}
        transparent
        opacity={0}
      />
    </line>
  );
}

function Conexiones({
  arq,
  progresoRef,
  color,
}: {
  arq: Arquitectura;
  progresoRef: Progreso;
  color: string;
}) {
  const lineas = useMemo(() => {
    const mapa = new Map(arq.nodos.map((n) => [n.id, n.pos]));
    const orden = new Map(arq.nodos.map((n, i) => [n.id, i]));
    const paso = 0.55 / Math.max(arq.nodos.length, 1);

    return arq.conexiones
      .map(([a, b]) => {
        const origen = mapa.get(a);
        const destino = mapa.get(b);
        if (!origen || !destino) return null;

        // De centro a centro la línea asomaría dentro de la esfera: se recorta
        // por los dos extremos, con margen para cuando el nodo crece en hover.
        const pa = new Vector3(...origen);
        const pb = new Vector3(...destino);
        const dir = pb.clone().sub(pa).normalize();
        const corte = RADIO + MARGEN;

        // La línea aparece cuando ya están sus dos extremos.
        const ultimo = Math.max(orden.get(a) ?? 0, orden.get(b) ?? 0);

        return {
          par: [
            pa.clone().addScaledVector(dir, corte),
            pb.clone().addScaledVector(dir, -corte),
          ],
          entrada: ultimo * paso + 0.1,
        };
      })
      .filter(Boolean) as { par: Vector3[]; entrada: number }[];
  }, [arq]);

  return (
    <>
      {lineas.map((l, i) => (
        <Linea
          key={i}
          par={l.par}
          entrada={l.entrada}
          progresoRef={progresoRef}
          color={color}
        />
      ))}
    </>
  );
}

function NodoMesh({
  nodo,
  activo,
  entrada,
  progresoRef,
  sinMovimiento,
  paleta,
  onSelect,
}: {
  nodo: Nodo;
  activo: boolean;
  entrada: number;
  progresoRef: Progreso;
  sinMovimiento: boolean;
  paleta: (typeof COLORES)[keyof typeof COLORES];
  onSelect: (n: Nodo) => void;
}) {
  const ref = useRef<Mesh>(null);
  const [hover, setHover] = useState(false);
  const escalaObjetivo = hover || activo ? 1.35 : 1;

  useFrame((_, delta) => {
    if (!ref.current) return;

    // Aparición ligada al scroll: sube a su sitio mientras crece.
    const nacer = sinMovimiento
      ? 1
      : suave(acotar((progresoRef.current - entrada) / 0.3));
    ref.current.position.set(
      nodo.pos[0],
      nodo.pos[1] - (1 - nacer) * 0.35,
      nodo.pos[2],
    );

    const objetivo = escalaObjetivo * nacer;
    if (sinMovimiento) {
      ref.current.scale.setScalar(objetivo);
      return;
    }
    // Interpolación hacia el objetivo. El min evita el salto si el navegador
    // pierde fotogramas y delta llega enorme.
    const actual = ref.current.scale.x;
    ref.current.scale.setScalar(
      actual + (objetivo - actual) * Math.min(delta * 12, 1),
    );
  });

  return (
    // Sin props position ni scale: los escribe useFrame. Si React los
    // re-aplicase en cada render, cada hover devolvería el nodo a su sitio.
    <mesh
      ref={ref}
      onPointerOver={(e) => {
        // En táctil no hay pointerOut al levantar el dedo: el nodo se quedaría
        // agrandado para siempre. El hover es solo de ratón.
        if (e.pointerType === "touch") return;
        e.stopPropagation();
        setHover(true);
        onSelect(nodo);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        if (e.pointerType === "touch") return;
        setHover(false);
        document.body.style.cursor = "auto";
      }}
      // El hover ya selecciona con ratón. El clic queda para el táctil, y no
      // marca interacción: en móvil el diagrama nunca se detiene.
      onClick={(e) => {
        e.stopPropagation();
        onSelect(nodo);
      }}
    >
      <sphereGeometry args={[RADIO, 24, 24]} />
      <meshStandardMaterial color={activo ? paleta.activo : paleta.nodo} />
    </mesh>
  );
}

function Escenario({
  arq,
  sel,
  onSelect,
  sinMovimiento,
  contenedorRef,
}: {
  arq: Arquitectura;
  sel: Nodo | null;
  onSelect: (n: Nodo) => void;
  sinMovimiento: boolean;
  contenedorRef: React.RefObject<HTMLDivElement | null>;
}) {
  const grupo = useRef<Group>(null);
  const progresoRef = useRef(sinMovimiento ? 1 : 0);
  const paleta = COLORES[useTema()];
  const paso = 0.55 / Math.max(arq.nodos.length, 1);

  // Sin pausas: la escena gira siempre, también con el ratón encima.
  useFrame((_, delta) => {
    if (!grupo.current || sinMovimiento) return;
    grupo.current.rotation.y += delta * 0.22;
  });

  return (
    // El grupo exterior centra el diagrama; el interior es el que gira.
    <group position={[0, 0.375, 0]}>
      {!sinMovimiento && (
        <MedirScroll contenedorRef={contenedorRef} progresoRef={progresoRef} />
      )}
      <group ref={grupo}>
        <Conexiones arq={arq} progresoRef={progresoRef} color={paleta.linea} />
        {arq.nodos.map((n, i) => (
          <NodoMesh
            key={n.id}
            nodo={n}
            activo={sel?.id === n.id}
            entrada={i * paso}
            progresoRef={progresoRef}
            sinMovimiento={sinMovimiento}
            paleta={paleta}
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}

export default function EscenaCanvas({
  arq,
  sel,
  onSelect,
  orbita,
  visible,
  sinMovimiento,
  contenedorRef,
}: {
  arq: Arquitectura;
  sel: Nodo | null;
  onSelect: (n: Nodo) => void;
  orbita: boolean;
  visible: boolean;
  sinMovimiento: boolean;
  contenedorRef: React.RefObject<HTMLDivElement | null>;
}) {
  // never: fuera de pantalla, ni un fotograma. Con reduced-motion no hay nada
  // que animar, así que basta con redibujar cuando algo cambia.
  const frameloop = !visible ? "never" : sinMovimiento ? "demand" : "always";

  return (
    <Canvas frameloop={frameloop} camera={CAMARA}>
      <Encuadre />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 6]} intensity={1.1} />
      <Escenario
        arq={arq}
        sel={sel}
        onSelect={onSelect}
        sinMovimiento={sinMovimiento}
        contenedorRef={contenedorRef}
      />
      {orbita && <OrbitControls enablePan={false} enableZoom={false} />}
    </Canvas>
  );
}
