import { useState } from 'react';

function LeadingPlayersPanel() {
    const getLeadingPlayers = () => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const averageVictories = Object.entries(users)
            .filter(([_, data]) => data.scores && data.scores.length > 0)
            .map(([user, data]) => {
                const victories = data.scores;
                const average = victories.reduce((sum, victory) => sum + victory, 0) / victories.length;
                return { user, average: Math.ceil(average) };
            });

        averageVictories.sort((a, b) => b.average - a.average);
        return averageVictories.slice(0, 3);
    };

    const [leadingPlayers, setLeadingPlayers] = useState(getLeadingPlayers());

    window.addEventListener('updateLeadingPlayers', () => {
        setLeadingPlayers(getLeadingPlayers());
    });

    return (
        <div className="leading-players-panel">
            <h2>Top Players</h2>
            <ul>
                {leadingPlayers.map(({ user, average }, index) => (
                    <li key={index}>
                        <span>{user}</span>
                        <span>{average}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeadingPlayersPanel;
