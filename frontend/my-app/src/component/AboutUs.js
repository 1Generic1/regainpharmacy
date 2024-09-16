import React from 'react';
import './styles/AboutUs.css';
import team1 from './styles/src_regainimages/team1.jpg';

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Learn more about our mission, values, and team.</p>
      </div>
      <div className="about-content">
        <section className="our-mission">
          <h2>Our Mission</h2>
          <p>Our mission is to provide quality medication and excellent customer service...</p>
        </section>
        <section className="our-values">
          <h2>Our Values</h2>
          <ul>
            <li>Integrity</li>
            <li>Customer Focus</li>
            <li>Innovation</li>
            <li>Respect</li>
          </ul>
        </section>
        <section className="our-team">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src={team1} alt="Team Member 1" />
              <h3>John Doe</h3>
              <p>CEO</p>
            </div>
            <div className="team-member">
              <img src="/styles/src_regainimages/tools.jpg" alt="Team Member 2" />
              <h3>Jane Smith</h3>
              <p>Head Pharmacist</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;

