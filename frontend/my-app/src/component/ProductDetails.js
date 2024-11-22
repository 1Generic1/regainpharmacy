import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/ProductDetails.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import DashboardHeader from './DashboardHeader'; // Ensure you import the DashboardHeader

function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null); // Store the product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    // Fetch product data from backend using Axios
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(response.data); // Set the product data
      } catch (err) {
        setError(err.response?.data?.msg || 'An error occurred');
      } finally {
        setLoading(false); // Stop loading in both success and error cases
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="product-details-container">
      <DashboardHeader />
      {product ? (
        <div className="product-details">
          {/* Session 1: Main Product Image and Thumbnails */}
          <div className="product-image-section">
            <p className='breadcrumbs'>
              <Link to="/dashboard/products#products-section">Products</Link>
              <span className="separator">{'>'}</span> 
              <Link to={`/dashboard/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
              <span className="separator">{'>'}</span> 
              <span>{product.name}</span>
            </p>
            <img src={product.image} alt={product.name} className="main-product-image" />
            <div className="image-thumbnails">
              {/* Placeholder for additional images */}
              <img src={product.image} alt="View 1" className="thumbnail" />
              <img src={product.image} alt="View 2" className="thumbnail" />
              <img src={product.image} alt="View 3" className="thumbnail" />
              <img src={product.image} alt="View 4" className="thumbnail" />
            </div>
          </div>

          {/* Session 2: Product Info Section */}
          <div className="productpage-info-section">
            <h3 className="productpage-name">{product.name}</h3>
            <span className='pcategory'>Category: <strong>{product.category}</strong></span>
            <div className="rating">
              <span>{'★'.repeat(Math.floor(product.rating))}{product.rating % 1 !== 0 ? '☆' : ''}{'☆'.repeat(5 - Math.ceil(product.rating))}</span>
            </div>
            <div className="productpage_price">
              <span>#{product.price.toFixed(2)}</span>
            </div>
            <span className='productpage_description1'>Description</span>
            <div className="productpage_description">
              <span><strong>{product.description}</strong></span>
            </div>
            <div className="productpage-actions">
              <button className="pbtn-buy-now">Buy Now</button>
              <button className="pbtn-add-cart">Add to Cart</button>
              <button className="pbtn-favorite">❤️</button>
            </div>
            <p className="free-delivery">
              <FontAwesomeIcon icon={faTruck} /> <strong>Free delivery for orders over #20,000</strong>
            </p>
          </div>
        </div>
      ) : (
        <div>Product not found</div>
      )}

      <div className="product-detail-page">
        {/* 3rd Section - Details/Reviews Toggle */}
        <div className="tab-section">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => handleTabClick('details')}
            >
              Details
            </button>
            <button
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => handleTabClick('reviews')}
            >
              Reviews
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'details' ? (
              <div className="details-content">
                <p>{product.description}</p>
              </div>
            ) : (
              <div className="reviews-content">
                <p>User Reviews will go here...</p>
              </div>
            )}
          </div>
        </div>

        {/* 4th Section - Rating */}
        <div className="rating-section">
          {/* Rating Stars and Number */}
          <div className='ratingcontent'>
            <span className="rating-stars">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 !== 0 ? '☆' : ''}
              {'☆'.repeat(5 - Math.ceil(product.rating))}
            </span>
            <span className="rating-number">({product.rating.toFixed(1)})</span>
          </div>

          {/* Rating Bar */}
          <div className="rating-bar-container">
            <div
              className="rating-bar"
              style={{ width: `${(product.rating / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
