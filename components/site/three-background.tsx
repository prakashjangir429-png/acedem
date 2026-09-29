'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 3000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0ea5e9"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingShape({
  position,
  geometry,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  geometry: 'box' | 'sphere' | 'octahedron' | 'torus' | 'icosahedron';
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.8, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.6, 0.25, 16, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.8, 0]} />;
    }
  }, [geometry]);

  return (
    <Float speed={2 * speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={scale}>
        {geo}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#14b8a6" />
        <ParticleField />
        <FloatingShape position={[-4, 2, -2]} geometry="icosahedron" color="#0ea5e9" scale={1.2} speed={0.8} />
        <FloatingShape position={[4, -1, -1]} geometry="torus" color="#14b8a6" scale={1} speed={1.2} />
        <FloatingShape position={[3, 3, -3]} geometry="octahedron" color="#3b82f6" scale={0.8} speed={0.6} />
        <FloatingShape position={[-3, -2, -2]} geometry="box" color="#06b6d4" scale={0.7} speed={1} />
        <FloatingShape position={[0, 1, -4]} geometry="sphere" color="#22d3ee" scale={1.5} speed={0.4} />
      </Canvas>
    </div>
  );
}
