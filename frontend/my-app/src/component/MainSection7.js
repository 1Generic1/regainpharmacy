import React, { useEffect, useState } from 'react';
import './styles/MainSection7.css';


function MainSection7() {
  const [happyClients, setHappyClients] = useState(0);
  const [successfulDeliveries, setSuccessfulDeliveries] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [serviceYears, setServiceYears] = useState(0);
  
  useEffect(() => {
    const targetClients = 1500;
    const targetDeliveries = 3000;
    const targetOrders = 5000;
    const targetYears = 4;

    const clientSpeed = -800; 
    const deliverySpeed = -4000;
    const orderSpeed = -1000;
    const yearSpeed = 20;
   

    const increment = (setState, target, incrementSpeed) => {
        const interval = setInterval(() => {
          setState((prev) => {
            if (prev < target) {
              return prev + 1;
            } else {
              clearInterval(interval);
              return target;
            }
          });
        }, incrementSpeed);
      };
  
      increment(setHappyClients, targetClients, clientSpeed);
      increment(setSuccessfulDeliveries, targetDeliveries, deliverySpeed);
      increment(setTotalOrders, targetOrders, orderSpeed);
      increment(setServiceYears, targetYears, yearSpeed);
    }, []);

  return (
    <div className="main-section-7">
    <div className="stats-container"> 
      <div className="stat">
        <p>{happyClients}</p>
        <h2>Happy Clients</h2>
      </div>
      <div className="stat">
        <p>{successfulDeliveries}</p>
        <h2>Successful Deliveries</h2>
      </div>
      <div className="stat">
        <p>{totalOrders}</p>
        <h2>Total Orders</h2>
      </div>
      <div className="stat">
        <p>{serviceYears}</p>
        <h2>Years of Service</h2>
      </div>
    </div>
  </div>
  );
}

export default MainSection7;