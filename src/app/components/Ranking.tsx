import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RankingProps {
    players: { id: string; name: string; points: number; guess: { multiplier: number; points: number } | null; }[];
}

const Ranking: React.FC<RankingProps> = ({ players }) => {
    return (
        <div className="card bg-dark text-light p-2 mt-2">
            <h2 className="card-title fs-5 mb-0">Ranking</h2>
            <ul className="list-group list-group-flush mt-2">
                {players
                    .sort((a, b) => b.points - a.points) // Sort players by points in descending order
                    .map((player) => (
                        <li className="list-group-item bg-dark text-light d-flex justify-content-between"
                            key={player.id}>
                            {/*<span className="fs-7">{player.id}</span>*/}
                            <span className="fs-7">{player.name}</span>
                            <span className="fs-7">{player.points.toFixed(3)}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Ranking;
