import { useState, useEffect ,} from 'react';
import axios from 'axios';
import './styles/EditAddProductModal.css';
import Select from 'react-select';

const EditAddProductModal = ({ onClose, refreshProductList }) => {

  const [successMessage, setSuccessMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    quantity: '',
    description: '',
    rating: '', 
  });

  const [categories, setCategories] = useState([]); // Store categories from backend

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get('http://localhost:3001/api/categories/all_categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCategories(response.data); // Set the categories in state
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    // Reset the error state when the user interacts with the form
    setUploadError('');
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);
  // Handle file input change
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      //alert('Please upload a product picture.');
      setUploadError('Please upload a product picture.');
      return;
    }
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('stock', newProduct.stock);
    formData.append('rating', newProduct.rating); 
    formData.append('image', imageFile);
    formData.append('description', newProduct.description);

    try {
      const response = await axios.post('http://localhost:3001/api/products/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the parent component with the new product
      refreshProductList(response.data);
      setSuccessMessage('New Product added successfully!!');
      //window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      // Axios provides the response data in error.response
      if (error.response) {
        // Extract and display the error message from the backend
        alert(error.response.data.error);  // This should display your specific backend error
        setUploadError(error.response.data.error);
      } else {
        // If there is no response (like network issues)
        alert('Something went wrong');
      }
    }
  };

  const categoryOptions = categories.map(category => ({
    value: category.name,
    label: category.name
  }));

  // Create options for ratings from 0 to 5
  const ratingOptions = Array.from({ length: 6 }, (_, index) => ({
    value: index,
    label: index.toString()
  }));

  return (
    <div className="edit-add-product-modal">
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div className="pim-input-group">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="pim-input-group">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="pim-input-group">
          {/* Populate the dropdown with categories fetched from the backend */}
          <Select
      value={categoryOptions.find(option => option.value === newProduct.category)}
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
            value={newProduct.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="pim-input-group">
          <Select
      value={ratingOptions.find(option => option.value === newProduct.rating)}
      onChange={(selectedOption) =>
        handleInputChange({ target: { name: 'rating', value: selectedOption.value } })
      }
      options={ratingOptions}
      isSearchable={false} // Disable searching since this is a simple dropdown
      placeholder="Select Rating"
      styles={{
        control: (provided, state) => ({
          ...provided,
          padding: '1px',
          minHeight: '40px',
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

      {/* Show file name and image preview */}
      {fileName && (
        <div className="file-info">
          <p>Selected File: {fileName}</p>
          {preview && <img src={preview} alt="Product Preview" className="image-preview" />}
        </div>
      )}
        <label className="file-input-label" htmlFor="file-upload">
          Choose Product Picture
        </label>
        <div className="pim-input-group">
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="personalinfo-buttons">
          <button type="submit" className="pim-save-btn">Add Product</button>
          <button type="button" onClick={onClose} className="pim-cancel-btn">Cancel</button>
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {uploadError && <p className="error-message" >{uploadError}</p>}
    </div>
  );
};

export default EditAddProductModal;
