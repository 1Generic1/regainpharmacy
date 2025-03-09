import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faHeart, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './styles/SubHeader.css';
import { useNavigate } from 'react-router-dom';
import API from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const SubHeader = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/dashboard/cart'); // Navigate to the cart page
  };

  const fetchCartItems = async () => {
    try {
      const response = await API.get("/cart/cart");
      setCartItems(response.data.items); // Update cart state
    } catch (error) {
      console.error("Error fetching cart items:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in.");
      } else {
        toast.error("Failed to fetch cart items. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems(); // Fetch cart items on mount
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchCartItems, 5000); // Poll every 10 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

    return (
      <>
        <ToastContainer />
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
          <div className="cart-icon-container">
            <button className="cart-button1" onClick={handleCartClick}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
             )}
            </button>
          </div>
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
      </>
    );
  };
  
  export default SubHeader;

