import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './styles/SecuritySettings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import EditEmailModal from './EditEmailModal';
import EditUsernameModal from './EditUsernameModal';
import ChangePasswordModal from './ChangePasswordModal';

const SecuritySettings = () => {

  const [user, setUser] = useState({
   email: 'N/A',
   userName: 'N/A'
  })
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
          
        // Check if the token exists
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:3001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}` 
          },
        });
        const data = response.data;
        setUser({
          email: data.email || 'N/A',
          userName: data.userName || 'N/A'
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  },[]);

  // State to control the email modal
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);

  const openEmailModal = () => setEmailModalOpen(true); // Open address modal
  const closeEmailModal = () => setEmailModalOpen(false); // Close address modal

  const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);

  const openUsernameModal = () => setUsernameModalOpen(true); // Open username modal
  const closeUsernameModal = () => setUsernameModalOpen(false); // Close username modal


  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const openPasswordModal = () => setPasswordModalOpen(true);
  const closePasswordModal = () => setPasswordModalOpen(false);

  const updateUserData = (newData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newData 
    }));
  };

  return (
    <div className="security-settings-page">
      <div className="security-settings">
        <h1>Security Settings</h1>

        <div className="security-settings-content">
          {/* Basic Security Section */}
          <div className="basic-security">
            <h3>Basics</h3>

            {/* Email Row */}
            <div className="s-info-row">
              <div className="s-info-item">
                <label>Email</label>
                <p>Manage your account's email address</p>
              </div>
              <div className="s-info-value">
                <p>{user.email}</p>
              </div>
              <div className="s-info-action">
                <button className="s-edit-btn" onClick={openEmailModal}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                {isEmailModalOpen && (
                  <Modal onClose={closeEmailModal}>
                     <EditEmailModal
                       onClose={closeEmailModal}
                       user={user}
                       updateUserData={updateUserData }
                     />
                  </Modal>
                )}
              </div>
            </div>

            {/* Username Row */}
            <div className="s-info-row">
              <div className="s-info-item">
                <label>Username</label>
                <p>Changes will modify and update your username</p>
              </div>
              <div className="s-info-value">
                <p>@{user.userName}</p>
              </div>
              <div className="s-info-action">
                <button className="s-edit-btn" onClick={openUsernameModal}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                {isUsernameModalOpen && (
                  <Modal onClose={closeUsernameModal}>
                     <EditUsernameModal
                       onClose={closeUsernameModal}
                       user={user}
                       updateUserData={updateUserData}
                     />
                  </Modal>
                )}
              </div>
            </div>

            {/* Password Row */}
            <div className="s-info-row">
              <div className="s-info-item">
                <label>Password</label>
                <p>Modify your current password</p>
              </div>
              <div className="s-info-value">
              </div>
              <div className="s-info-action">
                <button className="s-edit-btn" onClick={openPasswordModal}>
                  <FontAwesomeIcon icon={faEdit} /> Change Password
                </button>
                {isPasswordModalOpen && (
                  <Modal onClose={closePasswordModal}>
                     <ChangePasswordModal
                       onClose={closePasswordModal}
                       user={user}
                       updateUserData={updateUserData }
                     />
                  </Modal>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Security Section */}
          <div className="advance-security">
            <h3>Advanced Security</h3>

            {/* Two-Step Verification Row */}
            <div className="s-info-row">
              <div className="s-info-item">
                <label>Two-Step Verification</label>
                <p className='pp'>We recommend requiring a verification code in addition to your password</p>
              </div>
              <div className="s-info-value">
                <p>Two-step verification: Enabled</p>
              </div>
              <div className="s-info-action">
                <button className="s-edit-btn">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
