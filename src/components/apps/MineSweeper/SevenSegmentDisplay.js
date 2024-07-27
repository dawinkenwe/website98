import React, { useMemo } from 'react';

const litSegments = {
    0: [0, 1, 2, 4, 5, 6],
    1: [2, 5],
    2: [0, 2, 3, 4, 6],
    3: [0, 2, 3, 5, 6],
    4: [1, 2, 3, 5],
    5: [0, 1, 3, 5, 6],
    6: [0, 1, 3, 4, 5, 6],
    7: [0, 2, 5],
    8: [0, 1, 2, 3, 4, 5, 6],
    9: [0, 1, 2, 3, 5, 6]
};

const generateSegmentPaths = (scale) => {
    const basePaths = [
        'M 2 2 L 3 1 L 7 1 L 8 2 L 7 3 L 3 3 Z',
        'M 2 2 L 3 3 L 3 7 L 2 8 L 1 7 L 1 3 Z',
        'M 7 3 L 8 2 L 9 3 L 9 10 L 8 11 L 7 10 Z',
        'M 2 8 L 3 7 L 7 7 L 8 8 L 7 9 L 3 9 Z',
        'M 1 9 L 2 8 L 3 9 L 3 13 L 2 14 L 1 13 Z',
        'M 7 9 L 8 8 L 9 9 L 9 13 L 8 14 L 7 13 Z',
        'M 2 14 L 3 13 L 7 13 L 8 14 L 7 15 L 3 15 Z'
    ];

    const scaledPaths = basePaths.map(path => path.replace(/(\d+)/g, match => match * scale))
    return scaledPaths;
};



const SevenSegmentDisplay = ({ scale = 2, value }) => {
    const segmentPaths = useMemo(() => generateSegmentPaths(scale), [scale])
    return (
        <svg height="48 width=30" xmlns="segmentdisplay">
            {segmentPaths.map((path, index) => (
                <path
                    id={`segment${index}`}
                    d={path}
                    fill={litSegments[value].includes(index) ? 'red' : 'lightgray'} />
            )) }
        </svg>
    )
};

export default SevenSegmentDisplay;