import { createContext, useContext, useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import codeAlphaLogo from "./logos/codealpha.png";
import byteBrigadeLogo from "./logos/bytebrigade.png";
import maazizLogo from "./logos/maaziz.png";
import sql from "./logos/sql.jpeg";
import reactcertificate from "./logos/react.jpeg";
import ocpLogo from "./logos/ocplogo.png";
import profilePhoto from "./logos/Portrait.png";
import reactHackerRankCertificate from "./logos/fronetnd_developer_react_hackerank.png";
import javaHackerRankCertificate from "./logos/java_basic_hackerank.png";
import cvPdf from "./public/cv.pdf";
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
  Download,
} from "lucide-react";

type Language = "en" | "fr";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({ language: "en", setLanguage: () => {} });

const FRENCH_TRANSLATIONS: Record<string, string> = {
  About: "À propos",
  Skills: "Compétences",
  Experience: "Expériences",
  Projects: "Projets",
  Education: "Formation",
  Contact: "Contact",
  "Select language": "Choisir la langue",
  "Toggle theme": "Changer de thème",
  "Final-Year Engineering Student · Seeking PFE Internship": "Élève ingénieure en dernière année · À la recherche d’un stage PFE",
  "Final-year Computer Engineering student at ENSA Safi, looking for a full-stack PFE internship. Focused on React.js, Java, and Spring Boot.": "Élève ingénieure en dernière année en Génie Informatique à l’ENSA Safi, je recherche un stage PFE en développement Full Stack. Je me spécialise en React.js, Java et Spring Boot.",
  "My CV": "Mon CV",
  "Scroll to explore": "Défiler pour découvrir",
  "Technical Expertise": "Compétences techniques",
  "Backend & APIs": "Backend et API",
  "Databases": "Bases de données",
  "DevOps & Tools": "DevOps et outils",
  "Methodologies": "Méthodologies",
  "Professional Journey": "Expériences professionnelles",
  "Full Stack Developer Intern": "Développeuse Full Stack stagiaire",
  "OCP group - IT department": "OCP Group — Département IT",
  "6 july 2026 – 4 September 2026": "6 juillet – 4 septembre 2026",
  "Developed a full-stack internal collaborative platform using React/TypeScript and Spring Boot microservices. Implemented JWT authentication, role-based access control, user/permission management, project management and Kanban task tracking. Integrated REST APIs through Spring Cloud Gateway, with PostgreSQL persistence and Docker/GitHub Actions for containerization and CI/CD React · TypeScript · Java · Spring Boot · Spring Security · JWT · PostgreSQL · Spring Cloud Gateway · Docker · GitHub Actions": "Développement d’une plateforme interne de collaboration avec React/TypeScript et des microservices Spring Boot. Mise en place de l’authentification JWT, du contrôle d’accès par rôles (RBAC), de la gestion des utilisateurs, permissions, projets et tâches Kanban. Intégration des API REST via Spring Cloud Gateway, avec PostgreSQL, Docker et GitHub Actions pour la conteneurisation et la CI/CD.",
  "Web Developer — Virtual Internship": "Développeuse Web — Stage virtuel",
  "5 June 2026 – 5 August 2026": "5 juin – 5 août 2026",
  "Developing web applications using modern frameworks and industry best practices.": "Développement d’applications web avec des frameworks modernes et selon les bonnes pratiques du secteur.",
  "Media Manager": "Responsable média",
  "Oct 2025 – June 2026": "Oct. 2025 – juin 2026",
  "Managed digital content and team coordination. Collaborated on design and collaborative projects.": "Gestion des contenus numériques et coordination de l’équipe. Collaboration sur des projets de design et de communication.",
  "Full Stack Developer — Intern": "Développeuse Full Stack — Stagiaire",
  "July – August 2025": "Juillet – août 2025",
  "Designed and developed a full stack digital newspaper platform (FastAPI + React.js + Ionic). Led a critical database migration from MongoDB to PostgreSQL. Built Figma mockups and managed version control in an Agile team.": "Conception et développement d’une plateforme de journal numérique avec FastAPI, React.js et Ionic. Réalisation d’une migration de MongoDB vers PostgreSQL, de maquettes Figma et gestion du code source en équipe Agile.",
  "Selected Work": "Projets sélectionnés",
  "IoT Air Quality & Respiratory Health Monitoring": "Surveillance de la qualité de l’air et de la santé respiratoire par IoT",
  "Real-time air quality monitoring with ML-powered respiratory crisis prediction. Integrated IoT sensors for PM2.5, PM10, CO2, and O3. Implemented TensorFlow & scikit-learn models for predictive health analytics.": "Surveillance en temps réel de la qualité de l’air et prédiction des crises respiratoires par apprentissage automatique. Intégration de capteurs IoT pour les PM2.5, PM10, CO2 et O3, avec des modèles TensorFlow et scikit-learn pour l’analyse prédictive.",
  "PFE Opportunity Research Automation": "Automatisation de la recherche d’un stage PFE",
  "Automated workflow system for internship and PFE opportunity discovery. Built n8n automation workflows for web scraping job boards. Designed a Vue.js dashboard for intuitive opportunity tracking.": "Système automatisé de recherche d’offres de stage et de PFE. Création de workflows n8n pour collecter les offres et d’un tableau de bord Vue.js pour les suivre facilement.",
  "E-Commerce for Organic Cosmetics": "E-commerce de cosmétiques biologiques",
  "Full stack e-commerce website with product catalog, shopping cart, and checkout. Spring Boot REST API with JPA and MySQL. Responsive React.js frontend with secure payment processing.": "Site e-commerce avec catalogue, panier et commande. API REST Spring Boot avec JPA et MySQL, interface React.js responsive et traitement sécurisé des paiements.",
  "Room Reservation Application": "Application de réservation de chambres",
  "Internship Automation Bot": "Automatisation de la recherche de stages",
  "Hotel Booking System": "Système de réservation d’hôtel",
  "REST CRUD API": "API REST CRUD",
  "Room reservation and booking management app. REST API for availability, reservations, and bookings. React.js frontend with calendar and availability checking.": "Application de réservation et de gestion des chambres. API REST pour les disponibilités et réservations, interface React.js avec calendrier et vérification des disponibilités.",
  "Student Management System": "Gestion des étudiants",
  "REST API for complete student management with full CRUD operations. All endpoints validated with Postman — GET, POST, PUT, DELETE.": "API REST de gestion des étudiants avec toutes les opérations CRUD. Endpoints vérifiés avec Postman : GET, POST, PUT et DELETE.",
  "View on GitHub": "Voir sur GitHub",
  "Academic Background": "Formation académique",
  Degrees: "Diplômes",
  "Engineering Degree — Computer Engineering & AI (GIIA)": "Cycle ingénieur — Génie Informatique et Intelligence Artificielle (GIIA)",
  "Integrated Preparatory Cycle": "Cycle préparatoire intégré",
  "Baccalaureate — Mathematics Sciences B, With Honors": "Baccalauréat — Sciences Mathématiques B, mention Bien",
  "Lycée Technique Al-Khwarizmi, Safi": "Lycée Technique Al-Khwarizmi, Safi",
  "2024 – Present": "2024 – présent",
  "2022 – 2024": "2022 – 2024",
  "2021 – 2022": "2021 – 2022",
  Languages: "Langues",
  Arabic: "Arabe",
  English: "Anglais",
  French: "Français",
  Native: "Langue maternelle",
  Certifications: "Certifications",
  "HackerRank — SQL: Basic, Intermediate, Advanced": "HackerRank — SQL : niveaux Basic, Intermediate et Advanced",
  "Udemy — React.js: Modern Frontend Development": "Udemy — React.js : développement frontend moderne",
  "HackerRank — Frontend Developer (React)": "HackerRank — Développeuse frontend (React)",
  "HackerRank — Java (Basic)": "HackerRank — Java (niveau Basic)",
  "Name is required": "Le nom est obligatoire",
  "Valid email required": "Veuillez saisir une adresse e-mail valide",
  "Message is required": "Le message est obligatoire",
  "Failed to send message": "Échec de l’envoi du message",
  "Let's Build": "Construisons",
  "Something Together": "quelque chose ensemble",
  "Open to internship opportunities, full-stack projects, and collaborative engineering work. Feel free to reach out — I reply within 24 hours.": "Ouverte aux stages PFE, aux projets Full Stack et aux collaborations en ingénierie logicielle. Écrivez-moi, je réponds sous 24 heures.",
  "Safi, Morocco": "Safi, Maroc",
  "Message Sent!": "Message envoyé !",
  "Thank you for reaching out. I will get back to you soon.": "Merci pour votre message. Je vous répondrai bientôt.",
  "Send another message": "Envoyer un autre message",
  "Full Name": "Nom complet",
  "Email Address": "Adresse e-mail",
  "Subject (optional)": "Objet (facultatif)",
  "Internship opportunity...": "Offre de stage…",
  Message: "Message",
  "Hello, I would like to discuss...": "Bonjour, je souhaiterais discuter…",
  "Sending…": "Envoi en cours…",
  "Send Message": "Envoyer le message",
  "© 2026 Fatima-Ezzahraa El Ankoud. All rights reserved.": "© 2026 Fatima-Ezzahraa El Ankoud. Tous droits réservés.",
  "Full Stack Developer · ENSA Safi · Morocco": "Développement Full Stack · ENSA Safi · Maroc",
};

