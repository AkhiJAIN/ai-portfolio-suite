import { profile } from "@/data/portfolio";

export const Footer = () => (
  <footer className="border-t py-8">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} {profile.name}. Crafted with care.</p>
      <p>Built with React, Tailwind & Framer Motion.</p>
    </div>
  </footer>
);
