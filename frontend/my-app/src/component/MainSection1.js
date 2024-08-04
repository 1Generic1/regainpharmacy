import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import './styles/MainSection1.css';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  '/styles/src_regainimages/nurse.jpg',
  '/styles/src_regainimages/whitepils.jpg',
  '/styles/src_regainimages/tools.jpg'
];


function MainSection1() {
  return (
    <div className="slideshow-container">
      <Slide easing="ease">
        {slideImages.map((Images, index) => (
          <div className="each-slide" key={index}>
            <div style={{ backgroundImage: `url(${Images})` }}>
            </div>
          </div>
        ))}
      </Slide>
      <div className="content">
        <h1>The Easiest Way To Get
        The<span className="highlighted"> Medication </span> You Need!</h1>
        <p>Your trusted destination for pharmaceutical needs, we offer you the support when you need it the most, plus discreet doorstep delivery.</p>
        <div className="orderupload">
          <Link to="/login" className="access-button signup-button">Quick Order</Link>
          <Link to="/login" className="access-button login-button">Upload Prescription</Link>
        </div>
      </div>
    </div>
  );
}


export default MainSection1;
