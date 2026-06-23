import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Code2,
  Database,
  Layers,
  Cpu,
  Globe,
  ArrowUpRight,
  Sun,
  Moon,
  Send,
  Upload,
  ImagePlus,
  CheckCircle2,
  Loader2,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────── */

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = {
  "Backend & APIs": ["Java", "Spring Boot", "Spring MVC", "Spring Data JPA", "FastAPI", "REST API", "PHP"],
  Frontend: ["React.js", "Vue.js", "JavaScript ES6+", "HTML5", "CSS3", "Ionic Framework"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB"],
  "DevOps & Tools": ["Docker", "Git", "GitHub", "GitLab", "Postman", "CI/CD", "Figma", "n8n"],
  Methodologies: ["Agile", "Scrum", "UML", "UX/UI Design"],
};

const EXPERIENCES = [
  {
    role: "Web Developer — Virtual Internship",
    company: "CodeAlpha",
    period: "June 2026 – Present",
    desc: "Developing web applications using modern frameworks and industry best practices.",
    current: true,
    initials: "CA",
    color: "#7c6af7",
    bg: "rgba(124,106,247,0.12)",
  },
  {
    role: "Media Manager",
    company: "Byte Brigade Club — ENSA Safi",
    period: "Oct 2025 – June 2026",
    desc: "Managed digital content and team coordination. Collaborated on design and collaborative projects.",
    current: false,
    initials: "BB",
    color: "#06d6a0",
    bg: "rgba(6,214,160,0.12)",
  },
  {
    role: "Full Stack Developer — Intern",
    company: "Maaziz IT Conseil",
    period: "July – August 2025",
    desc: "Designed and developed a full stack digital newspaper platform (FastAPI + React.js + Ionic). Led a critical database migration from MongoDB to PostgreSQL. Built Figma mockups and managed version control in an Agile team.",
    current: false,
    initials: "MI",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.12)",
  },
];

const PROJECTS = [
  {
    title: "AirSafe AI",
    subtitle: "IoT Air Quality & Respiratory Health Monitoring",
    desc: "Real-time air quality monitoring with ML-powered respiratory crisis prediction. Integrated IoT sensors for PM2.5, PM10, CO2, and O3. Implemented TensorFlow & scikit-learn models for predictive health analytics.",
    stack: ["Python", "TensorFlow", "Scikit-learn", "IoT"],
    icon: <Cpu size={18} />,
    github: "https://github.com/fatimaezzahraaelankoud/air-safe-ia",
  },
  {
    title: "Internship Automation Bot",
    subtitle: "PFE Opportunity Research Automation",
    desc: "Automated workflow system for internship and PFE opportunity discovery. Built n8n automation workflows for web scraping job boards. Designed a Vue.js dashboard for intuitive opportunity tracking.",
    stack: ["n8n", "Vue.js", "Firebase", "Web Scraping"],
    icon: <Globe size={18} />,
    github: "https://github.com/fatimaezzahraaelankoud/Bot-Automatisation-Recherche-Stages-PFE",
  },
  {
    title: "BIO7",
    subtitle: "E-Commerce for Organic Cosmetics",
    desc: "Full stack e-commerce website with product catalog, shopping cart, and checkout. Spring Boot REST API with JPA and MySQL. Responsive React.js frontend with secure payment processing.",
    stack: ["Spring Boot", "React.js", "MySQL"],
    icon: <Layers size={18} />,
    github: "https://github.com/fatimaezzahraaelankoud/bio7-backend",
  },
  {
    title: "Hotel Booking System",
    subtitle: "Room Reservation Application",
    desc: "Room reservation and booking management app. REST API for availability, reservations, and bookings. React.js frontend with calendar and availability checking.",
    stack: ["Spring Boot", "React.js", "MySQL"],
    icon: <Database size={18} />,
    github: "https://github.com/fatimaezzahraaelankoud/booking_hotel_room",
  },
  {
    title: "REST CRUD API",
    subtitle: "Student Management System",
    desc: "REST API for complete student management with full CRUD operations. All endpoints validated with Postman — GET, POST, PUT, DELETE.",
    stack: ["Spring Boot", "MongoDB", "React.js", "Postman"],
    icon: <Code2 size={18} />,
    github: "https://github.com/fatimaezzahraaelankoud/student-management",
  },
];

