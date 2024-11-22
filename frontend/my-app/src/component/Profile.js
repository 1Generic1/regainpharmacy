import React, {useState, useEffect } from 'react';
import LeftSidebar from './LeftSideBar'; // Assuming your Sidebar component is named Sidebar
import './styles/Profile.css';
import axios from 'axios';
import Modal from './Modal';
import EditProfilePicture from './EditProfilePicture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(''); // State to store the user's profile picture URL
  const [previewUrl, setPreviewUrl] = useState(''); // State to handle live preview


  // Open/Close Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewUrl(''); // Clear the preview URL when modal is closed
  };
  
  const [userData, setUserData] = useState({
    firstName: 'N/A',
    lastName: 'N/A',
    email: 'N/A',
    userName: 'N/A',
    phone: 'N/A',
    gender: 'N/A',
    bio: 'N/A',
    country: 'N/A',
    city: 'N/A',
    postalCode: 'N/A',
    additionalInfo: 'N/A',
  });
  
  // Fetch the current user's profile data including the profile picture URL
  useEffect(() => {
    const fetchUserProfile = async () => {
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
        setProfilePictureUrl(`http://localhost:3001/${response.data.profilePicture}`);
        const userData = response.data;
        setUserData({
          firstName: userData.firstName || 'N/A',
          lastName: userData.lastName || 'N/A',
          email: userData.email || 'N/A',
          userName: userData.userName || 'N/A',
          phone: userData.phone || 'N/A',
          gender: userData.gender || 'N/A',
          bio: userData.bio || 'N/A',
          country: userData.country || 'N/A',
          city: userData.city || 'N/A',
          postalCode: userData.postalCode || 'N/A',
          additionalInfo: userData.additionalInfo || 'N/A',
        });

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // **Define the updatePreviewUrl function** to handle preview updates
  const updatePreviewUrl = (newPreviewUrl) => {
    setPreviewUrl(newPreviewUrl); // Set live preview in parent
  };

  // Update the profile picture URL after successful upload
  const updateProfilePicture = (newProfilePictureUrl) => {
    setProfilePictureUrl(newProfilePictureUrl); // Update the parent with new profile picture
    setPreviewUrl(''); // Clear preview after successful upload
  };

  

  return (
    <div className="profile-page">
      <div className="myprofile">
        <h1>My Profile</h1>
        <div className="profile-content">
        <div className="profile-section">
          <div className="profile-picture">
            {/* Display Profile Picture or Preview */}  
            {previewUrl ? (
              <img src={previewUrl} alt="Profile Preview" />
            ) : profilePictureUrl && profilePictureUrl !== 'http://localhost:3001/undefined' && profilePictureUrl !== 'http://localhost:3001/null' ? (
              <img src={profilePictureUrl} alt="profile" />
            ) : (
            <div className="profile-placeholder">
              <p>No profile picture available</p>
            </div>
            )} 
          </div>

          <div className="profile-basic-info">
            <h3>{userData.userName}</h3>
            <p>{userData.email}</p>
            <button className="edit-btn" onClick={openModal}>
              <FontAwesomeIcon icon={faEdit} /> Edit Profile Picture
            </button>
            {/* Modal for Editing Profile Picture */}
            {isModalOpen && (
              <Modal onClose={closeModal}>
                <EditProfilePicture
                  onClose={closeModal}
                  updateProfilePicture={updateProfilePicture}
                  updatePreviewUrl={updatePreviewUrl} // Pass the function to update preview URL
                />
              </Modal>
            )}
          </div>
        </div>

        <div className="personal-info-section">
          <h3>Personal Information</h3>
          <div className="info-row">
            <div className="info-item">
              <label>First Name</label>
              <p>{userData.firstName}</p>
            </div>
            <div className="info-item">
              <label>Last Name</label>
              <p>{userData.lastName}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <label>Email</label>
              <p>{userData.email}</p>
            </div>
            <div className="info-item">
              <label>Phone</label>
              <p>{userData.phone}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <label>Gender</label>
              <p>{userData.gender}</p>
            </div>
            <div className="info-item">
              <label>Bio</label>
              <p>{userData.bio}</p>
            </div>
          </div>
        </div>

        <div className="address-section">
          <h3>Address</h3>
          <div className="info-row">
            <div className="info-item">
              <label>Country</label>
              <p>{userData.country}</p>
            </div>
            <div className="info-item">
              <label>City</label>
              <p>{userData.city}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <label>Postal Code</label>
              <p>{userData.postalCode}</p>
            </div>
            <div className="info-item">
              <label>Additional Info</label>
              <p>{userData.additionalInfo}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;

