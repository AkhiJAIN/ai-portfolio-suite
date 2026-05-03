import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Section } from "./Section";
import { usePortfolio } from "@/store/portfolioStore";

export const Volunteering = () => {
  const { data } = usePortfolio();
  return (
    <Section id="volunteering" eyebrow="Giving back" title="Volunteering">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {data.volunteering.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-glow transition-smooth"
          >
            <div className="h-11 w-11 rounded-xl bg-accent text-accent-foreground grid place-items-center mb-4">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold">{v.role}</h3>
            <p className="text-sm text-muted-foreground">{v.org}</p>
            <p className="mt-2 text-sm">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
