import React, { useState, useEffect } from 'react';
import './PokemonTips.css';

const PokemonTips = () => {
  const [tip, setTip] = useState('');

  const tips = [
    'Uvek proveravajte zdravlje vašeg Pokémona!',
    'Pokémoni tipa Vatra su jaki protiv Pokémona tipa Trava.',
    'Pokémoni tipa Elektricitet imaju prednost nad Pokémonima tipa Voda.',
    'Ne zaboravite da unapređujete nivo vaših Pokémona!',
    'Koristite napitke da izlečite vašeg Pokémona posle bitke.'
  ];

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="tip-container">
      <h2>Savet dana za Pokémone</h2>
      <p>{tip}</p>
    </div>
  );
};

export default PokemonTips;
