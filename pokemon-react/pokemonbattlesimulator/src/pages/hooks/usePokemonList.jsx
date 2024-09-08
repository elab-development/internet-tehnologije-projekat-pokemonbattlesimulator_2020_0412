import { useState } from 'react';

const usePokemonList = (initialPokemons) => {
  const [pokemons, setPokemons] = useState(initialPokemons);

  const addPokemon = (pokemon) => {
    setPokemons(prevPokemons => [
      ...prevPokemons,
      { id: Date.now(), ...pokemon }
    ]);
  };

  return {
    pokemons,
    addPokemon
  };
};

export default usePokemonList;
