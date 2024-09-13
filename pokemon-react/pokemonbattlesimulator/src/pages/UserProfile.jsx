import React, { useState, useEffect } from 'react';
import './UserProfile.css'; 

const UserProfile = () => {
    const [user, setUser] = useState({
        name: '',
        level: 0,
        battles: 0,
        wins: 0,
        losses: 0
    });
    const [recentWins, setRecentWins] = useState([]);
    const [randomPokemonList, setRandomPokemonList] = useState([]);

    const pokemonEvolutionStages = {
      'Pikachu': ['Pichu', 'Pikachu', 'Raichu'],
      'Charmander': ['Charmander', 'Charmeleon', 'Charizard'],
      'Mewtwo': ['Mewtwo (Stage 1)', 'Mewtwo (Mega X)', 'Mewtwo (Mega Y)'],
      'Eevee': ['Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon', 'Sylveon']
  };

    
    const pokemonNames = {
        2: 'Pikachu',
        3: 'Charmander',
        16: 'Mewtwo',
        17: 'Eevee'
    };

    
    const generateRandomUserData = () => {
        const randomLevel = Math.floor(Math.random() * 100) + 1;
        const randomBattles = Math.floor(Math.random() * 50) + 1;
        const randomWins = Math.floor(Math.random() * randomBattles);
        const randomLosses = randomBattles - randomWins;

        return {
            name: `Trainer${Math.floor(Math.random() * 1000)}`,
            level: randomLevel,
            battles: randomBattles,
            wins: randomWins,
            losses: randomLosses
        };
    };

    
    const generateRandomPokemonList = () => {
      const pokemons = ['Pikachu', 'Charmander', 'Mewtwo', 'Eevee'];
      const randomList = [];

      for (let i = 0; i < 3; i++) {
          const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
          const progress = Math.floor(Math.random() * 101); 
          const stages = pokemonEvolutionStages[randomPokemon];
          const evolutionStage = getEvolutionStage(progress, stages);
          randomList.push({
              name: randomPokemon,
              progress: progress,
              evolutionStage: evolutionStage
          });
      }

      return randomList;
  };

 
  const getEvolutionStage = (progress, stages) => {
      if (progress < 33) {
          return stages[0];
      } else if (progress < 66) {
          return stages[1];
      } else {
          return stages[stages.length - 1]; 
      }
  };

  
  const fetchRecentWins = async () => {
      const response = await fetch(`http://localhost:8000/api/battles/wins/pokemon/Pokemon1`); 
      const data = await response.json();
      setRecentWins(data);
  };

  useEffect(() => {
      
      setUser(generateRandomUserData());
      
      setRandomPokemonList(generateRandomPokemonList());
     
      fetchRecentWins();
  }, []);

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
};

  return (
    <div className="user-profile">
          <h1>{user.name}'s Profile</h1>
          <div className="profile-image">{getInitial(user.name)}</div>
          <p>Level: {user.level}</p>
          <p>Total Battles: {user.battles}</p>
          <p>Wins: {user.wins}</p>
          <p>Losses: {user.losses}</p>

        <h2>Pokemons</h2>
        <ul className="profile-list">
            {randomPokemonList.length > 0 ? (
                randomPokemonList.map((pokemon, index) => (
                    <li key={index}>
                        {pokemon.name} (Evolution Stage: {pokemon.evolutionStage})
                        <div className="progress-bar">
                            <progress value={pokemon.progress} max="100"></progress>
                            <span>{pokemon.progress}% progress to next stage</span>
                        </div>
                    </li>
                ))
            ) : (
                <p>No Pokémon data available.</p>
            )}
        </ul>

        <h2>Recent Wins</h2>
        <ul className="profile-list">
            {recentWins.length > 0 ? (
                recentWins.map((win, index) => (
                    <li key={index}>
                        Location: {win.location}, Opponent: {pokemonNames[win.pokemon2_id] || `Unknown (ID: ${win.pokemon2_id})`}, Duration: {win.battle_duration}
                    </li>
                ))
            ) : (
                <p>No recent wins found.</p>
            )}
        </ul>
    </div>
);
};

export default UserProfile;
