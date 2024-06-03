import React, { useEffect, useState } from 'react';
import useWebSocket from '../app/hooks/useWebSocket';
import GameBoard from '../app/components/GameBoard';
import PlayerInputs from '../app/components/PlayerInputs';
import Ranking from '../app/components/Ranking';
import Chat from '../app/components/Chat';
import JoinGame from '../app/components/JoinGameForm';
import CurrentRound from '../app/components/CurrentRound';
import SpeedSlider from '../app/components/SpeedSlider';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../app/styles/custom.scss'; // Import the custom SCSS file

const HomePage: React.FC = () => {
    const socket = useWebSocket();
    const [gameState, setGameState] = useState<{ multiplier: number; players: any[] }>({
        multiplier: 0,
        players: [],
    });
    const [playerJoined, setPlayerJoined] = useState(false);
    const [messages, setMessages] = useState<{ player: string; message: string }[]>([]);
    const [speed, setSpeed] = useState(1);
    const [multiplierHistory, setMultiplierHistory] = useState<number[]>([]);
    const [playerName, setPlayerName] = useState<string>('');
    const [resetChart, setResetChart] = useState(false); // New state for resetting chart

    useEffect(() => {
        if (socket) {
            socket.on('gameState', (state) => {
                setGameState(state);
                setMultiplierHistory((prev) => {
                    // Check if the previous history is empty and handle the initial zero properly
                    if (prev.length === 0) {
                        return [state.multiplier];
                    }
                    // Ensure no duplicate consecutive zeros
                    if (state.multiplier === 0 && prev[prev.length - 1] === 0) {
                        return prev;
                    }
                    return [...prev, state.multiplier];
                });
            });

            socket.on('multiplierUpdate', (multiplier) => {
                setGameState((prevState) => ({
                    ...prevState,
                    multiplier: multiplier,
                }));
                console.log(multiplier);
                setMultiplierHistory((prev) => [...prev, multiplier]);
            });

            socket.on('chatMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                socket.off('gameState');
                socket.off('multiplierUpdate');
                socket.off('chatMessage');
            };
        }
    }, [socket]);

    const handleGuess = (guess: { points: number; multiplier: number }) => {
        console.log('Sending guess:', guess);
        try {
            if (socket) {
                socket.emit('placeGuess', guess);
                // Reset the multiplier history and multiplier values
                setMultiplierHistory([]);
                setGameState((prevState) => ({
                    ...prevState,
                    multiplier: 0.0, // Reset to default value
                }));
                // Trigger chart reset
                setResetChart(true);
            }
        } catch (error) {
            console.error('Error while sending guess:', error);
        }
    };

    const handleJoinGame = (playerName: string) => {
        console.log('Joining game as:', playerName);
        setPlayerName(playerName);
        try {
            if (socket) {
                socket.emit('joinGame', { player: playerName });
                setPlayerJoined(true);
                // Reset the multiplier history and multiplier values
                setMultiplierHistory([]);
                setGameState((prevState) => ({
                    ...prevState,
                    multiplier: 0.0, // Reset to default value
                }));
            }
        } catch (error) {
            console.error('Error while joining game:', error);
        }
    };

    const handleSendMessage = (message: string) => {
        try {
            if (socket) {
                socket.emit('sendMessage', { player: playerName, message });
            }
        } catch (error) {
            console.error('Error while sending message:', error);
        }
    };

    const handleSpeedChange = (newSpeed: number) => {
        setSpeed(newSpeed);
        try {
            if (socket) {
                socket.emit('changeSpeed', { speed: newSpeed });
            }
        } catch (error) {
            console.error('Error while changing speed:', error);
        }
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString();
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column bg-dark text-light">
            {playerJoined ? (
                <>
                    <div className="row flex-grow-1">
                        <div className="col-sm-4">
                            <div className="p-3">
                                <PlayerInputs onGuess={handleGuess}/>
                                <CurrentRound players={gameState.players}/>
                                <SpeedSlider speed={speed} onSpeedChange={handleSpeedChange}/>
                            </div>
                        </div>
                        <div className="col-sm-8 d-flex flex-column p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>Points: {gameState.players.find(player => player.name === playerName)?.points}</div>
                                <div>Player: {playerName}</div>
                                <div>Time: {getCurrentTime()}</div>
                            </div>
                            <div className="">
                                <GameBoard
                                    multiplier={gameState.multiplier}
                                    multiplierHistory={[]}
                                    resetChart={resetChart} // Pass resetChart state to GameBoard
                                    onResetChart={() => setResetChart(false)} // Pass handleResetChart function to GameBoard
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row flex-grow-1">
                        <div className="col-sm-6 p-3">
                            <Ranking players={gameState.players}/>
                        </div>
                        <div className="col-sm-6 p-3">
                            <Chat messages={messages} onSendMessage={handleSendMessage}/>
                        </div>
                    </div>
                </>
            ) : (
                <div className="row flex-grow-1">
                    <JoinGame onJoin={handleJoinGame}/>
                </div>
            )}
        </div>
    );
};

export default HomePage;
