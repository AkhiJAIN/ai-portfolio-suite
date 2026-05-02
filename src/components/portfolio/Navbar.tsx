import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  "home", "about", "education", "skills", "projects", "experience", "volunteering", "achievements", "contact",
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-smooth",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b shadow-soft" : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16">
        <button onClick={() => go("home")} className="font-display font-extrabold text-lg">
          <span className="text-gradient">Aarav.</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {sections.map((s) => (
            <li key={s}>
              <button
                onClick={() => go(s)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium capitalize transition-smooth hover:text-primary",
                  active === s ? "text-primary" : "text-muted-foreground"
                )}
              >
                {s}
                {active === s && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-primary"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full hover:bg-secondary transition-smooth"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            className="lg:hidden p-2 rounded-full hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t bg-background/95 backdrop-blur"
        >
          <ul className="container py-4 grid gap-1">
            {sections.map((s) => (
              <li key={s}>
                <button
                  onClick={() => go(s)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg capitalize text-sm font-medium",
                    active === s ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                  )}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};
