import React from 'react';
import StartButton from './StartButton';
import Clock from './Clock'
import './Taskbar.css'
import { useAppContext } from '../AppContext';

const Taskbar = () => {
    const { state, dispatch } = useAppContext();

    return (
        <div id="task-bar">
            <StartButton />
            <div id="open-tasks">
                {state.runningApps.map(app => (
                    <div key={app.id} class="windows-box-shadow" id="taskbar-item">
                        <span><img src={app.icon} alt={app.name} /></span>
                        <span>{app.name}</span>
                    </div>
                ))}
            </div>
            <Clock />
        </div>
    );
};
export default Taskbar;