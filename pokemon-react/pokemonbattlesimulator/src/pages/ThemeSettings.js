import React, { useState, useEffect } from 'react';
import './ThemeSettings.css';
import darkTheme from '../assets/images/230713-Frank-Pokemon-Sleep-tease_fsfxcw.gif';
import lightTheme from '../assets/images/297854a82d804a3a15b32f919328254d.gif';

const ThemeSettings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="theme-settings">
      <h1>Theme Settings</h1>
      <div className="theme-options">
        <div
          className={`theme-option ${theme === 'light' ? 'active' : ''}`}
          onClick={() => setTheme('light')}
        >
          <img src={lightTheme} alt="Light Theme" className="theme-image" />
          <button className={`theme-button ${theme === 'light' ? 'active' : ''}`}>Light</button>
        </div>
        <div
          className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => setTheme('dark')}
        >
          <img src={darkTheme} alt="Dark Theme" className="theme-image" />
          <button className={`theme-button ${theme === 'dark' ? 'active' : ''}`}>Dark</button>
        </div>
      </div>
      <div className="additional-info">
        <h2>About Themes</h2>
        <p>Choosing the right theme can make your browsing experience more enjoyable and comfortable. Whether you prefer a light or dark mode, we've got you covered!</p>
        <p>Feel free to switch between themes to find the one that suits you best.</p>
        <p>For any feedback or questions, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
      </div>
    </div>
  );
};

export default ThemeSettings;