const EDUCATION = [
  {
    degree: "Engineering Degree — Computer Engineering & AI (GIIA)",
    school: "ENSA Safi",
    period: "2024 – Present",
  },
  {
    degree: "Integrated Preparatory Cycle",
    school: "ENSA Safi",
    period: "2022 – 2024",
  },
  {
    degree: "Baccalaureate — Mathematics Sciences B, With Honors",
    school: "Lycée Technique Al-Khwarizmi, Safi",
    period: "2021 – 2022",
  },
];

const INITIAL_CERTS = [
  { label: "HackerRank — SQL: Basic, Intermediate, Advanced", image: null as string | null },
  { label: "Udemy — React.js: Modern Frontend Development", image: null as string | null },
];

/* ─── Hooks ─────────────────────────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

/* ─── Theme toggle ──────────────────────────────────── */

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-200"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

/* ─── Navbar ────────────────────────────────────────── */

function Navbar({
  open, setOpen, dark, toggleDark,
}: {
  open: boolean; setOpen: (v: boolean) => void; dark: boolean; toggleDark: () => void;
}) {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <button
          onClick={() => scrollTo("About")}
          className="font-bold text-sm tracking-widest uppercase text-primary shrink-0"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          FEA<span className="text-accent">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${
                active === link ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle dark={dark} toggle={toggleDark} />
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors ml-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─── Section wrapper ───────────────────────────────── */

function Section({
  id, label, title, children,
}: {
  id: string; label: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-12">
          <span
            className="text-accent text-xs tracking-[0.3em] uppercase shrink-0"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {label}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <h2
          className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

/* ─── Hero ──────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="About"
      className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/8 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <p
              className="text-accent text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Full Stack Developer · Computer Engineering Student
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Fatima-ezzahraa
              <br />
              <span className="text-primary">El ANKOUD</span>
            </h1>
            <p
              className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-10"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Fourth-year Computer Engineering student at ENSA Safi. Building scalable
              applications from UI/UX design to deployment — specializing in Java (Spring boot), Python(FastAPI), and
              React.js.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="https://github.com/fatimaezzahraaelankoud"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/fatima-ezzahraa-elankoud-547325336"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded hover:border-primary hover:text-primary transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href="mailto:fatimaezzahraaelankoud@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded hover:border-accent hover:text-accent transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <Mail size={15} /> Contact
              </a>
            </div>

            <div
              className="flex flex-wrap gap-6 text-xs text-muted-foreground"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-accent" /> Safi, Morocco
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="text-accent" /> +212 634 661 987
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={12} className="text-accent" /> fatimaezzahraaelankoud@gmail.com
              </span>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-4 text-right">
            {[
              { num: "4+", label: "Years\nof Study" },
              { num: "5+", label: "Projects\nBuilt" },
              { num: "3", label: "Internship\nRoles" },
            ].map((s) => (
              <div key={s.label} className="border border-border bg-card rounded p-4 min-w-[120px] hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.num}
                </div>
                <div
                  className="text-xs text-muted-foreground mt-1 whitespace-pre-line leading-snug"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => document.getElementById("Skills")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-16 flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <ChevronDown size={16} className="animate-bounce" /> Scroll to explore
        </button>
      </div>
    </section>
  );
}

/* ─── Skills ────────────────────────────────────────── */

function Skills() {
  return (
    <Section id="Skills" label="02 / Skills" title="Technical Expertise">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(SKILLS).map(([category, skills]) => (
          <div
            key={category}
            className="bg-card border border-border rounded p-5 hover:border-primary/40 transition-colors duration-300 group"
          >
            <h3
              className="text-xs tracking-widest uppercase text-primary mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 bg-muted text-muted-foreground rounded group-hover:text-foreground transition-colors"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Experience ────────────────────────────────────── */

function Experience() {
  return (
    <Section id="Experience" label="03 / Experience" title="Professional Journey">
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        <div className="flex flex-col gap-0">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="relative pl-20 pb-12 last:pb-0">
              {/* Company logo badge */}
              <div
                className="absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border border-border"
                style={{
                  background: exp.bg,
                  color: exp.color,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {exp.initials}
              </div>
              {/* Timeline dot */}
              <div
                className={`absolute left-[18.5px] top-4 w-3 h-3 rounded-full border-2 ${
                  exp.current ? "border-accent bg-accent" : "border-primary bg-background"
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <h3
                    className="text-base font-semibold text-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-primary text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
                    {exp.company}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded self-start whitespace-nowrap ${
                    exp.current ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {exp.period}
                </span>
              </div>
              <p
                className="text-muted-foreground text-sm leading-relaxed max-w-2xl"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Projects ──────────────────────────────────────── */

function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="Projects" label="04 / Projects" title="Selected Work">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`bg-card border rounded p-6 transition-all duration-300 relative overflow-hidden flex flex-col ${
              hovered === i ? "border-primary shadow-lg shadow-primary/10" : "border-border"
            }`}
          >
            {hovered === i && (
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/8 rounded-full blur-2xl pointer-events-none" />
            )}

            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-2 rounded border transition-colors duration-300 ${
                  hovered === i
                    ? "bg-primary/15 border-primary/30 text-primary"
                    : "bg-muted border-border text-muted-foreground"
                }`}
              >
                {p.icon}
              </div>
            </div>

            <h3
              className="font-semibold text-foreground mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {p.title}
            </h3>
            <p
              className="text-xs text-primary mb-3"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {p.subtitle}
            </p>
            <p
              className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {p.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.stack.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* GitHub button */}
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 border border-border rounded text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <Github size={14} /> View on GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Certificate image slot ────────────────────────── */

function CertSlot({
  label,
  image,
  onChange,
}: {
  label: string;
  image: string | null;
  onChange: (url: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) onChange(ev.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-card border border-border rounded overflow-hidden hover:border-primary/40 transition-colors group">
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt={label}
            className="w-full object-contain max-h-48 bg-muted"
          />
          <button
            onClick={() => ref.current?.click()}
            className="absolute inset-0 bg-foreground/0 hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
          >
            <span className="bg-background/90 text-foreground text-xs px-3 py-1.5 rounded flex items-center gap-1.5">
              <Upload size={12} /> Change
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => ref.current?.click()}
          className="w-full h-32 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ImagePlus size={22} />
          <span className="text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
            Click to upload certificate
          </span>
        </button>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          <p className="text-sm text-foreground" style={{ fontFamily: "'Lato', sans-serif" }}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Education ─────────────────────────────────────── */

function Education() {
  const [certs, setCerts] = useState(INITIAL_CERTS);

  const updateCertImage = (i: number, url: string) => {
    setCerts((prev) => prev.map((c, idx) => (idx === i ? { ...c, image: url } : c)));
  };

  return (
    <Section id="Education" label="05 / Education" title="Academic Background">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Degrees */}
        <div>
          <h3
            className="text-xs tracking-widest uppercase text-muted-foreground mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Degrees
          </h3>
          <div className="flex flex-col gap-4">
            {EDUCATION.map((e, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded p-5 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h4
                    className="font-medium text-foreground text-sm leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {e.degree}
                  </h4>
                  <span
                    className="text-xs text-muted-foreground whitespace-nowrap shrink-0"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {e.period}
                  </span>
                </div>
                <p className="text-primary text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {e.school}
                </p>
              </div>
            ))}
          </div>

          {/* Languages */}
          <h3
            className="text-xs tracking-widest uppercase text-muted-foreground mb-6 mt-10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Languages
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { lang: "Arabic", level: "Native", pct: 100 },
              { lang: "English", level: "B2", pct: 72 },
              { lang: "French", level: "B2", pct: 72 },
            ].map((l) => (
              <div key={l.lang} className="bg-card border border-border rounded p-4 text-center hover:border-primary/40 transition-colors">
                <div className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {l.level}
                </div>
                <div className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {l.lang}
                </div>
                <div className="h-0.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications with image upload */}
        <div>
          <h3
            className="text-xs tracking-widest uppercase text-muted-foreground mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Certifications
          </h3>
          <div className="flex flex-col gap-4">
            {certs.map((c, i) => (
              <CertSlot
                key={i}
                label={c.label}
                image={c.image}
                onChange={(url) => updateCertImage(i, url)}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Contact form ──────────────────────────────────── */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const errs = validate();

  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  setErrors({});
  setStatus("sending");

  try {
    await emailjs.send(
      "service_49220ns",   
      "template_81uo0i7",  
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      },
      "VeatThniqH5xDUTmV"    
    );

    setStatus("sent");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (error) {
    console.error("Email error:", error);
    setStatus("idle");
    alert("Failed to send message");
  }
};

  const field = (
    id: keyof typeof form,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div>
      <label
        htmlFor={id}
        className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={form[id]}
        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full bg-card border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary ${
          errors[id] ? "border-destructive" : "border-border"
        }`}
        style={{ fontFamily: "'Lato', sans-serif" }}
      />
      {errors[id] && (
        <p className="text-xs text-destructive mt-1" style={{ fontFamily: "'Lato', sans-serif" }}>
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <section id="Contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-12">
          <span
            className="text-accent text-xs tracking-[0.3em] uppercase shrink-0"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            06 / Contact
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {"Let's Build"}
              <br />
              <span className="text-primary">Something Together</span>
            </h2>
            <p
              className="text-muted-foreground text-base leading-relaxed mb-10"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Open to internship opportunities, full-stack projects, and collaborative
              engineering work. Feel free to reach out — I reply within 24 hours.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: <Mail size={15} />, label: "fatimaezzahraaelankoud@gmail.com", href: "mailto:fatimaezzahraaelankoud@gmail.com" },
                { icon: <Phone size={15} />, label: "+212 634 661 987", href: "tel:+212634661987" },
                { icon: <MapPin size={15} />, label: "Safi, Morocco", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  <span className="text-primary group-hover:text-accent transition-colors">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { icon: <Github size={16} />, href: "https://github.com/fatimaezzahraaelankoud", label: "GitHub" },
                { icon: <Linkedin size={16} />, href: "https://linkedin.com/in/fatima-ezzahraa-elankoud-547325336", label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {s.icon} {s.label} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-card border border-border rounded-lg p-7">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <CheckCircle2 size={48} className="text-accent" />
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Message Sent!
                </h3>
                <p
                  className="text-muted-foreground text-sm"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Thank you for reaching out. I will get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs text-primary underline underline-offset-4"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {field("name", "Full Name", "text", "Fatima Ezzahraa")}
                  {field("email", "Email Address", "email", "yourname@example.com")}
                </div>
                {field("subject", "Subject (optional)", "text", "Internship opportunity...")}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Hello, I would like to discuss..."
                    className={`w-full bg-background border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary resize-none ${
                      errors.message ? "border-destructive" : "border-border"
                    }`}
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-60"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {status === "sending" ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          © 2026 Fatima-Ezzahraa El Ankoud. All rights reserved.
        </span>
        <span
          className="text-xs text-muted-foreground/50"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Full Stack Developer · ENSA Safi · Morocco
        </span>
      </div>
    </footer>
  );
}

/* ─── Root ──────────────────────────────────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(124,106,247,0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(124,106,247,0.6); }
      `}</style>
      <Navbar
        open={menuOpen}
        setOpen={setMenuOpen}
        dark={dark}
        toggleDark={() => setDark((d) => !d)}
      />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
