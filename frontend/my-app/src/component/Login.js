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
        localStorage.setItem('token', data.token) // Save token in local storage
        navigate('/dashboard');
      } else {
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
