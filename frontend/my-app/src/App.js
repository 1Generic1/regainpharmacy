import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './component/Header.js';
import Home from './component/Home.js';
import Footer from './component/Footer.js';
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

function App() {
  const location = useLocation();

  // Check if the current path and remove header
  const isSignUpOrLoginPage = location.pathname === '/signup' ||
  location.pathname === '/login' || 
  location.pathname === '/dashboard' || 
  location.pathname === '/success' ||
  location.pathname === '/profile' ||
  location.pathname === '/Products' ||
  location.pathname === '/account-settings' ||
  location.pathname === '/account-profile' ||
  location.pathname === '/SecuritySettings' ||
  location.pathname === '/admin'


  return (
      <div className="App">
        <ScrollToTop /> {/** to scroll to the top when each page is clicked on e.g aboutus is clicked from the homepage */}
        {!isSignUpOrLoginPage && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
         />
         <Route
            path="/account-settings"
            element={
              <PrivateRoute>
                <AccountSettings  />
              </PrivateRoute>
            }
         />
          <Route
            path="/account-profile"
            element={
              <PrivateRoute>
                <AccProfile />
              </PrivateRoute>
            }
         />
          <Route
            path="/SecuritySettings"
            element={
              <PrivateRoute>
                <SecuritySettings />
              </PrivateRoute>
            }
         />
         <Route
            path="/Products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
         />
         <Route path="/admin" 
           element={
             <AdminRoute>
                <AdminDashboard />
             </AdminRoute>}>
             <Route path="products" element={<AdminProductPage />} />
           <Route path="categories" element={<AdminCategoryPage />} />
         </Route>
        </Routes>
        {!isSignUpOrLoginPage && <Footer />}
      </div>
  );
}

export default App;
