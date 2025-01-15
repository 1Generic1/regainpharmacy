import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faHeart, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './styles/SubHeader.css';
import { useNavigate } from 'react-router-dom';

const SubHeader = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/dashboard/cart'); // Navigate to the cart page
  };

    return (
      <header className="sub-header">
        {/* Search Section in the Center */}
        <div className="header-main1">
          <div className="search-section1">
            <input
              type="search"
              placeholder="Search products..."
              className="search-input"
            />
            <button className="search-button1">
              <FontAwesomeIcon icon={faSearch} className="search-icon1" />
            </button>
          </div>
        </div>
  
        {/* Icons and Profile Menu on the Right */}
        <div className="header-right1">
          <button className="cart-button1" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button className="fav-button1">
          <FontAwesomeIcon icon={faHeart} />
        </button>
          <button className="notification-button1">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <div className="profile-menu1">
            <FontAwesomeIcon icon={faUser} className="dbusericon1" />
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon1" />
            <div className="profile-dropdown1">
              <a href="/profile">View Profile</a>
              <a href="/settings">Settings</a>
              <a href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  export default SubHeader;

