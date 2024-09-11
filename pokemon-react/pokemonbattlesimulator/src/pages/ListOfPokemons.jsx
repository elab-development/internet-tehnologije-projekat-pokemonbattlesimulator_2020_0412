import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListOfPokemons.css';  

const ListOfPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const token = localStorage.getItem('authToken'); 

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pokemon-data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPokemons(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [token]);

  return (
    <div className="pokemon-list-container">
      <h1>Pokémon List</h1>
      <div className="api-info">
        <h2>About PokéAPI</h2>
        <p>
          PokéAPI is a free public API that provides comprehensive data about Pokémon. 
          It includes information on Pokémon species, abilities, moves, habitats, and more.
        </p>
        <p>
          <strong>API Call:</strong><br />
          URL: <a href="https://pokeapi.co/api/v2/pokemon?limit=10" target="_blank" rel="noopener noreferrer">https://pokeapi.co/api/v2/pokemon?limit=10</a><br />
          This endpoint returns data for the first 10 Pokémon.
        </p>
        <p>
          <strong>Response Structure:</strong><br />
          - <code>results</code>: An array of objects, where each object contains:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;- <code>name</code>: The name of the Pokémon<br />
          &nbsp;&nbsp;&nbsp;&nbsp;- <code>url</code>: The URL to fetch additional details about the Pokémon
        </p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="pokemon-list">
          {pokemons.map((pokemon) => (
            <li key={pokemon.name} className="pokemon-item">{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListOfPokemons;
