import React from 'react';
import LeftSidebar from './LeftSideBar';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';
import './styles/Dashboard.css';

const Dashboard = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

   // Check if we are on the main dashboard route (exact match with "/dashboard")
   const isMainDashboard = location.pathname === '/dashboard';

  return (
    <div className="dashboard-container">
      <LeftSidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <div className="main-content">
         {/* Conditionally render DashboardHeader and DashboardContent only on the main dashboard route */}
         {isMainDashboard ? (
          <>
            <DashboardHeader />
            <DashboardContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

