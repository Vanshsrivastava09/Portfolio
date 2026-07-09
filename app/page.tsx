'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/Vanshsrivastava09', icon: Github },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vanshsrivastava09/', icon: Linkedin },
  { label: 'Email', url: 'mailto:vansh23srivastava@gmail.com', icon: Mail },
];

const skills = [
  { title: 'Languages', items: ['Python', 'SQL', 'Java', 'JavaScript', 'C'] },
  { title: 'Frameworks', items: ['FastAPI', 'Streamlit'] },
  { title: 'Libraries', items: ['Pandas', 'NumPy', 'Scikit-Learn', 'Plotly', 'Matplotlib'] },
  { title: 'Databases', items: ['PostgreSQL', 'SQLite'] },
  { title: 'Tools & Cloud', items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Jupyter Notebook'] },
  { title: 'Core CS', items: ['OOP', 'DBMS', 'DSA', 'REST APIs', 'Problem Solving'] },
];

const projects = [
  {
    title: 'NorthStar Pay',
    accent: 'bg-[#ff6b6b]',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Docker'],
    bullets: [
      'Built a payment gateway simulator with wallet creation, merchant payments, and fund transfers.',
      'Implemented JWT authentication and email OTP verification for secure access.',
      'Developed production-ready REST APIs with PostgreSQL integration and SQLAlchemy ORM.',
      'Containerized the application with Docker for a deployment-ready workflow.',
    ],
    demo: 'https://github.com/Vanshsrivastava09',
    repo: 'https://github.com/Vanshsrivastava09',
  },
  {
    title: 'AI-Powered IPL Analytics Platform',
    accent: 'bg-[#4cc9f0]',
    stack: ['Python', 'SQLite', 'Streamlit', 'Scikit-Learn', 'Plotly'],
    bullets: [
      'Built an analytics platform processing 260,000+ IPL records for player and team insights.',
      'Developed a Random Forest model for match outcome prediction.',
      'Designed SQL-backed dashboards and interactive visualizations with Streamlit.',
      'Turned complex sports data into crisp insights for decision-making.',
    ],
    demo: 'https://github.com/Vanshsrivastava09',
    repo: 'https://github.com/Vanshsrivastava09',
  },
  {
    title: 'E-Commerce Sales Analytics Dashboard',
    accent: 'bg-[#ffd166]',
    stack: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    bullets: [
      'Built a dashboard for KPI tracking, sales forecasting, and trend analysis.',
      'Performed data cleaning and exploratory analysis on business datasets.',
      'Created interactive visuals that make business stories easy to read.',
      'Focused on clear reporting and product-ready analytics experiences.',
    ],
    demo: 'https://github.com/Vanshsrivastava09',
    repo: 'https://github.com/Vanshsrivastava09',
  },
];

const achievements = [
  'Special Mention, Pandora’s Paradox Hackathon at KIIT E-Summit 2025.',
  'Built NorthStar Pay inspired by modern fintech systems and secure payment flows.',
  'Delivered multiple ML and analytics projects focused on prediction, dashboards, and automation.',
  'Collaborated in multidisciplinary teams to prototype software products with strong user focus.',
];

const certifications = [
  'SAP Certified (Business Data Cloud)',
  'SAP Data Analytics (ExcelR)',
  'Cisco Data Analytics Essentials',
  'Cisco Intro to Data Science',
  'Cisco Intro to Modern AI',
  'Cisco Python Essentials 1 & 2',
  'CCNA Intro to Networks / Enterprise Networking / Switching, Routing & Wireless Essentials',
  'Apply AI: Analyze Customer Reviews',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type GitHubRepo = {
  stargazers_count: number;
  language: string | null;
  pushed_at: string | null;
  updated_at: string | null;
};

type GitHubStats = {
  repoCount: number;
  totalStars: number;
  topLanguages: Array<{ name: string; percent: number }>;
  lastActiveDays: number | null;
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('portfolio-loaded');
    if (hasSeen) {
      setLoading(false);
      setProgress(100);
      return;
    }

    const interval = window.setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 8));
    }, 120);

    const timer = window.setTimeout(() => {
      setLoading(false);
      setProgress(100);
      sessionStorage.setItem('portfolio-loaded', 'true');
    }, 1500);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Vanshsrivastava09/repos?per_page=100');
        if (!response.ok) {
          throw new Error('GitHub request failed');
        }

        const data: GitHubRepo[] = await response.json();
        if (cancelled) return;

        const languageCounts = data.reduce<Record<string, number>>((counts, repo) => {
          const language = repo.language ?? 'Other';
          counts[language] = (counts[language] ?? 0) + 1;
          return counts;
        }, {});

        const topLanguages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name, count]) => ({
            name,
            percent: Math.round((count / data.length) * 100),
          }));

        const latestPushDate = data.reduce((latest, repo) => {
          const candidate = new Date(repo.pushed_at ?? repo.updated_at ?? Date.now());
          return candidate > latest ? candidate : latest;
        }, new Date(0));

        const lastActiveDays = latestPushDate.getTime()
          ? Math.max(0, Math.floor((Date.now() - latestPushDate.getTime()) / (1000 * 60 * 60 * 24)))
          : null;

        setGithubStats({
          repoCount: data.length,
          totalStars: data.reduce((sum, repo) => sum + repo.stargazers_count, 0),
          topLanguages,
          lastActiveDays,
        });
      } catch {
        if (!cancelled) {
          setGithubStats(null);
        }
      } finally {
        if (!cancelled) {
          setGithubLoading(false);
        }
      }
    };

    fetchGitHubStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#cfe8ff] text-[#111111]">
      <div className="fixed inset-x-0 top-0 z-50 h-2 bg-[linear-gradient(90deg,#ff6b6b,#ffd166,#4cc9f0,#7b61ff)]" />

      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#111111] px-6"
          >
            <div className="w-full max-w-xl rounded-[2rem] border-[3px] border-white bg-[#111111] p-8 shadow-[8px_8px_0_0_#ffffff]">
              <p className="font-display text-3xl font-semibold italic text-[#ffd166] sm:text-4xl">LOADING...</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex-1 rounded-full border-[3px] border-white bg-[#111111] p-1">
                  <div className="h-4 rounded-full bg-[#ffd166]" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-[3px] border-white bg-[#ffd166]" />
                  <div className="h-4 w-4 rounded-full border-[3px] border-white bg-[#ffd166]" />
                </div>
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-white">{Math.round(progress)}%</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <header className="sticky top-3 z-40 rounded-full border-[3px] border-black bg-[#7b61ff] p-3 shadow-[6px_6px_0_0_#000000]">
          <div className="flex items-center justify-between gap-3 rounded-full bg-[#fffdf8] px-4 py-3 sm:px-5">
            <button onClick={() => scrollToSection('top')} className="rounded-full border-[3px] border-black bg-[#fffdf8] px-4 py-2 text-left">
              <span className="font-display text-xl font-semibold italic">VANSH</span>
            </button>

            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                  className="rounded-full border-[3px] border-black bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition hover:-translate-y-0.5"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden rounded-full border-[3px] border-black bg-[#ffd166] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] sm:block">
                {now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </div>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="rounded-full border-[3px] border-black bg-[#ff6b6b] p-2 text-black md:hidden"
                aria-label="Toggle navigation"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div className="mt-3 rounded-[1.5rem] border-[3px] border-black bg-[#fffdf8] p-3 md:hidden">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href.replace('#', ''))}
                    className="rounded-full border-[3px] border-black bg-white px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </header>

        <section id="top" className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border-[3px] border-black bg-[#fffdf8] p-6 shadow-[8px_8px_0_0_#000000] sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-black bg-[#4cc9f0] text-3xl font-semibold text-black shadow-[4px_4px_0_0_#000000]">
                VS
              </div>
              <div className="space-y-2">
                <p className="rounded-full border-[3px] border-black bg-[#ffd166] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
                  DATA_SCIENTIST()
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4a4a4a]">Final Year B.Tech CSCE • KIIT</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h1 className="font-display text-4xl font-semibold italic leading-none sm:text-5xl lg:text-6xl">VANSH</h1>
              <p className="max-w-2xl text-lg leading-8 text-[#2e2e2e]">
                I’m a final-year CSCE student who loves turning messy data into decisions, strong products, and smart automation.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold uppercase tracking-[0.2em]">
              <span className="rounded-full border-[3px] border-black bg-[#cfe8ff] px-3 py-2">[LOCATION] BHUBANESWAR</span>
              <span className="rounded-full border-[3px] border-black bg-[#ffd166] px-3 py-2">[STATUS] FINAL YEAR</span>
              <span className="rounded-full border-[3px] border-black bg-[#ff6b6b] px-3 py-2">[MISSION] BUILD. SHIP. LEARN.</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-black bg-[#4cc9f0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition hover:-translate-y-0.5">
                <Download className="h-4 w-4" /> Download Resume
              </a>
              <a href="mailto:vansh23srivastava@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-black bg-[#ff6b6b] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5">
                <Mail className="h-4 w-4" /> Contact Me
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.url} target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black bg-[#111111] text-white transition hover:-translate-y-0.5">
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-[2rem] border-[3px] border-black bg-[#ffd166] p-6 shadow-[8px_8px_0_0_#000000]"
            >
              <p className="font-display text-3xl font-semibold italic">Hi people!</p>
              <div className="mt-4 space-y-3 text-base leading-8 text-[#1f1f1f]">
                <p>I’m a final-year B.Tech CSCE student at KIIT University, specializing in Python, Machine Learning, and Data Analytics. I love turning data into decisions and building tools people can actually use.</p>
                <p>I bring strong skills across backend systems, machine learning, and analytics, and I’ve shipped real projects such as a payment gateway simulator and an ML-based sports predictor. I’m adaptable, detail-driven, and excited to build products that matter.</p>
              </div>
              <a href="#projects" className="mt-6 inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition hover:-translate-y-0.5">
                🚀 Open to SDE / Data Science Internships & Full-Time Roles <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-[2rem] border-[3px] border-black bg-[#111111] p-5 shadow-[8px_8px_0_0_#000000]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-black bg-[#4cc9f0] text-black">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">GITHUB ACTIVITY</p>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#cfd8e3]">Public profile • Vanshsrivastava09</p>
                  </div>
                </div>
                <span className="rounded-full border-[3px] border-black bg-[#ffd166] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black">LIVE</span>
              </div>

              <div className="mt-4 rounded-[1.25rem] border-[3px] border-white/20 bg-[#1b1b1b] p-4">
                {githubLoading ? (
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f5f5]">GitHub stats loading...</p>
                ) : githubStats ? (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1rem] border-[3px] border-black bg-[#ff6b6b] p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/80">REPOS</p>
                        <p className="mt-1 font-display text-2xl font-semibold italic text-black">{githubStats.repoCount}</p>
                      </div>
                      <div className="rounded-[1rem] border-[3px] border-black bg-[#4cc9f0] p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/80">STARS</p>
                        <p className="mt-1 font-display text-2xl font-semibold italic text-black">{githubStats.totalStars}</p>
                      </div>
                    </div>

                    <div className="rounded-[1rem] border-[3px] border-black bg-[#fffdf8] p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4a4a4a]">TOP LANGUAGES</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {githubStats.topLanguages.map((language) => (
                          <span
                            key={language.name}
                            className={`rounded-full border-[3px] border-black px-3 py-1 text-xs font-semibold ${language.name === 'Python' ? 'bg-[#4cc9f0]' : language.name === 'JavaScript' ? 'bg-[#ffd166]' : language.name === 'SQL' ? 'bg-[#ff6b6b]' : 'bg-[#cfe8ff]'}`}
                          >
                            {language.name} {language.percent}%
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-[1rem] border-[3px] border-black bg-[#2ec27e] px-3 py-2 text-sm font-semibold text-black">
                      <span>Last active</span>
                      <span>{githubStats.lastActiveDays === null ? 'N/A' : `${githubStats.lastActiveDays} days ago`}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f5f5]">GitHub stats loading...</p>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-8">
          <div className="diagonal-marquee-section">
            <div className="diagonal-marquee-outer diagonal-marquee-viewport rounded-[2rem] shadow-[8px_8px_0_0_#000000]">
              <div className="diagonal-marquee-rotator">
                <div className="diagonal-marquee">
                  <div className="diagonal-marquee-track hover:paused">
                    {[
                      { text: 'FINAL YEAR CSCE STUDENT', icon: '⚡' },
                      { text: 'BUILDING REAL-WORLD PRODUCTS', icon: '🛠️' },
                      { text: 'AVAILABLE FOR INTERNSHIPS & ROLES', icon: '💼' },
                      { text: 'OPEN TO OPPORTUNITIES', icon: '🚀' },
                      { text: 'PYTHON • ML • DATA ANALYTICS', icon: '💻' },
                      { text: 'TURNING DATA INTO DECISIONS', icon: '📊' },
                    ].map((item, idx) => (
                      <span
                        key={`a-${idx}`}
                        className="diagonal-marquee-item text-sm sm:text-[0.95rem]"
                      >
                        <span className="diagonal-marquee-icon">{item.icon}</span>
                        <span>{item.text}</span>
                      </span>
                    ))}
                    {/* Duplicate for seamless infinite loop */}
                    {[
                      { text: 'FINAL YEAR CSCE STUDENT', icon: '⚡' },
                      { text: 'BUILDING REAL-WORLD PRODUCTS', icon: '🛠️' },
                      { text: 'AVAILABLE FOR INTERNSHIPS & ROLES', icon: '💼' },
                      { text: 'OPEN TO OPPORTUNITIES', icon: '🚀' },
                      { text: 'PYTHON • ML • DATA ANALYTICS', icon: '💻' },
                      { text: 'TURNING DATA INTO DECISIONS', icon: '📊' },
                    ].map((item, idx) => (
                      <span
                        key={`b-${idx}`}
                        className="diagonal-marquee-item text-sm sm:text-[0.95rem]"
                      >
                        <span className="diagonal-marquee-icon">{item.icon}</span>
                        <span>{item.text}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border-[3px] border-black bg-[#fffdf8] p-6 shadow-[8px_8px_0_0_#000000] sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4a4a4a]">ABOUT</p>
            <h2 className="mt-3 font-display text-3xl font-semibold italic">Building thoughtful products from data to deployment.</h2>
            <p className="mt-4 text-lg leading-8 text-[#2d2d2d]">
              I’m a data-first builder who enjoys combining backend engineering, machine learning, and analytics to create products that feel practical and polished. My work focuses on clear architecture, strong experimentation, and shipping experiences that users understand quickly.
            </p>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border-[3px] border-black bg-[#ff6b6b] p-6 shadow-[8px_8px_0_0_#000000]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border-[3px] border-black bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4a4a4a]">University</p>
                <p className="mt-2 font-display text-2xl font-semibold italic">KIIT University</p>
              </div>
              <div className="rounded-[1.5rem] border-[3px] border-black bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4a4a4a]">CGPA</p>
                <p className="mt-2 font-display text-2xl font-semibold italic">7.92 / 10</p>
              </div>
            </div>
          </motion.aside>
        </section>

        <section id="skills" className="mt-12 rounded-[2rem] border-[3px] border-black bg-[#ff7aa2] p-6 shadow-[8px_8px_0_0_#000000] sm:p-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#111111]">SKILLS</p>
            <h2 className="mt-2 font-display text-3xl font-semibold italic sm:text-4xl">Core tools for data, product, and systems work.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((group) => (
              <div key={group.title} className="rounded-[1.5rem] border-[3px] border-black bg-[#fffdf8] p-5 shadow-[6px_6px_0_0_#000000]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-black bg-[#4cc9f0]">
                    <Code2 className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold uppercase tracking-[0.2em]">{group.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border-[3px] border-black bg-white px-3 py-2 text-sm font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-12">
          <div className="rounded-[2rem] border-[3px] border-black bg-[#2ec27e] p-6 shadow-[8px_8px_0_0_#000000] sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#111111]">PROJECTS</p>
                <h2 className="mt-2 font-display text-3xl font-semibold italic sm:text-4xl">Selected work with real-world impact.</h2>
              </div>
              <span className="rounded-full border-[3px] border-black bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]">LIVE PROJECTS</span>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              {projects.map((project) => (
                <article key={project.title} className="rounded-[1.75rem] border-[3px] border-black bg-[#fffdf8] p-5 shadow-[6px_6px_0_0_#000000]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`inline-flex rounded-full border-[3px] border-black px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${project.accent} text-black`}>
                        LIVE PROJECT
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold italic">{project.title}</h3>
                    </div>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="rounded-full border-[3px] border-black bg-white p-2">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full border-[3px] border-black bg-[#cfe8ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-[#2d2d2d]">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#111111]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a href={project.demo} target="_blank" rel="noreferrer" className="rounded-full border-[3px] border-black bg-[#ff6b6b] px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                      Live
                    </a>
                    <a href={project.repo} target="_blank" rel="noreferrer" className="rounded-full border-[3px] border-black bg-white px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border-[3px] border-black bg-[#fffdf8] p-6 shadow-[8px_8px_0_0_#000000] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4a4a4a]">BY THE NUMBERS</p>
              <h2 className="mt-2 font-display text-3xl font-semibold italic sm:text-4xl">Quick proof points for recruiters.</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { value: '260,000+', label: 'IPL records processed in match predictor', accent: 'bg-[#4cc9f0]' },
              { value: '3', label: 'Full-stack projects shipped solo', accent: 'bg-[#ffd166]' },
              { value: '10+', label: 'Certifications across AI, cloud & networking', accent: 'bg-[#ff6b6b]' },
              { value: '7.92', label: 'CGPA / 10', accent: 'bg-[#2ec27e]' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`group rounded-[1.5rem] border-[3px] border-black p-5 shadow-[6px_6px_0_0_#000000] transition duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000000] ${stat.accent}`}
              >
                <p className="font-display text-4xl font-semibold italic text-black">{stat.value}</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#111111]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border-[3px] border-black bg-[#fffdf8] p-6 shadow-[8px_8px_0_0_#000000]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4a4a4a]">ACHIEVEMENTS</p>
            <h2 className="mt-2 font-display text-3xl font-semibold italic">Notable milestones and collaborations.</h2>
            <ul className="mt-6 space-y-3 text-base leading-8 text-[#2d2d2d]">
              {achievements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff6b6b]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border-[3px] border-black bg-[#fffdf8] p-6 shadow-[8px_8px_0_0_#000000]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4a4a4a]">CERTIFICATIONS</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <span key={cert} className="rounded-full border-[3px] border-black bg-[#cfe8ff] px-4 py-3 text-sm font-semibold">
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-12 rounded-[2rem] border-[3px] border-black bg-[#fffdf8] p-6 shadow-[8px_8px_0_0_#000000] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4a4a4a]">EDUCATION</p>
              <h2 className="mt-2 font-display text-3xl font-semibold italic">Kalinga Institute of Industrial Technology (KIIT University)</h2>
              <p className="mt-4 text-lg leading-8 text-[#2d2d2d]">B.Tech in Computer Science and Communication Engineering (CSCE), 2023–2027</p>
              <p className="mt-2 text-lg font-semibold uppercase tracking-[0.2em]">CGPA: 7.92 / 10</p>
            </div>
            <div className="rounded-[1.5rem] border-[3px] border-black bg-[#ffd166] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#111111]">CONTACT</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.label} href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em]">
                      <Icon className="h-4 w-4" /> {item.label}
                    </a>
                  );
                })}
              </div>
              <a href="mailto:vansh23srivastava@gmail.com" className="mt-6 inline-flex items-center gap-2 rounded-full border-[3px] border-black bg-[#ff6b6b] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                <Mail className="h-4 w-4" /> Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
