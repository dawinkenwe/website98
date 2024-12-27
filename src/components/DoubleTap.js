import React, { useState, useRef } from 'react';

const DoubleTap = ({ onDoubleTap, children }) => {
    const [lastTap, setLastTap] = useState(0);
    const timeoutRef = useRef(null);

    const handleTouchEnd = (e) => {
        const currentTime = Date.now();
        const tapLength = currentTime - lastTap;

        clearTimeout(timeoutRef.current);

        if (tapLength < 700 && tapLength > 0) {
            onDoubleTap(e);
        }

        setLastTap(currentTime);
    };

    return (
        <div onTouchEnd={handleTouchEnd} onDoubleClick={onDoubleTap}>
            {children}
        </div>
    );
};

export default DoubleTap;