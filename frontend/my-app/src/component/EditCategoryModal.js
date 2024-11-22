import { useState,} from 'react';
import axios from 'axios';
import './styles/EditCategoryModal.css'; // Add your CSS styles similar to EditProductModal

const EditCategoryModal = ({ onClose, category, updateCategoryItem }) => {
  const [formData, setFormData] = useState({
    name: category.name, 
    image: null, // Handling image separately
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [uploadError, setUploadError] = useState('');

  


  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);
  
    // Handle file input for image change
  const handleFileChange = (e) => {
    // Reset the error state when the user interacts with the form
    setUploadError('');
    const file = e.target.files[0];
    if (file) {
      // Check file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        setUploadError('File size should be less than 1MB'); // Notify user
        setImageFile(null); // Reset the image file
        setFileName(''); // Clear the filename
        setPreview(''); // Clear the preview
        return; // Exit the function if the file is too large
      }

      setImageFile(file);
      setFileName(file.name);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const updatedData = new FormData();
      updatedData.append('name', formData.name)
      if (imageFile) {
        updatedData.append('image', imageFile);
      }

      // Send updated product data to the backend
      const response = await axios.put(`http://localhost:3001/api/categories/${category._id}`, updatedData, {
        headers: {
          'Authorization' : `Bearer ${token}`,
          'content-Type' : 'multipart/form-data',
        },
      });

      updateCategoryItem(response.data);
      setSuccessMessage('Category updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error.response) {
        setUploadError(error.response.data.error);
      } else {
        alert('something went wrong')
      }
    }
  };

  // Update form data when user edits text fields
  const handleInputChange = (e) => {
    //reset error when user interact with the field
    setUploadError('');
    setFormData({...formData, [e.target.name]: e.target.value });
  };

 

  return (
    <div className="edit-category-modal">
      <h2>Edit Category </h2>
      <form onSubmit={handleSubmit}>
        <div className="pim-input-group">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="file-upload-container">
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
        </div>

        {/* Show file name and image preview */}
        {fileName && (
          <div className="file-info">
            <p>Selected File: {fileName}</p>
            {preview && <img src={preview} alt="Category Preview" className="image-preview" />}
          </div>
        )}

        <label className='file-input-label' htmlFor="file-upload">
          Update Category Picture
        </label>

        <div className="personalinfo-buttons">
          <button className="pim-save-btn" type="submit"> UpdateCategory</button>
          <button className="pim-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
      {successMessage && <p className='success-message'>{successMessage}</p>}
      {uploadError && <p className="error-message" >{uploadError}</p>}
    </div>
  );
};

export default EditCategoryModal;
