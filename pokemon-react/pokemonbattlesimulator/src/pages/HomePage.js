import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Pokémon Battle Simulator</h1>
        <p>Get ready for the ultimate battle experience!</p>
        <button className="cta-button">Start Battle</button>
      </div>
      <div className="info-section">
        <div className="info-card">
          <h3>Feature 1</h3>
          <p>Description of feature 1.</p>
        </div>
        <div className="info-card">
          <h3>Feature 2</h3>
          <p>Description of feature 2.</p>
        </div>
      </div>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Toggle Theme
      </button>
    </div>
  );
};

export default HomePage;




