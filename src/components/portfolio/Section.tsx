import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, title, eyebrow, children, className }: Props) => (
  <section id={id} className={cn("py-20 md:py-28 scroll-mt-20", className)}>
    <div className="container">
      {(title || eyebrow) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          {eyebrow && (
            <p className="text-sm uppercase tracking-[0.2em] font-semibold text-primary mb-3">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              {title}
            </h2>
          )}
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-primary" />
        </motion.div>
      )}
      {children}
    </div>
  </section>
);
