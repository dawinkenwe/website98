import React, { useEffect, useState } from 'react';
import SevenSegmentDisplay from './SevenSegmentDisplay';
import './MinesweeperClock.css';


const MinesweeperClock = ({ secondCount }) => {
    const timerVals = [100, 10, 1]

    return (
        <div className="minesweeper-clock-segments">
            {timerVals.map((value, index) => (
                <SevenSegmentDisplay value={Math.floor(secondCount / value) % 10} key={ `sevensegment${index}`} />
            ))}
        </div>
    )
}

export default MinesweeperClock;