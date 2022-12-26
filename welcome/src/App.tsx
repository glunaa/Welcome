import React from 'react';
import './App.css';
import Header from './components/Header';
import Links from './components/Links';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Links></Links>
    </div>
  );
}

export default App;
