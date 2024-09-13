import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
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

    const [selectedPokemon, setSelectedPokemon] = useState('');
    const navigate = useNavigate(); 

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userRoles = localStorage.getItem('userRoles');
        
        if (token && userRoles) {
            try {
                const parsedRoles = JSON.parse(userRoles);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing user roles:', error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [navigate]);

    const handlePokemonClick = (pokemonName) => {
        setSelectedPokemon(pokemonName);
    };

    const handleStartBattle = () => {
        if (selectedPokemon) {
            localStorage.setItem('selectedPokemon', selectedPokemon);
            navigate('/arena'); 
        }
    };

    return (
      <div className="battle-page">
        <div className="pokemon-selection">
          <h2>Select Your Pokémon</h2>
          <div className="pokemon-container">
            <div 
              className={`pokemon-item ${selectedPokemon === 'Pikachu' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Pikachu')}
            >
              <img src={pokemonImage1} alt="Pikachu" />
              <p>Pikachu</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Bulbasaur' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Bulbasaur')}
            >
              <img src={pokemonImage2} alt="Bulbasaur" />
              <p>Bulbasaur</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Charmander' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Charmander')}
            >
              <img src={pokemonImage3} alt="Charmander" />
              <p>Charmander</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Squirtle' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Squirtle')}
            >
              <img src={pokemonImage4} alt="Squirtle" />
              <p>Squirtle</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Turtwig' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Turtwig')}
            >
              <img src={pokemonImage5} alt="Turtwig" />
              <p>Turtwig</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Totodile' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Totodile')}
            >
              <img src={pokemonImage6} alt="Totodile" />
              <p>Totodile</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Mudkip' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Mudkip')}
            >
              <img src={pokemonImage7} alt="Mudkip" />
              <p>Mudkip</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Froakie' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Froakie')}
            >
              <img src={pokemonImage8} alt="Froakie" />
              <p>Froakie</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Chimchar' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Chimchar')}
            >
              <img src={pokemonImage9} alt="Chimchar" />
              <p>Chimchar</p>
            </div>
            <div 
              className={`pokemon-item ${selectedPokemon === 'Rowlet' ? 'selected' : ''}`}
              onClick={() => handlePokemonClick('Rowlet')}
            >
              <img src={pokemonImage10} alt="Rowlet" />
              <p>Rowlet</p>
            </div>
          </div>
        </div>
        {isAuthenticated && (
        <button className="start-battle" onClick={handleStartBattle}>
          Let's GO!
        </button>
        )}
      </div>
    );
};

export default BattlePage;
