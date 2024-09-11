import React, { useState, useEffect } from 'react';
import usePokemonList from './hooks/usePokemonList';
import './PokemonList.css';
import { useNavigate } from 'react-router-dom';

const PokemonList = () => {
  const navigate = useNavigate();
  const { pokemons, addPokemon } = usePokemonList();
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAbility, setSelectedAbility] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minAttack, setMinAttack] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(5);
  const [types, setTypes] = useState([]);
  const [showTypes, setShowTypes] = useState(false);
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    abilities: '',
    type: ''
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRoles = localStorage.getItem('userRoles');
    
    if (token && userRoles) {
      try {
        const parsedRoles = JSON.parse(userRoles);
        setIsAuthenticated(true);
        setIsAdmin(parsedRoles.includes('admin'));
      } catch (error) {
        console.error('Error parsing user roles:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [navigate]);

  useEffect(() => {
    const uniqueTypes = getUniqueTypes(pokemons);
    setTypes(uniqueTypes);
  }, [pokemons]);

  const getUniqueTypes = (pokemons) => {
    const types = pokemons.flatMap(pokemon => pokemon.type.split(','));
    return [...new Set(types)];
  };

  const toggleFavorite = (pokemon) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === pokemon.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== pokemon.id);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  };

  // Filtriranje pokemona
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) && // Pretraga po imenu
    (selectedAbility === '' || pokemon.abilities.includes(selectedAbility)) && // Pretraga po ability-ju
    (selectedType === '' || pokemon.type.includes(selectedType)) && // Pretraga po tipu
    (minAttack === '' || pokemon.attack >= parseInt(minAttack)) // Pretraga po minimalnom napadu
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPokemon(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddPokemon = (e) => {
    e.preventDefault();
    addPokemon({
      id: Date.now(),
      name: newPokemon.name,
      stats: `HP: ${newPokemon.hp}, Attack: ${newPokemon.attack}, Defense: ${newPokemon.defense}`,
      abilities: newPokemon.abilities.split(',').map(ability => ability.trim()),
      type: newPokemon.type,
      attack: parseInt(newPokemon.attack, 10)
    });
    setNewPokemon({
      name: '',
      hp: '',
      attack: '',
      defense: '',
      abilities: '',
      type: ''
    });
  };

  const handleShowTypes = () => {
    setShowTypes(!showTypes);
  };

  return (
    <div className="pokemon-list-container">
      {/* Forma za dodavanje pokemona vidljiva samo za admina */}
      {isAuthenticated && isAdmin && (
        <div className="pokemon-form">
          <h2>Add New Pokémon</h2>
          <form onSubmit={handleAddPokemon}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newPokemon.name}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="hp">HP:</label>
            <input
              type="number"
              id="hp"
              name="hp"
              value={newPokemon.hp}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="attack">Attack:</label>
            <input
              type="number"
              id="attack"
              name="attack"
              value={newPokemon.attack}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="defense">Defense:</label>
            <input
              type="number"
              id="defense"
              name="defense"
              value={newPokemon.defense}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="abilities">Abilities (comma separated):</label>
            <input
              type="text"
              id="abilities"
              name="abilities"
              value={newPokemon.abilities}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={newPokemon.type}
              onChange={handleFormChange}
              required
            />

            <button type="submit">Add Pokémon</button>
          </form>
        </div>
      )}

      {/* Prikaz pokemona, filtera i pretrage za sve korisnike */}
      <>
        {/* Filteri */}
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setSelectedAbility(e.target.value)} value={selectedAbility}>
          <option value="">Select Ability</option>
          {['Overgrow', 'Blaze', 'Torrent', 'Keen Eye', 'Run Away', 'Cute Charm', 'Inner Focus'].map(ability => (
            <option key={ability} value={ability}>{ability}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
          <option value="">Select Type</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Attack"
          value={minAttack}
          onChange={(e) => setMinAttack(e.target.value)}
        />

        <button onClick={handleShowTypes}>Get Types</button>
        {showTypes && (
          <div className="types-list">
            <h3>Available Types</h3>
            <ul>
              {types.map(type => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="pokemon-list">
          {/* Prikazi sve pokemone za goste (bez paginacije) */}
          {(isAuthenticated ? currentPokemons : filteredPokemons).map(pokemon => (
            <div key={pokemon.id} className="pokemon-card">
              <h3>{pokemon.name}</h3>
              <p>{pokemon.stats}</p>
              <p>Abilities: {pokemon.abilities.join(', ')}</p>
              <p>Type: {pokemon.type}</p>
              {/* Prikazi dugme za favorite samo za autentifikovane korisnike */}
              {isAuthenticated && (
                <button onClick={() => toggleFavorite(pokemon)}>
                  {favorites.some(fav => fav.id === pokemon.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              )}
            </div>
          ))}
        </div>
      </>

      {/* Paginacija (samo za registrovane korisnike) */}
      {isAuthenticated && (
        <nav>
          <ul className="pagination">
            {Array(Math.ceil(filteredPokemons.length / pokemonsPerPage))
              .fill()
              .map((_, index) => (
                <li key={index} className="page-item">
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default PokemonList;
