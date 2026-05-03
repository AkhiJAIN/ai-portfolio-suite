import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/store/portfolioStore";

const baseSections = [
  "home", "about", "education", "skills", "projects", "experience", "volunteering", "achievements", "contact",
];

export const Navbar = () => {
  const { data } = usePortfolio();
  const sections = useMemo(() => {
    const customSlugs = data.customSections.map(s => s.slug);
    // insert custom sections before "contact"
    const before = baseSections.slice(0, baseSections.length - 1);
    return [...before, ...customSlugs, "contact"];
  }, [data.customSections]);

  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof document !== "undefined") return document.documentElement.classList.contains("dark");
    return false;
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: -16 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } } };

  const labelFor = (id: string) => {
    const cs = data.customSections.find(s => s.slug === id);
    return cs ? cs.title : id;
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-smooth",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b shadow-soft" : "bg-background/40 backdrop-blur-md"
      )}
    >
      <nav className="container flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => go("home")} className="font-display font-extrabold text-lg">
            <span className="text-gradient">{data.profile.name.split(" ")[0]}.</span>
          </button>
          <div className="flex items-center gap-1 md:hidden">
            <Link to="/admin" className="p-2 rounded-full hover:bg-secondary transition-smooth" aria-label="Admin">
              <Lock className="h-4 w-4" />
            </Link>
            <button onClick={() => setDark(d => !d)} className="p-2 rounded-full hover:bg-secondary transition-smooth" aria-label="Toggle theme">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <motion.ul variants={container} initial="hidden" animate="show" className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
          {sections.map((s) => (
            <motion.li key={s} variants={item}>
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                onClick={() => go(s)}
                className={cn(
                  "relative px-3 py-1.5 text-xs md:text-sm font-medium capitalize rounded-full transition-smooth",
                  active === s ? "text-primary-foreground" : "text-muted-foreground hover:text-primary"
                )}
              >
                {active === s && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-gradient-primary shadow-glow"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{labelFor(s)}</span>
              </motion.button>
            </motion.li>
          ))}
        </motion.ul>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/admin" className="p-2 rounded-full hover:bg-secondary transition-smooth" aria-label="Admin" title="Admin">
            <Lock className="h-4 w-4" />
          </Link>
          <button onClick={() => setDark(d => !d)} className="p-2 rounded-full hover:bg-secondary transition-smooth" aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
};
