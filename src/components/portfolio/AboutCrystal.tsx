import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Icosahedron, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const BigCrystal = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.y += dt * 0.3; ref.current.rotation.x += dt * 0.15; } });
  return (
    <Icosahedron ref={ref} args={[1.6, 1]}>
      {/* @ts-ignore */}
      <MeshTransmissionMaterial thickness={1.5} roughness={0.04} transmission={1} ior={1.45} chromaticAberration={0.08} backside color="#10b981" />
    </Icosahedron>
  );
};

/** Big interactive crystal scene for the About section. */
export const AboutCrystal = () => (
  <div className="h-72 md:h-96 w-full rounded-2xl overflow-hidden bg-gradient-hero border shadow-elegant">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fbbf24" />
      <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#34d399" />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
          <BigCrystal />
        </Float>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  </div>
);
