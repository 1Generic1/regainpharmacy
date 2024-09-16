import React from 'react';
import './styles/DashboardContent.css';

const DashboardContent = () => {
  return (
    <div className="dashboard-content">
       <div className="top-section">
          <div className="collections">
            <h2>Collections</h2>
            {/* Add product components here */}
          </div>
          <div className="messages">
            <h2>Messages</h2>
            {/* Add message components here */}
          </div>
        </div>

      {/* Health Chart, Tips & Appointments Section */}
      <div className="section health-overview">
        <div className="health-chart">
          <h2>Health Chart</h2>
          {/* Chart component */}
        </div>
        <div className="health-tips">
          <h2>Health Tips</h2>
          {/* Tips component */}
        </div>
        <div className="appointments">
          <h2>Appointments</h2>
          {/* Appointments list */}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="section recent-orders">
        <h2>Recent Orders</h2>
        <div className="orders-list">
          {/* Map through recent orders */}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
