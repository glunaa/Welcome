import { FaReact } from "react-icons/fa";
import React, { FC } from 'react';
import Header from './components/Header';
import Links from './components/Links';
import Footer from './components/Footer';
import Cards from './components/Cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: FC = () => {
  return (
    <div>
    <main className="App d-flex flex-column align-items-center justify-content-center vh-100">
      <Header name="Giovanni Luna" position="Front End Developer" />
      <p>I build user interfaces using React <FaReact className="icon" /></p>
        <div className="card-container">
          <Cards title="Tech Stack" body="React TypeScript CSS Javascript HTML5"/>
          <Cards title="Developer Tools"body="Visual Studio Code Git Github"/>
        </div>
      <Links url="https://github.com/glunaa" label="Check out my GitHub" />
    </main>
    <Footer/>
    </div>
  );
};

export default App;
