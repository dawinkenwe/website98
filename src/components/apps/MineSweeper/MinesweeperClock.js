import React, { useEffect, useState } from 'react';
import SevenSegmentDisplay from './SevenSegmentDisplay';
import './MinesweeperClock.css';


const MinesweeperClock = ({ isTicking }) => {
    const [secondCount, setSecondCount] = useState(0);
    const timerVals = [100, 10, 1]
    useEffect(() => {
        if (!isTicking) return;
        const intervalId = setInterval(() => {
            setSecondCount(secondCount => secondCount + 1);
        }, 1000);

        return () => clearInterval(intervalId)
    }, [isTicking])

    return (
        <div className="minesweeper-clock-segments">
            {timerVals.map((value, index) => (
                <SevenSegmentDisplay value={Math.floor(secondCount / value) % 10} key={ `sevensegment${index}`} />
            ))}
        </div>
    )
}

export default MinesweeperClock;