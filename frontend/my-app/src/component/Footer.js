import React, { useState, useEffect } from 'react';
import './styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };
    return (
      <footer className={`main-section-10 ${darkMode ? 'dark' : ''}`}>
        <div className="footer-blob">
            <div className="footersvg">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#729762" d="M36.6,-38.1C48.6,-33.5,60.5,-23.1,63.6,-10.4C66.8,2.2,61.2,17.2,51,24.2C40.7,31.1,25.6,30.1,14.1,30.8C2.6,31.6,-5.4,34.1,-14.1,33.3C-22.8,32.4,-32.2,28.2,-35.6,21.1C-39.1,14,-36.6,4,-39.2,-11.3C-41.7,-26.7,-49.4,-47.3,-43.7,-53C-38,-58.7,-19,-49.4,-3.4,-45.4C12.3,-41.3,24.6,-42.6,36.6,-38.1Z" transform="translate(100 100)" />
              </svg>
            </div>
        </div>
        <div className="footer-content">
          <div className="newsletter-content">
              <h2>Subscribe to our Newsletter</h2>
              <p>Stay updated with our latest news and offers. Enter your email below:</p>
              <form>
                <input type="email" placeholder="Your email" />
                <button type="submit">Subscribe</button>
              </form>
          </div>
          <div className="footer-details">
            <h2>Contact Us</h2>
            <p>Address: 123 Pharmacy St., Med City</p>
            <p>Email: info@pharmacy.com</p>
            <p>Phone: (123) 456-7890</p>
            <div className="footer-social">
              <h2>Follow Us</h2>
              <ul>
                <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x" /></a></li>
                <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x" /></a></li>
                <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></li>
                <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a></li>
              </ul>
            </div>
          </div>
          <div className="quicklink">
            <h2> Quick Links</h2>
            <ul>
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/">Products/Services</Link></li>
              <li><Link to="/#faq-section">FAQs</Link></li>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/">Blog</Link></li>
            </ul>
            <div className="darkmode-toggle">
              <button onClick={toggleDarkMode}> 
              <p>{darkMode ? 'Disable' : 'Enable'} Dark Mode</p>
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="2x" />
              </button>
            </div>
          </div>
      </div>
      <div className="footer-bottom">
          <p><a href="#privacy">Privacy</a> | <a href="#terms">Terms & Conditions</a></p>
          <p>Copyright &copy; 2024 Your Pharmacy. All rights reserved.</p>
        </div>
      </footer>
      
    );
  }
  
  export default Footer;
