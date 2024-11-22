import { Route, Routes, useLocation, matchPath } from 'react-router-dom';
import './App.css';
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
import ProductDetails from './component/ProductDetails';

function App() {
  const location = useLocation();

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
  location.pathname === '/admin' || 
  location.pathname === '/admin/products' ||
  location.pathname === '/admin/categories' ||
  matchPath('dashboard/product/:id', location.pathname) ||  // This handles dynamic route matching
  (location.pathname === '/dashboard/products' && location.search || location.hash);

 /* another way of doing this
  // Check if the current path is one of the routes where you don't want the footer/header
   const hideHeaderAndFooter = ['/signup', '/login', '/dashboard', '/success', 
   '/dashboard/profile', '/dashboard/products', 
   '/dashboard/account-settings', '/dashboard/account-profile', 
   '/dashboard/security-settings', '/admin', 
   '/admin/products', '/admin/categories', 'product/:id']
   .includes(location.pathname); 
  */

  return (
      <div className="App">
        <ScrollToTop /> {/** to scroll to the top when each page is clicked on e.g aboutus is clicked from the homepage */}
        {!hideHeaderAndFooter && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" 
            element={
             <PrivateRoute>
               <Dashboard />
            </PrivateRoute>
            }
          >
              {/* Nested routes under /dashboard */}
              <Route path="profile" element={<Profile />} />
              <Route path="account-settings" element={<AccountSettings />} />
              <Route path="account-profile" element={<AccProfile />} />
              <Route path="security-settings" element={<SecuritySettings />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductDetails />} />
         </Route>
         <Route path="/admin" 
           element={
             <AdminRoute>
                <AdminDashboard />
             </AdminRoute>}>
             <Route path="products" element={<AdminProductPage />} />
             <Route path="categories" element={<AdminCategoryPage />} />
         </Route>
        </Routes>
        {!hideHeaderAndFooter && <Footer />}
      </div>
  );
}

export default App;
