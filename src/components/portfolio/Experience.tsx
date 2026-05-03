import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Section } from "./Section";
import { usePortfolio } from "@/store/portfolioStore";

export const Experience = () => {
  const { data } = usePortfolio();
  return (
    <Section id="experience" eyebrow="Internships" title="Experience">
      <div className="max-w-3xl mx-auto space-y-5">
        {data.experience.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex gap-5 rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-smooth"
          >
            <div className="shrink-0 h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-glow">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold">{e.role}</h3>
                <span className="text-xs font-semibold text-primary">{e.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">{e.company}</p>
              <p className="mt-2 text-sm">{e.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
