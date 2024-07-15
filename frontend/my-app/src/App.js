import React from 'react';
import './App.css';
import Header from './component/Header.js';
import MainSection1 from './component/MainSection1.js';
import MainSection2 from './component/MainSection2.js';
import MainSection3 from './component/MainSection3.js';
import MainSection4 from './component/MainSection4.js';
import MainSection5 from './component/MainSection5.js';
import MainSection6 from './component/MainSection6.js';

function App() {
  return (
    <div className="App">
      <Header />
      <MainSection1 />
      <MainSection2 />
      <MainSection3 />
      <MainSection4 />
      <MainSection5 />
      <MainSection6 />
        <p>
          this is the current body
        </p>
    </div>
  );
}

export default App;
