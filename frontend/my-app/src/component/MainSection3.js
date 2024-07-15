import React, { useEffect } from 'react';
import './styles/MainSection3.css';
import icon1 from './styles/src_regainimages/seamlessicon.png';
import icon2 from './styles/src_regainimages/discreetdelivery.png';
import icon3 from './styles/src_regainimages/Automated Refill.png';
import icon4 from './styles/src_regainimages/Upload Prescriptions.png';


function MainSection3() {
    useEffect(() => {
    const boxes = document.querySelectorAll('.content-box-3');
    
    const intervalId = setInterval(() => {
      boxes.forEach(box => box.classList.toggle('active'));
    }, 5000); // Toggle active class every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (        
    <div className="main-section-3">
      <div className="heading3">
        <p>What do we offer?</p>
        <h1>Simplified Pharma</h1>
        <h1>Management With Our Toolkit</h1>
      </div>
      <div className="content-container3">
        <div className="content-box-3">
          <img src={icon1} alt="Icon 1" className="icon-image" />
          <h2>Seamless Pharma Shopping</h2>
          <p>Effortlessly browse, select, and purchase your medications from our extensive catalog.</p>
        </div>
        <div className="content-box-3">
          <img src={icon2} alt="Icon 2" className="icon-image" />
          <h2>Discreet Door Delivery</h2>
          <p>Enjoy discreet and reliable doorstep delivery for your pharmaceutical needs, hassle-free..</p>
        </div>
        <div className="content-box-3">
          <img src={icon3} alt="Icon 3" className="icon-image" />
          <h2>Automated Refill</h2>
          <p>Never run out with our automated refill system, ensuring your medications are always available.</p>
        </div>
        <div className="content-box-3">
          <img src={icon4} alt="Icon 4" className="icon-image" />
          <h2>Upload Prescriptions</h2>
          <p>Easily upload and manage your prescriptions for quick and convenient medication fulfillment.</p>
        </div>
      </div>
    </div>
  )
}


export default MainSection3;
