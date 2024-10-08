import React from 'react';
import StartButton from './StartButton';
import Clock from './Clock'
import './Taskbar.css'
import TaskbarItem from './TaskbarItem';
import { useAppContext } from '../AppContext';


const Tasks = () => {
    const { state, dispatch } = useAppContext();

    return (
        <div id="open-tasks">
            {state.componentIds.map(id => (
                <TaskbarItem key={id} id={id} />
            ))}
        </div>
    );
};
export default Tasks;