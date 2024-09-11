import { useState, useEffect } from 'react';

// Definišemo neki inicijalni niz pokemona
const initialPokemons = [
  { id: 1, name: 'Bulbasaur', stats: 'HP: 45, Attack: 49, Defense: 49', abilities: ['Overgrow', 'Chlorophyll'], type: 'Grass', attack: 49 },
  { id: 2, name: 'Charmander', stats: 'HP: 39, Attack: 52, Defense: 43', abilities: ['Blaze', 'Solar Power'], type: 'Fire', attack: 52 },
  { id: 3, name: 'Squirtle', stats: 'HP: 44, Attack: 48, Defense: 65', abilities: ['Torrent', 'Rain Dish'], type: 'Water', attack: 48 },
  { id: 4, name: 'Pidgey', stats: 'HP: 40, Attack: 45, Defense: 40', abilities: ['Keen Eye', 'Tangled Feet'], type: 'Flying', attack: 45 },
  { id: 5, name: 'Rattata', stats: 'HP: 30, Attack: 56, Defense: 35', abilities: ['Run Away', 'Guts'], type: 'Normal', attack: 56 },
  { id: 6, name: 'Jigglypuff', stats: 'HP: 115, Attack: 45, Defense: 20', abilities: ['Cute Charm', 'Competitive'], type: 'Normal', attack: 45 },
  { id: 7, name: 'Zubat', stats: 'HP: 40, Attack: 45, Defense: 35', abilities: ['Inner Focus', 'Infiltrator'], type: 'Poison', attack: 45 },
  { id: 8, name: 'Diglett', stats: 'HP: 10, Attack: 55, Defense: 25', abilities: ['Ground', 'Sand Veil'], type: 'Ground', attack: 55 },
  { id: 9, name: 'Meowth', stats: 'HP: 40, Attack: 45, Defense: 35', abilities: ['Pickup', 'Technician'], type: 'Normal', attack: 45 },
  { id: 10, name: 'Psyduck', stats: 'HP: 50, Attack: 52, Defense: 48', abilities: ['Damp', 'Cloud Nine'], type: 'Water', attack: 52 },
  { id: 11, name: 'Machop', stats: 'HP: 70, Attack: 80, Defense: 50', abilities: ['Guts', 'No Guard'], type: 'Fighting', attack: 80 },
  { id: 12, name: 'Magnemite', stats: 'HP: 25, Attack: 35, Defense: 70', abilities: ['Magnet Pull', 'Sturdy'], type: 'Electric', attack: 35 },
  { id: 13, name: 'Farfetch\'d', stats: 'HP: 52, Attack: 65, Defense: 55', abilities: ['Keen Eye', 'Inner Focus'], type: 'Normal', attack: 65 },
  { id: 14, name: 'Poliwag', stats: 'HP: 40, Attack: 50, Defense: 40', abilities: ['Water Absorb', 'Damp'], type: 'Water', attack: 50 },
  { id: 15, name: 'Alakazam', stats: 'HP: 55, Attack: 50, Defense: 45', abilities: ['Synchronize', 'Inner Focus'], type: 'Psychic', attack: 50 },
  { id: 16, name: 'Pikachu', stats: 'HP: 35, Attack: 55, Defense: 40', abilities: ['Static', 'Lightning Rod'], type: 'Electric', attack: 55 },
  { id: 17, name: 'Charizard', stats: 'HP: 78, Attack: 84, Defense: 78', abilities: ['Blaze', 'Solar Power'], type: 'Fire', attack: 84 },
  { id: 18, name: 'Eevee', stats: 'HP: 55, Attack: 40, Defense: 50', abilities: ['Run Away', 'Adaptability'], type: 'Normal', attack: 40 },
  { id: 19, name: 'Snorlax', stats: 'HP: 160, Attack: 110, Defense: 65', abilities: ['Immunity', 'Thick Fat'], type: 'Normal', attack: 110 },
  { id: 20, name: 'Gengar', stats: 'HP: 60, Attack: 65, Defense: 60', abilities: ['Levitate'], type: 'Ghost', attack: 65 },
  { id: 21, name: 'Mewtwo', stats: 'HP: 106, Attack: 110, Defense: 90', abilities: ['Pressure', 'Unnerve'], type: 'Psychic', attack: 110 },
  { id: 22, name: 'Vulpix', stats: 'HP: 38, Attack: 41, Defense: 40', abilities: ['Flash Fire', 'Drought'], type: 'Fire', attack: 41 },
  { id: 23, name: 'Sandshrew', stats: 'HP: 50, Attack: 75, Defense: 85', abilities: ['Sand Veil', 'Sand Rush'], type: 'Ground', attack: 75 },
  { id: 24, name: 'Doduo', stats: 'HP: 35, Attack: 85, Defense: 45', abilities: ['Run Away', 'Early Bird'], type: 'Normal', attack: 85 },
  { id: 25, name: 'Seel', stats: 'HP: 65, Attack: 45, Defense: 55', abilities: ['Ice Body', 'Hydration'], type: 'Water', attack: 45 },
  { id: 26, name: 'Grimer', stats: 'HP: 80, Attack: 80, Defense: 50', abilities: ['Sticky Hold', 'Poison Touch'], type: 'Poison', attack: 80 },
];

const getUniqueTypes = (pokemons) => {
  const types = pokemons.map(pokemon => pokemon.type);
  return [...new Set(types)];
};

const usePokemonList = () => {
  const [pokemons, setPokemons] = useState(initialPokemons);

  const addPokemon = (newPokemon) => {
    setPokemons(prevPokemons => [newPokemon, ...prevPokemons]);
  };

  const uniqueTypes = getUniqueTypes(pokemons);

  return { pokemons, addPokemon, uniqueTypes };
};

export default usePokemonList;
