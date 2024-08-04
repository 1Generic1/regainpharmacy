import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/Header.js';
import MainSection1 from './component/MainSection1.js';
import MainSection2 from './component/MainSection2.js';
import MainSection3 from './component/MainSection3.js';
import MainSection4 from './component/MainSection4.js';
import MainSection5 from './component/MainSection5.js';
import MainSection6 from './component/MainSection6.js';
import MainSection7 from './component/MainSection7.js';
import MainSection8 from './component/MainSection8.js';
import MainSection9 from './component/MainSection9.js';
import Footer from './component/Footer.js';
import AboutUs from './component/AboutUs.js';

function Home() {
  return (
    <>
      <MainSection1 />
      <MainSection2 />
      <MainSection3 />
      <MainSection4 />
      <MainSection5 />
      <MainSection6 />
      <MainSection7 />
      <MainSection8 />
      <MainSection9 />
    </>
  );
}

function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutus" element={<AboutUs />} />
        </Routes>
        <Footer />
        <div className="footer-bottom">
          <p><a href="#privacy">Privacy</a> | <a href="#terms">Terms & Conditions</a></p>
          <p>Copyright &copy; 2024 Your Pharmacy. All rights reserved.</p>
        </div>
      </div>
  );
}

export default App;
