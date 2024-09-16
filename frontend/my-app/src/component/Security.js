import React from 'react';

const Security = () => {
  return (
    <div className="security-section">
      <h3>Security Settings</h3>
      <form>
        <div>
          <label>Change Username</label>
          <input type="text" placeholder="Enter new username" />
        </div>
        <div>
          <label>Change Email</label>
          <input type="email" placeholder="Enter new email" />
        </div>
        <div>
          <label>Change Password</label>
          <input type="password" placeholder="Enter new password" />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Security;

