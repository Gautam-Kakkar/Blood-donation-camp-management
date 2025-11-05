import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestAPI } from '../services/api';
import './List.css';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getAll({ limit: 50 });
      setRequests(response.data.data.requests);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Blood Requests</h1>
          <p className="page-subtitle">Help save lives by responding to blood requests</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="list-grid">
          {requests.map((request) => (
            <div key={request._id} className="list-card">
              <div className="card-badge">
                <span className={`badge badge-${
                  request.urgency === 'critical' ? 'danger' :
                  request.urgency === 'high' ? 'warning' :
                  request.urgency === 'medium' ? 'info' : 'success'
                }`}>
                  {request.urgency} priority
                </span>
                <span className={`badge badge-${
                  request.status === 'pending' ? 'warning' :
                  request.status === 'fulfilled' ? 'success' : 'info'
                }`}>
                  {request.status}
                </span>
              </div>

              <h3 className="card-title">Patient: {request.patientName}</h3>
              <p className="card-description">{request.reason}</p>

              <div className="card-info">
                <div className="info-row">
                  <span className="info-icon">🩸</span>
                  <span className="blood-group">{request.bloodGroup}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">💉</span>
                  <span>{request.unitsRequired} units needed</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">🏥</span>
                  <span>{request.hospital.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📍</span>
                  <span>{request.hospital.city}, {request.hospital.state}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📞</span>
                  <span>{request.contactInfo.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">⏰</span>
                  <span>Required by: {new Date(request.requiredBy).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="progress-info mt-2">
                <div className="progress-text">
                  {request.unitsFulfilled} / {request.unitsRequired} units fulfilled
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(request.unitsFulfilled / request.unitsRequired) * 100}%`
                    }}
                  />
                </div>
              </div>

              <Link to={`/requests/${request._id}`} className="btn btn-outline btn-full mt-2">
                View Details & Manage
              </Link>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="card text-center">
            <p className="text-gray">No blood requests at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestList;
