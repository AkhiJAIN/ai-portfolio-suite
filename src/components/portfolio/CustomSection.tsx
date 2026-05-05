import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "./Section";
import { Tilt3D } from "./Tilt3D";
import { CustomSection as CS, resolveImageUrl } from "@/store/portfolioStore";

export const CustomSection = ({ section }: { section: CS }) => (
  <Section id={section.slug} eyebrow={section.eyebrow || "Custom"} title={section.title}>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto" style={{ perspective: 1200 }}>
      {section.items.map((it, i) => {
        const img = resolveImageUrl(it.image);
        return (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Tilt3D max={8} scale={1.03} className="h-full">
              <div className="rounded-2xl border bg-card shadow-soft hover:shadow-glow transition-smooth overflow-hidden h-full">
                {img && (
                  <div className="aspect-[16/9] overflow-hidden bg-secondary">
                    <img src={img} alt={it.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                  </div>
                )}
                <div className="p-6">
                  <div className="h-11 w-11 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center mb-4 shadow-glow">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{it.desc}</p>
                </div>
              </div>
            </Tilt3D>
          </motion.div>
        );
      })}
    </div>
  </Section>
);
