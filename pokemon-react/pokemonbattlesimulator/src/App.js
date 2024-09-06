import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BattlePage from './pages/BattlePage';
import ThemeSettings from './pages/ThemeSettings';
import './App.css';


const App = () => {

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/battle">Battle</Link>
          </li>
          <li>
            <Link to="/themesettings">ThemeSettings</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/themesettings" element={<ThemeSettings />} />
      </Routes>
    </Router>
  );
};

export default App;



