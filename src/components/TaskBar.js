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
                {state.componentIds.map(id => (
                    <div key={id} class="windows-box-shadow" id="taskbar-item">
                        <span><img src={state.components[id].icon} alt={state.components[id].name} /></span>
                        <span>{state.components[id].name}</span>
                    </div>
                ))}
            </div>
            <Clock />
        </div>
    );
};
export default Taskbar;