import React from 'react';
import startbuttonimage from '../img/win98start.png';
import './StartButton.css'
import { useAppContext } from '../AppContext';

const StartButton = () => {
    const { state, dispatch } = useAppContext();

    const handleToggleStartMenu = () => {
        dispatch({ type: 'TOGGLE_START_MENU' });
    };

    return (
        <div id="start-button" className="windows-box-shadow" onClick={handleToggleStartMenu} style={{ backgroundImage: `url(${startbuttonimage})` }}></div>
    );
};

export default StartButton;