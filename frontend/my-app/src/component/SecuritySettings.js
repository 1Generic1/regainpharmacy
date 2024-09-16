import React from 'react';
import './styles/SecuritySettings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const SecuritySettings = () => {
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
                <p>user@gmail.com</p>
              </div>
              <div className="s-info-action">
                <button className="s-edit-btn">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </div>
            </div>

            {/* Username Row */}
            <div className="s-info-row">
              <div className="s-info-item">
                <label>Username</label>
                <p>Changes will modify and update your username</p>
              </div>
              <div className="s-info-value">
                <p>@username</p>
              </div>
              <div className="s-info-action">
                <button className="s-edit-btn">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
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
                <button className="s-edit-btn">
                  <FontAwesomeIcon icon={faEdit} /> Change Password
                </button>
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
