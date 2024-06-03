'use client';

import React from 'react';
import styled from 'styled-components';

const SpeedSliderWrapper = styled.div`
    background: ${(props) => props.theme.colors.cardBackground};
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
`;

interface SpeedSliderProps {
    speed: number;
    onSpeedChange: (speed: number) => void;
}

const SpeedSlider: React.FC<SpeedSliderProps> = ({ speed, onSpeedChange }) => {
    return (
        <SpeedSliderWrapper>
            <h3>Speed Slider</h3>
            <input
                type="range"
                min="1"
                max="10"
                value={speed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
            />
            <p>Current Speed: {speed}</p>
        </SpeedSliderWrapper>
    );
};

export default SpeedSlider;
