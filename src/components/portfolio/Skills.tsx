import { motion } from "framer-motion";
import { Section } from "./Section";
import { skills, tools } from "@/data/portfolio";

export const Skills = () => (
  <Section id="skills" eyebrow="Toolkit" title="Skills & Tools">
    <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
      <div className="space-y-5">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>{s.name}</span>
              <span className="text-muted-foreground">{s.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-primary"
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div>
        <h3 className="font-display text-xl font-bold mb-4">Tools I love</h3>
        <div className="flex flex-wrap gap-3">
          {tools.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.08 }}
              className="rounded-xl border bg-card px-4 py-2 text-sm font-medium shadow-soft hover:shadow-glow hover:border-primary transition-smooth cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  </Section>
);
