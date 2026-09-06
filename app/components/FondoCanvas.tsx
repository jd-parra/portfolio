"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const PLANOS = [
  { pos: [-4.2, 1.5, -2] as const, rot: 0.15, size: [3.4, 2.4] as const, vel: 0.35 },
  { pos: [4.6, -0.8, -4] as const, rot: -0.22, size: [4.2, 3.0] as const, vel: 0.6 },
  { pos: [-2.8, -3.5, -6] as const, rot: 0.08, size: [5.0, 3.4] as const, vel: 0.85 },
  { pos: [3.2, 3.8, -5] as const, rot: -0.12, size: [2.8, 2.0] as const, vel: 0.5 },
];

function Plano({
  def,
  scrollRef,
}: {
  def: (typeof PLANOS)[number];
  scrollRef: React.RefObject<number>;
}) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = def.pos[1] + scrollRef.current * def.vel;
    ref.current.rotation.z = def.rot + Math.sin(t * 0.15 + def.pos[0]) * 0.04;
  });

  return (
    <mesh ref={ref} position={def.pos} rotation={[0, 0, def.rot]}>
      <planeGeometry args={def.size} />
      <meshBasicMaterial color="#1F5F5B" transparent opacity={0.09} />
    </mesh>
  );
}

function Escenario() {
  const scroll = useRef(0);

  useFrame(() => {
    scroll.current = window.scrollY / window.innerHeight;
  });

  return (
    <group>
      {PLANOS.map((p, i) => (
        <Plano key={i} def={p} scrollRef={scroll} />
      ))}
    </group>
  );
}

/** Sin animación los planos se colocan una vez y se quedan quietos. */
function Estatico() {
  return (
    <group>
      {PLANOS.map((p, i) => (
        <mesh key={i} position={p.pos} rotation={[0, 0, p.rot]}>
          <planeGeometry args={p.size} />
          <meshBasicMaterial color="#1F5F5B" transparent opacity={0.09} />
        </mesh>
      ))}
    </group>
  );
}

export default function FondoCanvas({
  sinMovimiento,
}: {
  sinMovimiento: boolean;
}) {
  return (
    <Canvas
      frameloop={sinMovimiento ? "demand" : "always"}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: false }}
    >
      {/* meshBasicMaterial no necesita luces: no hay ninguna en esta escena. */}
      {sinMovimiento ? <Estatico /> : <Escenario />}
    </Canvas>
  );
}
