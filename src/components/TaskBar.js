import React from 'react';
import StartButton from './StartButton';
import Clock from './Clock'
import './Taskbar.css'

const Taskbar = ({ items, onStartButtonClick }) => (
    <div id="task-bar">
        <StartButton onClick={onStartButtonClick} />
        <div id="open-tasks">
            {items.map(item => (
                <div key={item.id} class="windows-box-shadow" id="taskbar-item">
                    <span><img src={item.icon} alt={item.name} /></span>
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
        <Clock />
    </div>
);

export default Taskbar;