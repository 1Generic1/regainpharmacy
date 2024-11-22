import React from 'react';

const DeleteCategoryModal = ({ categoryToDelete, onDelete, onClose }) => {

  const handleDeleteCategory = async () => {
    try {
      await onDelete(categoryToDelete._id);  // Call the delete function passed from parent
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the category: 
          <strong style={{ color: 'red' }}>{categoryToDelete.name}</strong>?
        </p>

        <div className="delete-modal-actions">
          <button 
            className="delete-modal-confirm-btn" 
            onClick={handleDeleteCategory}
          >
            Yes, Delete
          </button>
          <button 
            className="delete-modal-cancel-btn" 
            onClick={onClose}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;

