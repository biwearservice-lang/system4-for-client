import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

function Particles() {
  const mesh = useRef<THREE.Points>(null!);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const spd = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i] = 0.005 + Math.random() * 0.015;
    }
    return [pos, spd];
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      s[i] = 1.5 + Math.random() * 3;
    }
    return s;
  }, []);

  useFrame(() => {
    const geo = mesh.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 1] -= spd[i];
      if (arr[i * 3 + 1] < -10) {
        arr[i * 3 + 1] = 10;
        arr[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    posAttr.needsUpdate = true;
  });

  const spd = speeds;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={new THREE.Color("hsl(265, 80%, 65%)")}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
