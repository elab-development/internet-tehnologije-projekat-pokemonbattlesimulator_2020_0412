import React, { useState } from 'react';
import './BattlePage.css';
import pokemonImage1 from '../assets/images/large.pikachu.png.4c0ec2bef34e3bafe92c69f922a3d2b3.png';
import pokemonImage2 from '../assets/images/large.bulbasaur.png.f765693a113acd1e064ab4eb8bf10f6f.png';
import pokemonImage3 from '../assets/images/large.charmander.png.23f59a100b425bb78d79995e290b0da3.png';
import pokemonImage4 from '../assets/images/large.squirtle.png.6575518d7cfe1936626c5d05de7fc26a.png';
import pokemonImage5 from '../assets/images/5f8b81793d6183e9007978d4fce5f5ae.png';
import pokemonImage6 from '../assets/images/200px-HOME0158.png';
import pokemonImage7 from '../assets/images/dfkm6jr-69d1e59b-6661-4ab7-9d66-83308ccec6b2.png';
import pokemonImage8 from '../assets/images/Froakie-Transparent-Images.png';
import pokemonImage9 from '../assets/images/__chimchar_pokemon_and_1_more__sample-79cfe927bf2a1b8aecc33db97ec85143-transformed.png';
import pokemonImage10 from '../assets/images/PNG-TR_1-transformed.png';

const BattlePage = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handlePokemonClick = (pokemonId) => {
        setSelectedPokemon(pokemonId);
    };

    return (
      <div className="battle-page">
        <div className="pokemon-selection">
          <h2>Select Your Pokémon</h2>
          <div className="pokemon-container">
            <div 
              className={`pokemon-item ${selectedPokemon === 1 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(1)}
            >
              <img src={pokemonImage1} alt="Pokémon 1" />
              <p>Pikachu</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 2 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(2)}
            >
              <img src={pokemonImage2} alt="Pokémon 2" />
              <p>Bulbasaur</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 3 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(3)}
            >
              <img src={pokemonImage3} alt="Pokémon 3" />
              <p>Charmander</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 4 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(4)}
            >
              <img src={pokemonImage4} alt="Pokémon 4" />
              <p>Squirtle</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 5 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(5)}
            >
              <img src={pokemonImage5} alt="Pokémon 5" />
              <p>Turtwig</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 6 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(6)}
            >
              <img src={pokemonImage6} alt="Pokémon 6" />
              <p>Totodile</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 7 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(7)}
            >
              <img src={pokemonImage7} alt="Pokémon 7" />
              <p>Mudkip</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 8 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(8)}
            >
              <img src={pokemonImage8} alt="Pokémon 8" />
              <p>Froakie</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 9 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(9)}
            >
              <img src={pokemonImage9} alt="Pokémon 9" />
              <p>Chimchar</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 10 ? 'selected' : ''}`}
              onClick={() => handlePokemonClick(10)}
            >
              <img src={pokemonImage10} alt="Pokémon 10" />
              <p>Rowlet</p>
            </div>
          </div>
        </div>
        <button className="start-battle">
          Let's GO!
        </button>
      </div>
    );
  };
  
  export default BattlePage;




