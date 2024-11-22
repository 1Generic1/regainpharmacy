import React from 'react';
import './styles/DeleteProductModal.css'; 
const DeleteProductModal = ({ productToDelete, onDelete, onClose }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the product: <strong style={{ color: '#f44336' }}>{productToDelete.name}</strong>?</p>
        
        <div className="delete-modal-actions">
          <button 
            className="delete-modal-confirm-btn" 
            onClick={() => onDelete(productToDelete._id)}
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

export default DeleteProductModal;

