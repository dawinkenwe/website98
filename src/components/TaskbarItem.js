import React from 'react';
import { useAppContext } from '../AppContext';
import './TaskbarItem.css'

const TaskbarItem = ({ id }) => {
    const { state, dispatch } = useAppContext();

    const toggleMinimized = () => {
        dispatch({ type: 'TOGGLE_MINIMIZED', id: id });
    }

    return (
        <div key={id} className={`${state.components[id].minimized ? 'minimized' : 'open'}`} id="taskbar-item" onClick={toggleMinimized}>
            <span><img src={state.components[id].icon} alt={state.components[id].name} /></span>
            <span>{state.components[id].name}</span>
        </div>
    );
};

export default TaskbarItem;