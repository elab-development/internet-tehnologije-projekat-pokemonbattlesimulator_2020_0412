import React, { useState, useEffect } from 'react';
import './PokemonList.css'; 


const mockPokemons = [
  { id: 1, name: 'Bulbasaur', stats: 'HP: 45, Attack: 49, Defense: 49', abilities: ['Overgrow', 'Chlorophyll'] },
  { id: 2, name: 'Charmander', stats: 'HP: 39, Attack: 52, Defense: 43', abilities: ['Blaze', 'Solar Power'] },
  { id: 3, name: 'Squirtle', stats: 'HP: 44, Attack: 48, Defense: 65', abilities: ['Torrent', 'Rain Dish'] },
  { id: 4, name: 'Pidgey', stats: 'HP: 40, Attack: 45, Defense: 40', abilities: ['Keen Eye', 'Tangled Feet'] },
  { id: 5, name: 'Rattata', stats: 'HP: 30, Attack: 56, Defense: 35', abilities: ['Run Away', 'Guts'] },
  { id: 6, name: 'Jigglypuff', stats: 'HP: 115, Attack: 45, Defense: 20', abilities: ['Cute Charm', 'Competitive'] },
  { id: 7, name: 'Zubat', stats: 'HP: 40, Attack: 45, Defense: 35', abilities: ['Inner Focus', 'Infiltrator'] },
  { id: 8, name: 'Diglett', stats: 'HP: 10, Attack: 55, Defense: 25', abilities: ['Ground', 'Sand Veil'] },
  { id: 9, name: 'Meowth', stats: 'HP: 40, Attack: 45, Defense: 35', abilities: ['Pickup', 'Technician'] },
  { id: 10, name: 'Psyduck', stats: 'HP: 50, Attack: 52, Defense: 48', abilities: ['Damp', 'Cloud Nine'] },
  { id: 11, name: 'Machop', stats: 'HP: 70, Attack: 80, Defense: 50', abilities: ['Guts', 'No Guard'] },
  { id: 12, name: 'Magnemite', stats: 'HP: 25, Attack: 35, Defense: 70', abilities: ['Magnet Pull', 'Sturdy'] },
  { id: 13, name: 'Farfetch\'d', stats: 'HP: 52, Attack: 65, Defense: 55', abilities: ['Keen Eye', 'Inner Focus'] },
  { id: 14, name: 'Poliwag', stats: 'HP: 40, Attack: 50, Defense: 40', abilities: ['Water Absorb', 'Damp'] },
  { id: 15, name: 'Alakazam', stats: 'HP: 55, Attack: 50, Defense: 45', abilities: ['Synchronize', 'Inner Focus'] },
 
];

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
   
    setPokemons(mockPokemons);
  }, []);

  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(fav => fav.id === pokemon.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== pokemon.id);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  };

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list-container">
      <div className="pokemon-header">
        </div>
      <ul className="pokemon-list">
        {pokemons.map(pokemon => (
          <li key={pokemon.id} className="pokemon-items">
            <h2>{pokemon.name}</h2>
            <p>Stats: {pokemon.stats}</p>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
            <button onClick={() => toggleFavorite(pokemon)}>
              {favorites.some(fav => fav.id === pokemon.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default PokemonList;
