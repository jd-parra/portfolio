"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { Vector3 } from "three";
import type { Arquitectura } from "../data/arquitecturas";

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

function Escenario({ arq }: { arq: Arquitectura }) {
  const grupo = useRef<Group>(null);

  useFrame((_, delta) => {
    if (grupo.current) grupo.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={grupo}>
      <Conexiones arq={arq} />
      {arq.nodos.map((n) => (
        <mesh key={n.id} position={n.pos}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial color="#1F5F5B" />
        </mesh>
      ))}
    </group>
  );
}

export default function EscenaCanvas({ arq }: { arq: Arquitectura }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 6]} intensity={1.1} />
      <Escenario arq={arq} />
    </Canvas>
  );
}
