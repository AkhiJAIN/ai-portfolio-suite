import { motion } from "framer-motion";
import { Section } from "./Section";
import { usePortfolio } from "@/store/portfolioStore";
import { AboutCrystal } from "./AboutCrystal";

export const About = () => {
  const { data } = usePortfolio();
  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center"
      >
        <AboutCrystal />
        <div className="rounded-2xl border bg-card p-8 md:p-10 shadow-elegant">
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{data.about}</p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { n: `${data.projects.length}+`, l: "Projects" },
              { n: `${data.experience.length}`, l: "Internships" },
              { n: `${data.skills.length}`, l: "Skills" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-secondary/60 p-4">
                <div className="font-display text-2xl font-bold text-gradient">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
