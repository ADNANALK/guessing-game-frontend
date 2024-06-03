import React, { useState } from 'react';

interface PlayerInputsProps {
    onGuess: (guess: { points: number; multiplier: number }) => void;
}

const PlayerInputs: React.FC<PlayerInputsProps> = ({ onGuess }) => {
    const [points, setPoints] = useState<number>(0);
    const [multiplier, setMultiplier] = useState<number>(0);

    const handleSubmit = () => {
        onGuess({ points, multiplier });
    };

    return (
        <div className="d-flex flex-column" style={{ margin: '0', padding: '0' }}>
            <div className="d-flex justify-content-between mb-2" style={{ margin: '0', padding: '0' }}>
                <div className="flex-grow-1 me-2" style={{ margin: '0', padding: '0' }}>
                    <label htmlFor="points" className="form-label" style={{ fontSize: '0.7rem', fontWeight: 'normal', margin: '0', padding: '0' }}>Points</label>
                    <input
                        type="number"
                        className="form-control"
                        id="points"
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        placeholder="Points"
                        style={{ fontSize: '0.7rem', margin: '0', padding: '0' }}
                    />
                </div>
                <div className="flex-grow-1" style={{ margin: '0', padding: '0' }}>
                    <label htmlFor="multiplier" className="form-label" style={{ fontSize: '0.7rem', fontWeight: 'normal', margin: '0', padding: '0' }}>Multiplier</label>
                    <input
                        type="number"
                        className="form-control"
                        id="multiplier"
                        value={multiplier}
                        onChange={(e) => setMultiplier(Number(e.target.value))}
                        placeholder="Multiplier"
                        style={{ fontSize: '0.7rem', margin: '0', padding: '0' }}
                    />
                </div>
            </div>
            <div style={{ margin: '0', padding: '0' }}>
                <button className="btn btn-primary w-100" onClick={handleSubmit} style={{ fontSize: '0.7rem', margin: '0', padding: '0' }}>Start</button>
            </div>
        </div>
    );
};

export default PlayerInputs;
