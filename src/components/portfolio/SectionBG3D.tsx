import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Octahedron, Tetrahedron, TorusKnot, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const Spin = ({ speed = 0.3, children }: { speed?: number; children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * speed;
    ref.current.rotation.x += dt * speed * 0.5;
  });
  return <group ref={ref}>{children}</group>;
};

const Drift = ({ amp = 0.4, speed = 0.5, children }: { amp?: number; speed?: number; children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(clock.elapsedTime * speed) * amp;
    ref.current.position.y = Math.cos(clock.elapsedTime * speed * 0.8) * amp * 0.6;
  });
  return <group ref={ref}>{children}</group>;
};

/** Subtle floating crystal background for any section. */
export const SectionBG3D = ({ variant = 0 }: { variant?: number }) => {
  const positions: [number, number, number][] = [
    [-3.2, 1.6, -1], [3.4, -1.3, -2], [0, 2.2, -3], [-2, -1.8, -1.5], [2.2, 1.4, -2.5],
  ];
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-70" aria-hidden>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={0.9} color="#3b82f6" />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color="#67e8f9" />
        <Suspense fallback={null}>
          <Environment preset="night" />

          <Drift amp={0.5} speed={0.4}>
            <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.4}>
              <Spin speed={0.25}>
                <Icosahedron args={[0.65, 0]} position={positions[variant % 5]}>
                  {/* @ts-ignore */}
                  <MeshTransmissionMaterial thickness={0.8} roughness={0.05} transmission={1} ior={1.4} color="#22d3ee" />
                </Icosahedron>
              </Spin>
            </Float>
          </Drift>

          <Drift amp={0.6} speed={0.55}>
            <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.5}>
              <Octahedron args={[0.5, 0]} position={positions[(variant + 1) % 5]}>
                {/* @ts-ignore */}
                <MeshTransmissionMaterial thickness={0.7} roughness={0.05} transmission={1} ior={1.5} color="#3b82f6" />
              </Octahedron>
            </Float>
          </Drift>

          <Drift amp={0.4} speed={0.7}>
            <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.3}>
              <Tetrahedron args={[0.45, 0]} position={positions[(variant + 2) % 5]}>
                {/* @ts-ignore */}
                <MeshTransmissionMaterial thickness={0.7} roughness={0.05} transmission={1} ior={1.4} color="#67e8f9" />
              </Tetrahedron>
            </Float>
          </Drift>

          <Float speed={0.9} rotationIntensity={0.4} floatIntensity={1.0}>
            <Spin speed={0.18}>
              <TorusKnot args={[0.42, 0.12, 80, 14]} position={positions[(variant + 3) % 5]}>
                {/* @ts-ignore */}
                <MeshTransmissionMaterial thickness={0.6} roughness={0.08} transmission={1} ior={1.45} color="#facc15" />
              </TorusKnot>
            </Spin>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};
