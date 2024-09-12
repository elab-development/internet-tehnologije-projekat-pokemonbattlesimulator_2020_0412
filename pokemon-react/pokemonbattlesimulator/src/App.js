import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BattlePage from './pages/BattlePage';
import UserProfile from './pages/UserProfile';
import ThemeSettings from './pages/ThemeSettings';
import PokemonList from './pages/PokemonList';
import RankingTable from './pages/RankingTable';
import ItemStore from './pages/ItemStore';
import BattleRules from './pages/BattleRules';
import ArenaPage from './pages/ArenaPage';
import ListOfPokemons from './pages/ListOfPokemons';
import PrivateRoute from './pages/PrivateRoute';
import './App.css';

const App = () => {

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRoles = localStorage.getItem('userRoles');
    
    if (token && userRoles) {
      try {
        const parsedRoles = JSON.parse(userRoles);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user roles:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/battle">Battle</Link></li>
          <li><Link to="/arena">Arena</Link></li>
          <li><Link to="/rankingtable">RankingTable</Link></li>
          <li><Link to="/userprofile">UserProfile</Link></li>
          <li><Link to="/pokemon-list">PokemonList</Link></li>
          <li><Link to="/itemstore">ItemStore</Link></li>
          <li><Link to="/battlerules">BattleRules</Link></li>
          <li><Link to="/themesettings">ThemeSettings</Link></li>
          <li><Link to="/listofpokemons">ListOfPokemons</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/arena" element={<PrivateRoute element={<ArenaPage />} />} />
          <Route path="/rankingtable" element={<RankingTable />} />
          <Route path="/userprofile" element={<PrivateRoute element={<UserProfile />} />} />
          <Route path="/pokemon-list" element={<PokemonList />} />
          <Route path="/itemstore" element={<ItemStore />} />
          <Route path="/battlerules" element={<BattleRules />} />
          <Route path="/themesettings" element={<ThemeSettings />} />
          <Route path="/listofpokemons" element={<ListOfPokemons />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
