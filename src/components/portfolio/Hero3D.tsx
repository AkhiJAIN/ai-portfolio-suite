import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Icosahedron, Torus, Octahedron, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const SpinningTorus = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.3; });
  return (
    <Torus ref={ref} args={[1.7, 0.05, 16, 100]}>
      <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
    </Torus>
  );
};

const Crystal = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.x += dt * 0.2; ref.current.rotation.y += dt * 0.25; } });
  return (
    <Icosahedron ref={ref} args={[1.15, 0]}>
      {/* @ts-ignore */}
      <MeshTransmissionMaterial thickness={1.2} roughness={0.05} transmission={1} ior={1.4} chromaticAberration={0.06} backside color="#10b981" />
    </Icosahedron>
  );
};

/** Decorative crystal/glass 3D scene used behind the hero portrait. */
export const Hero3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#fbbf24" />
      <directionalLight position={[-5, -3, 2]} intensity={0.7} color="#34d399" />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
          <Crystal />
        </Float>
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <Octahedron args={[0.4, 0]} position={[1.9, 1.1, 0.5]}>
            {/* @ts-ignore */}
            <MeshTransmissionMaterial thickness={0.8} roughness={0.05} transmission={1} ior={1.5} color="#fbbf24" />
          </Octahedron>
        </Float>
        <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.4}>
          <Icosahedron args={[0.28, 0]} position={[-1.8, -1, 0.3]}>
            {/* @ts-ignore */}
            <MeshTransmissionMaterial thickness={0.6} roughness={0.05} transmission={1} ior={1.4} color="#34d399" />
          </Icosahedron>
        </Float>
        <SpinningTorus />
      </Suspense>
    </Canvas>
  );
};
