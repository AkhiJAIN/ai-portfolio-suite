import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Section } from "./Section";
import { Tilt3D } from "./Tilt3D";
import { usePortfolio, resolveImageUrl } from "@/store/portfolioStore";

export const Projects = () => {
  const { data } = usePortfolio();
  return (
    <Section id="projects" eyebrow="Work" title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto" style={{ perspective: 1200 }}>
        {data.projects.map((p, i) => {
          const stackArr = p.stack.split(",").map(s => s.trim()).filter(Boolean);
          const img = resolveImageUrl(p.image);
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Tilt3D max={8} scale={1.02} className="h-full">
                <article className="group relative rounded-2xl border bg-card p-6 shadow-soft hover:shadow-glow transition-smooth overflow-hidden h-full">
                  <div className="aspect-[16/9] rounded-xl mb-5 overflow-hidden bg-gradient-primary/10 grid place-items-center">
                    {img ? (
                      <img src={img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <span className="font-display text-5xl font-extrabold text-gradient opacity-60">
                        {p.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stackArr.map((t) => (
                      <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">{t}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3 text-sm">
                    <a href={p.link || "#"} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                      <ExternalLink className="h-4 w-4" /> Live
                    </a>
                    <a href={p.link || "#"} className="inline-flex items-center gap-1.5 font-semibold text-muted-foreground hover:text-foreground">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  </div>
                </article>
              </Tilt3D>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
