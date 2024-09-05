import React from 'react';
import './BattlePage.css'; 

const BattlePage = () => {
  return (
    <div className="battle-container">
      <h1>Battle Page</h1>
      <p>Select your Pokémon and start the battle!</p>
      <button className="battle-button">Start Battle</button>
    </div>
  );
};

export default BattlePage;

