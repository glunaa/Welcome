import React, { FC } from 'react';
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

const App: FC = () => {
  return (
    <div className="page-container">
      {/* First Section */}
      <main className="container-fluid d-flex flex-column justify-content-center align-items-center custom-height">
        <Header name="Giovanni Luna" position="Front End Developer" />

        <p className="intro">
          I build user interfaces using React <FaReact className="icon" />
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
      </main>

      {/* Projects Section */}
      <section className="projects-section py-5">
        <h2 className="projects-title text-center mb-5">My Projects</h2>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 col-12 mb-4">
              <div className="project-card">
                <h3>Welcome</h3>
                <p>
                  Personal portfolio website built with React and TypeScript,
                  showcasing my projects and skills as a Front End Developer.
                </p>
                <a href="https://github.com/glunaa/Welcome">View on GitHub</a>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <div className="project-card">
                <h3>Fitness Tracker</h3>
                <p>
                  A python-based fitness tracking application that helps users
                  monitor their workouts and maintain their fitness goals.
                </p>
                <a href="https://github.com/glunaa/fitnesstracker">
                  View on GitHub
                </a>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-4">
              <div className="project-card">
                <h3>Todo</h3>
                <p>
                  A simple and intuitive todo list application built with React,
                  helping users manage their daily tasks effectively.
                </p>
                <a href="https://github.com/glunaa/todo">View on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="skills-title">Technical Skills</h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3>Frontend</h3>
            <div className="skills-grid">
              <div className="skill-item">
                <FaReact className="skill-icon react" /> React
              </div>
              <div className="skill-item">
                <SiTypescript className="skill-icon ts" /> TypeScript
              </div>
              <div className="skill-item">
                <SiCss3 className="skill-icon css" /> CSS
              </div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Languages & Tools</h3>
            <div className="skills-grid">
              <div className="skill-item">
                <SiCsharp className="skill-icon csharp" /> C#
              </div>
              <div className="skill-item">
                <SiCplusplus className="skill-icon cpp" /> C++
              </div>
              <div className="skill-item">
                <DiJava className="skill-icon java" /> Java
              </div>
              <div className="skill-item">
                <SiPython className="skill-icon python" /> Python
              </div>
              <div className="skill-item">
                <SiGit className="skill-icon git" /> Git
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hi, I’m Giovanni — a front-end developer who loves building clean,
              engaging, and user-friendly interfaces. I work primarily with
              React, TypeScript, and CSS to create smooth, responsive web
              experiences. I’m also familiar with C++, Java, and Python, and I
              have a strong understanding of data structures and algorithms,
              which helps me write efficient, maintainable code. I enjoy
              collaborating with teams, learning new tools, and continuously
              improving how people interact with the web.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Get In Touch</h2>
        <form className="contact-form">
          <input type="email" placeholder="your@email.com" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default App;
