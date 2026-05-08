import { motion, useScroll, useSpring } from "framer-motion";

/** Sleek glowing scroll progress bar pinned to the top of the page. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gradient-primary shadow-glow pointer-events-none"
      aria-hidden
    />
  );
};
