import React, { useState } from 'react';
import axios from 'axios';
import './styles/ChangePasswordModal.css';

const ChangePasswordModal = ({ onClose, updateUserData }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle current password input change
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    setErrorMessage('');  // Clear error message when typing
  };

  // Handle new password input change
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setErrorMessage('');  // Clear error message when typing
  };

  // Handle confirm new password input change
  const handleConfirmNewPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage('');  // Clear error message when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3001/api/users/edit-profile', 
        { currentPassword, newPassword },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        updateUserData(); // Optionally, you can refresh user data here
        setSuccessMessage('Password successfully changed');

        // Close the modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000)
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Error changing password');
    }
  };

  return (
    <div className="change-password-modal">
      <div className="password-content">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="pim-input-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className={errorMessage ? 'input-error' : ''}
            />
          </div>
          <div className="pim-input-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className={errorMessage ? 'input-error' : ''}
            />
          </div>
          <div className="pim-input-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmNewPasswordChange}
              className={errorMessage ? 'input-error' : ''}
            />
          </div>

          {errorMessage && <p className="pim-error-message">{errorMessage}</p>}
          {successMessage && <p className="pim-success-message">{successMessage}</p>}
          <div className="personalinfo-buttons">
            <button type="submit" className="pim-save-btn">Change Password</button>
            <button type="button" className="pim-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

