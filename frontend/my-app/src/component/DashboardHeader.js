import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './styles/DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="topitems">
      <div className="welcome-section">
        <h2>Welcome, Username</h2>
        <p>Here are your important updates and alerts</p>
      </div>
      <div className="header-right">
        <button className="cart-button">
          <FontAwesomeIcon icon={faShoppingCart}  />
        </button>
        <button className="notification-button">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <div className="profile-menu">
          <FontAwesomeIcon icon={faUser} className="dbusericon" />
          <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          <div className="profile-dropdown">
            <a href="/profile">View Profile</a>
            <a href="/settings">Settings</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
        </div>
        </div>
      <div className="header-main">
      <div className="search-section">
        <input type="search" placeholder="Search products..." className="search-input" />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
      </div>
     
      </div>
    </header>
  );
};

export default DashboardHeader;

