import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/SignUp.css'; 


const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Destructuring formData 
  const { firstName, lastName, userName, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  // Handling Form Submission (onSubmit function) 
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    try {
      const res = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          email,
          password
        }),
      });
      
      const data = await res.json();

      if (res.status === 200) {
        navigate('/success'); // Redirect to success page
      } else {
        setErrorMessage(data.errors ? data.errors[0].msg : 'Something went wrong');
      }

    } catch (err) {
      setErrorMessage('Server error, please try again later');
    }
  };

  return (
    <div className="flex-container">
      <div className="signup-container">
        <h2>Register with</h2>
        <div className="social-buttons">
          <button className="social-button google"><FontAwesomeIcon icon={faGoogle} /> Google</button>
          <button className="social-button facebook"><FontAwesomeIcon icon={faFacebook} /> Facebook</button>
          <button className="social-button twitter"><FontAwesomeIcon icon={faTwitter} /> Twitter</button>
        </div>
        <p>or</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="signup-form" onSubmit={onSubmit}>
          <div className="name-group">
            <div className="form-group">
              <label>First Name</label>
             <div className="input-wrapper">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  placeholder="First Name"
                  required
                />
              </div>
            </div>
          <div className="form-group">
            <label>Last Name</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon"/>
              <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  placeholder="Last Name"
                  required
                />
            </div>
          </div>
          </div>
          <div className="form-group">
            <label>Username</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={onChange}
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password (min 8 characters)"
                minLength="8"
                required
              />
            </div>
          </div>
          <button type="submit" className="signpage-button">Sign Up</button>
        </form>
        <p className="terms">
           By creating an account, you agree to the <a href="#terms">Terms of Service</a>. We'll occasionally send you account-related emails.
        </p>
        <p className="login-prompt">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
export default SignUp;
    

