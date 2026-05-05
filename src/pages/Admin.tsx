import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, LogOut, Plus, Trash2, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  usePortfolio, newId, slugify,
  EducationItem, Skill, Project, ExperienceItem, VolunteerItem, AchievementItem, CustomSection, CustomItem, PortfolioData,
} from "@/store/portfolioStore";

// Hardcoded password — change this!
const ADMIN_PASSWORD = "Akhilesh@9353";
const AUTH_KEY = "portfolio-admin-auth";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const SectionCard = ({ title, children, onAdd, addLabel }: { title: string; children: React.ReactNode; onAdd?: () => void; addLabel?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
    className="rounded-2xl border bg-card p-6 shadow-soft"
  >
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      {onAdd && (
        <Button size="sm" onClick={onAdd} className="bg-gradient-primary hover:opacity-90 shadow-glow">
          <Plus className="h-4 w-4 mr-1" /> {addLabel || "Add"}
        </Button>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </motion.div>
);

const ItemRow = ({ children, onDelete }: { children: React.ReactNode; onDelete: () => void }) => (
  <div className="rounded-xl border bg-background/50 p-4 space-y-3 relative group">
    <Button variant="ghost" size="icon" onClick={onDelete}
      className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive opacity-60 group-hover:opacity-100">
      <Trash2 className="h-4 w-4" />
    </Button>
    {children}
  </div>
);

const Admin = () => {
  const navigate = useNavigate();
  const { data, update, reset } = usePortfolio();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");
  const [pw, setPw] = useState("");

  // local working copy
  const [draft, setDraft] = useState<PortfolioData>(data);
  useEffect(() => { if (authed) setDraft(data); /* eslint-disable-next-line */ }, [authed]);

  const tryLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      toast.success("Welcome back!");
    } else {
      toast.error("Wrong password");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPw("");
  };

  const save = () => {
    // normalize custom section slugs
    const normalized: PortfolioData = {
      ...draft,
      customSections: draft.customSections.map(s => ({ ...s, slug: slugify(s.slug || s.title) })),
    };
    update(normalized);
    toast.success("Saved!");
  };

  const resetAll = () => {
    if (!confirm("Reset all content to defaults? This cannot be undone.")) return;
    reset();
    toast.success("Reset to defaults");
    setTimeout(() => window.location.reload(), 300);
  };

  // ============ LOGIN ============
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-hero grid place-items-center p-6">
        <motion.form
          onSubmit={tryLogin}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-elegant"
        >
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow mb-5">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-center">Admin Access</h1>
          <p className="text-sm text-muted-foreground text-center mt-1 mb-6">Enter the password to edit content</p>
          <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" autoFocus />
          <Button type="submit" className="w-full mt-4 bg-gradient-primary hover:opacity-90 shadow-glow">
            Sign in
          </Button>
          <Link to="/" className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-3 w-3" /> back to site
          </Link>
          <p className="mt-5 text-[10px] text-muted-foreground text-center">
            Change password in <code className="bg-secondary px-1 rounded">src/pages/Admin.tsx</code>
          </p>
        </motion.form>
      </div>
    );
  }

  // ============ helpers to mutate draft ============
  const setProfile = (patch: Partial<PortfolioData["profile"]>) =>
    setDraft(d => ({ ...d, profile: { ...d.profile, ...patch } }));

  const updateList = <T extends { id: string }>(key: keyof PortfolioData, id: string, patch: Partial<T>) =>
    setDraft(d => ({ ...d, [key]: (d[key] as unknown as T[]).map(it => it.id === id ? { ...it, ...patch } : it) } as PortfolioData));

  const removeFrom = (key: keyof PortfolioData, id: string) =>
    setDraft(d => ({ ...d, [key]: (d[key] as unknown as Array<{ id: string }>).filter(it => it.id !== id) } as PortfolioData));

  const addTo = (key: keyof PortfolioData, item: { id: string }) =>
    setDraft(d => ({ ...d, [key]: [...(d[key] as unknown as Array<{ id: string }>), item] } as PortfolioData));

  // custom-section helpers
  const updateCustomSection = (id: string, patch: Partial<CustomSection>) =>
    setDraft(d => ({ ...d, customSections: d.customSections.map(s => s.id === id ? { ...s, ...patch } : s) }));
  const removeCustomSection = (id: string) =>
    setDraft(d => ({ ...d, customSections: d.customSections.filter(s => s.id !== id) }));
  const addCustomSection = () =>
    setDraft(d => ({ ...d, customSections: [...d.customSections, { id: newId(), slug: `section-${d.customSections.length + 1}`, title: "New Section", eyebrow: "Custom", items: [] }] }));
  const addCustomItem = (sectionId: string) =>
    updateCustomSection(sectionId, { items: [...(draft.customSections.find(s => s.id === sectionId)?.items || []), { id: newId(), title: "New item", desc: "", image: "" }] });
  const updateCustomItem = (sectionId: string, itemId: string, patch: Partial<CustomItem>) => {
    const sec = draft.customSections.find(s => s.id === sectionId);
    if (!sec) return;
    updateCustomSection(sectionId, { items: sec.items.map(i => i.id === itemId ? { ...i, ...patch } : i) });
  };
  const removeCustomItem = (sectionId: string, itemId: string) => {
    const sec = draft.customSections.find(s => s.id === sectionId);
    if (!sec) return;
    updateCustomSection(sectionId, { items: sec.items.filter(i => i.id !== itemId) });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* sticky header */}
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-lg">
        <div className="container flex items-center justify-between py-3 gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 rounded-full hover:bg-secondary"><ArrowLeft className="h-4 w-4" /></Link>
            <h1 className="font-display text-lg font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={resetAll} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
            <Button onClick={save} className="bg-gradient-primary hover:opacity-90 shadow-glow">
              <Save className="h-4 w-4 mr-1.5" /> Save changes
            </Button>
            <Button variant="outline" size="icon" onClick={logout} aria-label="Logout"><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-5xl space-y-6">
        {/* PROFILE */}
        <SectionCard title="Profile">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name"><Input value={draft.profile.name} onChange={e => setProfile({ name: e.target.value })} /></Field>
            <Field label="Title"><Input value={draft.profile.title} onChange={e => setProfile({ title: e.target.value })} /></Field>
            <Field label="Email"><Input value={draft.profile.email} onChange={e => setProfile({ email: e.target.value })} /></Field>
            <Field label="Resume URL"><Input value={draft.profile.resume} onChange={e => setProfile({ resume: e.target.value })} /></Field>
            <Field label="GitHub URL"><Input value={draft.profile.github} onChange={e => setProfile({ github: e.target.value })} /></Field>
            <Field label="LinkedIn URL"><Input value={draft.profile.linkedin} onChange={e => setProfile({ linkedin: e.target.value })} /></Field>
            <Field label="Profile image URL"><Input value={draft.profile.image} onChange={e => setProfile({ image: e.target.value })} placeholder="https://..." /></Field>
          </div>
          <Field label="Tagline"><Textarea rows={2} value={draft.profile.tagline} onChange={e => setProfile({ tagline: e.target.value })} /></Field>
        </SectionCard>

        {/* ABOUT */}
        <SectionCard title="About">
          <Field label="About text">
            <Textarea rows={5} value={draft.about} onChange={e => setDraft(d => ({ ...d, about: e.target.value }))} />
          </Field>
        </SectionCard>

        {/* EDUCATION */}
        <SectionCard title="Education" addLabel="Add education"
          onAdd={() => addTo("education", { id: newId(), title: "", place: "", period: "", score: "", desc: "", image: "" } as EducationItem)}>
          {draft.education.map(e => (
            <ItemRow key={e.id} onDelete={() => removeFrom("education", e.id)}>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Title"><Input value={e.title} onChange={ev => updateList<EducationItem>("education", e.id, { title: ev.target.value })} /></Field>
                <Field label="Place"><Input value={e.place} onChange={ev => updateList<EducationItem>("education", e.id, { place: ev.target.value })} /></Field>
                <Field label="Period"><Input value={e.period} onChange={ev => updateList<EducationItem>("education", e.id, { period: ev.target.value })} /></Field>
                <Field label="Score"><Input value={e.score} onChange={ev => updateList<EducationItem>("education", e.id, { score: ev.target.value })} /></Field>
              </div>
              <Field label="Image URL (optional)"><Input value={e.image || ""} onChange={ev => updateList<EducationItem>("education", e.id, { image: ev.target.value })} placeholder="https://..." /></Field>
              <Field label="Description"><Textarea rows={2} value={e.desc} onChange={ev => updateList<EducationItem>("education", e.id, { desc: ev.target.value })} /></Field>
            </ItemRow>
          ))}
        </SectionCard>

        {/* SKILLS */}
        <SectionCard title="Skills" addLabel="Add skill"
          onAdd={() => addTo("skills", { id: newId(), name: "" } as Skill)}>
          <div className="grid sm:grid-cols-2 gap-3">
            {draft.skills.map(s => (
              <div key={s.id} className="flex gap-2">
                <Input value={s.name} onChange={ev => updateList<Skill>("skills", s.id, { name: ev.target.value })} placeholder="Skill name" />
                <Button variant="ghost" size="icon" onClick={() => removeFrom("skills", s.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* PROJECTS */}
        <SectionCard title="Projects" addLabel="Add project"
          onAdd={() => addTo("projects", { id: newId(), title: "", desc: "", stack: "", link: "", image: "" } as Project)}>
          {draft.projects.map(p => (
            <ItemRow key={p.id} onDelete={() => removeFrom("projects", p.id)}>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Title"><Input value={p.title} onChange={ev => updateList<Project>("projects", p.id, { title: ev.target.value })} /></Field>
                <Field label="Link"><Input value={p.link} onChange={ev => updateList<Project>("projects", p.id, { link: ev.target.value })} /></Field>
              </div>
              <Field label="Image URL (optional)"><Input value={p.image || ""} onChange={ev => updateList<Project>("projects", p.id, { image: ev.target.value })} placeholder="https://..." /></Field>
              <Field label="Description"><Textarea rows={2} value={p.desc} onChange={ev => updateList<Project>("projects", p.id, { desc: ev.target.value })} /></Field>
              <Field label="Tech stack (comma separated)"><Input value={p.stack} onChange={ev => updateList<Project>("projects", p.id, { stack: ev.target.value })} placeholder="React, Python, FastAPI" /></Field>
            </ItemRow>
          ))}
        </SectionCard>

        {/* EXPERIENCE */}
        <SectionCard title="Experience" addLabel="Add experience"
          onAdd={() => addTo("experience", { id: newId(), role: "", company: "", period: "", desc: "", image: "" } as ExperienceItem)}>
          {draft.experience.map(e => (
            <ItemRow key={e.id} onDelete={() => removeFrom("experience", e.id)}>
              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="Role"><Input value={e.role} onChange={ev => updateList<ExperienceItem>("experience", e.id, { role: ev.target.value })} /></Field>
                <Field label="Company"><Input value={e.company} onChange={ev => updateList<ExperienceItem>("experience", e.id, { company: ev.target.value })} /></Field>
                <Field label="Period"><Input value={e.period} onChange={ev => updateList<ExperienceItem>("experience", e.id, { period: ev.target.value })} /></Field>
              </div>
              <Field label="Image / logo URL (optional)"><Input value={e.image || ""} onChange={ev => updateList<ExperienceItem>("experience", e.id, { image: ev.target.value })} placeholder="https://..." /></Field>
              <Field label="Description"><Textarea rows={2} value={e.desc} onChange={ev => updateList<ExperienceItem>("experience", e.id, { desc: ev.target.value })} /></Field>
            </ItemRow>
          ))}
        </SectionCard>


        {/* VOLUNTEERING */}
        <SectionCard title="Volunteering" addLabel="Add volunteering"
          onAdd={() => addTo("volunteering", { id: newId(), role: "", org: "", desc: "", image: "" } as VolunteerItem)}>
          {draft.volunteering.map(v => (
            <ItemRow key={v.id} onDelete={() => removeFrom("volunteering", v.id)}>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Role"><Input value={v.role} onChange={ev => updateList<VolunteerItem>("volunteering", v.id, { role: ev.target.value })} /></Field>
                <Field label="Organization"><Input value={v.org} onChange={ev => updateList<VolunteerItem>("volunteering", v.id, { org: ev.target.value })} /></Field>
              </div>
              <Field label="Image URL (optional, Drive link OK)"><Input value={v.image || ""} onChange={ev => updateList<VolunteerItem>("volunteering", v.id, { image: ev.target.value })} placeholder="https://drive.google.com/file/d/..." /></Field>
              <Field label="Description"><Textarea rows={2} value={v.desc} onChange={ev => updateList<VolunteerItem>("volunteering", v.id, { desc: ev.target.value })} /></Field>
            </ItemRow>
          ))}
        </SectionCard>

        {/* ACHIEVEMENTS */}
        <SectionCard title="Achievements" addLabel="Add achievement"
          onAdd={() => addTo("achievements", { id: newId(), title: "", desc: "", image: "" } as AchievementItem)}>
          {draft.achievements.map(a => (
            <ItemRow key={a.id} onDelete={() => removeFrom("achievements", a.id)}>
              <Field label="Title"><Input value={a.title} onChange={ev => updateList<AchievementItem>("achievements", a.id, { title: ev.target.value })} /></Field>
              <Field label="Image URL (optional)"><Input value={a.image || ""} onChange={ev => updateList<AchievementItem>("achievements", a.id, { image: ev.target.value })} placeholder="https://..." /></Field>
              <Field label="Description"><Textarea rows={2} value={a.desc} onChange={ev => updateList<AchievementItem>("achievements", a.id, { desc: ev.target.value })} /></Field>
            </ItemRow>
          ))}
        </SectionCard>

        {/* CUSTOM SECTIONS */}
        <SectionCard title="Custom Sections" addLabel="Add new section" onAdd={addCustomSection}>
          {draft.customSections.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No custom sections yet. Click <strong>Add new section</strong> to create one with its own title and items.</p>
          )}
          {draft.customSections.map(sec => (
            <Card key={sec.id} className="p-5 border-primary/30 bg-primary/5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="grid sm:grid-cols-3 gap-3 flex-1">
                  <Field label="Section title"><Input value={sec.title} onChange={e => updateCustomSection(sec.id, { title: e.target.value })} /></Field>
                  <Field label="Eyebrow / tag"><Input value={sec.eyebrow} onChange={e => updateCustomSection(sec.id, { eyebrow: e.target.value })} /></Field>
                  <Field label="URL slug"><Input value={sec.slug} onChange={e => updateCustomSection(sec.id, { slug: e.target.value })} /></Field>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeCustomSection(sec.id)} className="text-muted-foreground hover:text-destructive mt-6"><Trash2 className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-3">
                {sec.items.map(it => (
                  <ItemRow key={it.id} onDelete={() => removeCustomItem(sec.id, it.id)}>
                    <Field label="Item title"><Input value={it.title} onChange={e => updateCustomItem(sec.id, it.id, { title: e.target.value })} /></Field>
                    <Field label="Image URL (optional, Drive link OK)"><Input value={it.image || ""} onChange={e => updateCustomItem(sec.id, it.id, { image: e.target.value })} placeholder="https://drive.google.com/file/d/..." /></Field>
                    <Field label="Description"><Textarea rows={2} value={it.desc} onChange={e => updateCustomItem(sec.id, it.id, { desc: e.target.value })} /></Field>
                  </ItemRow>
                ))}
                <Button variant="outline" size="sm" onClick={() => addCustomItem(sec.id)}><Plus className="h-4 w-4 mr-1" /> Add item</Button>
              </div>
            </Card>
          ))}
        </SectionCard>

        <div className="sticky bottom-4 flex justify-end">
          <Button onClick={save} size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow">
            <Save className="h-4 w-4 mr-1.5" /> Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
