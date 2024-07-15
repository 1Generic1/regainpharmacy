import React from 'react';
import { Link } from 'react-router-dom';
import './styles/MainSection4.css';
import img4 from './styles/src_regainimages/Ecommercedashboard.png';
import curvedPattern from './styles/src_regainimages/Curve_pattern.png';



function MainSection4() {
  return (
    <div className="main-section-4">
      <div className="heading4">
        <p> Purchase Medications </p>
        <h1> Easily Order For Drugs Get It Delivered </h1>
      </div>
      <div className="content-box4">
        <div className="plain_rectangle">
        <img src={curvedPattern} alt="Curve_pattern.png" className="curved-pattern" />
        <img src={img4} alt="ecommercedashboard" className="image-sector" />
        </div>
      </div>
      <div className="orderupload">
         <Link to="/signup" className="access-button signup-button">Quick Order</Link>
      </div>
    </div>
);
}

export default MainSection4;
