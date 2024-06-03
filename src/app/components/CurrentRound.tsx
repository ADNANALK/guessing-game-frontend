import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';

interface CurrentRoundProps {
    players: { id: string; name: string; points: number; guessMultiplier: number; guess: { multiplier: number; points: number } | null; }[];
}

const CurrentRound: React.FC<CurrentRoundProps> = ({ players }) => {
    return (
        <div className="card bg-dark text-light p-2 mt-2">
            <h3 className="card-title fs-6 mb-0">Current Round</h3>
            <table className="table table-dark table-striped mt-2" style={{ fontSize: 'xx-small' }}>
                <thead>
                <tr>
                    <th className="fs-6">Name</th>
                    <th>Points</th>
                    <th>Guess Multiplier</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player) => (
                    <tr key={player.id}>
                        <td className="fs-7">{player.name}</td>
                        <td className="fs-7">{player.guess?.points.toFixed(3)}</td>
                        <td className="fs-7">{player.guess?.multiplier.toFixed(3)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrentRound;
