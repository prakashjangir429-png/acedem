
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Points,
  PointMaterial,
  Float,
  Stars,
} from '@react-three/drei';
import * as THREE from 'three';


function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = 0;
    }

    return { positions, velocities };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const positionAttribute = ref.current.geometry.attributes.position;
    const array = positionAttribute.array as Float32Array;

    for (let i = 0; i < array.length; i += 3) {
      array[i] += velocities[i] * delta * 60;
      array[i + 1] += velocities[i + 1] * delta * 60;

      if (array[i] > 12) array[i] = -12;
      if (array[i] < -12) array[i] = 12;

      if (array[i + 1] > 9) array[i + 1] = -9;
      if (array[i + 1] < -9) array[i + 1] = 9;
    }

    positionAttribute.needsUpdate = true;

    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <Points
      ref={ref}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#0284c7"
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
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
    if (!ref.current) return;

    const time = state.clock.elapsedTime;

    ref.current.rotation.x = time * 0.35 * speed;
    ref.current.rotation.y = time * 0.45 * speed;
    ref.current.rotation.z = time * 0.18 * speed;

    ref.current.position.y =
      position[1] + Math.sin(time * 1.2 * speed) * 0.35;

    ref.current.position.x =
      position[0] + Math.cos(time * 0.5 * speed) * 0.15;
  });

  const geometryElement = useMemo(() => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;

      case 'sphere':
        return <icosahedronGeometry args={[0.7, 2]} />;

      case 'octahedron':
        return <octahedronGeometry args={[0.8, 0]} />;

      case 'torus':
        return <torusGeometry args={[0.6, 0.018, 12, 64]} />;

      case 'icosahedron':
        return <icosahedronGeometry args={[0.8, 1]} />;
    }
  }, [geometry]);

  return (
    <Float
      speed={1.2 * speed}
      rotationIntensity={0.25}
      floatIntensity={0.6}
    >
      <mesh
        ref={ref}
        position={position}
        scale={scale}
      >
        {geometryElement}

        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

function AmbientRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.z =
      state.clock.elapsedTime * 0.018;
  });

  return (
    <group ref={group} position={[0, 0, -5]}>
      {[2.5, 3.5, 4.5].map((radius, index) => (
        <mesh
          key={radius}
          rotation={[Math.PI / 2.8, index * 0.2, index * 0.3]}
        >
          <torusGeometry args={[radius, 0.004, 8, 160]} />

          <meshBasicMaterial
            color={index === 1 ? '#14b8a6' : '#38bdf8'}
            transparent
            opacity={0.12 - index * 0.025}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />

      <pointLight
        position={[10, 10, 10]}
        intensity={1.5}
        color="#38bdf8"
      />

      <pointLight
        position={[-10, -10, -5]}
        intensity={1}
        color="#14b8a6"
      />

      <Stars
        radius={80}
        depth={50}
        count={900}
        factor={3}
        saturation={0.2}
        fade
        speed={0.15}
      />

      <ParticleField />

      <AmbientRings />

      <FloatingShape
        position={[-5, 2.2, -3]}
        geometry="icosahedron"
        color="#38bdf8"
        scale={1.5}
        speed={0.7}
      />

      <FloatingShape
        position={[5, -1.5, -4]}
        geometry="torus"
        color="#2dd4bf"
        scale={1.6}
        speed={0.8}
      />

      <FloatingShape
        position={[4, 3.5, -6]}
        geometry="octahedron"
        color="#60a5fa"
        scale={1.1}
        speed={0.5}
      />

      <FloatingShape
        position={[-4, -3, -5]}
        geometry="box"
        color="#22d3ee"
        scale={0.8}
        speed={0.6}
      />

      <FloatingShape
        position={[0, 2, -8]}
        geometry="sphere"
        color="#67e8f9"
        scale={3.8}
        speed={0.3}
      />
    </>
  );
}

export function ThreeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >

      <div className="ambient-glow ambient-glow-blue" />
      <div className="ambient-glow ambient-glow-teal" />
      <div className="ambient-glow ambient-glow-violet" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 opacity-80">
        <Canvas
          camera={{
            position: [0, -1, 3],
            fov: 60,
          }}
          dpr={[1, 1.25]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'low-power',
          }}
          frameloop="always"
        >
          <Scene />
        </Canvas>
      </div>

      {/* Subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(248,251,255,0.55)_100%)]" />

      {/* Soft grid */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" /> */}

      {/* Readability layer */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40" /> */}
    </div>
  );
}
