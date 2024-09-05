import React from 'react';
import './HomePage.css'; 
import backgroundImage from './looped-pokémon-battle.gif';

const HomePage = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="home-header">
        <h1 className="header-title">Welcome to the Pokémon Battle Simulator</h1>
        <p className="header-subtitle">Choose your Pokémon, train them, and battle against others!</p>
        <button className="cta-button">Start Battle</button>
      </header>
      <section className="info-section">
        <div className="info-card">
          <h2>Train Your Pokémon</h2>
          <p>Enhance your Pokémon's abilities and get them ready for battle.</p>
        </div>
        <div className="info-card">
          <h2>Battle Others</h2>
          <p>Challenge other players and prove your Pokémon's strength.</p>
        </div>
        <div className="info-card">
          <h2>Track Your Progress</h2>
          <p>Monitor your Pokémon's growth and battle statistics.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;



