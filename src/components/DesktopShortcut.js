import React from 'react';
import { useAppContext } from '../AppContext';
import './DesktopShortcut.css';
import DoubleTap from './DoubleTap';
import { getProgramInfo } from '../helpers/programMap';



const DesktopShortcut = ({ id }) => {
    const { state, dispatch } = useAppContext();

    const handleClicked = () => {
        console.log('clicked')
        if (state.shortcuts[id].name === 'minesweeper')
        {
            dispatch({ type: 'START_APP', payload: getProgramInfo(state.shortcuts[id].name)});
        }
    }

    return (
        <DoubleTap onDoubleTap={handleClicked}>
        <div className="desktop-shortcut">
            <div className="icon">
                <img src={state.shortcuts[id].img} alt={state.shortcuts[id].name} />
            </div>
            <div className="text">{state.shortcuts[id].text}</div>
            </div>
        </DoubleTap>
    );
}

export default DesktopShortcut;