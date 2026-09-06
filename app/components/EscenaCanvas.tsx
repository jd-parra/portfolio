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
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#1F5F5B" />
    </mesh>
  );
}

export default function EscenaCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={1.2} />
      <Nodo />
    </Canvas>
  );
}
