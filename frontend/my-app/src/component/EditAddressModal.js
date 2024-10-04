import React, { useState, useEffect } from 'react';
import './styles/Modal.css'; // Assuming you have a similar styling as for other modals
import axios from 'axios';
import Select from 'react-select';
import './styles/EditAddressModal.css';

const EditAddressModal = ({ onClose, userData, updateUserData }) => {
  // Initialize form data with the existing user data
  const [formData, setFormData] = useState({
    country: userData.country || '',
    city: userData.city || '',
    postalCode: userData.postalCode || '',
    additionalInfo: userData.additionalInfo || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChanges = (selectedOption, { name }) => {
    // Handle form input correctly
    setFormData({ ...formData, [name]: selectedOption.value });
  };

  const [countries, setCountries] = useState([]);
  // Fetch countries from the API when the modal is opened
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryOptions = response.data
          .map((country) => ({
            value: country.name.common,
            label: country.name.common
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); 
        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request to update the user's address information
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3001/api/users/edit-profile', 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the parent component's state with new data
      updateUserData(response.data);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating address information:', error);
    }
  };

  return (
    <div className="address-modal">
      <div className="address-modal-content">
        <h2>Edit Address Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="pim-input-group">
            <label>Country</label>
            <Select
              className="custom-select"
              name="country"
              value={countries.find((option) => option.value === formData.country)} // This ensures the correct country is selected
              onChange={handleChanges}
              options={countries} // Options are provided in correct format { value, label }
              isSearchable
              placeholder="Select a country"
              required
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  padding: '4px',  // Adjust the padding here (top/bottom and left/right)
                  minHeight: '40px',  // Adjust the height as needed
                  borderColor: state.isFocused ? '#4CAF50' : '#ccc', // Green border when focused
                  backgroundColor: state.isFocused ? 'white' : 'white', // Keep background white
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(76, 175, 80, 0.2)' : 'none', // Green shadow on focus
                  '&:hover': {
                    borderColor: '#4CAF50', // Green border on hover
                  },
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: '5px 10px', // Padding inside the input box (affects the text and icon)
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#333', // Text color in the input
                }),
                menu: (provided) => ({
                  ...provided,
                  borderColor: '#4CAF50', // Green border for the dropdown menu
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? '#4CAF50'  // Green background for selected option
                    : state.isFocused
                    ? 'rgba(76, 175, 80, 0.1)'  // Light green background on hover
                    : 'white',  // White background for non-hovered options
                  color: state.isSelected ? 'white' : '#333', // Text color for selected vs non-selected
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.2)', // Slightly darker green hover effect
                  },
                }),
              }}
            />
          </div>
          <div className="pim-input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pim-input-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pim-input-group">
            <label>Additional Info</label>
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>
          <div className="personalinfo-buttons">
            <button type="submit" className="pim-save-btn">Save</button>
            <button type="button" className="pim-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressModal;

