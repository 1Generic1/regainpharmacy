import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import RegainLogo from './styles/src_regainimages/RegainLogo.png';


function Header() {
  return (
    <header className="App-header">
      <div className="header-container">
        <img src={RegainLogo} className="App-logo" alt="Regian Pharmacy Logo" />
        <nav className="header-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Products/Services">Products/Services</Link></li>
            <li><Link to="/FAQs">FAQs</Link></li>
            <li><Link to="/Aboutus">About us</Link></li>
          </ul>
        </nav>
        <div className="access">
          <Link to="/signup" className="access-button signup-button">Sign Up</Link>
          <Link to="/login" className="access-button login-button">Login</Link>
        </div>
      </div>
    </header>
  );
}


export default Header;
