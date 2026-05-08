import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import { SectionBG3D } from "./SectionBG3D";

interface Props {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, title, eyebrow, children, className }: Props) => {
  const variant = (id.charCodeAt(0) + (id.charCodeAt(1) || 0)) % 3;
  const dir = (id.charCodeAt(0) % 2 === 0) ? 1 : -1;
  const ref = useRef<HTMLElement>(null);

  // scroll-linked parallax for the whole section
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const xContent = useTransform(scrollYProgress, [0, 0.5, 1], [60 * dir, 0, -40 * dir]);
  const rotateContent = useTransform(scrollYProgress, [0, 0.5, 1], [dir * 4, 0, dir * -3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.4, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative py-20 md:py-28 scroll-mt-20 overflow-hidden", className)}
      style={{ perspective: 1400 }}
    >
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <SectionBG3D variant={variant} />
      </motion.div>

      <motion.div style={{ x: xContent, rotateZ: rotateContent, opacity }} className="container relative will-change-transform">
        {(title || eyebrow) && (
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="mb-12 text-center"
          >
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-sm uppercase font-semibold text-primary mb-3"
              >
                {eyebrow}
              </motion.p>
            )}
            {title && (
              <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient">
                {title}
              </h2>
            )}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto mt-4 h-1 rounded-full bg-gradient-primary shadow-glow"
            />
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
};
