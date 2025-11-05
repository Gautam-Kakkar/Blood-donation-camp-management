import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { campAPI, requestAPI, donorAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    upcomingCamps: 0,
    urgentRequests: 0,
    myCamps: 0,
    donorProfile: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const [upcomingRes, urgentRes] = await Promise.all([
        campAPI.getUpcoming({ limit: 5 }),
        requestAPI.getUrgent({ limit: 5 }),
      ]);

      const newStats = {
        upcomingCamps: upcomingRes.data.data.length,
        urgentRequests: urgentRes.data.data.length,
      };

      if (user.role === 'donor') {
        try {
          const myCampsRes = await campAPI.getMyCamps();
          const donorRes = await donorAPI.getMyProfile();
          newStats.myCamps = myCampsRes.data.data.length;
          newStats.donorProfile = donorRes.data.data;
        } catch (err) {
          // Donor profile not found - this is ok for new users
          newStats.myCamps = 0;
          newStats.donorProfile = null;
        }
      }

      setStats(newStats);
    } catch (error) {
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="page-container">
      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
          <button 
            onClick={fetchDashboardData} 
            className="btn btn-sm btn-outline-light ml-3"
          >
            Retry
          </button>
        </div>
      )}
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Welcome, {user?.name}!</h1>
          <p className="page-subtitle">
            {user?.role === 'donor' && 'Thank you for being a life saver'}
            {user?.role === 'organizer' && 'Manage camps and help save lives'}
            {user?.role === 'admin' && 'System administration dashboard'}
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card stat-card-red">
            <div className="stat-icon">🩸</div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.upcomingCamps}</h3>
              <p className="stat-label">Upcoming Camps</p>
            </div>
            <Link to="/camps" className="stat-link">
              View All →
            </Link>
          </div>

          <div className="stat-card stat-card-white">
            <div className="stat-icon">🚨</div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.urgentRequests}</h3>
              <p className="stat-label">Urgent Requests</p>
            </div>
            <Link to="/requests" className="stat-link">
              View All →
            </Link>
          </div>

          {user?.role === 'donor' && (
            <div className="stat-card stat-card-white">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.myCamps}</h3>
                <p className="stat-label">My Registrations</p>
              </div>
              <Link to="/camps/my-camps" className="stat-link">
                View All →
              </Link>
            </div>
          )}

          {user?.role === 'donor' && stats.donorProfile && (
            <div className="stat-card stat-card-red">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3 className="stat-number">
                  {stats.donorProfile.isEligible ? 'Eligible' : 'Not Eligible'}
                </h3>
                <p className="stat-label">Donation Status</p>
              </div>
              <Link to="/donor/profile" className="stat-link">
                View Profile →
              </Link>
            </div>
          )}
        </div>

        {user?.role === 'donor' && !stats.donorProfile && (
          <div className="alert alert-info mt-3">
            <h3>Complete Your Donor Profile</h3>
            <p>
              You haven't created your donor profile yet. Create one to register
              for camps and donate blood.
            </p>
            <Link to="/donor/register" className="btn btn-primary mt-2">
              Create Donor Profile
            </Link>
          </div>
        )}

        <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            {(user?.role === 'organizer' || user?.role === 'admin') && (
              <>
                <Link to="/camps/create" className="action-card">
                  <div className="action-icon">➕</div>
                  <h3>Create Camp</h3>
                  <p>Schedule a new blood donation camp</p>
                </Link>

                <Link to="/donations/quick" className="action-card">
                  <div className="action-icon">🩸</div>
                  <h3>Quick Donation</h3>
                  <p>Record walk-in donor without account</p>
                </Link>

                <Link to="/donors" className="action-card">
                  <div className="action-icon">👥</div>
                  <h3>View Donors</h3>
                  <p>Browse all registered donors</p>
                </Link>
              </>
            )}

            {user?.role === 'donor' && (
              <>
                <Link to="/camps" className="action-card">
                  <div className="action-icon">🏕️</div>
                  <h3>Browse Camps</h3>
                  <p>Find and register for blood camps</p>
                </Link>

                <Link to="/requests" className="action-card">
                  <div className="action-icon">🆘</div>
                  <h3>Blood Requests</h3>
                  <p>View urgent blood requirements</p>
                </Link>
              </>
            )}

            <Link to="/requests/create" className="action-card">
              <div className="action-icon">📝</div>
              <h3>Create Request</h3>
              <p>Request blood for a patient</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
