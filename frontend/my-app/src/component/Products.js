import React, {useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import flashsales from './styles/src_regainimages/doctorman.png';
import './styles/Products.css';
import { useLocation } from 'react-router-dom';



/*const categories = [
  { id: 1, name: 'Antibiotics', image: '/styles/src_regainimages/whitepils.jpg' },
  { id: 2, name: 'Herbs', image: '/styles/src_regainimages/whitepils.jpg' },
  { id: 1, name: 'Antibiotics', image: '/styles/src_regainimages/whitepils.jpg' },
  { id: 2, name: 'Herbs', image: '/styles/src_regainimages/whitepils.jpg' },
  { id: 1, name: 'Antibiotics', image: '/styles/src_regainimages/whitepils.jpg' },
  { id: 2, name: 'Herbs', image: '/styles/src_regainimages/whitepils.jpg' },
  { id: 1, name: 'Antibiotics', image: '/styles/src_regainimages/whitepils.jpg' },
  { id: 2, name: 'Herbs', image: '/styles/src_regainimages/whitepils.jpg' },

  // Add more categories here
]; */

// Sample product data
/**const products = [
  {
    id: 1,
    name: 'White Pills',
    description: 'Short product description goes here.',
    category: 'Health & Wellness',
    price: 99.99,
    rating: 2,
    image: '/styles/src_regainimages/whitepils.jpg',
  },
  {
    id: 2,
    name: 'Vitamin Supplements',
    description: 'Boost your immunity with this product.',
    category: 'Health & Wellness',
    price: 49.99,
    rating: 5,
    image: '/styles/src_regainimages/tools.jpg',
  },
  {
    id: 1,
    name: 'White Pills',
    description: 'Short product description goes here.',
    category: 'Health & Wellness',
    price: 99.99,
    rating: 2,
    image: '/styles/src_regainimages/whitepils.jpg',
  },
  {
    id: 1,
    name: 'White Pills',
    description: 'Short product description goes here.',
    category: 'Health & Wellness',
    price: 99.99,
    rating: 2,
    image: '/styles/src_regainimages/whitepils.jpg',
  },
  {
    id: 1,
    name: 'White Pills',
    description: 'Short product description goes here.',
    category: 'Health & Wellness',
    price: 99.99,
    rating: 2,
    image: '/styles/src_regainimages/whitepils.jpg',
  },
  {
    id: 1,
    name: 'White Pills',
    description: 'Short product description goes here.',
    category: 'Health & Wellness',
    price: 99.99,
    rating: 2,
    image: '/styles/src_regainimages/whitepils.jpg',
  },
  {
    id: 1,
    name: 'White Pills',
    description: 'Short product description goes here.',
    category: 'Health & Wellness',
    price: 99.99,
    rating: 2,
    image: '/styles/src_regainimages/whitepils.jpg',
  },
  {
    id: 1,
    name: 'White Pills',
    description: 'Short product description goes here.',
    category: 'Health & Wellness',
    price: 99.99,
    rating: 2,
    image: '/styles/src_regainimages/whitepils.jpg',
  },
  // Add more products as needed...
]; **/

const Products = () => {
  // this is to scroll to the category page from the Productdetails.js page
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    if (category) {
      // Scroll to the categories section if it exists in the DOM
      setSelectedCategory(category);
      const scrollToCategorySection = () => {
        const categorySection = document.querySelector('.categories-section');
        if (categorySection) {
          categorySection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      // Use a slight delay to allow content to load if necessary
      const timer = setTimeout(scrollToCategorySection, 300);

      // Clear the timer if component unmounts
      return () => clearTimeout(timer);

    }
  }, [location]);

  useEffect(() => {
    const hash = window.location.hash;
  
    const scrollToElement = () => {
      if (hash) {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
  
    // Delay scrolling to ensure the component has rendered
    const timer = setTimeout(scrollToElement, 300);
  
    // Clean up timer
    return () => clearTimeout(timer);
  }, [location]);

  // Add state to hold products data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to hold categories data
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  

  // State to hold the selected category for filtering
  const [selectedCategory, setSelectedCategory] = useState(null);
  
    // Fetch products from backend when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products/all_products'); // Adjust URL if needed
        setProducts(response.data.docs); // Assuming 'docs' contains paginated product data
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

   // Fetch categories from backend
   const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/categories/all_categories'); // Adjust URL if needed
      setCategories(response.data); // Assuming the response is a list of categories
      setCategoriesLoading(false);
    } catch (err) {
      setCategoriesError('Error fetching categories');
      setCategoriesLoading(false);
    }
  };
  
  // Fetch products and categories on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  
  //Filter products by selected category 
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Handle category selection
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName)
  }

  // "See All" function to fetch all products again  by resetting category filter
  const handleSeeAll = () => {
    setSelectedCategory(null); // Fetches and resets the product list to display all
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  
  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p>{categoriesError}</p>;


  return (
    <section className="products-page">
      <div className='products-header'>
        <DashboardHeader />
      </div>
  <div className='product-page-content'>
  <section className="flash-sales">
    <div className="flash-sales-content">
      <h2>Flash Sales</h2>
      <p>Limited time offers! Get them before they're gone!</p>
      <div className="flash-sale-buttons">
        <button className="pdt-btn-buy-now">Buy Now</button>
        <button className="pdt-btn-see-all">See All</button>
      </div>
    </div>
    <div className="flash-sales-image">
            <img src={flashsales} alt="Flash Sale" />
    </div> 
  </section>

  <section className="delivery-section">
    <div className="delivery-content">
      <h2>Delivery Discount</h2>
      <p>Enjoy 50% off on all delivery fees for a limited time!</p>
    </div>
  </section>

  <section className="categories-section">
    <div className="categories-header">
      <h2>Categories</h2>
      {/*<a href="#" class="see-all">See All</a> */}
    </div>
    <div className="categories-list">
      {categories.map(category => (
        <div key={category._id} className={`category-item ${selectedCategory === category.name ? 'zoomed' : ''}`}>
          <button className="category-button" onClick={() => handleCategoryClick(category.name)}>
            <img src={category.image}
              alt={category.name} 
              className="category-icon" />
              <p>{category.name}</p>
          </button>
        </div>
      ))} 
     </div>  
  </section>

<section id="products-section" className="products-section">
  <div className="productsection-header">
    <h2>Products</h2>
    <button onClick={handleSeeAll} className="pdts-btn-see-all">See All</button>
  </div>
  <div className="products-grid">
    {filteredProducts.map((product) => (
      <Link 
        key={product._id} 
        to={`/dashboard/product/${product._id}`} 
        className="product-item-link"
        style={{ textDecoration: 'none', color: 'inherit' }} // Optional: Ensures default styling for text
      >
        <div className="product-item">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />
            <button className="btn-like">❤</button>
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <div className="product-pricing">
              <span>#{product.price.toFixed(2)}</span>
              <span className="rating">
                {'★'.repeat(product.rating)}
                {'☆'.repeat(5 - product.rating)}
              </span>
            </div>
            <div className="product-actions">
              <button className="btn-add-cart">Add to Cart</button>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
  </div>

    </section>
  )
}

export default Products;