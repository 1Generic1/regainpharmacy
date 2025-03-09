import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, matchPath, useNavigate} from 'react-router-dom';
import './App.css';
import { jwtDecode } from 'jwt-decode'; // to check if the session is active 
import Header from './component/Header.js';
import Home from './component/Home.js';
import Footer from './component/Footer';
import AboutUs from './component/AboutUs.js';
import ScrollToTop from './component/ScrollToTop';
import SignUp from './component/SignUp';
import Success from './component/Success'
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import PrivateRoute from './component/PrivateRoute';
import Profile from './component/Profile';
import AccountSettings from './component/AccountSettings';
import AccProfile from './component/Profile1';
import SecuritySettings from './component/SecuritySettings';
import Products from './component/Products';
import AdminRoute from './component/AdminRoute'
import AdminDashboard from './component/AdminDashboard';
import AdminProductPage from './component/AdminProductPage';
import AdminCategoryPage from './component/AdminCategoryPage';
import AdminProductDetailsPage from './component/adminpages/AdminProductDetailsPage';
import ProductDetails from './component/ProductDetails';
import CartPage from './component/CartPage';
import Wishlist from './component/Wishlist';
import API from "./api/api";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

   // Load dark mode from localStorage on first render
   const [userId, setUserId] = useState(null);
   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Decode token and set userId
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); // Ensure JWT contains userId
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch dark mode preference from backend if user is logged in
  useEffect(() => {
    const fetchDarkMode = async () => {
      if (!userId) return; // If user is not logged in, skip backend call

      try {
        const response = await API.get(`/users/${userId}`);
        console.log("Response from server:", response.data);
        setDarkMode(response.data.darkMode);
        localStorage.setItem('darkMode', response.data.darkMode); // Sync with localStorage
      } catch (error) {
        console.error('Error fetching dark mode:', error);
      }
    };

    fetchDarkMode();
  }, [userId]);

  // Toggle dark mode and update backend/localStorage
  const toggleDarkMode = async () => {
    const userId = localStorage.getItem("userId");
    const newMode = !darkMode;
    setDarkMode(newMode);
    console.log("Toggled Dark Mode:", newMode);
    localStorage.setItem('darkMode', newMode); // Save for guests

    if (userId) {
      try {
        console.log("Sending dark mode update to server...", { userId, darkMode: newMode });
        const res = await API.put('users/darkmode', { userId, darkMode: newMode });
        console.log("Dark mode update response:", res?.data);
      } catch (error) {
        console.error("Error updating dark mode:", error?.response?.data || error.message);
      }
    }
    else {
      console.warn("⚠️ No userId found. Dark mode update skipped.");
    }
  };

  // Token expiration check
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token'); // or sessionStorage if you prefer
    if (token) {
      const decoded = jwtDecode(token); // Correct usage of jwtDecode
      const currentTime = Date.now() / 1000; // current time in seconds

      if (decoded.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('token'); // remove expired token
        navigate('/login'); // redirect to login page
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, [navigate]); // Dependency on navigate

  // Check if the current path and remove header
  const hideHeaderAndFooter = location.pathname === '/signup' ||
  location.pathname === '/login' || 
  location.pathname === '/dashboard' || 
  location.pathname === '/success' ||
  location.pathname === '/dashboard/profile' ||
  location.pathname === '/dashboard/Products' ||
  location.pathname === '/dashboard/account-settings' ||
  location.pathname === '/dashboard/account-profile' ||
  location.pathname === '/dashboard/SecuritySettings' ||
  location.pathname === '/dashboard/cart' ||
  location.pathname === '/dashboard/wishlist' ||
  location.pathname === '/admin/products' ||
  location.pathname === '/admin/categories' ||
  matchPath('/admin/product/:productId', location.pathname) ||
  matchPath('/dashboard/product/:id', location.pathname) ||  // This handles dynamic route matching
  (location.pathname === '/dashboard/products' && location.search || location.hash);

 /* another way of doing this
   /* // Hide header/footer on specific routes
  const hideHeaderAndFooter = [
    '/signup', '/login', '/dashboard', '/success', 
    '/dashboard/profile', '/dashboard/products', 
    '/dashboard/account-settings', '/dashboard/account-profile', 
    '/dashboard/security-settings', '/dashboard/cart', 
    '/dashboard/wishlist', '/admin/products', '/admin/categories'
  ].includes(location.pathname) || matchPath('/dashboard/product/:id', location.pathname); */

  return (
      //<div className="App">
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <ScrollToTop /> {/** to scroll to the top when each page is clicked on e.g aboutus is clicked from the homepage */}
        {!hideHeaderAndFooter && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" 
            element={
             <PrivateRoute>
               <Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </PrivateRoute>
            }
          >
              {/* Nested routes under /dashboard */}
              <Route path="profile" element={<Profile darkMode={darkMode} />} />
              <Route path="account-settings" element={<AccountSettings />} />
              <Route path="account-profile" element={<AccProfile />} />
              <Route path="security-settings" element={<SecuritySettings />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<Wishlist />} />
         </Route>
         <Route path="/admin" 
           element={
             <AdminRoute>
                <AdminDashboard />
             </AdminRoute>}>
             <Route path="products" element={<AdminProductPage />} />
             <Route path="categories" element={<AdminCategoryPage />} />
             <Route path="/admin/product/:productId" element={<AdminProductDetailsPage />} />
             <Route path="/admin/product/new" element={<AdminProductDetailsPage />} />
         </Route>
        </Routes>
        {!hideHeaderAndFooter && <Footer />}
        <ToastContainer
        position="top-right" // Position of the toast notifications
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // New toasts appear below older ones
        closeOnClick // Close toast when clicked
        rtl={false} // Left-to-right layout
        pauseOnFocusLoss // Pause toast when window loses focus
        draggable // Allow dragging to dismiss
        pauseOnHover // Pause toast on hover
      />
      </div>
  );
}

export default App;
