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
      <main className="">
          <Header name="Giovanni Luna" position="Front End Developer" />
        
          <p className="intro">
            I build user interfaces using React <FaReact className="icon" />
          </p>
          
          <div className="links-container">
            <Links url="https://github.com/glunaa" icon=<BsGithub /> />
            <Links
              url="https://linke  din.com/in/giovanni-luna-b85521255"
              icon=<FaLinkedin />
            />
          </div>
        
          <Footer />
      </main>
    
  );
};
export default App;
