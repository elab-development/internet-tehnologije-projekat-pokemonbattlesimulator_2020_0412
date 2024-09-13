import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stats.css'; 

const Stats = () => {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/location-stats', {
            headers: {
                Authorization: `Bearer 141|0vQhW80QFvBP7pnFH1yimlyqXNtumGDO0oRkjDdkb9de6457`
            }
        })
            .then(response => {
                setStats(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the location stats!", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Pokémon Battle Success Stats by Location</h1>
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Pokemon1 Wins</th>
                        <th>Pokemon2 Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                        <tr key={index}>
                            <td>{stat.location}</td>
                            <td>{stat.pokemon1_wins}</td>
                            <td>{stat.pokemon2_wins}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="explanation">
                <h2>Why These Stats Matter</h2>
                <p>
                This data is crucial for players as it provides insights into which locations have historically favored Pokémon1 (User) over Pokémon2 (Computer). By analyzing these statistics, players can make informed decisions on their location choices to increase their chances of winning. If Pokémon1 has won more often in certain locations compared to Pokémon2, choosing those locations might offer a strategic advantage. This approach not only enhances your chances of victory but also adds a strategic layer to your gameplay. Utilize this data to secure more victories.
                </p>
            </div>
        </div>
    );
};

export default Stats;
