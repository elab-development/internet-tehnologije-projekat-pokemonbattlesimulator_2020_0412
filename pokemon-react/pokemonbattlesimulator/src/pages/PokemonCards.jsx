import React, { useState, useEffect } from 'react';

const PokemonCards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchCards = async () => {
            try {
                
                const response = await fetch('https://api.pokemontcg.io/v2/cards');
                
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                
                const data = await response.json();
                
                
                setCards(data.data);
            } catch (error) {
               
                setError(error.message);
            } finally {
                
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Pokémon TCG Cards</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cards.map((card) => (
                    <div key={card.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        <img src={card.images.small} alt={card.name} />
                        <h2>{card.name}</h2>
                        <p>Type: {card.types.join(', ')}</p>
                        <p>Set: {card.set.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonCards;
