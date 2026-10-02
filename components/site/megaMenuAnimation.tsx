
'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = new Float32Array(600 * 3);

  for (let i = 0; i < 600; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function WireSphere() {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={[3, 1, -2]}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial
          color="#2dd4bf"
          wireframe
          transparent
          opacity={0.13}
        />
      </mesh>
    </Float>
  );
}

export default function MegaMenuScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
      >
        <ParticleField />
        <WireSphere />
      </Canvas>
    </div>
  );
}
