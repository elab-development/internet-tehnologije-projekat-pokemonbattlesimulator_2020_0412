import React, { useState, useEffect } from 'react';
import './PokemonTips.css';

const PokemonTips = () => {
  const [tip, setTip] = useState('');

  const tips = [
    "Always check your Pokémon's health!",
    "Fire-type Pokémon are strong against Grass-type Pokémon.",
    "Electric-type Pokémon have an advantage over Water-type Pokémon.",
    "Don't forget to level up your Pokémon!",
    "Use potions to heal your Pokémon after a battle."
  ];

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="tip-container">
      <h2>Daily Pokémon Tip</h2>
      <p>{tip}</p>
    </div>
  );
};

export default PokemonTips;
