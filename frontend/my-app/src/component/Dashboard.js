import React from 'react';
import LeftSidebar from './LeftSideBar';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';
import './styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <LeftSidebar />
      <div className="main-content">
        <DashboardHeader />
        <DashboardContent />
      </div>
    </div>
  );
}

export default Dashboard;

