"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function Nodo() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#1F5F5B" />
    </mesh>
  );
}

export default function EscenaCanvas() {
  return (
    <Canvas camera={{ position: [1, 1, 2] }}>
      <ambientLight intensity={6} />
      <directionalLight position={[1, 1, 2]} intensity={1.2} />
      <Nodo />
    </Canvas>
  );
}
