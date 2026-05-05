import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const Field = ({ count = 1500 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 14;
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.04;
    ref.current.rotation.x += dt * 0.015;
  });
  return (
    // @ts-ignore
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#fbbf24" size={0.025} sizeAttenuation depthWrite={false} opacity={0.85} />
    </Points>
  );
};

/** Site-wide fixed 3D particle field. */
export const ParticlesBG = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <Field />
      </Suspense>
    </Canvas>
  </div>
);
