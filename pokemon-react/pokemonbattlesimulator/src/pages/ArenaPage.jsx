import React, { useState, useEffect } from 'react';
import './ArenaPage.css';

const ArenaPage = () => {
    const [battleLog, setBattleLog] = useState([]);
    const [pokemon1Health, setPokemon1Health] = useState(100);
    const [pokemon2Health, setPokemon2Health] = useState(100);
    const [pokemon1Wins, setPokemon1Wins] = useState(0);
    const [pokemon2Wins, setPokemon2Wins] = useState(0);
    const [round, setRound] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [gameWinner, setGameWinner] = useState('');
    const [pokemon1Move, setPokemon1Move] = useState('');
    const [pokemon2Move, setPokemon2Move] = useState('');
    const [pokemon1Name, setPokemon1Name] = useState('');
    const [pokemon2Name] = useState(["Bulbasaur", "Squirtle", "Jigglypuff", "Gengar", "Snorlax"][Math.floor(Math.random() * 5)]);
    const [arenaName] = useState(["Viridian Forest", "Cerulean Cave", "Mt. Moon", "Indigo Plateau", "Lavender Town"][Math.floor(Math.random() * 5)]);

    const pokemon1Attacks = [
        { name: "Thunderbolt", damage: 15 },
        { name: "Quick Attack", damage: 10 },
        { name: "Thunder Shock", damage: 12 }
    ];

    const pokemon2Attacks = [
        { name: "Flamethrower", damage: 18 },
        { name: "Tail Whip", damage: 8 },
        { name: "Fireball", damage: 14 }
    ];

    useEffect(() => {
        // Get the selected Pokémon name from localStorage
        const selectedPokemon = localStorage.getItem('selectedPokemon');
        if (selectedPokemon) {
            setPokemon1Name(selectedPokemon);
        }
    }, []);

    const handleAttack = () => {
        if (gameOver || !pokemon1Move) return;

        let p1Health = pokemon1Health;
        let p2Health = pokemon2Health;
        let log = [`Round ${round} begins in ${arenaName}!`];

        // Pokémon 1 attacks
        const p1Attack = pokemon1Attacks.find(attack => attack.name === pokemon1Move);
        if (p1Attack) {
            p2Health = Math.max(p2Health - p1Attack.damage, 0);
            log.push(`${pokemon1Name} uses ${p1Attack.name} on ${pokemon2Name}! ${pokemon2Name} Health: ${p2Health}`);
            setPokemon2Health(p2Health);
        }

        // Pokémon 2 attacks with random attack
        const p2Attack = pokemon2Attacks[Math.floor(Math.random() * pokemon2Attacks.length)];
        p1Health = Math.max(p1Health - p2Attack.damage, 0);
        log.push(`${pokemon2Name} uses ${p2Attack.name} on ${pokemon1Name}! ${pokemon1Name} Health: ${p1Health}`);
        setPokemon1Health(p1Health);

        // Check if either Pokémon's health is 0
        if (p1Health <= 0 || p2Health <= 0) {
            if (p1Health <= 0) {
                setPokemon2Wins(pokemon2Wins + 1);
                log.push(`End of Round ${round} - ${pokemon2Name} wins this round!`);
            } else {
                setPokemon1Wins(pokemon1Wins + 1);
                log.push(`End of Round ${round} - ${pokemon1Name} wins this round!`);
            }

            // Check if game is over
            if (pokemon1Wins === 3 || pokemon2Wins === 3) {
                setGameOver(true);
                setGameWinner(pokemon1Wins > pokemon2Wins ? pokemon1Name : pokemon2Name);
                log.push(`Game Over! Winner: ${pokemon1Wins > pokemon2Wins ? pokemon1Name : pokemon2Name}`);
            } else {
                // Proceed to next round
                setRound(round + 1);
                setPokemon1Health(100);
                setPokemon2Health(100);
            }
        }

        setBattleLog(prevLog => [...prevLog, ...log, '']);
    };

    const resetBattle = () => {
        setPokemon1Health(100);
        setPokemon2Health(100);
        setPokemon1Wins(0);
        setPokemon2Wins(0);
        setRound(1);
        setBattleLog([]);
        setGameOver(false);
        setGameWinner('');
        setPokemon1Move('');
        setPokemon2Move('');
    };

    return (
        <div className="arena-container">
            <h1>Arena Battle</h1>
            <h2>Arena: {arenaName}</h2>
            <div className="pokemon-info">
                <div className="pokemon">
                    <h2>{pokemon1Name}</h2>
                    <p>Health: {pokemon1Health}</p>
                    <select onChange={(e) => setPokemon1Move(e.target.value)} value={pokemon1Move}>
                        <option value="">Select Attack</option>
                        {pokemon1Attacks.map((attack, index) => (
                            <option key={index} value={attack.name}>{attack.name}</option>
                        ))}
                    </select>
                </div>
                <div className="pokemon">
                    <h2>{pokemon2Name}</h2>
                    <p>Health: {pokemon2Health}</p>
                </div>
            </div>
            <button className="start-round-btn" onClick={handleAttack} disabled={gameOver || !pokemon1Move}>
                {gameOver ? 'Game Over' : 'Play Round'}
            </button>
            <button className="reset-battle-btn" onClick={resetBattle}>Reset Battle</button>
            <div className="battle-stats">
                <h3>Battle Statistics</h3>
                <p>Rounds won - {pokemon1Name}: {pokemon1Wins}</p>
                <p>Rounds won - {pokemon2Name}: {pokemon2Wins}</p>
            </div>
            <div className="battle-log">
                <h3>Battle Log</h3>
                <ul>
                    {battleLog.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))}
                </ul>
            </div>
            {gameOver && (
                <div className="game-winner">
                    <h3>Game Winner</h3>
                    <p>{gameWinner} is the overall winner!</p>
                </div>
            )}
        </div>
    );
};

export default ArenaPage;
