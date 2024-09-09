import React, { useState } from 'react';
import usePokemonList from './hooks/usePokemonList';
import './PokemonList.css'; 

const initialPokemons = [
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
  { id: 16, name: 'Pikachu', stats: 'HP: 35, Attack: 55, Defense: 40', abilities: ['Static', 'Lightning Rod'] },
  { id: 17, name: 'Charizard', stats: 'HP: 78, Attack: 84, Defense: 78', abilities: ['Blaze', 'Solar Power'] },
  { id: 18, name: 'Eevee', stats: 'HP: 55, Attack: 40, Defense: 50', abilities: ['Run Away', 'Adaptability'] },
  { id: 19, name: 'Snorlax', stats: 'HP: 160, Attack: 110, Defense: 65', abilities: ['Immunity', 'Thick Fat'] },
  { id: 20, name: 'Gengar', stats: 'HP: 60, Attack: 65, Defense: 60', abilities: ['Levitate'] },
  { id: 21, name: 'Mewtwo', stats: 'HP: 106, Attack: 110, Defense: 90', abilities: ['Pressure', 'Unnerve'] },
  { id: 22, name: 'Vulpix', stats: 'HP: 38, Attack: 41, Defense: 40', abilities: ['Flash Fire', 'Drought'] },
  { id: 23, name: 'Sandshrew', stats: 'HP: 50, Attack: 75, Defense: 85', abilities: ['Sand Veil', 'Sand Rush'] },
  { id: 24, name: 'Doduo', stats: 'HP: 35, Attack: 85, Defense: 45', abilities: ['Run Away', 'Early Bird'] },
  { id: 25, name: 'Seel', stats: 'HP: 65, Attack: 45, Defense: 55', abilities: ['Ice Body', 'Hydration'] },
  { id: 26, name: 'Grimer', stats: 'HP: 80, Attack: 80, Defense: 50', abilities: ['Sticky Hold', 'Poison Touch'] },
];

const PokemonList = () => {
  const { pokemons, addPokemon } = usePokemonList(initialPokemons);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAbility, setSelectedAbility] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(5);

  
  const [newPokemonName, setNewPokemonName] = useState('');
  const [newPokemonStats, setNewPokemonStats] = useState({
    hp: '',
    attack: '',
    defense: ''
  });
  const [newPokemonAbilities, setNewPokemonAbilities] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleAbilityChange = (e) => {
    setSelectedAbility(e.target.value);
    setCurrentPage(1); 
  };

  const handleAddPokemon = () => {
    if (newPokemonName && newPokemonStats.hp && newPokemonStats.attack && newPokemonStats.defense) {
      addPokemon({
        name: newPokemonName,
        stats: `HP: ${newPokemonStats.hp}, Attack: ${newPokemonStats.attack}, Defense: ${newPokemonStats.defense}`,
        abilities: newPokemonAbilities.split(',').map(ability => ability.trim())
      });
      
      setNewPokemonName('');
      setNewPokemonStats({ hp: '', attack: '', defense: '' });
      setNewPokemonAbilities('');
    }
  };

  const filteredPokemons = pokemons.filter(pokemon => 
    (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedAbility === '' || pokemon.abilities.includes(selectedAbility))
  );

 
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div className="pokemon-form">
        <h2>Add New Pokémon</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={newPokemonName}
          onChange={(e) => setNewPokemonName(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="HP" 
          value={newPokemonStats.hp}
          onChange={(e) => setNewPokemonStats({...newPokemonStats, hp: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Attack" 
          value={newPokemonStats.attack}
          onChange={(e) => setNewPokemonStats({...newPokemonStats, attack: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Defense" 
          value={newPokemonStats.defense}
          onChange={(e) => setNewPokemonStats({...newPokemonStats, defense: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Abilities (comma separated)" 
          value={newPokemonAbilities}
          onChange={(e) => setNewPokemonAbilities(e.target.value)}
        />
        <button onClick={handleAddPokemon}>Add Pokémon</button>
      </div>
      <div className="pokemon-filters">
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={selectedAbility} onChange={handleAbilityChange}>
          <option value="">All Abilities</option>
          {Array.from(new Set(pokemons.flatMap(p => p.abilities))).map(ability => (
            <option key={ability} value={ability}>{ability}</option>
          ))}
        </select>
      </div>
      <ul className="pokemon-list">
        {currentPokemons.map(pokemon => (
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
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredPokemons.length / pokemonsPerPage) }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
