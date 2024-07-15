import React, { useState } from 'react';
import './styles/MainSection6.css';
import stetoscopeImg from './styles/src_regainimages/test1.png';
import avaterimg1 from './styles/src_regainimages/malepicicon.png';
import avaterimg2 from './styles/src_regainimages/femaleicon1.png';
import avaterimg3 from './styles/src_regainimages/malepic2.png';
import quote from './styles/src_regainimages/quote.png';


const testimonials = [
  {
    text: "This service is amazing! I received my medication on time and the process was seamless. Highly recommend!",
    author: "Jane Doe",
    avatar: avaterimg2
  },
  {
    text: "Great experience! The staff were very helpful and the delivery was quick.",
    author: "John Smith",
    avatar: avaterimg1
  },
  {
    text: "I love how easy it is to order my prescriptions. Fantastic service!",
    author: "Nwachuku Emenike",
    avatar: avaterimg3
  }
];

function MainSection6() {
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <div className="main-section-6" >
      <div className="left-svg">
        <div className="svg-layer-1">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#A7F0BA" d="M27.6,-50C39.2,-41.2,54.2,-40.6,66.7,-33.6C79.2,-26.6,89.2,-13.3,83.4,-3.3C77.7,6.7,56.3,13.4,47.6,26.9C38.8,40.4,42.7,60.6,36.9,72C31.1,83.4,15.5,86.1,2,82.7C-11.6,79.3,-23.3,69.9,-31.2,59.7C-39,49.4,-43.2,38.4,-44.7,28.3C-46.2,18.2,-45.1,9.1,-41.2,2.3C-37.3,-4.6,-30.6,-9.2,-28.3,-17.9C-26,-26.7,-28.2,-39.6,-24.2,-52.8C-20.2,-66,-10.1,-79.3,-1,-77.6C8,-75.8,16.1,-58.8,27.6,-50Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="svg-layer-2">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#000000" d="M27.6,-50C39.2,-41.2,54.2,-40.6,66.7,-33.6C79.2,-26.6,89.2,-13.3,83.4,-3.3C77.7,6.7,56.3,13.4,47.6,26.9C38.8,40.4,42.7,60.6,36.9,72C31.1,83.4,15.5,86.1,2,82.7C-11.6,79.3,-23.3,69.9,-31.2,59.7C-39,49.4,-43.2,38.4,-44.7,28.3C-46.2,18.2,-45.1,9.1,-41.2,2.3C-37.3,-4.6,-30.6,-9.2,-28.3,-17.9C-26,-26.7,-28.2,-39.6,-24.2,-52.8C-20.2,-66,-10.1,-79.3,-1,-77.6C8,-75.8,16.1,-58.8,27.6,-50Z" transform="translate(102 100)" />
          </svg>
        </div>
     </div>
      <div className="text-container">
        <h1>What our most honourable customers say</h1>
        <h2>Here are some honest reviews from people who enjoy our services</h2>
      </div>
      <div className="review-container">
        <div className="review-card">
            <div > 
            <img src={testimonials[currentIndex].avatar} alt="iconavater" className="avater" />
            </div>
            <div>
            <img src={quote} alt="quoteimg" className="quote" />
            </div>
          <p>{testimonials[currentIndex].text}</p>
          <p className="authors">- {testimonials[currentIndex].author}</p>
          <div className="button-container">
            <button className="prev-button" onClick={previousTestimonial}>{"<"}</button>
            <button className="next-button" onClick={nextTestimonial}>{">"}</button>
          </div>
        </div>
        <div className="stetoscope-container">
          <img src={stetoscopeImg} alt="Stethoscope" className="stetoscope-image" />
        </div>
      </div>
      <div className="right-svg">
        <div className="svg-layer-1">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#A7F0BA" d="M27.6,-50C39.2,-41.2,54.2,-40.6,66.7,-33.6C79.2,-26.6,89.2,-13.3,83.4,-3.3C77.7,6.7,56.3,13.4,47.6,26.9C38.8,40.4,42.7,60.6,36.9,72C31.1,83.4,15.5,86.1,2,82.7C-11.6,79.3,-23.3,69.9,-31.2,59.7C-39,49.4,-43.2,38.4,-44.7,28.3C-46.2,18.2,-45.1,9.1,-41.2,2.3C-37.3,-4.6,-30.6,-9.2,-28.3,-17.9C-26,-26.7,-28.2,-39.6,-24.2,-52.8C-20.2,-66,-10.1,-79.3,-1,-77.6C8,-75.8,16.1,-58.8,27.6,-50Z" transform="translate(100 100)" />
          </svg>
        </div>
      <div className="svg-layer-2">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" d="M27.6,-50C39.2,-41.2,54.2,-40.6,66.7,-33.6C79.2,-26.6,89.2,-13.3,83.4,-3.3C77.7,6.7,56.3,13.4,47.6,26.9C38.8,40.4,42.7,60.6,36.9,72C31.1,83.4,15.5,86.1,2,82.7C-11.6,79.3,-23.3,69.9,-31.2,59.7C-39,49.4,-43.2,38.4,-44.7,28.3C-46.2,18.2,-45.1,9.1,-41.2,2.3C-37.3,-4.6,-30.6,-9.2,-28.3,-17.9C-26,-26.7,-28.2,-39.6,-24.2,-52.8C-20.2,-66,-10.1,-79.3,-1,-77.6C8,-75.8,16.1,-58.8,27.6,-50Z" transform="translate(102 100)" />
        </svg>
       </div>
      </div>
    </div>
  );
}
export default MainSection6;