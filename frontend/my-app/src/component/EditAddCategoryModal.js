import { useState } from 'react';
import axios from 'axios';
import './styles/EditAddCategoryModal.css'; // Ensure you have a separate CSS file

const EditAddCategoryModal = ({ onClose, refreshCategoryList }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);

  // Handle input change for the category name
  const handleInputChange = (e) => {
    // Reset the error state when the user interacts with the form
    setUploadError('');
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change for image upload
  const handleFileChange = (e) => {
    // Reset the error state when the user interacts with the form
    setUploadError('');
    const file = e.target.files[0];
    if (file) {
      // Check file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        setUploadError('File size should be less than 1MB');
        setImageFile(null);
        setFileName('');
        setPreview('');
        return;
      }

      setImageFile(file);
      setFileName(file.name);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  // Handle form submission to add the category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setUploadError('Please upload a category picture.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:3001/api/categories/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the parent component with the new category
      refreshCategoryList(response.data);
      setSuccessMessage('Category added successfully!!');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setUploadError(error.response.data.msg);
      } else {
        alert('Something went wrong');
      }
    }
  };

  return (
    <div className="edit-add-category-modal">
      <h2>Add New Category</h2>
      <form onSubmit={handleAddCategory}>
        <div className="pim-input-group">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={newCategory.name}
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

        {fileName && (
          <div className="file-info">
            <p>Selected File: {fileName}</p>
            {preview && <img src={preview} alt="Category Preview" className="image-preview" />}
          </div>
        )}

        <label className="file-input-label" htmlFor="file-upload">
          Choose Category Picture
        </label>

        <div className="personalinfo-buttons">
          <button type="submit" className="pim-save-btn">Add Category</button>
          <button type="button" onClick={onClose} className="pim-cancel-btn">Cancel</button>
        </div>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {uploadError && <p className="error-message">{uploadError}</p>}
    </div>
  );
};

export default EditAddCategoryModal;

