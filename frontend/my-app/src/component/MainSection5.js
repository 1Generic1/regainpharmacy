import React from 'react';
import './styles/MainSection5.css';
import img1 from './styles/src_regainimages/pill1.png';
import img2 from './styles/src_regainimages/pills3.png';
import img3 from './styles/src_regainimages/pills2.png';


function MainSection5() {
  return (
    <div className="main-section-5">
      <div className="head">      
      <h1>We've got you covered</h1>
      <h2>Whether you need your medications before tonight’s sleep, or with more customisation, the possibilities are endless.</h2>
      </div>
      <div className="content-container5">
        <div className="image-container">
          <div className="shapeless-design">
            <div className="flip-card-inner"> 
              <img src={img1} alt="testing2" className="content-image" />
            </div>      
          </div>
        </div>
        <div className="image-container">
          <div className="shapeless-design">
          <div className="flip-card-inner">
              <img src={img2} alt="testing2" className="content-image" />
          </div>
          </div>
        </div>
        <div className="image-container">
          <div className="shapeless-design">
            <div className="flip-card-inner">
              <img src={img3} alt="testing3" className="content-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainSection5;
