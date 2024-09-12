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
    const [roundWinner, setRoundWinner] = useState('');

    const pokemon1Attacks = [
        "uses Thunderbolt and shocks",
        "throws an electric ball at",
        "dashes with Quick Attack and hits",
        "uses Thunder Shock against",
        "launches a powerful Zap against"
    ];

    const pokemon2Attacks = [
        "uses Flamethrower and scorches",
        "scratches with its claws at",
        "hits with a Tail Whip at",
        "launches a fireball at",
        "bites fiercely at"
    ];

    const randomArenaNames = ["Viridian Forest", "Cerulean Cave", "Mt. Moon", "Indigo Plateau", "Lavender Town"];

    const [pokemon1Name, setPokemon1Name] = useState('');
    const [pokemon2Name] = useState(["Bulbasaur", "Squirtle", "Jigglypuff", "Gengar", "Snorlax"][Math.floor(Math.random() * 5)]);
    const [arenaName] = useState(randomArenaNames[Math.floor(Math.random() * randomArenaNames.length)]);

    useEffect(() => {
        // Get the selected Pokémon name from localStorage
        const selectedPokemon = localStorage.getItem('selectedPokemon');
        if (selectedPokemon) {
            setPokemon1Name(selectedPokemon);
        }
    }, []);

    const randomDamage = () => Math.floor(Math.random() * 20) + 1;
    const randomAttackDescription = (attacker) => {
        return attacker === "pokemon1"
            ? pokemon1Attacks[Math.floor(Math.random() * pokemon1Attacks.length)]
            : pokemon2Attacks[Math.floor(Math.random() * pokemon2Attacks.length)];
    };

    const startRound = () => {
        if (gameOver) return;

        let p1Health = pokemon1Health;
        let p2Health = pokemon2Health;
        let log = [`Round ${round} begins in ${arenaName}!`];

        while (p1Health > 0 && p2Health > 0) {
            let pokemon1Attack = randomDamage();
            p2Health = Math.max(p2Health - pokemon1Attack, 0);
            log.push(`${pokemon1Name} ${randomAttackDescription("pokemon1")} ${pokemon2Name}! ${pokemon2Name} Health: ${p2Health}`);

            if (p2Health === 0) {
                setRoundWinner(pokemon1Name);
                setPokemon1Wins(pokemon1Wins + 1);
                log.push(`End of Round ${round} - ${pokemon1Name} wins this round!`);
                break;
            }

            let pokemon2Attack = randomDamage();
            p1Health = Math.max(p1Health - pokemon2Attack, 0);
            log.push(`${pokemon2Name} ${randomAttackDescription("pokemon2")} ${pokemon1Name}! ${pokemon1Name} Health: ${p1Health}`);

            if (p1Health === 0) {
                setRoundWinner(pokemon2Name);
                setPokemon2Wins(pokemon2Wins + 1);
                log.push(`End of Round ${round} - ${pokemon2Name} wins this round!`);
                break;
            }
        }

        setBattleLog(prevLog => [...prevLog, ...log, '']); 

        setPokemon1Health(p1Health);
        setPokemon2Health(p2Health);

        if (pokemon1Wins === 3) {
            if (!gameOver) { 
                setGameOver(true);
                setGameWinner(pokemon1Name);
                setBattleLog(prevLog => [...prevLog, `Game Over! ${pokemon1Name} wins the game!`]);
            }
        } else if (pokemon2Wins === 3) {
            if (!gameOver) { 
                setGameOver(true);
                setGameWinner(pokemon2Name);
                setBattleLog(prevLog => [...prevLog, `Game Over! ${pokemon2Name} wins the game!`]);
            }
        } else {
            if (round <= 4 && pokemon1Wins < 3 && pokemon2Wins < 3) {
                setRound(round + 1);
                setPokemon1Health(100); 
                setPokemon2Health(100); 
            } else if (round > 4) {
                if (!gameOver) { 
                    setGameOver(true);
                    setGameWinner(pokemon1Wins > pokemon2Wins ? pokemon1Name : pokemon2Name);
                    setBattleLog(prevLog => [...prevLog, `Game Over! After 5 rounds, Winner: ${pokemon1Wins > pokemon2Wins ? pokemon1Name : pokemon2Name}`]);
                }
            }
        }
    }        

    const resetBattle = () => {
        setPokemon1Health(100);
        setPokemon2Health(100);
        setPokemon1Wins(0);
        setPokemon2Wins(0);
        setRound(1);
        setBattleLog([]);
        setGameOver(false);
        setGameWinner('');
        setRoundWinner('');
    };

    return (
        <div className="arena-container">
            <h1>Arena Battle</h1>
            <h2>Arena: {arenaName}</h2>
            <div className="pokemon-info">
                <div className="pokemon">
                    <h2>{pokemon1Name}</h2>
                    <p>Health: {pokemon1Health}</p>
                </div>
                <div className="pokemon">
                    <h2>{pokemon2Name}</h2>
                    <p>Health: {pokemon2Health}</p>
                </div>
            </div>
            <button className="start-round-btn" onClick={startRound} disabled={gameOver}>
                {gameOver ? 'Game Over' : 'Start Round'}
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
