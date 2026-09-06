"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { Vector3 } from "three";
import type { Arquitectura, Nodo } from "../data/arquitecturas";

const RADIO = 0.22;
const MARGEN = 0.1;
/** Segundos de quietud tras los que la escena vuelve a girar sola. */
const ESPERA = 3;

function Conexiones({ arq }: { arq: Arquitectura }) {
  const puntos = useMemo(() => {
    const mapa = new Map(arq.nodos.map((n) => [n.id, n.pos]));
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
        return [
          pa.clone().addScaledVector(dir, corte),
          pb.clone().addScaledVector(dir, -corte),
        ];
      })
      .filter(Boolean) as Vector3[][];
  }, [arq]);

  return (
    <>
      {puntos.map((par, i) => (
        <line key={i}>
          <bufferGeometry
            attach="geometry"
            onUpdate={(g) => g.setFromPoints(par)}
          />
          <lineBasicMaterial attach="material" color="#B4BEB9" />
        </line>
      ))}
    </>
  );
}

function NodoMesh({
  nodo,
  activo,
  sinMovimiento,
  onSelect,
  onInteract,
}: {
  nodo: Nodo;
  activo: boolean;
  sinMovimiento: boolean;
  onSelect: (n: Nodo) => void;
  onInteract: (t: number) => void;
}) {
  const ref = useRef<Mesh>(null);
  const [hover, setHover] = useState(false);
  const reloj = useThree((s) => s.clock);
  const objetivo = hover || activo ? 1.35 : 1;

  useFrame((_, delta) => {
    if (!ref.current) return;
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
    <mesh
      ref={ref}
      position={nodo.pos}
      onPointerOver={(e) => {
        // En táctil no hay pointerOut al levantar el dedo: el nodo se quedaría
        // agrandado para siempre. El hover es solo de ratón.
        if (e.pointerType === "touch") return;
        e.stopPropagation();
        setHover(true);
        onInteract(reloj.elapsedTime);
        onSelect(nodo);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        if (e.pointerType === "touch") return;
        setHover(false);
        onInteract(reloj.elapsedTime);
        document.body.style.cursor = "auto";
      }}
      // El hover ya selecciona en escritorio. El clic queda para el táctil,
      // donde no hay hover, y no marca interacción: en móvil no se detiene.
      onClick={(e) => {
        e.stopPropagation();
        onSelect(nodo);
      }}
    >
      <sphereGeometry args={[RADIO, 24, 24]} />
      <meshStandardMaterial color={activo ? "#14403D" : "#1F5F5B"} />
    </mesh>
  );
}

function Escenario({
  arq,
  sel,
  onSelect,
  sinMovimiento,
}: {
  arq: Arquitectura;
  sel: Nodo | null;
  onSelect: (n: Nodo) => void;
  sinMovimiento: boolean;
}) {
  const grupo = useRef<Group>(null);
  // -Infinity: al cargar no hay nada que esperar, gira desde el primer frame.
  const ultimaAccion = useRef(-Infinity);

  useFrame((state, delta) => {
    if (!grupo.current || sinMovimiento) return;
    const quieto = state.clock.elapsedTime - ultimaAccion.current > ESPERA;
    if (quieto) grupo.current.rotation.y += delta * 0.22;
  });

  return (
    // El grupo exterior centra el diagrama; el interior es el que gira.
    <group position={[0, 0.375, 0]}>
      <group ref={grupo}>
        <Conexiones arq={arq} />
        {arq.nodos.map((n) => (
          <NodoMesh
            key={n.id}
            nodo={n}
            activo={sel?.id === n.id}
            sinMovimiento={sinMovimiento}
            onSelect={onSelect}
            onInteract={(t) => {
              ultimaAccion.current = t;
            }}
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
}: {
  arq: Arquitectura;
  sel: Nodo | null;
  onSelect: (n: Nodo) => void;
  orbita: boolean;
  visible: boolean;
  sinMovimiento: boolean;
}) {
  // never: fuera de pantalla, ni un fotograma. Con reduced-motion no hay nada
  // que animar, así que basta con redibujar cuando algo cambia.
  const frameloop = !visible ? "never" : sinMovimiento ? "demand" : "always";

  return (
    <Canvas frameloop={frameloop} camera={{ position: [0, 0, 7.5], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 6]} intensity={1.1} />
      <Escenario
        arq={arq}
        sel={sel}
        onSelect={onSelect}
        sinMovimiento={sinMovimiento}
      />
      {orbita && <OrbitControls enablePan={false} enableZoom={false} />}
    </Canvas>
  );
}
