import React from 'react';
import startbuttonimage from '../img/win98start.png';
import './StartButton.css'

const StartButton = ({ onClick }) => (
    <div id="start-button" class="windows-box-shadow" onClick={onClick} style={{ backgroundImage: `url(${startbuttonimage})` }}></div>
);

/*<button id="start-button" class="windows-box-shadow" onClick={onClick} style={{ backgroundImage: startbuttonimage}}></button> */


export default StartButton;