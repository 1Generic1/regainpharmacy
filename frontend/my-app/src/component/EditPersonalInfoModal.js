// EditPersonalInfoModal.js
import React, { useState } from 'react';
import './styles/Modal.css';
import axios from 'axios';
import './styles/EditPersonalInfoModal.css';
import Select from 'react-select';

const EditPersonalInfoModal = ({ onClose, userData, updateUserData }) => {
  // Set initial state to current user data
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    gender: userData.gender,
    bio: userData.bio
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      // Make request to update user data
      const response = await axios.put('http://localhost:3001/api/users/edit-profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update parent state with the new user data
      updateUserData(response.data);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating personal information:', error);
    }
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'I rather not say', label: 'I rather not say' }
  ];


  return (
    <div className="personalinformationmodal">
      <div className="personalinfo-content">
        <h2>Edit Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="pim-input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pim-input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pim-input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pim-input-group">
            <label>Gender</label>
            <Select
              value={genderOptions.find(option => option.value === formData.gender)}
              onChange={(selectedOption) => handleChange({ target: { name: 'gender', value: selectedOption.value } })}
              options={genderOptions}
              issearchable
              placeholder="Select Gender"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  padding: '4px',  // Adjust the padding here (top/bottom and left/right)
                  minHeight: '40px',  // Adjust the height as needed
                  borderColor: state.isFocused ? '#4CAF50' : '#ccc', // Green border when focused
                  backgroundColor: state.isFocused ? 'white' : 'white', // Keep background white
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(76, 175, 80, 0.2)' : 'none', // Green shadow on focus
                  '&:hover': {
                    borderColor: '#4CAF50', // Green border on hover
                  },
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: '5px 10px', // Padding inside the input box (affects the text and icon)
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#333', // Text color in the input
                }),
                menu: (provided) => ({
                  ...provided,
                  borderColor: '#4CAF50', // Green border for the dropdown menu
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? '#4CAF50'  // Green background for selected option
                    : state.isFocused
                    ? 'rgba(76, 175, 80, 0.1)'  // Light green background on hover
                    : 'white',  // White background for non-hovered options
                  color: state.isSelected ? 'white' : '#333', // Text color for selected vs non-selected
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.2)', // Slightly darker green hover effect
                  },
                }),
              }}
            />
          </div>
          <div className="pim-input-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself"
            />
          </div>
          <div className="personalinfo-buttons">
            <button type="submit" className="pim-save-btn">Save</button>
            <button type="button" className="pim-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInfoModal;

