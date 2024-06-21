import { React, useEffect, useState } from 'react';
import "./Clock.css"

const Clock = () => {
    const [time, setTime] = useState();

    useEffect(() => {

        setInterval(() => {
            const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            setTime(currentTime)
        }, 1000)
    }, [])

    return <div id="clock">{time}</div>
};

export default Clock;