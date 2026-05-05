import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Octahedron, Tetrahedron, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const Spin = ({ speed = 0.3, children }: { speed?: number; children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.y += dt * speed; ref.current.rotation.x += dt * speed * 0.5; } });
  return <group ref={ref}>{children}</group>;
};

/** Subtle floating crystal background for any section. */
export const SectionBG3D = ({ variant = 0 }: { variant?: number }) => {
  const positions: [number, number, number][] = [
    [-3, 1.5, -1], [3.2, -1.2, -2], [0, 2, -3],
  ];
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-60" aria-hidden>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} color="#fbbf24" />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.1}>
            <Spin speed={0.25}>
              <Icosahedron args={[0.6, 0]} position={positions[variant % 3]}>
                {/* @ts-ignore */}
                <MeshTransmissionMaterial thickness={0.8} roughness={0.05} transmission={1} ior={1.4} color="#10b981" />
              </Icosahedron>
            </Spin>
          </Float>
          <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.3}>
            <Octahedron args={[0.45, 0]} position={positions[(variant + 1) % 3]}>
              {/* @ts-ignore */}
              <MeshTransmissionMaterial thickness={0.7} roughness={0.05} transmission={1} ior={1.5} color="#fbbf24" />
            </Octahedron>
          </Float>
          <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
            <Tetrahedron args={[0.4, 0]} position={positions[(variant + 2) % 3]}>
              {/* @ts-ignore */}
              <MeshTransmissionMaterial thickness={0.7} roughness={0.05} transmission={1} ior={1.4} color="#34d399" />
            </Tetrahedron>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};
