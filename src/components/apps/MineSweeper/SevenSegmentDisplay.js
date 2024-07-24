import React from 'react';

const SevenSegmentDisplay = () => {
    return (
        <svg height="48 width=30" xmlns="segmentdisplay">
            <path id="segment1" d="M 6 6 L 9 3 L 21 3 L 24 6 L 21 9 L 9 9 Z" stroke="black" fill="red" stroke-width="1"></path>
            <path id="segment2" d="M 3 9 L 6 6 L 9 9 L 9 21 L 6 24 L 3 21 Z" stroke="black" fill="red" stroke-width="1"></path>
            <path id="segment3" d="M 21 9 L 24 6 L 27 9 L 27 21 L 24 24 L 21 21 Z" stroke="black" fill="red" stroke-width="1"></path>
            <path id="segment4" d="M 6 24 L 9 21 L 21 21 L 24 24 L 21 27 L 9 27 Z" stroke="black" fill="red" stroke-width="1"></path>
            <path id="segment5" d="M 6 24 L 9 27 L 9 39 L 6 42 L 3 39 L 3 27 Z" stroke="black" fill="red" stroke-width="1"></path>
            <path id="segment5" d="M 24 24 L 27 27 L 27 39 L 24 42 L 21 39 L 21 27 Z" stroke="black" fill="red" stroke-width="1"></path>
            <path id="segment6" d="M 6 42 L 9 39 L 21 39 L 24 42 L 21 45 L 9 45 Z" stroke="black" fill="red" stroke-width="1"></path>
        </svg>
    );
}

export default SevenSegmentDisplay;