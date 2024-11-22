import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';
import './styles/Login.css'; 
import RegainLogo from './styles/src_regainimages/RegainLogo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError('');

    // Basic validation for empty inputs
    if (!emailOrUsername || !password) {
      setError('Please enter both email/username and password.');
      return;
    }


    try {
      const res = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token and user info in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data.user._id,
          role: data.user.role,
        }));
        // Check the user's role and navigate accordingly
        if (data.user && data.user.role === "admin") {
          navigate('/admin');  // Navigate to admin dashboard if the role is 'admin'
        } else if (data.user && data.user.role === "user") {
          navigate('/dashboard');  // Navigate to user dashboard if the role is 'user'
        } else {
        // Optional: Handle other roles or default case if needed
          navigate('/login'); // Redirect to login if the role is not recognized
        }
      } else {
        // Handle the case where login failed (e.g., incorrect credentials)
        setError(data.errors[0].msg);
      }
    } catch (err) {
      setError('Server error, please try again later.');
    }
  };


  return (
    <div className="loginflex-container">
      <div className="loginpage-container">
        <img src={RegainLogo} alt="Logo" className="loginlogo" />
        <h2>Login to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}> 
          <div className="form-grouplogin">
            <label>Email or Username </label>
            <div className="input-wrapperlogin">
              <FontAwesomeIcon icon={faEnvelope} className="input-iconlogin" />
              <input
                type="text"
                placeholder="Email or Username"
                required
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form-grouplogin">
            <label>Password</label>
            <div className="input-wrapperlogin">
              <FontAwesomeIcon icon={faLock} className="input-iconlogin" />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="loginpage-button">Login</button>
        </form>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <div className="login-or-divider">
          <span className="login-dash-line"></span>
          <span className="login-or">or</span>
          <span className="login-dash-line"></span>
        </div>
        <div className="social-login">
          <button className="social-button google"><FontAwesomeIcon icon={faGoogle} /> Google</button>
          <button className="social-button facebook"><FontAwesomeIcon icon={faFacebook} /> Facebook</button>
          <button className="social-button twitter"><FontAwesomeIcon icon={faTwitter} /> Twitter</button>
        </div>
        <p className="signup-prompt">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

