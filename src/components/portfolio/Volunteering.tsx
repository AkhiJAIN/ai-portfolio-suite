import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Section } from "./Section";
import { Tilt3D } from "./Tilt3D";
import { usePortfolio, resolveImageUrl } from "@/store/portfolioStore";

export const Volunteering = () => {
  const { data } = usePortfolio();
  return (
    <Section id="volunteering" eyebrow="Giving back" title="Volunteering">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto" style={{ perspective: 1200 }}>
        {data.volunteering.map((v, i) => {
          const img = resolveImageUrl(v.image);
          return (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Tilt3D max={6}>
                <div className="rounded-2xl border bg-card shadow-soft hover:shadow-glow transition-smooth overflow-hidden h-full">
                  {img && (
                    <div className="aspect-[16/9] overflow-hidden bg-secondary">
                      <img src={img} alt={v.role} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="h-11 w-11 rounded-xl bg-accent text-accent-foreground grid place-items-center mb-4">
                      <Heart className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold">{v.role}</h3>
                    <p className="text-sm text-muted-foreground">{v.org}</p>
                    <p className="mt-2 text-sm">{v.desc}</p>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
