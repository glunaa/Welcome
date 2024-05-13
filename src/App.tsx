import { FaReact } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa';
import React, { FC } from 'react';
import Header from './components/Header';
import Links from './components/Links';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: FC = () => {
  return (
    <main className="container-fluid d-flex flex-column justify-content-center align-items-center custom-height ">
    <Header name="Giovanni Luna" position="Front End Developer" />

      <p className="intro">
        I build user interfaces using React <FaReact className="icon" />
      </p>

      <div className="links-container d-flex justify-content-center">
        <Links
          className="col-md-6 col-lg-4 links"
          url="https://github.com/glunaa"
          icon=<BsGithub />
        />
        <Links
          className="col-md-6 col-lg-4 links"
          url="https://linkedin.com/in/giovanni-luna-b85521255"
          icon=<FaLinkedin />
        />
      </div>

      <Footer />
    </main>
  );
};

export default App;
