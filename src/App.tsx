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
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
  const [navVisible, setNavVisible]       = useState(false);
  const [formStatus, setFormStatus]       = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Show nav after hero scrolled past
  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        <Header name="Giovanni Luna" position="Software & Network Engineer" />

        <p className="intro">
          <span className="typing">I build user interfaces using React</span>
          <FaReact className="icon" />
        </p>

        <div className="links-container d-flex justify-content-center">
          <Links
            className="col-md-6 col-lg-4 links"
            url="https://github.com/glunaa"
            icon={<BsGithub />}
          />
          <Links
            className="col-md-6 col-lg-4 links"
            url="https://linkedin.com/in/giovanni-luna-b85521255"
            icon={<FaLinkedin />}
          />
        </div>

        <div className="scroll-cue">Scroll</div>
      </main>

      {/* ── Projects ───────────────────────────────────── */}
      <section id="projects" className="projects-section py-5">
        <div className="section-inner" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <span className="section-label reveal">Work</span>
          <h2 className="projects-title reveal">My Projects</h2>
          <div className="projects-grid">

            <div className="project-card reveal">
              <h3>Welcome</h3>
              <p>Personal portfolio website built with React and TypeScript, showcasing my projects and skills.</p>
              <a href="https://github.com/glunaa/Welcome">View on GitHub</a>
            </div>

            <div className="project-card reveal">
              <h3>Fitness Tracker</h3>
              <p>A Python-based fitness tracking application that helps users monitor their workouts and maintain their fitness goals.</p>
              <a href="https://github.com/glunaa/fitnesstracker">View on GitHub</a>
            </div>

            <div className="project-card reveal">
              <h3>Todo</h3>
              <p>A simple and intuitive todo list application built with React, helping users manage their daily tasks effectively.</p>
              <a href="https://github.com/glunaa/todo">View on GitHub</a>
            </div>

            <div className="project-card reveal">
              <h3>Networking Showcase</h3>
              <p>Documented VLSM subnetting walkthroughs, Active Directory configuration labs, and network topology diagrams.</p>
              <a href="https://github.com/glunaa/Networking-Showcase">View on GitHub</a>
            </div>

            <div className="project-card reveal">
              <h3>AWS Solutions</h3>
              <p>Overview of core AWS services with real-world architecture patterns, IAM policies, and cloud deployment use cases.</p>
              <a href="https://github.com/glunaa/AWS-Solutions">View on GitHub</a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────── */}
      <section id="skills" className="skills-section">
        <span className="section-label reveal" style={{ maxWidth: '1100px', margin: '0 auto', display: 'block' }}>Expertise</span>
        <h2 className="skills-title reveal" style={{ maxWidth: '1100px', margin: '0 auto 3rem', display: 'block' }}>Technical Skills</h2>
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
              <div className="skill-item"><span className="skill-icon" style={{ fontSize: '1rem' }}>🌐</span> Networking / VLSM</div>
              <div className="skill-item"><span className="skill-icon" style={{ fontSize: '1rem' }}>☁️</span> AWS Cloud</div>
              <div className="skill-item"><span className="skill-icon" style={{ fontSize: '1rem' }}>🖥️</span> Active Directory</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── About ──────────────────────────────────────── */}
      <section id="about" className="about-section">
        <span className="section-label reveal" style={{ maxWidth: '1100px', width: '100%' }}>Background</span>
        <h2 className="reveal">About Me</h2>
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
      </section>

      {/* ── Contact ────────────────────────────────────── */}
      <section id="contact" className="contact-section">
        <span className="section-label reveal" style={{ maxWidth: '600px', width: '100%' }}>Contact</span>
        <h2 className="reveal">Get In Touch</h2>
        <p className="contact-sub reveal">Open to opportunities, collaborations, and conversations about tech.</p>

        <form ref={formRef} className="contact-form reveal" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="your@email.com" required />
          <textarea name="message" placeholder="Your message..." required />
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
      </section>

      <Footer />
    </div>
  );
};

export default App;