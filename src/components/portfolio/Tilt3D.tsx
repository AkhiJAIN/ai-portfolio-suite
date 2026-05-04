import { useRef, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  max?: number; // max tilt deg
  scale?: number;
}

/** Lightweight 3D tilt wrapper — follows cursor with smooth spring physics. */
export const Tilt3D = ({ children, className = "", max = 10, scale = 1.02 }: Tilt3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
