import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🩸</span>
          <span className="brand-text">BDCMS</span>
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              
              {user?.role === 'donor' && (
                <>
                  <Link to="/camps" className="nav-link">
                    Camps
                  </Link>
                  <Link to="/requests" className="nav-link">
                    Blood Requests
                  </Link>
                  <Link to="/donor/profile" className="nav-link">
                    My Profile
                  </Link>
                </>
              )}

              {(user?.role === 'organizer' || user?.role === 'admin') && (
                <>
                  <Link to="/camps" className="nav-link">
                    Manage Camps
                  </Link>
                  <Link to="/requests" className="nav-link">
                    Manage Requests
                  </Link>
                  <Link to="/donations/quick" className="nav-link">
                    Quick Donation
                  </Link>
                  <Link to="/donors" className="nav-link">
                    Donors
                  </Link>
                  <Link to="/inventory" className="nav-link">
                    Inventory
                  </Link>
                </>
              )}

              {user?.role === 'admin' && (
                <>
                  <Link to="/analytics" className="nav-link">
                    Analytics
                  </Link>
                  <Link to="/reports" className="nav-link">
                    Reports
                  </Link>
                </>
              )}

              <div className="nav-user">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">{user?.role}</span>
              </div>

              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
