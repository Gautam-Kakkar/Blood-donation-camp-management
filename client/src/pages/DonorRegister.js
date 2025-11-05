import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { donorAPI } from '../services/api';
import './Donor.css';

const DonorRegister = () => {
  const [formData, setFormData] = useState({
    bloodGroup: 'O+',
    dateOfBirth: '',
    gender: 'Male',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
    },
    healthInfo: {
      weight: '',
      height: '',
      hemoglobin: '',
      bloodPressure: {
        systolic: '',
        diastolic: '',
      },
      medicalConditions: '',
      medications: '',
      allergies: '',
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child, subchild] = name.split('.');
      if (subchild) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [subchild]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const submitData = {
      ...formData,
      healthInfo: {
        ...formData.healthInfo,
        weight: parseFloat(formData.healthInfo.weight),
        height: parseFloat(formData.healthInfo.height) || undefined,
        hemoglobin: parseFloat(formData.healthInfo.hemoglobin) || undefined,
        bloodPressure: {
          systolic: parseInt(formData.healthInfo.bloodPressure.systolic) || undefined,
          diastolic: parseInt(formData.healthInfo.bloodPressure.diastolic) || undefined,
        },
        medicalConditions: formData.healthInfo.medicalConditions ? 
          formData.healthInfo.medicalConditions.split(',').map(s => s.trim()) : [],
        medications: formData.healthInfo.medications ? 
          formData.healthInfo.medications.split(',').map(s => s.trim()) : [],
        allergies: formData.healthInfo.allergies ? 
          formData.healthInfo.allergies.split(',').map(s => s.trim()) : [],
      },
    };

    try {
      await donorAPI.register(submitData);
      navigate('/donor/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create donor profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Create Donor Profile</h1>
          <p className="page-subtitle">Complete your profile to start donating blood</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="donor-form">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Basic Information</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Blood Group *</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Address</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Health Information</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Weight (kg) * (min: 45kg)</label>
                <input
                  type="number"
                  name="healthInfo.weight"
                  value={formData.healthInfo.weight}
                  onChange={handleChange}
                  className="form-input"
                  min="45"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  name="healthInfo.height"
                  value={formData.healthInfo.height}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hemoglobin (g/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="healthInfo.hemoglobin"
                  value={formData.healthInfo.hemoglobin}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Blood Pressure (Systolic)</label>
                <input
                  type="number"
                  name="healthInfo.bloodPressure.systolic"
                  value={formData.healthInfo.bloodPressure.systolic}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="120"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Blood Pressure (Diastolic)</label>
                <input
                  type="number"
                  name="healthInfo.bloodPressure.diastolic"
                  value={formData.healthInfo.bloodPressure.diastolic}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="80"
                />
              </div>

              <div className="form-group form-full">
                <label className="form-label">Medical Conditions (comma-separated)</label>
                <input
                  type="text"
                  name="healthInfo.medicalConditions"
                  value={formData.healthInfo.medicalConditions}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Diabetes, Hypertension"
                />
              </div>

              <div className="form-group form-full">
                <label className="form-label">Current Medications (comma-separated)</label>
                <input
                  type="text"
                  name="healthInfo.medications"
                  value={formData.healthInfo.medications}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Aspirin, Metformin"
                />
              </div>

              <div className="form-group form-full">
                <label className="form-label">Allergies (comma-separated)</label>
                <input
                  type="text"
                  name="healthInfo.allergies"
                  value={formData.healthInfo.allergies}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Penicillin, Peanuts"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Emergency Contact</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input
                  type="tel"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Relationship</label>
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Spouse, Parent"
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
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorRegister;
