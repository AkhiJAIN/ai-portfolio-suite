import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "./Section";
import { CustomSection as CS } from "@/store/portfolioStore";

export const CustomSection = ({ section }: { section: CS }) => (
  <Section id={section.slug} eyebrow={section.eyebrow || "Custom"} title={section.title}>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
      {section.items.map((it, i) => (
        <motion.div
          key={it.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          whileHover={{ y: -5 }}
          className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-glow transition-smooth"
        >
          <div className="h-11 w-11 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center mb-4 shadow-glow">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-bold">{it.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{it.desc}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);
