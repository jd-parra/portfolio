"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { COLORES } from "./paleta";
import { useTema } from "./useTema";

const CAMARA = { position: [0, 0, 4.2] as [number, number, number], fov: 45 };

type Puntero = { current: { x: number; y: number } };

function Cara({
  punteroRef,
  saludoRef,
  sinMovimiento,
}: {
  punteroRef: Puntero;
  saludoRef: { current: number };
  sinMovimiento: boolean;
}) {
  const cabeza = useRef<Group>(null);
  const ojos = useRef<Group>(null);
  const parpado = useRef({ abierto: 1, siguiente: 3 });
  const boca = useRef<Mesh>(null);
  const rebote = useRef({ escala: 1, velocidad: 0, alegria: 0 });
  const ultimoSaludo = useRef(0);
  const paleta = COLORES[useTema()];

  useFrame((state, delta) => {
    if (!cabeza.current || !ojos.current || !boca.current) return;
    const t = state.clock.elapsedTime;
    const salto = Math.min(delta, 0.05);

    if (sinMovimiento) {
      cabeza.current.rotation.set(0, 0, 0);
      boca.current.scale.set(1, 0.16, 1);
      return;
    }

    // Mirada: la cabeza gira un poco hacia el cursor y los ojos se
    // desplazan dentro de su órbita, que es lo que la hace parecer viva.
    const { x, y } = punteroRef.current;
    cabeza.current.rotation.y += (x * 0.42 - cabeza.current.rotation.y) * 0.08;
    cabeza.current.rotation.x += (-y * 0.3 - cabeza.current.rotation.x) * 0.08;
    ojos.current.position.x += (x * 0.1 - ojos.current.position.x) * 0.12;
    ojos.current.position.y += (-y * 0.08 - ojos.current.position.y) * 0.12;

    // Parpadeo espontáneo, con la siguiente cita a intervalo irregular.
    if (t > parpado.current.siguiente) {
      parpado.current.abierto = 0;
      parpado.current.siguiente = t + 2.6 + Math.random() * 3.2;
    }
    parpado.current.abierto = Math.min(
      1,
      parpado.current.abierto + salto * 7,
    );
    const abierto = Math.max(0.06, parpado.current.abierto);
    ojos.current.scale.set(1, abierto, 1);

    // Un clic mete un impulso al muelle y sube la alegría, que decae sola.
    if (saludoRef.current !== ultimoSaludo.current) {
      ultimoSaludo.current = saludoRef.current;
      rebote.current.velocidad = 5.5;
      rebote.current.alegria = 1;
      parpado.current.abierto = 0;
    }
    const r = rebote.current;
    r.velocidad += (1 - r.escala) * 190 * salto - r.velocidad * 11 * salto;
    r.escala += r.velocidad * salto;
    r.alegria = Math.max(0, r.alegria - salto * 0.6);
    cabeza.current.scale.setScalar(r.escala);

    // La boca es un arco aplastado: plana en reposo, sonrisa al saludar.
    // 0.16 y no 0: al escalar el arco se aplasta también el grosor del tubo,
    // y por debajo de eso la línea de reposo desaparece.
    boca.current.scale.set(1, 0.16 + r.alegria * 0.84, 1);
  });

  return (
    <group ref={cabeza}>
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color={paleta.nodo} roughness={0.55} />
      </mesh>

      <group ref={ojos}>
        {[-0.32, 0.32].map((x) => (
          <mesh key={x} position={[x, 0.16, 0.86]}>
            <sphereGeometry args={[0.15, 20, 20]} />
            <meshBasicMaterial color={paleta.hueco} />
          </mesh>
        ))}
      </group>

      <mesh ref={boca} position={[0, -0.34, 0.86]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.3, 0.05, 8, 24, Math.PI]} />
        <meshBasicMaterial color={paleta.hueco} />
      </mesh>
    </group>
  );
}

export default function MascotaCanvas({
  punteroRef,
  saludoRef,
  sinMovimiento,
}: {
  punteroRef: Puntero;
  saludoRef: { current: number };
  sinMovimiento: boolean;
}) {
  return (
    <Canvas
      frameloop={sinMovimiento ? "demand" : "always"}
      camera={CAMARA}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} />
      <Cara
        punteroRef={punteroRef}
        saludoRef={saludoRef}
        sinMovimiento={sinMovimiento}
      />
    </Canvas>
  );
}
