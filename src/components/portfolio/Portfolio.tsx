import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Download, Mail, MapPin, Github, Linkedin, ExternalLink,
  Search, Sparkles, Code2, Palette, Briefcase, GraduationCap, Award,
  Sun, Moon, Phone, ArrowUpRight, Quote, FileText, Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  profile, typingRoles, skillGroups, projects, experience,
  education, certifications, achievements, testimonials, posts,
} from "./data";
import photo1 from "@/assets/harshit-1.jpeg.asset.json";
import photo2 from "@/assets/harshit-2.jpg.asset.json";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
} as const;

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="mb-14 flex flex-col items-start gap-3">
        <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" /> {eyebrow}
        </span>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
        {sub && <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{sub}</p>}
      </div>
    </Reveal>
  );
}

function Nav({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["About", "about"], ["Skills", "skills"], ["Projects", "projects"],
    ["Experience", "experience"], ["Contact", "contact"],
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all ${scrolled ? "glass-strong" : ""}`}>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-foreground text-primary-foreground text-xs">HB</span>
          <span className="hidden sm:inline">Harshit Batham</span>
        </a>
        <nav className={`hidden items-center gap-1 rounded-full px-2 py-1.5 text-sm md:flex ${scrolled ? "glass-strong" : "glass"}`}>
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className={`flex items-center gap-2 rounded-full p-1 ${scrolled ? "glass-strong" : "glass"}`}>
          <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#contact" className="hidden sm:block">
            <Button size="sm" className="rounded-full">Get in touch <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function TypingRole() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = typingRoles[i];
    const speed = deleting ? 45 : 90;
    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setI((i + 1) % typingRoles.length);
        return;
      }
      setText(word.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <span className="text-gradient">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-1 animate-pulse bg-primary align-middle" />
    </span>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 0.3], [0, 40]);

  return (
    <div id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* gradient blobs */}
      <motion.div style={{ y: y1 }} aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-primary/30 to-sky-300/20 blur-3xl animate-blob" />
      <motion.div style={{ y: y2 }} aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-indigo-300/30 to-fuchsia-200/20 blur-3xl animate-blob" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,var(--color-accent),transparent_60%)]" />

      <Section className="!py-0">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <span className="grid h-2 w-2 place-items-center rounded-full bg-emerald-500"><span className="h-2 w-2 animate-ping rounded-full bg-emerald-500/70" /></span>
              Available for full-time roles
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Hi, I'm {profile.name.split(" ")[0]}.<br />
              <span className="text-muted-foreground">I work as a </span>
              <TypingRole />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
            >
              {profile.tagline} Based in Kanpur, India — open to opportunities in Technology, UI/UX, Product, Analyst, Consulting and Operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a href={profile.resumeUrl} download>
                <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
                  <Download className="mr-2 h-4 w-4" /> View Resume
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="rounded-full glass">
                  <Mail className="mr-2 h-4 w-4" /> Contact Me
                </Button>
              </a>
              <a href="#projects">
                <Button size="lg" variant="ghost" className="rounded-full">
                  Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            <div className="mt-10 flex items-center gap-5 text-sm text-muted-foreground">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground"><Github className="h-4 w-4" /> GitHub</a>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Kanpur, IN</span>
            </div>
          </div>

          {/* Profile glass card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative rounded-3xl glass-strong p-6">
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/25 via-accent to-sky-200/40">
                <div className="grid h-full w-full place-items-center">
                  <div className="flex items-center -space-x-6">
                    <motion.img
                      animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      src={photo1.url} alt="Harshit Batham portrait"
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-white/80 shadow-xl"
                    />
                    <motion.img
                      animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                      src={photo2.url} alt="Harshit Batham candid"
                      className="h-32 w-32 rounded-full object-cover ring-4 ring-white/90 shadow-2xl z-10"
                    />
                    <motion.div
                      animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                      className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-foreground to-primary text-2xl font-bold text-primary-foreground ring-4 ring-white/80 shadow-xl"
                    >
                      HB
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{profile.name}</div>
                  <div className="text-xs text-muted-foreground">{profile.headline}</div>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700">Open to work</div>
              </div>
            </div>
            {/* floating mini cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 -bottom-4 rounded-2xl glass-strong px-4 py-3 text-xs"
            >
              <div className="flex items-center gap-2"><Code2 className="h-3.5 w-3.5 text-primary" /> React + TS</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-8 rounded-2xl glass-strong px-4 py-3 text-xs"
            >
              <div className="flex items-center gap-2"><Palette className="h-3.5 w-3.5 text-primary" /> Figma</div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="A fresher who ships, learns and helps." sub={profile.summary} />
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl glass p-8">
            <h3 className="text-lg font-semibold">Career objective</h3>
            <p className="mt-3 text-muted-foreground">{profile.objective}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl glass p-8">
            <h3 className="text-lg font-semibold flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" /> Education</h3>
            <ul className="mt-4 space-y-4">
              {education.map((e) => (
                <li key={e.degree} className="border-l-2 border-primary/30 pl-4">
                  <div className="font-medium">{e.degree}</div>
                  <div className="text-sm text-muted-foreground">{e.school}</div>
                  {e.detail && <div className="mt-0.5 text-xs text-muted-foreground">{e.detail}</div>}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title="A practical, full-stack toolkit." sub="A mix of technical, design and business skills built through projects, internships and self-study." />
      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((g, idx) => (
          <Reveal key={g.title} delay={idx * 0.08}>
            <div className="h-full rounded-3xl glass p-7 transition-transform hover:-translate-y-1">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {idx === 0 ? <Code2 className="h-5 w-5" /> : idx === 1 ? <Palette className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
              </div>
              <h3 className="text-xl font-semibold">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full font-normal">{s}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const [filter, setFilter] = useState<"All" | "Web" | "Design" | "IT Support">("All");
  const [q, setQ] = useState("");
  const categories = ["All", "Web", "Design", "IT Support"] as const;

  const visible = useMemo(() => {
    return projects.filter((p) => {
      const okCat = filter === "All" || p.category === filter;
      const okQ = !q || (p.title + p.description + p.tech.join(" ")).toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    });
  }, [filter, q]);

  return (
    <Section id="projects">
      <SectionHeading eyebrow="Featured Projects" title="Selected work." sub="Small, focused builds — each one a chance to learn something new." />
      <Reveal>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-sm transition-all ${filter === c ? "bg-foreground text-background" : "glass text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" className="rounded-full pl-9 glass border-white/40" />
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, idx) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-accent to-sky-100">
                <div className="grid h-full w-full place-items-center text-3xl font-bold tracking-tight text-foreground/40">
                  {p.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="rounded-full">{p.category}</Badge>
                <span className="text-xs text-muted-foreground">{p.metric}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>)}
              </div>
              <div className="mt-6 flex gap-2">
                {p.github && <a href={p.github} className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium hover:bg-foreground hover:text-background transition-colors"><Github className="h-3.5 w-3.5" /> GitHub</a>}
                {p.live && <a href={p.live} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"><ExternalLink className="h-3.5 w-3.5" /> Live Demo</a>}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      {visible.length === 0 && (
        <div className="mt-10 rounded-2xl glass p-10 text-center text-muted-foreground">No projects match your search.</div>
      )}
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="Internships & roles." />
      <div className="relative mx-auto max-w-3xl">
        <div aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-transparent sm:left-1/2" />
        <div className="space-y-10">
          {experience.map((e, idx) => (
            <Reveal key={e.role} delay={idx * 0.08}>
              <div className={`relative grid gap-4 sm:grid-cols-2 ${idx % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""}`}>
                <div className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-md sm:left-1/2" />
                <div className={`pl-12 sm:pl-0 ${idx % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                  <div className="text-sm text-muted-foreground">{e.period}</div>
                  <div className="text-xs text-muted-foreground">{e.location}</div>
                </div>
                <div className={`rounded-3xl glass p-6 ${idx % 2 === 0 ? "sm:ml-6" : "sm:mr-6"}`}>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <div className="text-sm text-primary">{e.company}</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {e.points.map((p) => <li key={p} className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />{p}</li>)}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading eyebrow="Certifications" title="Continuous learning." />
      <div className="grid gap-6 md:grid-cols-3">
        {certifications.map((c, idx) => (
          <Reveal key={c.name} delay={idx * 0.08}>
            <a href={c.url} className="group block h-full rounded-3xl glass p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{c.name}</h3>
              <div className="mt-1 text-sm text-muted-foreground">{c.issuer}</div>
              <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View certificate <ArrowUpRight className="h-3 w-3" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1200; const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading eyebrow="Achievements" title="By the numbers." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, idx) => (
          <Reveal key={a.label} delay={idx * 0.06}>
            <div className="rounded-3xl glass p-7 text-center">
              <div className="text-5xl font-bold tracking-tight text-gradient">
                <Counter to={a.value} suffix={a.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{a.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading eyebrow="Testimonials" title="Kind words." />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <Reveal key={t.name} delay={idx * 0.08}>
            <figure className="h-full rounded-3xl glass p-7">
              <Quote className="h-6 w-6 text-primary/60" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-medium">{t.name}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Blog() {
  return (
    <Section id="blog">
      <SectionHeading eyebrow="Writing" title="Notes from the journey." />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p, idx) => (
          <Reveal key={p.title} delay={idx * 0.08}>
            <a href="#" className="group block h-full rounded-3xl glass p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
              <Badge variant="secondary" className="rounded-full">{p.tag}</Badge>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Resume() {
  return (
    <Section id="resume">
      <Reveal>
        <div className="overflow-hidden rounded-3xl glass-strong p-10 sm:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"><FileText className="h-3 w-3" /> Resume</span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">My one-page resume.</h2>
              <p className="mt-4 max-w-lg text-muted-foreground">ATS-friendly, recruiter-tested format. Download a PDF or send me a note and I'll tailor a version for the role.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={profile.resumeUrl} download>
                  <Button size="lg" className="rounded-full"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                </a>
                <a href="#contact">
                  <Button size="lg" variant="outline" className="rounded-full glass"><Mail className="mr-2 h-4 w-4" /> Request tailored version</Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl glass p-6 shadow-xl">
                <div className="space-y-3">
                  <div className="h-5 w-3/4 rounded bg-foreground/80" />
                  <div className="h-2 w-1/2 rounded bg-muted-foreground/40" />
                  <div className="mt-4 space-y-1.5">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div key={i} className="h-1.5 rounded bg-muted-foreground/20" style={{ width: `${60 + Math.random() * 35}%` }} />
                    ))}
                  </div>
                  <div className="mt-4 h-3 w-1/3 rounded bg-primary/60" />
                  <div className="space-y-1.5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-1.5 rounded bg-muted-foreground/20" style={{ width: `${55 + Math.random() * 40}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Contact() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.name || "Visitor"}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact" title="Let's build something together." sub="Open to internships, full-time roles and freelance projects. I usually reply within a day." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="h-full rounded-3xl glass p-8">
            <h3 className="text-lg font-semibold">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Mail className="h-4 w-4" /></span><a href={`mailto:${profile.email}`} className="hover:text-primary">{profile.email}</a></li>
              <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Phone className="h-4 w-4" /></span><a href={`tel:${profile.phone.replace(/\s/g,"")}`} className="hover:text-primary">{profile.phone}</a></li>
              <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Linkedin className="h-4 w-4" /></span><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">linkedin.com/in/harshit-batham</a></li>
              <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Github className="h-4 w-4" /></span><a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-primary">github.com/reflex0911</a></li>
              <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><MapPin className="h-4 w-4" /></span>{profile.location}</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="rounded-3xl glass p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Name</span>
                <Input required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="mt-1 glass border-white/40" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Email</span>
                <Input required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="mt-1 glass border-white/40" placeholder="you@company.com" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-xs font-medium text-muted-foreground">Message</span>
              <textarea
                required value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })}
                rows={5}
                className="mt-1 w-full rounded-md glass border border-white/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Tell me about the role or project…"
              />
            </label>
            <Button type="submit" size="lg" className="mt-5 w-full rounded-full sm:w-auto">
              <Send className="mr-2 h-4 w-4" /> Send message
            </Button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} {profile.name}. Crafted with care.</div>
        <div className="flex items-center gap-4">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-foreground"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}

export function Portfolio() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Achievements />
        <Testimonials />
        <Blog />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}