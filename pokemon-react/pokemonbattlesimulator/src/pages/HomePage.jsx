import React, { useState } from 'react';
import './HomePage.css'; 
import backgroundImage from './looped-pokémon-battle.gif';
import PokemonTips from './PokemonTips';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [selectedQuote, setSelectedQuote] = useState('');

  const handleSelectChange = (event) => {
    setSelectedQuote(event.target.value);
  };

  const navigate = useNavigate();

const handleStartBattle = () => {
  navigate('/battle');
};


  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="home-header">
        <h1 className="header-title">Welcome to the Pokémon Battle Simulator</h1>
        <PokemonTips />
        <p className="header-subtitle">Choose your Pokémon, train them, and battle against others!</p>
        <button className="cta-button" onClick={handleStartBattle}>Start Battle</button>
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
      <div className="quote-selection">
        <h2>Are You Ready for Battle?</h2>
        <div className="ready-form">
          <select onChange={handleSelectChange} value={selectedQuote}>
            <option value="">Select an option...</option>
            <option value="I choose you!">I choose you!</option>
            <option value="Prepare for trouble!">Prepare for trouble!</option>
            <option value="Make it double!">Make it double!</option>
            <option value="Pikachu, I choose you!">Pikachu, I choose you!</option>
            <option value="Time to battle!">Time to battle!</option>
          </select>
        </div>
        {selectedQuote && (
          <div className="confirmation">
            <p>You selected: "{selectedQuote}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
