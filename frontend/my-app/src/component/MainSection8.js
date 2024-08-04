import React, { useState, useRef, useEffect } from 'react';
import './styles/MainSection8.css';

function MainSection8() {
  const [activeBox, setActiveBox] = useState('supplement');
  const [transitioning, setTransitioning] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const nutritionRef = useRef(null);
  const supplementRef = useRef(null);
  const checkupRef = useRef(null);
  const contentRef = useRef(null);

  const handleBoxClick = (box, ref) => {
    setActiveBox(box);
    const boxRect = ref.current.getBoundingClientRect();
    setBoxPosition({
      top: boxRect.top,
      left: boxRect.left,
      width: boxRect.width,
      height: boxRect.height,
    });
    setTransitioning(true);
  };

  useEffect(() => {
    if (transitioning) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
      }, 300); // The duration of your transition
      return () => clearTimeout(timeout);
    }
  }, [transitioning]);

  const content = {
    nutrition: {
      title: 'Nutrition',
      text: 'Good nutrition is essential for maintaining a healthy body and mind. It provides the energy and nutrients necessary for optimal health and well-being.'
    },
    supplement: {
      title: 'Supplement',
      text: 'Supplements can help fill nutrient gaps and support overall health. It\'s important to choose high-quality supplements and consult with a healthcare provider.'
    },
    checkup: {
      title: 'Checkup',
      text: 'Regular checkups are crucial for early detection and prevention of health issues. Make sure to schedule routine visits with your healthcare provider.'
    }
  };

  return (
    <div className="main-section-8">
      <div className="box-container">
        <div ref={nutritionRef} className={`box ${activeBox === 'nutrition' ? 'active' : ''}`} onClick={() => handleBoxClick('nutrition', nutritionRef)}>
          <h1>Nutrition</h1>
        </div>
        <div ref={supplementRef} className={`box supplement ${activeBox === 'supplement' ? 'active' : ''}`} onClick={() => handleBoxClick('supplement', supplementRef)}>
          <h1>Supplement</h1>
        </div>
        <div ref={checkupRef} className={`box ${activeBox === 'checkup' ? 'active' : ''}`} onClick={() => handleBoxClick('checkup', checkupRef)}>
          <h1>Checkup</h1>
        </div>
      </div>
      <div
        ref={contentRef}
        className={`content-container8 ${transitioning ? 'transitioning' : ''}`}
        style={{
          top: transitioning ? boxPosition.top : '50%',
          left: transitioning ? boxPosition.left : '50%',
          width: transitioning ? boxPosition.width : '70%',
          height: transitioning ? boxPosition.height : 'auto',
          transform: transitioning ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
        }}
      >
        <h1>{content[activeBox].title}</h1>
        <p>{content[activeBox].text}</p>
      </div>
    </div>
  );
}

export default MainSection8;
