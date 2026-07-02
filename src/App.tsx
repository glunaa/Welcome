import React, { FC, useEffect, useRef, useState } from 'react';
import { FaReact, FaLinkedin } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import {
  SiTypescript,
  SiCsharp,
  SiCplusplus,
  SiPython,
  SiGit,
  SiCss3,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import Header from './components/Header';
import Links from './components/Links';
import Footer from './components/Footer';
import NetworkCanvas from './components/NetworkCanvas';
import TerminalIntro from './components/TerminalIntro';
import { useCardSpotlight } from './hooks/useCardSpotlight';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// ── Spotlight card wrapper ────────────────────────────
const SpotlightCard: FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  const { ref, onMouseMove, onMouseLeave } = useCardSpotlight();
  return (
    <div ref={ref} className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
};

// ── Paste your Formspree form ID below ──────────────────
const FORMSPREE_ID = 'xkovybqg';
// ────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
];

const App: FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [navVisible,    setNavVisible]    = useState(false);
  const [formStatus,    setFormStatus]    = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [theme,         setTheme]         = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark',
  );
  const [flipping, setFlipping] = useState(false);
  const formRef         = useRef<HTMLFormElement>(null);
  const parallaxRef     = useRef<HTMLDivElement>(null);
  const targetParallax  = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });
  const rafRef          = useRef<number>();

  // Persist + apply theme to <html data-theme>
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Show nav after hero scrolled past
  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Parallax: mouse on desktop, gyroscope on mobile
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentParallax.current.x = lerp(currentParallax.current.x, targetParallax.current.x, 0.07);
      currentParallax.current.y = lerp(currentParallax.current.y, targetParallax.current.y, 0.07);
      if (parallaxRef.current) {
        parallaxRef.current.style.transform =
          `translate(${currentParallax.current.x}px, ${currentParallax.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMouse = (e: MouseEvent) => {
      targetParallax.current.x = (e.clientX / window.innerWidth  - 0.5) * 36;
      targetParallax.current.y = (e.clientY / window.innerHeight - 0.5) * 24;
    };

    const onTilt = (e: DeviceOrientationEvent) => {
      targetParallax.current.x = ((e.gamma ?? 0) / 45) * 24;
      targetParallax.current.y = (((e.beta  ?? 45) - 45) / 45) * 16;
    };

    window.addEventListener('mousemove',        onMouse, { passive: true });
    window.addEventListener('deviceorientation', onTilt,  { passive: true });

    return () => {
      window.removeEventListener('mousemove',        onMouse);
      window.removeEventListener('deviceorientation', onTilt);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Active section tracker
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Formspree submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormStatus('success');
        formRef.current?.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="page-container">

      {/* ── Theme toggle ───────────────────────────────── */}
      <button
        className={`theme-toggle${flipping ? ' theme-toggle--flipping' : ''}`}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => {
          if (flipping) return;
          setFlipping(true);
          setTimeout(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), 160);
          setTimeout(() => setFlipping(false), 350);
        }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {/* ── Nav ────────────────────────────────────────── */}
      <nav className={`gl-nav ${navVisible ? 'gl-nav--visible' : ''}`}>
        <div className="gl-nav__inner">
          <a href="#root" className="gl-nav__logo">GL</a>
          <ul className="gl-nav__links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`gl-nav__link ${activeSection === href.slice(1) ? 'gl-nav__link--active' : ''}`}
                >
                  {label}
                  <span className="gl-nav__indicator" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <main className="container-fluid d-flex flex-column justify-content-center align-items-center custom-height">
        <NetworkCanvas />
        <div className="hero-parallax" ref={parallaxRef} aria-hidden="true">
          <div className="hero-orb hero-orb--1" />
          <div className="hero-orb hero-orb--2" />
        </div>
        <Header name="Giovanni Luna" position="Software & Network Engineer" />

        <p className="intro">
          <span className="typing">I build user interfaces using React</span>
          <FaReact className="icon" />
        </p>

        <div className="links-container d-flex justify-content-center">
          <Links url="https://github.com/glunaa"                        icon={<BsGithub />}   label="GitHub profile"   />
          <Links url="https://linkedin.com/in/giovanni-luna-b85521255" icon={<FaLinkedin />} label="LinkedIn profile" />
        </div>

        <div className="scroll-cue">Scroll</div>
      </main>

      {/* ── Terminal showcase ───────────────────────────── */}
      <section className="terminal-section">
        <div className="section-inner terminal-section__inner">
          <div className="terminal-section__text reveal">
            <span className="section-label">System</span>
            <h2 className="section-title">Quick Recon</h2>
            <p className="terminal-section__desc">
              A peek at who's behind the keyboard — queried straight from the command line.
            </p>
          </div>
          <div className="terminal-section__window reveal">
            <TerminalIntro />
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────── */}
      <section id="projects" className="projects-section">
        <div className="section-inner">
          <span className="section-label reveal">Work</span>
          <h2 className="projects-title reveal">My Projects</h2>
          <div className="projects-grid">

            <SpotlightCard className="project-card reveal">
              <div className="project-card__head">
                <h3>Welcome</h3>
              </div>
              <p>Personal portfolio website built with React and TypeScript, showcasing my projects and skills.</p>
              <a href="https://github.com/glunaa/Welcome" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </SpotlightCard>

            <SpotlightCard className="project-card reveal">
              <div className="project-card__head">
                <h3>Catholic Verses</h3>
                <span className="project-badge">Live</span>
              </div>
              <p>A web app for exploring and reflecting on Catholic scripture verses, built to make daily prayer and Bible reading more accessible.</p>
              <a href="https://catholicverses.netlify.app/" target="_blank" rel="noopener noreferrer">Visit Site</a>
            </SpotlightCard>

            <SpotlightCard className="project-card reveal">
              <div className="project-card__head">
                <h3>NetCert Prep</h3>
                <span className="project-badge">Live</span>
              </div>
              <p>A study tool for networking certification prep, covering key concepts, subnetting, and practice questions for CompTIA Network+ and CCNA.</p>
              <a href="https://netcertprep.netlify.app/" target="_blank" rel="noopener noreferrer">Visit Site</a>
            </SpotlightCard>

            <SpotlightCard className="project-card reveal">
              <div className="project-card__head">
                <h3>Networking Showcase</h3>
              </div>
              <p>Documented VLSM subnetting walkthroughs, Active Directory configuration labs, and network topology diagrams.</p>
              <a href="https://github.com/glunaa/Networking-Showcase" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </SpotlightCard>

            <SpotlightCard className="project-card reveal">
              <div className="project-card__head">
                <h3>AWS Solutions</h3>
              </div>
              <p>Overview of core AWS services with real-world architecture patterns, IAM policies, and cloud deployment use cases.</p>
              <a href="https://github.com/glunaa/AWS-Solutions" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </SpotlightCard>

            <SpotlightCard className="project-card reveal">
              <div className="project-card__head">
                <h3>NetOps Simulator</h3>
              </div>
              <p>An AI-powered IT training platform built with React and Claude AI. Three simulation environments — each with its own UI, scoring system, and incident types — covering core roles a junior IT engineer encounters on day one.</p>
              <a href="https://github.com/glunaa/network-sim" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </SpotlightCard>

          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────── */}
      <section id="skills" className="skills-section">
        <div className="section-inner">
          <span className="section-label reveal">Expertise</span>
          <h2 className="skills-title reveal">Technical Skills</h2>
          <div className="skills-container">

            <div className="skill-category reveal">
              <h3>Frontend</h3>
              <div className="skills-grid">
                <div className="skill-item"><FaReact className="skill-icon react" /> React</div>
                <div className="skill-item"><SiTypescript className="skill-icon ts" /> TypeScript</div>
                <div className="skill-item"><SiCss3 className="skill-icon css" /> CSS3</div>
              </div>
            </div>

            <div className="skill-category reveal">
              <h3>Languages</h3>
              <div className="skills-grid">
                <div className="skill-item"><SiCsharp className="skill-icon csharp" /> C#</div>
                <div className="skill-item"><SiCplusplus className="skill-icon cpp" /> C++</div>
                <div className="skill-item"><DiJava className="skill-icon java" /> Java</div>
                <div className="skill-item"><SiPython className="skill-icon python" /> Python</div>
              </div>
            </div>

            <div className="skill-category reveal">
              <h3>Tools & Infrastructure</h3>
              <div className="skills-grid">
                <div className="skill-item"><SiGit className="skill-icon git" /> Git</div>
                <div className="skill-item"><span className="skill-icon net-icon">🌐</span> Networking / VLSM</div>
                <div className="skill-item"><span className="skill-icon net-icon">☁️</span> AWS Cloud</div>
                <div className="skill-item"><span className="skill-icon net-icon">🖥️</span> Active Directory</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────── */}
      <section id="about" className="about-section">
        <div className="section-inner">
          <span className="section-label reveal">Background</span>
          <h2 className="section-title reveal">About Me</h2>
          <div className="about-content reveal">
            <div className="about-text">
              <p>
                Hi, I'm Giovanni — a front-end developer who loves building clean,
                engaging, and user-friendly interfaces. I work primarily with React,
                TypeScript, and CSS to craft smooth, responsive web experiences.
              </p>
              <p>
                Beyond the browser, I have hands-on experience in networking —
                designing subnets with VLSM, configuring Active Directory environments,
                and working with AWS cloud services. I enjoy understanding systems
                from the UI all the way down to the infrastructure.
              </p>
              <p>
                I'm also familiar with C++, Java, and Python, and I have a strong
                grasp of data structures and algorithms, which helps me write
                efficient, maintainable code.
              </p>
              <p>
                Currently pursuing my <strong>AWS Cloud Practitioner</strong> and <strong>CompTIA Network+</strong> certifications, and actively working through <strong>CCNA</strong> prep to deepen my networking expertise.
              </p>
            </div>
            <div className="about-meta">
              <div className="meta-item">
                <span className="meta-label">Location</span>
                <span className="meta-value">Los Angeles, CA</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Focus</span>
                <span className="meta-value">Web Dev · Networking · Cloud</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Pursuing</span>
                <span className="meta-value">AWS CCP · Network+ · CCNA</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">GitHub</span>
                <span className="meta-value">
                  <a href="https://github.com/glunaa" target="_blank" rel="noopener noreferrer">@glunaa</a>
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">LinkedIn</span>
                <span className="meta-value">
                  <a href="https://linkedin.com/in/giovanni-luna-b85521255" target="_blank" rel="noopener noreferrer">giovanni-luna</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────── */}
      <section id="contact" className="contact-section">
        <div className="section-inner section-inner--narrow">
          <span className="section-label reveal">Contact</span>
          <h2 className="section-title reveal">Get In Touch</h2>
          <p className="contact-sub reveal">Open to opportunities, collaborations, and conversations about tech.</p>

          <form ref={formRef} className="contact-form reveal" onSubmit={handleSubmit}>
            <input type="text"  name="name"    placeholder="Your name"      required />
            <input type="email" name="email"   placeholder="your@email.com" required />
            <textarea           name="message" placeholder="Your message..."  required />
            <button type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {formStatus === 'success' && (
              <p className="form-feedback form-feedback--success">
                ✓ Message sent! I'll get back to you soon.
              </p>
            )}
            {formStatus === 'error' && (
              <p className="form-feedback form-feedback--error">
                ✗ Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
