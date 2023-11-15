import React, { FC } from 'react';
import Header from './components/Header';
import Links from './components/Links';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: FC = () => {
  return (
    <div>
    <main className="App d-flex flex-column align-items-center justify-content-center vh-100">
      <Header name="Giovanni Luna" position="Front End Dev" />
      <Links url="https://github.com/glunaa" label="Check out my GitHub" />
    </main>
    <Footer/>
    </div>
  );
};

export default App;
