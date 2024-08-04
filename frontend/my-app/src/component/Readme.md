## plain static MainSection8

import React, { useState } from 'react';
import './styles/MainSection8.css';

function MainSection8() {
    const [activeBox, setActiveBox] = useState('supplement');
  
    const handleBoxClick = (box) => {
      setActiveBox(box);
    };
  
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
          <div className={`box ${activeBox === 'nutrition' ? 'active' : ''}`} onClick={() => handleBoxClick('nutrition')}>
            <h1>Nutrition</h1>
          </div>
          <div className={`box ${activeBox === 'supplement' ? 'active' : ''}`} onClick={() => handleBoxClick('supplement')}>
            <h1>Supplement</h1>
          </div>
          <div className={`box ${activeBox === 'checkup' ? 'active' : ''}`} onClick={() => handleBoxClick('checkup')}>
            <h1>Checkup</h1>
          </div>
        </div>
        <div className="content-container8">
          <h1>{content[activeBox].title}</h1>
          <p>{content[activeBox].text}</p>
        </div>
      </div>
    );
  }
  
  export default MainSection8;

.main-section-8 {
    display: flex;
    align-items: flex-start;
    background-color: #f4f4f4;
    padding: 60px 20px;
    min-height: 100vh;
}

  .box-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    height:20%;
}

  .box {
    background-color: white;
    padding: 30px;
    margin: 20px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    width: 80%;
    max-width: 300px;
    cursor: pointer;
    height:80%;
    transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
    position: relative; /* Necessary for positioning the pseudo-element */
    overflow: hidden; /* Hide the overflow of the pseudo-element */
    color: black; /* Default text color */
    z-index: 0; /* Ensure the content is above the pseudo-element */

}

.box.active, .box:hover {
    background-color: #729762;
    
}

.box h1 {
    font-size: 24px;
    color: #002617;
    padding:30px;
}

.box h1:hover {
    color:#f4f4f4
}

.box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #729762; /* Hover color */
    z-index: -1; /* Place behind the box content */
    transform: scaleY(0); /* Initially hidden */
    transform-origin: left; /* Animate from top to bottom */
    transition: transform 0.2s ease-in-out; /* Animation duration and easing */
}

/* On hover, expand the pseudo-element */
.box:hover::before {
    transform: scaleY(1);
}
  
  .content-container8 {
    background-color: white;
    padding: 0px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    width: 70%;
    max-width: 800px;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    transform: translateX(0);
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 300px;
    margin-top: 160px;
}

.content-container8 h1 {
    font-size: 30px;
    color: #002617;
    margin-bottom: 10px;
}
  
  .content-container8 p {
    font-size: 25px;
    width: 100%;
    color: white;
    line-height: 1.6;
    padding-top: 60px;
    background-color: #729762;
    height: 200px;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 0px;
   padding-left :30px;
    padding-right :30px; 
}

## to use social link
npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome

## slideshow
the slide show images are placed in the public folder and are rendered direct in MainSection1  
/home/generic/regainpharmacy/frontend/my-app/public/styles/src_regainimages