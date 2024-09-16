import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import MainSection1 from './MainSection1';
import MainSection2 from './MainSection2';
import MainSection3 from './MainSection3';
import MainSection4 from './MainSection4';
import MainSection5 from './MainSection5';
import MainSection6 from './MainSection6';
import MainSection7 from './MainSection7';
import MainSection8 from './MainSection8';
import Faq from './Faq';

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#faq-section') {
      const element = document.getElementById('faq-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
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
      <Faq id="faq-section" />
    </>
  );
}

export default Home;

