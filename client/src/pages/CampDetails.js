import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { campAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './CampDetails.css';

const CampDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCampDetails();
  }, [id]);

  const fetchCampDetails = async () => {
    try {
      const response = await campAPI.getById(id);
      setCamp(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load camp details');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (donorId, attended) => {
    try {
      await campAPI.markAttendance(id, donorId, { attended });
      alert('Attendance marked successfully!');
      fetchCampDetails();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to mark attendance');
    }
  };

  const handleMarkDonation = async (donorId) => {
    const units = prompt('Enter units collected (default: 1):', '1');
    if (!units) return;

    try {
      await campAPI.markAttendance(id, donorId, {
        attended: true,
        donated: true,
        unitsCollected: parseFloat(units),
      });
      alert('Donation marked successfully!');
      fetchCampDetails();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to mark donation');
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!camp) return null;

  const isOrganizer = user?.role === 'organizer' || user?.role === 'admin';
  const canManage = isOrganizer && camp.organizerId._id === user?._id || user?.role === 'admin';

  return (
    <div className="page-container">
      <div className="container">
        <div className="camp-details-header">
          <div>
            <h1 className="page-title">{camp.name}</h1>
            <span className={`badge badge-${
              camp.status === 'upcoming' ? 'success' :
              camp.status === 'ongoing' ? 'info' :
              camp.status === 'completed' ? 'warning' : 'danger'
            }`}>
              {camp.status}
            </span>
          </div>
        </div>

        <div className="camp-details-grid">
          <div className="details-card">
            <h2 className="section-heading">Camp Information</h2>
            <div className="details-info">
              <p><strong>Description:</strong> {camp.description}</p>
              <p><strong>Date:</strong> {new Date(camp.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {camp.startTime} - {camp.endTime}</p>
              <p><strong>Capacity:</strong> {camp.registeredDonors.length} / {camp.capacity}</p>
              <p><strong>Total Units Collected:</strong> {camp.totalUnitsCollected}</p>
              <p><strong>Organizer:</strong> {camp.organizerId.name}</p>
            </div>
          </div>

          <div className="details-card">
            <h2 className="section-heading">Location</h2>
            <div className="details-info">
              <p><strong>Venue:</strong> {camp.location.venueName}</p>
              <p><strong>Address:</strong> {camp.location.address}</p>
              <p><strong>City:</strong> {camp.location.city}</p>
              <p><strong>State:</strong> {camp.location.state}</p>
              {camp.location.zipCode && <p><strong>Zip:</strong> {camp.location.zipCode}</p>}
              {camp.location.landmark && <p><strong>Landmark:</strong> {camp.location.landmark}</p>}
            </div>
          </div>

          <div className="details-card">
            <h2 className="section-heading">Contact Information</h2>
            <div className="details-info">
              <p><strong>Phone:</strong> {camp.contactInfo.phone}</p>
              {camp.contactInfo.email && <p><strong>Email:</strong> {camp.contactInfo.email}</p>}
              {camp.contactInfo.coordinatorName && (
                <p><strong>Coordinator:</strong> {camp.contactInfo.coordinatorName}</p>
              )}
            </div>
          </div>
        </div>

        <div className="registered-donors-section">
          <div className="section-header">
            <h2 className="section-heading">Registered Donors ({camp.registeredDonors.length})</h2>
          </div>

          {camp.registeredDonors.length === 0 ? (
            <div className="card text-center">
              <p className="text-gray">No donors registered yet</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Donor Name</th>
                    <th>Blood Group</th>
                    <th>Contact</th>
                    <th>Registered At</th>
                    <th>Attended</th>
                    <th>Donated</th>
                    <th>Units</th>
                    {canManage && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {camp.registeredDonors.map((registration) => (
                    <tr key={registration._id}>
                      <td>{registration.donorId?.userId?.name || 'N/A'}</td>
                      <td>
                        <span className="blood-group-badge">
                          {registration.donorId?.bloodGroup || 'N/A'}
                        </span>
                      </td>
                      <td>{registration.donorId?.userId?.phone || 'N/A'}</td>
                      <td>{new Date(registration.registeredAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${registration.attended ? 'badge-success' : 'badge-warning'}`}>
                          {registration.attended ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${registration.donated ? 'badge-success' : 'badge-danger'}`}>
                          {registration.donated ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>{registration.unitsCollected || 0}</td>
                      {canManage && (
                        <td>
                          <div className="action-buttons">
                            {!registration.attended && (
                              <button
                                onClick={() => handleMarkAttendance(registration.donorId._id, true)}
                                className="btn-small btn-success"
                              >
                                Mark Present
                              </button>
                            )}
                            {registration.attended && !registration.donated && (
                              <button
                                onClick={() => handleMarkDonation(registration.donorId._id)}
                                className="btn-small btn-primary"
                              >
                                Mark Donated
                              </button>
                            )}
                            {registration.donated && (
                              <span className="text-gray">✓ Complete</span>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