function useTranslation() {
  const { language } = useContext(LanguageContext);
  return (text: string) => language === "fr" ? FRENCH_TRANSLATIONS[text] ?? text : text;
}

/* ─── Data ─────────────────────────────────────────── */

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = {
  "Backend & APIs": ["Java", "Spring Boot", "Spring MVC", "Spring Data JPA","Spring Security","Microservices" , "Python", "FastAPI", "REST API"],
  Frontend: ["React.js", "Vue.js", "JavaScript ES6+", "HTML5", "CSS3", "Ionic Framework"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB"],
  "DevOps & Tools": ["Docker", "Git", "GitHub","GitHub actions", "GitLab", "Postman", "Figma", "n8n"],
  Methodologies: ["Agile", "Scrum", "UML", "UX/UI Design"],
};

const EXPERIENCES = [
  {
    role: "Full Stack Developer Intern",
    company: "OCP group - IT department",
    period: "6 july 2026 – 4 September 2026",
    desc: "Developed a full-stack internal collaborative platform using React/TypeScript and Spring Boot microservices. Implemented JWT authentication, role-based access control, user/permission management, project management and Kanban task tracking. Integrated REST APIs through Spring Cloud Gateway, with PostgreSQL persistence and Docker/GitHub Actions for containerization and CI/CD React · TypeScript · Java · Spring Boot · Spring Security · JWT · PostgreSQL · Spring Cloud Gateway · Docker · GitHub Actions",
    current: false,
    logo: ocpLogo,
    color: "#12f024",
    bg: "rgba(12, 107, 50, 0.12)",
  },
  {
    role: "Web Developer — Virtual Internship",
    company: "CodeAlpha",
    period: "5 June 2026 – 5 August 2026",
    desc: "Developing web applications using modern frameworks and industry best practices.",
    current: false,
    logo: codeAlphaLogo,
    color: "#7c6af7",
    bg: "rgba(115, 101, 209, 0.12)",
  },
  {
    role: "Media Manager",
    company: "Byte Brigade Club — ENSA Safi",
    period: "Oct 2025 – June 2026",
    desc: "Managed digital content and team coordination. Collaborated on design and collaborative projects.",
    current: false,
    logo: byteBrigadeLogo,
    color: "#06d6a0",
    bg: "rgba(66, 128, 153, 0.12)",
  },
  {
    role: "Full Stack Developer — Intern",
    company: "Maaziz IT Conseil",
    period: "July – August 2025",
    desc: "Designed and developed a full stack digital newspaper platform (FastAPI + React.js + Ionic). Led a critical database migration from MongoDB to PostgreSQL. Built Figma mockups and managed version control in an Agile team.",
    current: false,
    logo: maazizLogo,
    color: "#38bdf8",
    bg: "rgba(245, 32, 238, 0.12)",
  },
];

const PROJECTS = [
  {
    title: "AirSafe AI",
    subtitle: "IoT Air Quality & Respiratory Health Monitoring",
    desc: "Real-time air quality monitoring with ML-powered respiratory crisis prediction. Integrated IoT sensors for PM2.5, PM10, CO2, and O3. Implemented TensorFlow & scikit-learn models for predictive health analytics.",
    stack: ["Python", "TensorFlow", "Scikit-learn", "IoT","React.js", "FastAPI", "MongoDB"],
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
    stack: ["Spring Boot","Spring Security","RBAC" , "React.js", "PostgreSQL", "Stripe API"],
    icon: <Layers size={18} />,
    github: "https://github.com/fatimaezzahraaelankoud/bio7-backend",
  },
  {
    title: "Hotel Booking System",
    subtitle: "Room Reservation Application",
    desc: "Room reservation and booking management app. REST API for availability, reservations, and bookings. React.js frontend with calendar and availability checking.",
    stack: ["Spring Boot",'Spring Security',"React.js", "MySQL"],
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

const CERTIFICATIONS = [
  { label: "HackerRank — SQL: Basic, Intermediate, Advanced", image: sql },
  { label: "Udemy — React.js: Modern Frontend Development", image: reactcertificate },
  { label: "HackerRank — Frontend Developer (React)", image: reactHackerRankCertificate },
  { label: "HackerRank — Java (Basic)", image: javaHackerRankCertificate },
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
  const t = useTranslation();
  return (
    <button
      onClick={toggle}
      aria-label={t("Toggle theme")}
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
  const { language, setLanguage } = useContext(LanguageContext);
  const t = useTranslation();
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
              {t(link)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex border border-border rounded overflow-hidden" role="group" aria-label={t("Select language")}>
            {(["en", "fr"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                aria-pressed={language === option}
                className={`px-2.5 py-1.5 text-[10px] font-semibold uppercase transition-colors ${language === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {option}
              </button>
            ))}
          </div>
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
                {t(link)}
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
  const t = useTranslation();
  return (
    <section
      id="About"
      className="min-h-[100svh] flex flex-col justify-center px-6 pt-16 pb-6 relative overflow-hidden"
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
        <div className="flex justify-center mb-4">
          <div className="relative w-24 sm:w-28 md:w-32 aspect-square overflow-hidden rounded-full border-2 border-primary/30 bg-card">
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-4xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
              FE
            </div>
            <img
              src={profilePhoto}
              alt="Fatima-ezzahraa El Ankoud"
              className="relative w-full h-full rounded-full object-cover"
              onError={(event) => { event.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-4xl text-center">
            <p
              className="text-accent text-xs tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {t("Final-Year Engineering Student · Seeking PFE Internship")}
            </p>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Fatima-ezzahraa
              <br className="md:hidden" />
              <span className="text-primary md:ml-2">El ANKOUD</span>
            </h1>
            <p
              className="text-muted-foreground text-base max-w-xl leading-relaxed mb-4 mx-auto"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Final-year Computer Engineering student at ENSA Safi, looking for a full-stack PFE internship. Focused on React.js, Java, and Spring Boot.")}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <a
                href={cvPdf}
                download="Fatima-Ezzahraa-El-Ankoud-CV.pdf"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <Download size={15} /> {t("My CV")}
              </a>
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
              className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground"
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

        <button
          onClick={() => document.getElementById("Skills")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-3 mx-auto flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <ChevronDown size={16} className="animate-bounce" /> {t("Scroll to explore")}
        </button>
      </div>
    </section>
  );
}

/* ─── Skills ────────────────────────────────────────── */

function Skills() {
  const t = useTranslation();
  return (
    <Section id="Skills" label={`02 / ${t("Skills")}`} title={t("Technical Expertise")}>
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
              {t(category)}
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
  const t = useTranslation();
  return (
    <Section id="Experience" label={`03 / ${t("Experience")}`} title={t("Professional Journey")}>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        <div className="flex flex-col gap-0">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="relative pl-20 pb-12 last:pb-0">
              {/* Company logo badge */}
              <div
               className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
               style={{
             background: exp.bg,
                  }}
                 >
             <img
         src={exp.logo}
         alt={exp.company}
         className="w-10 h-10 object-contain"
        />
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
                    {t(exp.role)}
                  </h3>
                  <p className="text-primary text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
                    {t(exp.company)}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded self-start whitespace-nowrap ${
                    exp.current ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {t(exp.period)}
                </span>
              </div>
              <p
                className="text-muted-foreground text-sm leading-relaxed max-w-2xl"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {t(exp.desc)}
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
  const t = useTranslation();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="Projects" label={`04 / ${t("Projects")}`} title={t("Selected Work")}>
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
              {t(p.title)}
            </h3>
            <p
              className="text-xs text-primary mb-3"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t(p.subtitle)}
            </p>
            <p
              className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t(p.desc)}
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
              <Github size={14} /> {t("View on GitHub")} <ArrowUpRight size={13} />
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Certificate image slot ────────────────────────── */



/* ─── Education ─────────────────────────────────────── */

function Education() {
  const t = useTranslation();

  return (
    <Section id="Education" label={`05 / ${t("Education")}`} title={t("Academic Background")}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Degrees */}
        <div>
          <h3
            className="text-xs tracking-widest uppercase text-muted-foreground mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {t("Degrees")}
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
                    {t(e.degree)}
                  </h4>
                  <span
                    className="text-xs text-muted-foreground whitespace-nowrap shrink-0"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {t(e.period)}
                  </span>
                </div>
                <p className="text-primary text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {t(e.school)}
                </p>
              </div>
            ))}
          </div>

          {/* Languages */}
          <h3
            className="text-xs tracking-widest uppercase text-muted-foreground mb-6 mt-10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {t("Languages")}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { lang: "Arabic", level: "Native", pct: 100 },
              { lang: "English", level: "B2", pct: 72 },
              { lang: "French", level: "B2", pct: 72 },
            ].map((l) => (
              <div key={l.lang} className="bg-card border border-border rounded p-4 text-center hover:border-primary/40 transition-colors">
                <div className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t(l.level)}
                </div>
                <div className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {t(l.lang)}
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
            {t("Certifications")}
          </h3>
          <div className="flex flex-col gap-4">
            {CERTIFICATIONS.map((c, i) => (
  <div
    key={i}
    className="bg-card border border-border rounded p-5 hover:border-primary/40 transition-colors"
  >
    <img
      src={c.image}
      alt={t(c.label)}
      className="w-full h-48 object-contain rounded mb-4"
    />

    <h4
      className="text-sm font-medium text-foreground"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {t(c.label)}
    </h4>
  </div>
))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Contact form ──────────────────────────────────── */

function Contact() {
  const t = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t("Name is required");
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = t("Valid email required");
    if (!form.message.trim()) e.message = t("Message is required");
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
    alert(t("Failed to send message"));
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
        {t(label)}
      </label>
      <input
        id={id}
        type={type}
        value={form[id]}
        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
        placeholder={t(placeholder)}
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
            06 / {t("Contact")}
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
              {t("Let's Build")}
              <br />
              <span className="text-primary">{t("Something Together")}</span>
            </h2>
            <p
              className="text-muted-foreground text-base leading-relaxed mb-10"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {t("Open to internship opportunities, full-stack projects, and collaborative engineering work. Feel free to reach out — I reply within 24 hours.")}
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
                  {t("Message Sent!")}
                </h3>
                <p
                  className="text-muted-foreground text-sm"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("Thank you for reaching out. I will get back to you soon.")}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs text-primary underline underline-offset-4"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {t("Send another message")}
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
                    {t("Message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={t("Hello, I would like to discuss...")}
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
                    <><Loader2 size={15} className="animate-spin" /> {t("Sending…")}</>
                  ) : (
                    <><Send size={15} /> {t("Send Message")}</>
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
  const t = useTranslation();
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {t("© 2026 Fatima-Ezzahraa El Ankoud. All rights reserved.")}
        </span>
        <span
          className="text-xs text-muted-foreground/50"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {t("Full Stack Developer · ENSA Safi · Morocco")}
        </span>
      </div>
    </footer>
  );
}

/* ─── Root ──────────────────────────────────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "fr"
      ? "Portfolio de Fatima-Ezzahraa El Ankoud"
      : "Fatima-Ezzahraa El Ankoud Portfolio";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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
    </LanguageContext.Provider>
  );
}
