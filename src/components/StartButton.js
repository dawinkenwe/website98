import React from 'react';
import startbuttonimage from '../img/win98.gif';

const StartButton = ({ onClick }) => (
    <div id="start-button" class="windows-box-shadow" onClick={onClick}><img src={startbuttonimage}></img></div>
);

/*<button id="start-button" class="windows-box-shadow" onClick={onClick} style={{ backgroundImage: startbuttonimage}}></button> */


export default StartButton;