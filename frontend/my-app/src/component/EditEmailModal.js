import React, { useState } from 'react';
import './styles/Modal.css';
import axios from 'axios';
import './styles/EditEmailModal.css';

const EditEmailModal = ({ onClose, user, updateUserData }) => {
    const [email, setEmail] = useState(user.email);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input change
    const handleChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');  // Clear the error message when typing
    };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the input
    if (!email) {
        setErrorMessage('email cannot be empty');
        return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      // Make request to update the email
      const response = await axios.put('http://localhost:3001/api/users/edit-profile', { email }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update parent state with the new email data
      updateUserData({ email: response.data.email });

      // Set success message
      setSuccessMessage('Email updated successfully!');

      // Close the modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000)  
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg);  // Display server-side error
        // alert(error.response.data.msg);
      } else {
        setErrorMessage('An error occurred while updating the email.');
      }
    }
  };

  return (
    <div className="editemailinformation">
      <div className="editemail-content">
        <h2>Edit Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="pim-input-group">
            <label>New Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className={errorMessage ? 'input-error' : ''}
            />
          </div>
          {errorMessage && <p className="pim-error-message">{errorMessage}</p>}
          {successMessage && <p className="pim-success-message">{successMessage}</p>}
          <div className="personalinfo-buttons">
            <button type="submit" className="pim-save-btn">Save</button>
            <button type="button" className="pim-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmailModal;

