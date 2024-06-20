import React, { useState } from 'react';
import Window from './components/Window';
import './App.css';

const App = () => {
    const [windows, setWindows] = useState([]);

    const openWindow = () => {
        const newWindow = {
            id: windows.length ? windows[windows.length - 1].id + 1 : 1,
        };
        setWindows([...windows, newWindow]);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter(window => window.id !== id));
        console.log(windows);
    };

    return (
        <div className="app">
            <button onClick={openWindow}>Create Window</button>
            <div className="windows-container">
                {windows.map(window => (
                    <Window key={window.id} id={window.id} onClose={closeWindow} />
                )) }
            </div>
        </div>
    );
};

export default App;
