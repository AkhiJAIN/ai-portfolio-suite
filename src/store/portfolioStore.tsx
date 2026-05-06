import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import profileImg from "@/assets/profile.jpg";

// ---------------- Types ----------------
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  image: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
}

export interface EducationItem { id: string; title: string; place: string; period: string; score: string; desc: string; image?: string; }
export interface Skill { id: string; name: string; }
export interface Project { id: string; title: string; desc: string; stack: string; link: string; image?: string; }
export interface ExperienceItem { id: string; role: string; company: string; period: string; desc: string; image?: string; }
export interface VolunteerItem { id: string; role: string; org: string; desc: string; image?: string; }
export interface AchievementItem { id: string; title: string; desc: string; image?: string; }

export interface CustomItem { id: string; title: string; desc: string; image?: string; }

// Normalize Google Drive share links into direct-viewable image URLs.
// Accepts:
//   https://drive.google.com/file/d/FILEID/view?usp=sharing
//   https://drive.google.com/open?id=FILEID
//   https://drive.google.com/uc?id=FILEID
// Returns a thumbnail URL that renders inline in <img>.
export const resolveImageUrl = (url?: string | null): string | undefined => {
  if (!url || typeof url !== "string") return undefined;
  const s = url.trim();
  if (!s) return undefined;
  let id: string | null = null;
  const m1 = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m1) id = m1[1];
  if (!id) {
    const m2 = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m2) id = m2[1];
  }
  if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
  return s;
};
export interface CustomSection {
  id: string;
  slug: string; // url-safe id, used for nav anchor
  title: string;
  eyebrow: string;
  items: CustomItem[];
}

export interface PortfolioData {
  profile: Profile;
  about: string;
  education: EducationItem[];
  skills: Skill[];
  projects: Project[];
  experience: ExperienceItem[];
  volunteering: VolunteerItem[];
  achievements: AchievementItem[];
  customSections: CustomSection[];
}

// ---------------- Defaults ----------------
const uid = () => Math.random().toString(36).slice(2, 10);

export const DEFAULT_DATA: PortfolioData = {
  profile: {
    name: "Aarav Sharma",
    title: "AI & Data Science Engineer",
    tagline: "Turning data into intelligent products. I build ML models, data pipelines, and delightful interfaces.",
    image: profileImg,
    email: "aarav.sharma@example.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    resume: "#",
  },
  about: "I'm a final-year AI & Data Science engineering student passionate about machine learning, data engineering and building products that feel magical. I love clean code, elegant math, and shipping real things.",
  education: [
    { id: uid(), title: "B.E. in Artificial Intelligence & Data Science", place: "ABC Engineering College", period: "2022 — 2026", score: "CGPA: 9.1 / 10", desc: "Specializing in machine learning, deep learning, and data engineering." },
    { id: uid(), title: "Pre-University (PCMB)", place: "XYZ PU College", period: "2020 — 2022", score: "94.3%", desc: "Focused on Mathematics and Computer Science." },
    { id: uid(), title: "High School (CBSE)", place: "Greenfield High School", period: "2018 — 2020", score: "96.8%", desc: "School topper in Mathematics." },
  ],
  skills: ["Python","Machine Learning","Deep Learning / PyTorch","Pandas & NumPy","SQL","TensorFlow","React & TypeScript","AWS / GCP","Docker","FastAPI"].map(n => ({ id: uid(), name: n })),
  projects: [
    { id: uid(), title: "Smart Crop Disease Detector", desc: "CNN-based mobile app that diagnoses plant diseases from a photo with 96% accuracy.", stack: "PyTorch, FastAPI, React Native", link: "#" },
    { id: uid(), title: "Realtime Sentiment Dashboard", desc: "Streaming pipeline that analyzes tweet sentiment in real time using Kafka & Spark.", stack: "Kafka, Spark, Python, Plotly", link: "#" },
    { id: uid(), title: "AI Resume Reviewer", desc: "LLM-powered tool that gives actionable feedback on resumes against a target role.", stack: "OpenAI, LangChain, Next.js", link: "#" },
    { id: uid(), title: "Sales Forecasting Engine", desc: "Time-series forecasting using Prophet & XGBoost; reduced MAPE by 27%.", stack: "XGBoost, Prophet, Pandas", link: "#" },
  ],
  experience: [
    { id: uid(), role: "Data Science Intern", company: "Nimbus Analytics", period: "May 2025 — Aug 2025", desc: "Built a customer churn model that improved retention by 12%." },
    { id: uid(), role: "ML Research Intern", company: "University AI Lab", period: "Dec 2024 — Mar 2025", desc: "Researched transformer compression techniques." },
  ],
  volunteering: [
    { id: uid(), role: "AI Club Lead", org: "Engineering College AI Club", desc: "Organized 10+ workshops on ML & Python, reaching 500+ students." },
    { id: uid(), role: "Mentor", org: "Code for Good", desc: "Mentored school students in Python and basic data analysis." },
  ],
  achievements: [
    { id: uid(), title: "Smart India Hackathon — Finalist", desc: "Top 30 nationwide among 10k+ teams." },
    { id: uid(), title: "Kaggle Expert", desc: "Multiple top 10% finishes in tabular competitions." },
    { id: uid(), title: "Dean's List", desc: "Awarded all 3 academic years." },
    { id: uid(), title: "Google Cloud Certified", desc: "Associate Cloud Engineer certification." },
  ],
  customSections: [],
};

// ---------------- Store ----------------
const STORAGE_KEY = "portfolio-data-v1";

interface Ctx {
  data: PortfolioData;
  setData: (d: PortfolioData) => void;
  update: (patch: Partial<PortfolioData>) => void;
  reset: () => void;
}

const PortfolioContext = createContext<Ctx | null>(null);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<PortfolioData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // ensure profile image fallback
        if (!parsed.profile?.image) parsed.profile.image = profileImg;
        return { ...DEFAULT_DATA, ...parsed };
      }
    } catch {}
    return DEFAULT_DATA;
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const setData = useCallback((d: PortfolioData) => setDataState(d), []);
  const update = useCallback((patch: Partial<PortfolioData>) => setDataState(prev => ({ ...prev, ...patch })), []);
  const reset = useCallback(() => setDataState(DEFAULT_DATA), []);

  return (
    <PortfolioContext.Provider value={{ data, setData, update, reset }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
};

export const newId = uid;
export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
