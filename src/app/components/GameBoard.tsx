import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

Chart.register(...registerables);

interface GameBoardProps {
    multiplier: number;
    multiplierHistory: number[];
}

const GameBoard: React.FC<GameBoardProps> = ({ multiplier, multiplierHistory }) => {
    console.log(multiplierHistory);
    console.log(multiplier);

    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const context = chartRef.current.getContext('2d');
            if (context) {
                // Check if chart instance exists, but don't destroy it
                if (!chartInstanceRef.current) {
                    const data = {
                        labels: [0], // Start with a single point at 0
                        datasets: [
                            {
                                label: 'Multiplier',
                                data: [0], // Start with data point at 0
                                fill: false,
                                backgroundColor: 'red',
                                borderColor: 'red',
                            },
                        ],
                    };

                    const options = {
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                beginAtZero: true,
                                suggestedMax: 10,
                            },
                            y: {
                                type: 'linear',
                                position: 'left',
                                beginAtZero: true,
                                suggestedMax: 10,
                            },
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    } as const; // Assert the type

                    chartInstanceRef.current = new Chart(context, {
                        type: 'line',
                        data: data,
                        options: options,
                    });
                }

                // Update existing data with the current multiplier
                const currentData = chartInstanceRef.current.data.datasets[0].data;
                currentData.push(multiplier); // Add new data point for current multiplier

                // Update labels for new data point
                const currentLabels = chartInstanceRef.current.data.labels;
                currentLabels.push(currentLabels.length); // Add label for new data point

                // Update the chart with new data
                chartInstanceRef.current.update();
            }
        }

        // No need for cleanup as we're not destroying the chart anymore
    }, [multiplier]);


    return (
        <div className="card bg-dark text-light p-3 mt-3">
            <h3 className="card-title">Game Board</h3>
            <div className="chart-container">
                <canvas ref={chartRef}></canvas>
            </div>
            <p className="mt-3" style={{ color: 'red' }}>Current Multiplier: {multiplier.toFixed(2)}x</p>
        </div>
    );
};

export default GameBoard;
