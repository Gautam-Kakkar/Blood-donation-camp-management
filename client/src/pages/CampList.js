import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { campAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './List.css';

const CampList = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const response = await campAPI.getAll({ limit: 50 });
      setCamps(response.data.data.camps);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load camps');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (campId) => {
    try {
      await campAPI.register(campId);
      alert('Successfully registered for camp!');
      fetchCamps();
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Blood Donation Camps</h1>
          <p className="page-subtitle">Find and register for blood donation camps near you</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="list-grid">
          {camps.map((camp) => (
            <div key={camp._id} className="list-card">
              <div className="card-badge">
                <span className={`badge badge-${
                  camp.status === 'upcoming' ? 'success' :
                  camp.status === 'ongoing' ? 'info' :
                  camp.status === 'completed' ? 'warning' : 'danger'
                }`}>
                  {camp.status}
                </span>
              </div>

              <h3 className="card-title">{camp.name}</h3>
              <p className="card-description">{camp.description}</p>

              <div className="card-info">
                <div className="info-row">
                  <span className="info-icon">📅</span>
                  <span>{new Date(camp.date).toLocaleDateString()}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">⏰</span>
                  <span>{camp.startTime} - {camp.endTime}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📍</span>
                  <span>{camp.location.city}, {camp.location.state}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">👥</span>
                  <span>{camp.registeredDonors.length} / {camp.capacity} registered</span>
                </div>
              </div>

              <div className="card-actions mt-2">
                <Link to={`/camps/${camp._id}`} className="btn btn-outline btn-full">
                  View Details
                </Link>
                {user?.role === 'donor' && camp.status === 'upcoming' && (
                  <button
                    onClick={() => handleRegister(camp._id)}
                    className="btn btn-primary btn-full"
                  >
                    Register for Camp
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {camps.length === 0 && (
          <div className="card text-center">
            <p className="text-gray">No camps available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampList;
