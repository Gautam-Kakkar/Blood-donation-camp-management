import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { campAPI } from '../services/api';
import './Donor.css';

const CampCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: {
      venueName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      landmark: '',
    },
    capacity: '',
    requirements: {
      bloodGroups: [],
      targetUnits: '',
    },
    contactInfo: {
      phone: '',
      email: '',
      coordinatorName: '',
    },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBloodGroupChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        bloodGroups: options
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const submitData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      requirements: {
        ...formData.requirements,
        targetUnits: parseInt(formData.requirements.targetUnits) || undefined,
      },
    };

    try {
      await campAPI.create(submitData);
      alert('Camp created successfully!');
      navigate('/camps');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create camp');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Create Blood Donation Camp</h1>
          <p className="page-subtitle">Schedule a new blood donation camp</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="donor-form">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Camp Details</h2>
            </div>

            <div className="form-grid">
              <div className="form-group form-full">
                <label className="form-label">Camp Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group form-full">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Capacity *</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Location</h2>
            </div>

            <div className="form-grid">
              <div className="form-group form-full">
                <label className="form-label">Venue Name *</label>
                <input
                  type="text"
                  name="location.venueName"
                  value={formData.location.venueName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group form-full">
                <label className="form-label">Address *</label>
                <input
                  type="text"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  name="location.zipCode"
                  value={formData.location.zipCode}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Landmark</label>
                <input
                  type="text"
                  name="location.landmark"
                  value={formData.location.landmark}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Contact Information</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  name="contactInfo.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Coordinator Name</label>
                <input
                  type="text"
                  name="contactInfo.coordinatorName"
                  value={formData.contactInfo.coordinatorName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating Camp...' : 'Create Camp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampCreate;
