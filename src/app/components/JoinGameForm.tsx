import React, { useState } from 'react';

interface JoinGameProps {
    onJoin: (playerName: string) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onJoin }) => {
    const [playerName, setPlayerName] = useState<string>('');

    const handleJoin = () => {
        onJoin(playerName);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ background: '#2e2e3e', borderRadius: '8px' }}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control light-placeholder"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Player Name"
                        style={{ background: '#1e1e2d', color: '#fff', border: 'none' }}
                    />
                </div>
                <button
                    onClick={handleJoin}
                    className="btn btn-primary"
                >
                    Join Game
                </button>
            </div>
        </div>
    );
};

export default JoinGame;
