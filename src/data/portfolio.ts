import profileImg from "@/assets/profile.jpg";

export const profile = {
  name: "Aarav Sharma",
  title: "AI & Data Science Engineer",
  tagline:
    "Turning data into intelligent products. I build ML models, data pipelines, and delightful interfaces.",
  image: profileImg,
  email: "aarav.sharma@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  resume: "#",
};

export const about =
  "I'm a final-year AI & Data Science engineering student passionate about machine learning, data engineering and building products that feel magical. I love clean code, elegant math, and shipping real things.";

export const education = [
  {
    title: "B.E. in Artificial Intelligence & Data Science",
    place: "ABC Engineering College",
    period: "2022 — 2026",
    score: "CGPA: 9.1 / 10",
    desc: "Specializing in machine learning, deep learning, and data engineering. Active member of the AI club.",
  },
  {
    title: "Pre-University (PCMB)",
    place: "XYZ PU College",
    period: "2020 — 2022",
    score: "94.3%",
    desc: "Focused on Mathematics and Computer Science with state-level olympiad participation.",
  },
  {
    title: "High School (CBSE)",
    place: "Greenfield High School",
    period: "2018 — 2020",
    score: "96.8%",
    desc: "School topper in Mathematics. Started self-learning Python and web development.",
  },
];

export const skills = [
  { name: "Python", level: 95 },
  { name: "Machine Learning", level: 90 },
  { name: "Deep Learning / PyTorch", level: 85 },
  { name: "Data Analysis (Pandas, NumPy)", level: 92 },
  { name: "SQL & Databases", level: 80 },
  { name: "TensorFlow", level: 78 },
  { name: "React & TypeScript", level: 82 },
  { name: "Cloud (AWS / GCP)", level: 70 },
];

export const tools = ["Git", "Docker", "Jupyter", "VS Code", "Figma", "Linux", "FastAPI", "Streamlit"];

export const projects = [
  {
    title: "Smart Crop Disease Detector",
    desc: "CNN-based mobile app that diagnoses plant diseases from a photo with 96% accuracy.",
    stack: ["PyTorch", "FastAPI", "React Native"],
    link: "#",
  },
  {
    title: "Realtime Sentiment Dashboard",
    desc: "Streaming pipeline that analyzes tweet sentiment in real time using Kafka & Spark.",
    stack: ["Kafka", "Spark", "Python", "Plotly"],
    link: "#",
  },
  {
    title: "AI Resume Reviewer",
    desc: "LLM-powered tool that gives actionable feedback on resumes against a target role.",
    stack: ["OpenAI", "LangChain", "Next.js"],
    link: "#",
  },
  {
    title: "Sales Forecasting Engine",
    desc: "Time-series forecasting using Prophet & XGBoost; reduced MAPE by 27% over baseline.",
    stack: ["XGBoost", "Prophet", "Pandas"],
    link: "#",
  },
];

export const experience = [
  {
    role: "Data Science Intern",
    company: "Nimbus Analytics",
    period: "May 2025 — Aug 2025",
    desc: "Built a customer churn model that improved retention by 12% and shipped an internal Streamlit dashboard.",
  },
  {
    role: "ML Research Intern",
    company: "University AI Lab",
    period: "Dec 2024 — Mar 2025",
    desc: "Researched transformer compression techniques; co-authored a paper accepted at a student workshop.",
  },
];

export const volunteering = [
  {
    role: "AI Club Lead",
    org: "Engineering College AI Club",
    desc: "Organized 10+ workshops on ML & Python, reaching 500+ students.",
  },
  {
    role: "Mentor",
    org: "Code for Good",
    desc: "Mentored school students in Python and basic data analysis over weekends.",
  },
];

export const achievements = [
  { title: "Smart India Hackathon — Finalist", desc: "Top 30 nationwide among 10k+ teams." },
  { title: "Kaggle Expert", desc: "Multiple top 10% finishes in tabular competitions." },
  { title: "Dean's List", desc: "Awarded all 3 academic years for academic excellence." },
  { title: "Google Cloud Certified", desc: "Associate Cloud Engineer certification." },
];
