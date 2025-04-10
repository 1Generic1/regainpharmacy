import { useState, useEffect } from 'react';
import './styles/EditProductModal.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from "react-toastify";
import API from "../api/api";


const EditProductModal = ({ onClose, product, updateProductitem }) => {
  const [formData, setFormData] = useState({
    name: product.name, 
    price: product.price,
    category: product.category,
    stock: product.stock,
    description: product.description,
    rating: product.rating,
    image: null, // Still handling image separately
    imagePosition: 'last', // Default position
    imageIndex: 0, // Default index
});

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [uploadError, setUploadError] = useState(''); // State for error message
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Store categories from backend

  // Fetch categories from the backend when the component mounts
  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await API.get('categories/all_categories');
        setCategories(response.data); // Set the categories in state
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryOptions = categories.map(category => ({
    value: category.name,
    label: category.name
  }));

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
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('File size should be less than 2MB'); // Notify user
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

  // Create options for ratings from 0 to 5
  const ratingOptions = Array.from({ length: 6 }, (_, index) => ({
    value: index,
    label: index.toString()
  }));

  // Handle form submission for editing the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUploadError('session expired login to proceed.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
       return;
      }
      const updatedData = new FormData();
      updatedData.append('name', formData.name);
      updatedData.append('price', formData.price);
      updatedData.append('category', formData.category);
      updatedData.append('stock', formData.stock);
      updatedData.append('description', formData.description);
      updatedData.append('rating', formData.rating); // Include rating

      // Add image position data
      updatedData.append('imagePosition', formData.imagePosition);
      if (formData.imagePosition === 'specific') {
        updatedData.append('imageIndex', formData.imageIndex);
      }
      if (imageFile) { // Only append the image if it exists
        updatedData.append('image', imageFile);
      }

      // Send updated product data to the backend
      const response = await API.put(`/products/${product._id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the image is handled properly
        },
      });

    // Ensure variants are preserved in the response
    const updatedProduct = {
      ...response.data,
      variants: response.data.variants || product.variants || []
    };
      // Update the product in the parent list
      updateProductitem(updatedProduct);
      // Show success toast
      toast.success('Product updated successfully!');
      setSuccessMessage('Product updated successfully!');
      setUploadError('');
      setTimeout(() => {
        setSuccessMessage(''); // Clear the message after a few seconds
        window.location.reload(); //reload the parent page
        onClose(); // Close the modal after saving
      }, 1000);
    } catch (error) {
      // Axios provides the response data in error.response
      // Show error toast
      if (error.response) {
        toast.error(error.response.data.error || 'Failed to update product');
        setUploadError(error.response.data.error);
      } else if (error.request) {
        toast.error('Network error. Please try again.');
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error('Update error:', error);
    }
  };
    
  
  

  // Update form data when user edits text fields
  const handleInputChange = (e) => {
    // Reset the error state when the user interacts with the form
    setUploadError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   // Add position options
   const positionOptions = [
    { value: 'first', label: 'First position' },
    { value: 'last', label: 'Last position' },
    { value: 'specific', label: 'Specific position' },
  ];

  // Update form data when position changes
    const handlePositionChange = (selectedOption) => {
      setFormData({
        ...formData,
        imagePosition: selectedOption.value,
        // Reset index when position changes
        imageIndex: selectedOption.value === 'specific' ? formData.imageIndex : 0
      });
    };
  
  // Update form data when index changes
    const handleIndexChange = (e) => {
      setFormData({
        ...formData,
        imageIndex: parseInt(e.target.value) || 0
      });
    };


  return (
    <div className="edit-product-modal">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="pim-input-group">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            
          />
        </div>
        <div className="pim-input-group">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="pim-input-group">
          {/* Populate the dropdown with categories fetched from the backend */}
          <Select
      value={categoryOptions.find(option => option.value === formData.category)}
      onChange={(selectedOption) =>
        handleInputChange({ target: { name: 'category', value: selectedOption.value } })
      }
      options={categoryOptions}
      isSearchable
      placeholder="Select Category"
      styles={{
        control: (provided, state) => ({
          ...provided,
          padding: '4px',
          minHeight: '40px',
          width: '95%',
          borderRadius:'5px',
          borderColor: state.isFocused ? '#4CAF50' : '#ccc',
          backgroundColor: 'white',
          textAlign: 'left',
          boxShadow: state.isFocused ? '0 0 0 2px rgba(76, 175, 80, 0.2)' : 'none',
          '&:hover': {
            borderColor: '#4CAF50',
          },
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '5px 10px',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#333',
        }),
        menu: (provided) => ({
          ...provided,
          borderColor: '#4CAF50',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? '#4CAF50'
            : state.isFocused
            ? 'rgba(76, 175, 80, 0.1)'
            : 'white',
          color: state.isSelected ? 'white' : '#333',
          textAlign: 'left',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
          },
        }),
      }}
    />
        </div>
        <div className="pim-input-group">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="pim-input-group">
          <Select
      value={ratingOptions.find(option => option.value === formData.rating)}
      onChange={(selectedOption) =>
        handleInputChange({ target: { name: 'rating', value: selectedOption.value } })
      }
      options={ratingOptions}
      isSearchable={false} // Disable searching since this is a simple dropdown
      placeholder="Select Rating"
      styles={{
        control: (provided, state) => ({
          ...provided,
          minHeight: '20px',
          maxHeight: '50px',
          width: '95%',
          borderColor: state.isFocused ? '#4CAF50' : '#ccc',
          backgroundColor: 'white',
          textAlign: 'left',
          boxShadow: state.isFocused ? '0 0 0 2px rgba(76, 175, 80, 0.2)' : 'none',
          '&:hover': {
            borderColor: '#4CAF50',
          },
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '0px 8px',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#333',
        }),
        menu: (provided) => ({
          ...provided,
          borderColor: '#4CAF50',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? '#4CAF50'
            : state.isFocused
            ? 'rgba(76, 175, 80, 0.1)'
            : 'white',
          color: state.isSelected ? 'white' : '#333',
          textAlign: 'left',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
          },
        }),
      }}
    />
       

       {/* Image position selection */}
       <div className="position-selector">
            <label>Image Position:</label>
            <Select
              value={positionOptions.find(opt => opt.value === formData.imagePosition)}
              onChange={handlePositionChange}
              options={positionOptions}
              styles={{
                control: (provided) => ({
                  ...provided,
                  minHeight: '45px',  // Increase height
                  height: '50px',
                  fontSize: '16px',   // Optional: increase font size
                }),
                indicatorsContainer: (provided) => ({
                  ...provided,
                  height: '45px',
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  height: '45px',
                  padding: '0 8px',
                }),
                option: (provided) => ({
                  ...provided,
                  padding: '10px 12px',  // Increase option padding
                })
              }}

            />
            
            {/* Show index input only when specific position is selected */}
            {formData.imagePosition === 'specific' && (
              <div className="index-input">
                <label>Position Index:</label>
                <input
                  type="number"
                  min={0}
                  max={4} // Maximum index is 4 (for 5 images)
                  value={formData.imageIndex}
                  onChange={handleIndexChange}
                />
              </div>
            )}
          </div>

      {/* Show file name and image preview */}
      {fileName && (
        <div className="file-info">
          <p>Selected File: {fileName}</p>
          {preview && <img src={preview} alt="Product Preview" className="image-preview" />}
        </div>
      )}

</div>
        {/* File upload for product image */}
      <div className="file-upload-container">
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="file-input"
          
        />
      </div>
        <label className="file-input-label" htmlFor="file-upload">
          Update Product Picture
        </label>
        <div className="pim-input-group">
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="personalinfo-buttons">
          <button type="submit" className="pim-save-btn">UpdateProduct</button>
          <button type="button" onClick={onClose} className="pim-cancel-btn">Cancel</button>
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {uploadError && <p className="error-message" >{uploadError}</p>}
    </div>
  );
};

export default EditProductModal;
