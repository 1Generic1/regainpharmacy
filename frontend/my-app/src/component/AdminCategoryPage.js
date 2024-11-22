import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/AdminCategoryPage.css'
import DeleteCategoryModal from './DeleteCategoryModal';  // Create a modal similar to DeleteProductModal
import EditCategoryModal from './EditCategoryModal';
import EditAddCategoryModal from './EditAddCategoryModal';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const navigate = useNavigate();
    const [uploadError, setUploadError] = useState('');
  
    // Fetch categories from API
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found');
            return;
          }
          const response = await axios.get('http://localhost:3001/api/categories/all_categories', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setCategories(response.data);
        } catch (error) {
          if (error.response) {
            // If status is 401 (Unauthorized), handle token invalidation and redirect
            if (error.response.status === 401) {
              setUploadError('Token is invalid or expired. Redirecting to login page...');
              localStorage.removeItem('token'); // Clear token from localStorage
              setTimeout(() => {
                navigate('/login');
              }, 5000); // Redirect after 2 seconds
            } else {
              // Display backend error message or default message
              setUploadError(error.response.data.error || 'An unexpected error occurred. Please try again.');
            }
          } else {
            // For other errors (network issues, etc.)
            alert('Something went wrong. Please try again later.');
          }
        }
      };
      fetchCategories();
    }, [navigate]);

    const openAddCategoryModal = () => {setIsAddCategoryOpen(true)};
    
    const closeAddCategoryModal = () => {setIsAddCategoryOpen(false)};
    
    const refreshCategoryList = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]); // Add the new category to the list
    };
    // Open image modal
    const handleViewImage = (imageUrl) => {
      setSelectedImage(imageUrl);
      setShowImageModal(true);
    };
  
    // Close image modal
    const closeImageModal = () => setShowImageModal(false);
  
    // Open edit category modal
    const openEditCategoryModal = (category) => {
      setCategoryToEdit(category); // Set the selected category for editing
      setIsEditCategoryOpen(true);
    };
  
    // Close edit category modal
    const closeEditCategoryModal = () => setIsEditCategoryOpen(false);
  
    // Open delete category modal
    const openDeleteModal = (category) => {
      setCategoryToDelete(category);
      setIsDeleteModalOpen(true);
    };
  
    // Close delete category modal
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
  
    // Handle delete category
    const handleDeleteCategory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        await axios.delete(`http://localhost:3001/api/categories/${categoryToDelete._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCategories((prevCategories) =>
          prevCategories.filter((c) => c._id !== categoryToDelete._id)
        );
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };
  
    // Update the category list after editing
    const updateCategoryItem = (updatedCategory) => {
      setCategories((prevCategories) =>
        prevCategories.map((c) => (c._id === updatedCategory._id ? updatedCategory : c))
      );
    };
  
    return (
      <div className="admincategory-container">
        <h2 className="admincategory-title">Manage Categories</h2>
        <button className="add-product-btn" onClick={openAddCategoryModal}>
          Add New Category
        </button>

        {/* Modal for adding a new category */}
        {isAddCategoryOpen && (
        <Modal onClose={closeAddCategoryModal}>
          <EditAddCategoryModal
            onClose={closeAddCategoryModal}
            refreshCategoryList={refreshCategoryList}
          />
        </Modal>
       )
       }
        <table className="admincategory-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    className="admincategory-viewimage-btn"
                    onClick={() => handleViewImage(category.image)}
                  >
                    View Image
                  </button>
                  <button
                    className="admincategory-edit-btn"
                    onClick={() => openEditCategoryModal(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="admincategory-delete-btn"
                    onClick={() => openDeleteModal(category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Image Modal */}
        {showImageModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <img src={selectedImage} alt="Category" className="modal-preview-image" />
              <button onClick={closeImageModal} className="modal-close">Close</button>
            </div>
          </div>
        )}
  
        {/* Edit Category Modal */}
        {isEditCategoryOpen && categoryToEdit && (
          <Modal onClose={closeEditCategoryModal}>
            <EditCategoryModal
              category={categoryToEdit} // Pass the selected category for editing
              onClose={closeEditCategoryModal}
              updateCategoryItem={updateCategoryItem} // Update the category after editing
            />
          </Modal>
        )}
  
        {/* Delete Category Modal */}
        {isDeleteModalOpen && categoryToDelete && (
          <Modal onClose={closeDeleteModal}>
            <DeleteCategoryModal
              categoryToDelete={categoryToDelete}
              onDelete={handleDeleteCategory}
              onClose={closeDeleteModal}
            />
          </Modal>
        )}
      {uploadError && <p className="error-message">{uploadError}</p>}
    
      </div>
      
    );
  };
  
  export default AdminCategoryPage;
