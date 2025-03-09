import React, { useState } from 'react';
import './styles/LeftSideBar.css';
import RegainLogo from './styles/src_regainimages/RegainLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faTachometerAlt, faUser, faClipboardList, faBoxOpen,
  faBell, faEnvelope, faCalendarCheck, faCog, faLifeRing,
  faShoppingCart, faTruck, faCreditCard, faBars, faAngleRight, faAngleDown, faExpand, faCompress, faMoon, faSun
} from '@fortawesome/free-solid-svg-icons';

const LeftSidebar = ({toggleDarkMode, darkMode}) => {
  console.log(darkMode);
  const [isSidebarOpen, setSidebarOpen] = useState(false);  // For full open/close
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);  // For expanding/collapsing within open state
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleExpandCollapse = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const toggleSettingsDropdown = () => {
    setSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  return (
    <>
      {/* Hamburger button for open/close */}
      <button className="hamburger" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      
      {/* Sidebar content */}
      <div className={`Leftsidebar-content ${isSidebarOpen ? 'open' : ''} ${isSidebarExpanded ? 'expanded' : 'collapsed'}  ${darkMode ? 'dark' : ''}`}>
        
        <div className="Leftsidebarlogocontent">
          {isSidebarExpanded && <img src={RegainLogo} alt="Logo" className="leftsidebarlogo" />}
        </div>

        {/* Expand/Collapse button */}
        
          <button className="expand-collapse-btn" onClick={toggleExpandCollapse}>
            <FontAwesomeIcon icon={isSidebarExpanded ? faCompress : faExpand} />
          </button>
        
        
        {/* Navigation links */}
        <nav className="leftsidebar-nav">
          <ul>
            <li><a href="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} className="icon-spacing" /> {isSidebarExpanded && "Dashboard"}</a></li>
            <li><a href="/dashboard/profile"><FontAwesomeIcon icon={faUser} className="icon-spacing" /> {isSidebarExpanded && "Profile"}</a></li>
            <li><a href="/dashboard/orders"><FontAwesomeIcon icon={faClipboardList} className="icon-spacing" /> {isSidebarExpanded && "Orders"}</a></li>
            <li><a href="/dashboard/Products"><FontAwesomeIcon icon={faBoxOpen} className="icon-spacing" /> {isSidebarExpanded && "Products"}</a></li>
            <li><a href="/dashboard/notification"><FontAwesomeIcon icon={faBell} className="icon-spacing" /> {isSidebarExpanded && "Notification"}</a></li>
            <li><a href="/dashboard/messages"><FontAwesomeIcon icon={faEnvelope} className="icon-spacing" /> {isSidebarExpanded && "Messages"}</a></li>
            <li><a href="/dashboard/appointments"><FontAwesomeIcon icon={faCalendarCheck} className="icon-spacing" /> {isSidebarExpanded && "Appointments"}</a></li>
            <li><a href="/dashboard/cart"><FontAwesomeIcon icon={faShoppingCart} className="icon-spacing" /> {isSidebarExpanded && "Cart"}</a></li>
            <li><a href="/dashboard/delivery-tracking"><FontAwesomeIcon icon={faTruck} className="icon-spacing" /> {isSidebarExpanded && "Delivery Tracking"}</a></li>
            <li><a href="/dashboard/payments"><FontAwesomeIcon icon={faCreditCard} className="icon-spacing" /> {isSidebarExpanded && "Payments"}</a></li>
            
            {/* Settings dropdown */}
            <li onClick={toggleSettingsDropdown} className="dropdown">
              <a href="#settings">
                <FontAwesomeIcon icon={faCog} className="icon-spacing" /> {isSidebarExpanded && "Settings"}
                {isSidebarExpanded && <FontAwesomeIcon icon={isSettingsDropdownOpen ? faAngleDown : faAngleRight} className="icon-spacing" />}
              </a>
              {isSidebarExpanded && isSettingsDropdownOpen && (
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard/account-settings">Account Settings</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/settings/general">General</Link>
                  </li>
                </ul>
              )}
            </li>

            <li><a href="/dashboard/support"><FontAwesomeIcon icon={faLifeRing} className="icon-spacing" /> {isSidebarExpanded && "Support"}</a></li>
            <li classname="p-2">
              {/* ✅ Dark Mode Toggle Button */}
              {/* Dark Mode Toggle */}
              <div className="dark-mode-toggle" onClick={toggleDarkMode}>
                <div className={`toggle-slider ${darkMode ? "dark" : "light"}`}>
                <div className="toggle-circle">
                  <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </div>
               </div>
             </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default LeftSidebar;
