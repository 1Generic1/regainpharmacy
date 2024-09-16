import React, { useState } from 'react';
import axios from 'axios';
import './styles/EditProfilePicture.css';


const EditProfilePicture = ({ onClose, updateProfilePicture, updatePreviewUrl }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  //const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Handle file input change and generate preview
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Enforce file size limit (less than 1MB)
    if (selectedFile && selectedFile.size > 1024 * 1024) {
      setUploadError('File size should be less than 1MB');
      return;
    }

    setFile(selectedFile);
    setUploadError(''); // Reset error if valid

    // Generate preview URL
    const filePreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(filePreviewUrl);
    updatePreviewUrl(filePreviewUrl);
  };

  // Handle file upload to the backend
  const onFileUpload = async (e) => {
    e.preventDefault();
    console.log('File upload function triggered');
    if (!file) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('profilePicture', file);
    console.log('Starting file upload logic');
    
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
    
      // Check if the token exists
      if (!token) {
        console.error('No token found');
      return;
      }

      const response = await axios.post('http://localhost:3001/api/users/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('File uploaded successfully:', response.data);

      // Update the profile picture URL with the newly uploaded image
      //setProfilePictureUrl(response.data.imageUrl);
      updateProfilePicture(`http://localhost:3001/${response.data.profilePicture}`);

      // Show success message
      setSuccessMessage('Profile picture uploaded successfully!');
      // Handle success: Show a success message, then close modal
      //alert('Successfully uploaded!');
    //  onClose();
      //window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.log('Entering catch block');
      console.error('Error uploading file:', error);
      setUploadError('Failed to upload file...');
    }
  }

  return (
    <div className="edit-profile-picture">
      <h2>Edit Profile Picture</h2>
      <form onSubmit={onFileUpload}>
        {previewUrl && <img className="preview-image" src={previewUrl} alt="Preview" />}
        <div className="file-upload-container">
          <label className="file-input-label" htmlFor="file-upload">
            Choose File
          </label>
         <input
           id="file-upload"
           type="file"
           onChange={onFileChange}
           accept="image/*"
           className="file-input"
          />
          <button type="submit" className="upload-button">Upload Picture</button>
        </div>

      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {uploadError && <p className="error-message" >{uploadError}</p>}
      {/*<button onClick={onClose}>Close</button>*/}
    </div>
  );
};

export default EditProfilePicture;
