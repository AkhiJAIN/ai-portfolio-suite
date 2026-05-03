import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Volunteering } from "@/components/portfolio/Volunteering";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CustomSection } from "@/components/portfolio/CustomSection";
import { usePortfolio } from "@/store/portfolioStore";

const Index = () => {
  const { data } = usePortfolio();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Volunteering />
        <Achievements />
        {data.customSections.map((s) => <CustomSection key={s.id} section={s} />)}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
