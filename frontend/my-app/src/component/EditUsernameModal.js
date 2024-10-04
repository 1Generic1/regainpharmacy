import React, { useState } from 'react';
import axios from 'axios';
import './styles/EditUsernameModal.css'; 

const EditUsernameModal = ({ onClose, user, updateUserData }) => {
  const [userName, setuserName] = useState(user.userName);// Pre-fill current username
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (e) => {
    setuserName(e.target.value);
      setErrorMessage('');  // Clear the error message when typing
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the input
    if (!userName) {
      setErrorMessage('Username cannot be empty');
      return;
    }

    try {
      // Assuming you have a backend API endpoint to update the username
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3001/api/users/edit-profile', 
        {userName},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      updateUserData(response.data);

      setSuccessMessage('Username updated successfully!');

      // Close the modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000)
      
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Error updating username');
    }
  };

  return (
    <div className="edit-username-modal">
      <div className="username-content">
        <h2>Edit Username</h2>
        <form onSubmit={handleSubmit}>
          <div className="pim-input-group">
            <label>New Username</label>
            <input 
              type="text" 
              value={userName}
              onChange={handleUsernameChange}
              className={errorMessage ? 'input-error' : ''}
            />
          </div>
          
          {/* Display error message */}
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

export default EditUsernameModal;

