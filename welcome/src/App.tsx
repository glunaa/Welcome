import React,{FC} from 'react';
import './App.css';
import Header from './components/Header';
import Links from './components/Links';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const App:FC = () => {
  return (
    <div className="App position-absolute top-50 start-50 translate-middle">
      <Header header='Giovanni Luna' position='Front End Dev'></Header>
      <Links github='Check out my github'></Links>
      <Footer></Footer>
    </div>
  );
}

export default App;
