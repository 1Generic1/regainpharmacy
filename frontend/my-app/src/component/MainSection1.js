import React from 'react';
import { Link } from 'react-router-dom';
import './styles/MainSection1.css';


function MainSection1() {
  return (
    <div className="video-background-container">
      <video autoPlay muted loop id="background-video">
        <source src="/headerImage_animation.mp4" type="video/mp4" />
       Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>The Easiest Way To Get
        The<span className="highlighted"> Medication </span> You Need!</h1>
        <p>Your trusted destination for pharmaceutical needs, we offer you the support when you need it the most, plus discreet doorstep delivery.</p>
        <div className="orderupload">
          <Link to="/signup" className="access-button signup-button">Quick Order</Link>
          <Link to="/login" className="access-button login-button">Upload Prescription</Link>
        </div>
      </div>
        
    </div>
  );
}


export default MainSection1;
