import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const SpinningTorus = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.3; });
  return (
    <Torus ref={ref} args={[1.6, 0.06, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.2} />
    </Torus>
  );
};

/** Decorative 3D scene used behind the hero portrait. */
export const Hero3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fb923c" />
      <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#fbbf24" />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
          <Sphere args={[1.1, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial color="#ea580c" distort={0.35} speed={1.6} roughness={0.3} metalness={0.4} />
          </Sphere>
        </Float>
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <Icosahedron args={[0.35, 0]} position={[1.8, 1.1, 0.5]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.2} />
          </Icosahedron>
        </Float>
        <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.4}>
          <Icosahedron args={[0.25, 0]} position={[-1.7, -1, 0.3]}>
            <meshStandardMaterial color="#f97316" metalness={0.6} roughness={0.25} />
          </Icosahedron>
        </Float>
        <SpinningTorus />
      </Suspense>
    </Canvas>
  );
};
