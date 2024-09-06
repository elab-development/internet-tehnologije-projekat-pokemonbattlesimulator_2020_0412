import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import logoImage from './PoK-MoN-Battle-Simulator-9-5-2024-transformed.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleSignUp = () => {
    
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="logo-container">
        <img src={logoImage} alt="Pokémon Battle Simulator" className="logo-image" />
      </div>
      <div className="form-wrapper">
        <form className={`login-form ${theme}`}>
          {forgotPassword ? (
            <div className="form-group">
              <h2>Forgot Password?</h2>
              <p>Please enter your email to receive password reset instructions.</p>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${theme}`}
                placeholder="Your email"
              />
              <button type="submit" className={`submit-button ${theme}`}>Submit</button>
              <p className="extra-option-link" onClick={() => setForgotPassword(false)}>Back to Login</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" className={`form-control ${theme}`} />
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
              <button type="submit" className={`submit-button ${theme}`}>Login</button>
              <div className="extra-options">
                <p className="forgot-link" onClick={handleForgotPassword}>Forgot your password?</p>
                <button type="button" className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
              </div>
            </>
          )}
        </form>
      </div>
      <footer className={`footer ${theme}`}>
        <p>&copy; 2024 Pokémon Battle Simulator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;












