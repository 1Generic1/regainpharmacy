import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './styles/Success.css'


const Success = () => {
  return (
    <div className="success-page">
      <div className="success-container">
        <div className="icon-section">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <h2>Success</h2>
        </div>
        <div className="message-section">
          <p>Congratulations, your account has been successfully created.</p>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
