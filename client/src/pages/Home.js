import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-icon">🩸</span>
              Blood Donation Camp Management System
            </h1>
            <p className="hero-subtitle">
              Join us in saving lives. Donate blood, register for camps, and make a difference.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose BDCMS?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏕️</div>
              <h3>Find Camps</h3>
              <p>Discover blood donation camps near you and register easily</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚨</div>
              <h3>Urgent Requests</h3>
              <p>View and respond to urgent blood requirements from hospitals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Donations</h3>
              <p>Keep track of your donation history and eligibility status</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Eligibility Check</h3>
              <p>Automatically checks your eligibility based on 90-day rule</p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-box">
              <h3 className="stat-number">1000+</h3>
              <p className="stat-label">Registered Donors</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Camps Organized</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Lives Saved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
