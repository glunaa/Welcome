import { FaReact } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import { GoTools } from "react-icons/go";
import { SiVisualstudio } from "react-icons/si";
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
      <Header name="Giovanni Luna" position="Front End Developer" />
      <p>I build user interfaces using React <FaReact className="icon" /></p>
        <div className="card-container">
          <Cards title="Tech Stack" titleIcon=<GoStack /> bodyIcon=<FaReact className="icon"/> body="React.js TypeScript CSS Javascript HTML5"/>
          <Cards title="Developer Tools" titleIcon=<GoTools /> bodyIcon=<SiVisualstudio className="vs-icon"/> body="Visual Studio Code Git Github"/>
        </div>
      <Links url="https://github.com/glunaa" label="Check out my GitHub" />
    </main>
    <Footer/>
    </div>
  );
};

export default App;
