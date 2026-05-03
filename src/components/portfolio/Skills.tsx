import { motion } from "framer-motion";
import { Section } from "./Section";
import { usePortfolio } from "@/store/portfolioStore";

export const Skills = () => {
  const { data } = usePortfolio();
  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
        {data.skills.map((s, i) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            whileHover={{ scale: 1.08, y: -3 }}
            className="rounded-xl border bg-card px-5 py-2.5 text-sm font-medium shadow-soft hover:shadow-glow hover:border-primary transition-smooth cursor-default"
          >
            {s.name}
          </motion.span>
        ))}
      </div>
    </Section>
  );
};
