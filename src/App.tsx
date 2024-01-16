import { FaReact } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import { GoTools } from "react-icons/go";
import { SiVisualstudio } from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import React, { FC } from 'react';
import Header from './components/Header';
import Links from './components/Links';
import Footer from './components/Footer';
import Cards from './components/Cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: FC = () => {
  return (
    <div className="main-container">
    <main className="App d-flex flex-column align-items-center justify-content-center vh-100">
       <div className="header-container" >
        <Header name="Giovanni Luna" position="Front End Developer" />
       </div>
     <p className="intro">I build user interfaces using React <FaReact className="icon" /></p>
        <div className="card-container">
          <Cards title="Tech Stack" titleIcon=<GoStack /> bodyIcon=<FaReact className="icon"/> body="React.js TypeScript CSS Javascript HTML5"/>
          <Cards title="Developer Tools" titleIcon=<GoTools /> bodyIcon=<SiVisualstudio className="vs-icon"/> body="Visual Studio Code Git Github"/>
        </div>
        
        <div className="about-container">
          <p className="about-section">
            <h3 className="text-muted">About me</h3>
            Aside from knowledge of front end development, I am also familiar with object oriented programming
             in Java, C++, as well as Python. 
            When I am not occupied with development I enjoy reviewing data structures and algorithms.
          </p>  
        </div>
        <div className="links-container">
          <Links url="https://github.com/glunaa"icon=<BsGithub />/>
          <Links url="https://linkedin.com/in/giovanni-luna-b85521255" icon=<FaLinkedin/>/>
        </div>
 </main>
    <Footer/>
    </div>
  );
};

export default App;
