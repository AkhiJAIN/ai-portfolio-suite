import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Section } from "./Section";
import { achievements } from "@/data/portfolio";

export const Achievements = () => (
  <Section id="achievements" eyebrow="Milestones" title="Achievements">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
      {achievements.map((a, i) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-glow transition-smooth text-center"
        >
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow mb-4">
            <Trophy className="h-5 w-5" />
          </div>
          <h3 className="font-display font-bold">{a.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);
