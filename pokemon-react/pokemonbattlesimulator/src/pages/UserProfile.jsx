import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fakeUserData = {
      id: 1,
      username: 'User',
      level: 15,
      battles: 45,
      wins: 30,
      losses: 15,
      evolvedPokemon: ['Raichu', 'Charizard'],
      history: [
        'Pikachu vs Bulbasaur',
        'Charizard vs Blastoise',
        'Pikachu vs Charmander',
        'Bulbasaur vs Squirtle',
        'Charizard vs Charmeleon',
        'Pikachu vs Snorlax',
        'Charizard vs Gyarados',
        'Bulbasaur vs Vileplume'
      ],
      avatar: '',
      pokemon: ['Pikachu', 'Charizard', 'Bulbasaur']
    };

    setTimeout(() => setUserData(fakeUserData), 2000);
  }, []);

  if (!userData) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="profile-container">
      {userData.avatar ? (
        <img src={userData.avatar} alt="Profile Avatar" className="profile-avatar" />
      ) : (
        <div className="profile-avatar profile-avatar-default">
          {userData.username.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="profile-info">
        <h1>{userData.username}</h1>
        <p>Level: {userData.level}</p>
        <p>Wins: {userData.wins}</p>
        <p>Losses: {userData.losses}</p>
        <p>Total Battles: {userData.battles}</p>
      </div>

      <div className="pokemon-section">
        <h2>My Pokémon:</h2>
        <ul className="pokemon-list">
          {userData.pokemon.length > 0 ? (
            userData.pokemon.map((poke, index) => (
              <li key={index} className="pokemon-item">
                <Link to="/pokemon-list">{poke}</Link>
              </li>
            ))
          ) : (
            <li className="pokemon-item">You have no Pokémon</li>
          )}
        </ul>
      </div>

      <div className="pokemon-section">
        <h2>Evolved Pokémon:</h2>
        <ul className="pokemon-list">
          {userData.evolvedPokemon.length > 0 ? (
            userData.evolvedPokemon.map((poke, index) => (
              <li key={index} className="pokemon-item">
                {poke}
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${Math.floor(Math.random() * 100)}%` }}></div>
                </div>
              </li>
            ))
          ) : (
            <li className="pokemon-item">You have no evolved Pokémon</li>
          )}
        </ul>
      </div>

      <div className="battle-history">
        <h2>Recent Battles:</h2>
        <div className="battle-history-content">
          <ul>
            {userData.history.slice(0, 5).map((battle, index) => (
              <li key={index} className="battle-item">{battle}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
