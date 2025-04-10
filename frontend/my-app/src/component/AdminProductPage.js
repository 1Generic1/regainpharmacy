import { useEffect, useState } from 'react';
import './styles/AdminProductPage.css';
import EditAddProductModal from './EditAddProductModal';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import { toast } from "react-toastify";
import Modal from './Modal';
import API from '../api/api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Keep track of the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async (page) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await API.get('/products/all_products', {
          params: { page, limit: 20 },
        });
        console.log(response.data);
        setProducts(response.data.docs);
        const { totalPages, page: currentPage } = response.data;
        setCurrentPage(currentPage); // Set the current page
        setTotalPages(totalPages); // Set total pages from response
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProducts(currentPage);
  }, [currentPage]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleViewImage = (images) => {
    if (!images || images.length === 0) {
      console.error('No images found for this product');
      toast.error('No images found for this product');
      return;
    }
    setSelectedImage(images[0]);
    setShowImageModal(true);
  };

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const openAddProductModal = () => setIsAddProductOpen(true);
  const closeAddProductModal = () => setIsAddProductOpen(false);

  // Optionally refresh the product list after adding a product
  const refreshProductList = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Pagination controls
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Move to the next page
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Move to the previous page
    }
  };

  // This is the edit button modal function
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const openEditProductModal = (product) => {
    setProductToEdit(product); // Set the selected product for editing
    setIsEditProductOpen(true);
  };
  const closeEditProductModal = () => setIsEditProductOpen(false);

  // Optionally refresh the product list after adding/editing a product when admin edits the product
  const updateProductitem = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await API.delete(`products/${productToDelete._id}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productToDelete._id));
      toast.success('Product deleted successfully');
      closeDeleteModal();
    } catch (error) {
      console.error('Full error details:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to delete product. Please check console for details.'
      );
    }
  };

 /**const renderImageNavigation = () => {
    const currentProduct = products.find((p) => p.images.includes(selectedImage));
    if (!currentProduct || currentProduct.images.length <= 1) return null;

    const currentIndex = currentProduct.images.indexOf(selectedImage); */

    const renderImageNavigation = () => {
      if (!selectedImage) return null;
    
      const currentProduct = products.find((p) => p.images?.includes(selectedImage));
      if (!currentProduct || !currentProduct.images || currentProduct.images.length <= 1) {
        return null;
      }
    
      const currentIndex = currentProduct.images.indexOf(selectedImage);
    

    return (
      <div className="image-navigation">
        <button
          onClick={() => {
            //for it to move in circles
            //const prevIndex = (currentIndex - 1 + currentProduct.images.length) % currentProduct.images.length;
            //for it not to wrap back to the last image
            const prevIndex = currentIndex - 1;
            setSelectedImage(currentProduct.images[prevIndex]);
          }}
          // remove here if you want in circles
          disabled={currentIndex === 0} // Disable if on the first image
          className="navigation-button"
        >
         <FontAwesomeIcon icon={faChevronLeft} /> {/* Previous icon */}
        </button>
        <button
          onClick={() => {
            //for it to move in circles
            //const nextIndex = (currentIndex + 1) % currentProduct.images.length;
            //for it not to wrap back to the first image
            const nextIndex = currentIndex + 1;
            setSelectedImage(currentProduct.images[nextIndex]);
          }}
          disabled={currentIndex === currentProduct.images.length - 1} // Disable if on the last image
          className="navigation-button"
        >
          <FontAwesomeIcon icon={faChevronRight} /> {/* Next icon */}
        </button>
      </div>
    );
  };

  return (
    <div className="adminproduct-container">
      <h2 className="adminproduct-title">Manage Products</h2>
      <button className="add-product-btn" onClick={openAddProductModal}>
        Add New Product
      </button>
      {isAddProductOpen && (
        <Modal onClose={closeAddProductModal}>
          <EditAddProductModal onClose={closeAddProductModal} refreshProductList={refreshProductList} />
        </Modal>
      )}
      <table className="adminproduct-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Variant</th>
            <th>Description</th>
            <th>Ratings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                <Link to={`/admin/product/${product._id}`} className="view-details-link">
                  {product.name}
                </Link>
              </td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>{product.variants?.length}</td>
              <td>{product.description}</td>
              <td>{product.rating}</td>
              <td>
                <button className="adminproduct-viewimage-btn" onClick={() => handleViewImage(product.images)}>
                  View Image
                </button>
                <button className="adminproductedit-btn" onClick={() => openEditProductModal(product)}>
                  Edit
                </button>
                <button className="adminproductdelete-btn" onClick={() => openDeleteModal(product)}>
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
            <img src={selectedImage} alt="Product" className="modal-preview-image" />
            {/* Add navigation buttons if there are multiple images */}
            {renderImageNavigation()}
            <button onClick={() => setShowImageModal(false)} className="modal-close">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditProductOpen && productToEdit && (
        <Modal onClose={closeEditProductModal}>
          <EditProductModal
            product={productToEdit} // Pass the selected product for editing
            onClose={closeEditProductModal}
            updateProductitem={updateProductitem}
          />
        </Modal>
      )}

      {/* Delete Product Modal */}
      {isDeleteModalOpen && productToDelete && (
        <Modal onClose={closeDeleteModal}>
          <DeleteProductModal
            productToDelete={productToDelete}
            onDelete={handleDeleteProduct}
            onClose={closeDeleteModal}
          />
        </Modal>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="pagination-btn">
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className="pagination-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProductPage;