import { usePortfolio } from "@/store/portfolioStore";

export const Footer = () => {
  const { data } = usePortfolio();
  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {data.profile.name}. Crafted with care.</p>
        <p>Built with React, Tailwind & Framer Motion.</p>
      </div>
    </footer>
  );
};
