import React, { useState } from 'react';
import './styles/AccountSettings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashAlt, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import AccProfile from './Profile1';
import SecuritySettings from './SecuritySettings';

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="account-page">
      <div className='account-settings-content'>
        <h1>Account Settings</h1>
        <div className='account-content-container'>
          <div className='acc-sidebar-content'>
            <div className='inline-style'>
              <button className='inline-profile' onClick={() => setActiveSection('profile')}>
              <FontAwesomeIcon icon={faUserEdit} className="acc-icon-spacing" />
                Profile
              </button>
            </div>
            <div className='inline-style'>
              <button onClick={() => setActiveSection('security')}>
              <FontAwesomeIcon icon={faShieldAlt} className="acc-icon-spacing" />
                Security
              </button>
            </div>
            <div className='inline-style delete-account-button'>
              <button className='delete-account' onClick={() => setActiveSection('deleteAccount')}>
              <FontAwesomeIcon icon={faTrashAlt} className="acc-icon-spacing" />
                Delete account
              </button>
            </div>
          </div>

          <div className='acc-content-section'>
            {activeSection === 'profile' && (
              <div className='acc-profile-section'>
                <AccProfile />
              </div>
            )}

            {activeSection === 'security' && (
              <div className='acc-security-section'>
                <SecuritySettings />
              </div>
            )}

            {activeSection === 'deleteAccount' && (
              <div className='acc-delete-account-section'>
                <h2>Delete Account</h2>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <p style={{ color: 'red' }}>Please contact the support team to terminate account</p>
                {/* Add any further confirmation logic or content */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;

