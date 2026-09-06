"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { Vector3 } from "three";
import type { Arquitectura, Nodo } from "../data/arquitecturas";

function Conexiones({ arq }: { arq: Arquitectura }) {
  const puntos = useMemo(() => {
    const mapa = new Map(arq.nodos.map((n) => [n.id, n.pos]));
    return arq.conexiones
      .map(([a, b]) => {
        const pa = mapa.get(a);
        const pb = mapa.get(b);
        if (!pa || !pb) return null;
        return [new Vector3(...pa), new Vector3(...pb)];
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
          <lineBasicMaterial attach="material" color="#9AA5A0" />
        </line>
      ))}
    </>
  );
}

function NodoMesh({
  nodo,
  activo,
  onSelect,
}: {
  nodo: Nodo;
  activo: boolean;
  onSelect: (n: Nodo) => void;
}) {
  const [hover, setHover] = useState(false);
  const escala = hover || activo ? 1.35 : 1;

  return (
    <mesh
      position={nodo.pos}
      scale={escala}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(nodo);
      }}
    >
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshStandardMaterial color={activo ? "#14403D" : "#1F5F5B"} />
    </mesh>
  );
}

function Escenario({
  arq,
  sel,
  onSelect,
  girar,
}: {
  arq: Arquitectura;
  sel: Nodo | null;
  onSelect: (n: Nodo) => void;
  girar: boolean;
}) {
  const grupo = useRef<Group>(null);

  useFrame((_, delta) => {
    if (girar && grupo.current) grupo.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={grupo}>
      <Conexiones arq={arq} />
      {arq.nodos.map((n) => (
        <NodoMesh
          key={n.id}
          nodo={n}
          activo={sel?.id === n.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

export default function EscenaCanvas({
  arq,
  sel,
  onSelect,
  orbita,
}: {
  arq: Arquitectura;
  sel: Nodo | null;
  onSelect: (n: Nodo) => void;
  orbita: boolean;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 6]} intensity={1.1} />
      <Escenario arq={arq} sel={sel} onSelect={onSelect} girar={!sel} />
      {orbita && <OrbitControls enablePan={false} enableZoom={false} />}
    </Canvas>
  );
}
