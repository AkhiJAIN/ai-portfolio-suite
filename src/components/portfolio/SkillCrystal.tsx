import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Octahedron, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const Gem = ({ color }: { color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.y += dt * 0.8; ref.current.rotation.x += dt * 0.4; } });
  return (
    <Octahedron ref={ref} args={[0.85, 0]}>
      {/* @ts-ignore */}
      <MeshTransmissionMaterial thickness={0.6} roughness={0.05} transmission={1} ior={1.45} color={color} />
    </Octahedron>
  );
};

const PALETTE = ["#10b981", "#fbbf24", "#34d399", "#f59e0b", "#059669"];

/** Small 3D crystal icon for each skill. */
export const SkillCrystal = ({ index = 0 }: { index?: number }) => (
  <div className="h-10 w-10 shrink-0">
    <Canvas camera={{ position: [0, 0, 2.4], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 2]} intensity={1} color="#fbbf24" />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <Gem color={PALETTE[index % PALETTE.length]} />
      </Suspense>
    </Canvas>
  </div>
);
