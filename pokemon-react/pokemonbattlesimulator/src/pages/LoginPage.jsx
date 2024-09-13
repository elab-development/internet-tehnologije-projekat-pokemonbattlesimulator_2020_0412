import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logoImage from './PoK-MoN-Battle-Simulator-9-5-2024-transformed.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Notifications from './Notifications';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setNotifications([...notifications, { message: 'Email is required.', type: 'error' }]);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/password/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setNotifications([...notifications, { message: 'Password reset link sent to your email.', type: 'success' }]);
        setForgotPassword(false);
        setResetPassword(true); 
      } else {
        setNotifications([...notifications, { message: data.email || 'Unable to send reset link.', type: 'error' }]);
      }
    } catch (error) {
      setNotifications([...notifications, { message: 'An error occurred. Please try again later.', type: 'error' }]);
    }
  };

  const handleResetPassword = async () => {
    if (!token || !newPassword || newPassword !== confirmPassword) {
      setNotifications([...notifications, { message: 'All fields are required and passwords must match.', type: 'error' }]);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, password: newPassword, password_confirmation: confirmPassword }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setNotifications([...notifications, { message: 'Password has been reset successfully!', type: 'success' }]);
        setResetPassword(false);
        navigate('/'); 
      } else {
        setNotifications([...notifications, { message: data.message || 'Password reset failed. Try again.', type: 'error' }]);
      }
    } catch (error) {
      setNotifications([...notifications, { message: 'An error occurred. Please try again later.', type: 'error' }]);
    }
  };

  const handleSignUp = async () => {
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    const password_confirmation = prompt('Confirm your password:');
  
    if (!name || !email || !password || !password_confirmation) {
      setNotifications([...notifications, { message: 'All fields are required.', type: 'error' }]);
      return;
    }
  
    if (password !== password_confirmation) {
      setNotifications([...notifications, { message: 'Passwords do not match.', type: 'error' }]);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation: password_confirmation }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setNotifications([...notifications, { message: 'Registration successful! You are now logged in.', type: 'success' }]);
        navigate('/');
      } else {
        setNotifications([...notifications, { message: data.message || 'Registration failed. Please try again.', type: 'error' }]);
      }
    } catch (error) {
      setNotifications([...notifications, { message: 'An error occurred. Please try again later.', type: 'error' }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include',
      });

      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userRoles', JSON.stringify(data.roles));
        navigate('/');
      } else {
        setNotifications([...notifications, { message: data.message || 'Login failed! Please check your credentials.', type: 'error' }]);
      }
    } catch (error) {
      setNotifications([...notifications, { message: 'An error occurred. Please try again later.', type: 'error' }]);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      localStorage.removeItem('authToken');
      localStorage.removeItem('userRoles');
      navigate('/');
    } catch (error) {
      setNotifications([...notifications, { message: 'An error occurred during logout. Please try again later.', type: 'error' }]);
    }
  };

  const removeNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="logo-container">
        <img src={logoImage} alt="Pokémon Battle Simulator" className="logo-image" />
      </div>
      <div className="form-wrapper">
        <form className={`login-form ${theme}`} onSubmit={handleSubmit}>
          {resetPassword ? (
            <div className="form-group">
              <h2>Reset Password</h2>
              <input
                type="text"
                placeholder="Enter token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className={`form-control ${theme}`}
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`form-control ${theme}`}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-control ${theme}`}
              />
              <button type="button" onClick={handleResetPassword} className={`submit-button ${theme}`}>
                Reset Password
              </button>
            </div>
          ) : forgotPassword ? (
            <div className="form-group">
              <h2>Forgot Password?</h2>
              <p>Please enter your email to receive password reset instructions.</p>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${theme}`}
              />
              <button type="button" onClick={handleForgotPassword} className={`submit-button ${theme}`}>
                Submit
              </button>
              <p className="extra-option-link" onClick={() => setForgotPassword(false)}>Back to Login</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${theme}`}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-control ${theme}`}
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button type="submit" className={`submit-button ${theme}`}>
                Login
              </button>
              <p className="extra-option-link" onClick={() => setForgotPassword(true)}>Forgot Password?</p>
            </>
          )}
        </form>
        <button onClick={handleSignUp} className={`submit-button sign-up-button ${theme}`}>
  Sign Up
</button>
<button onClick={handleLogout} className={`submit-button logout-button ${theme}`}>
  Log Out
</button>
      </div>
      <Notifications notifications={notifications} removeNotification={removeNotification} />
      <div className="footer">
      <p>© 2024 Pokémon Battle Simulator. All Rights Reserved.</p>
    </div>
  </div>
    
  );
};

export default LoginPage;
