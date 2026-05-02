import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/portfolio";
import { toast } from "sonner";

export const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <Section id="contact" eyebrow="Say hello" title="Let's work together">
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border bg-card p-8 shadow-elegant"
        >
          <h3 className="font-display text-2xl font-bold mb-2">Get in touch</h3>
          <p className="text-muted-foreground mb-6">
            Always open to interesting projects, collaborations, or just a chat about AI.
          </p>
          <div className="space-y-3">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-xl p-3 hover:bg-secondary transition-smooth">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground"><Mail className="h-5 w-5" /></div>
              <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium text-sm">{profile.email}</p></div>
            </a>
            <a href={profile.linkedin} className="flex items-center gap-3 rounded-xl p-3 hover:bg-secondary transition-smooth">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground"><Linkedin className="h-5 w-5" /></div>
              <div><p className="text-xs text-muted-foreground">LinkedIn</p><p className="font-medium text-sm">linkedin.com/in/aarav</p></div>
            </a>
            <a href={profile.github} className="flex items-center gap-3 rounded-xl p-3 hover:bg-secondary transition-smooth">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground"><Github className="h-5 w-5" /></div>
              <div><p className="text-xs text-muted-foreground">GitHub</p><p className="font-medium text-sm">github.com/aarav</p></div>
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border bg-card p-8 shadow-elegant space-y-4"
        >
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <Input required name="name" placeholder="Your name" maxLength={100} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <Input required type="email" name="email" placeholder="you@example.com" maxLength={255} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Message</label>
            <Textarea required name="message" placeholder="Tell me about your project..." rows={5} maxLength={1000} />
          </div>
          <Button type="submit" disabled={loading} size="lg" className="w-full bg-gradient-primary hover:opacity-90 shadow-glow transition-smooth">
            {loading ? "Sending..." : <>Send message <Send className="ml-2 h-4 w-4" /></>}
          </Button>
        </motion.form>
      </div>
    </Section>
  );
};
