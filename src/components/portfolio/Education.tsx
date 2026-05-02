import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section } from "./Section";
import { education } from "@/data/portfolio";

export const Education = () => (
  <Section id="education" eyebrow="Journey" title="Education">
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
      <div className="space-y-12">
        {education.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`relative md:grid md:grid-cols-2 md:gap-8 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
          >
            <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
              <div className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{e.period}</p>
                <h3 className="mt-1 font-display text-xl font-bold">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.place}</p>
                <p className="mt-3 text-sm">{e.desc}</p>
                <div className="mt-3 inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold">
                  {e.score}
                </div>
              </div>
            </div>
            <div className="hidden md:block" />
            <div className="absolute left-0 md:left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 md:top-8">
              <div className="h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center shadow-glow">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);
