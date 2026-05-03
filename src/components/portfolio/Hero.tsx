import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";
import { usePortfolio } from "@/store/portfolioStore";

export const Hero = () => {
  const { data } = usePortfolio();
  const profile = data.profile;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const nameParts = profile.name.split(" ");

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-12 bg-gradient-hero overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-primary opacity-30 blur-2xl animate-pulse" />
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-[420px] lg:w-[420px] rounded-full p-2 bg-gradient-primary shadow-glow">
              <div className="h-full w-full rounded-full overflow-hidden bg-background">
                <img src={profile.image} alt={profile.name} width={420} height={420} className="h-full w-full object-cover" />
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-2 -right-2 bg-card border shadow-elegant rounded-2xl px-4 py-3"
            >
              <p className="text-xs text-muted-foreground">Currently</p>
              <p className="text-sm font-semibold">Open to roles ✨</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="order-1 lg:order-2 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-1.5 text-sm font-medium text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            {nameParts[0]}{" "}
            <span className="text-gradient">{nameParts.slice(1).join(" ")}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-4 text-xl sm:text-2xl font-semibold text-foreground/80"
          >
            {profile.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-5 max-w-xl mx-auto lg:mx-0 text-muted-foreground text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <Button size="lg" onClick={() => go("projects")} className="bg-gradient-primary hover:opacity-90 shadow-glow transition-smooth hover:scale-105">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => go("contact")} className="transition-smooth hover:scale-105">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
            <Button size="lg" variant="ghost" asChild className="transition-smooth hover:scale-105">
              <a href={profile.resume || "#"} download>
                <Download className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
