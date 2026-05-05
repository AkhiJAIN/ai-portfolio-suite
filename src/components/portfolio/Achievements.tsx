import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Section } from "./Section";
import { Tilt3D } from "./Tilt3D";
import { usePortfolio, resolveImageUrl } from "@/store/portfolioStore";

export const Achievements = () => {
  const { data } = usePortfolio();
  return (
    <Section id="achievements" eyebrow="Milestones" title="Achievements">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto" style={{ perspective: 1200 }}>
        {data.achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {(() => { const img = resolveImageUrl(a.image); return (
            <Tilt3D max={10} scale={1.04} className="h-full">
              <div className="rounded-2xl border bg-card shadow-soft hover:shadow-glow transition-smooth text-center overflow-hidden h-full">
                {img ? (
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img src={img} alt={a.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                  </div>
                ) : (
                  <div className="pt-6">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
                      <Trophy className="h-5 w-5" />
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display font-bold">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            </Tilt3D>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
