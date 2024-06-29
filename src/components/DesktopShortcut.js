import React from 'react';
import { useAppContext } from '../AppContext';
import './DesktopShortcut.css';

const DesktopShortcut = ({ id }) => {
    const { state, dispatch } = useAppContext();

    return (
        <div className="desktop-shortcut">
            <div className="icon">
                <img src={state.shortcuts[id].img} alt={state.shortcuts[id].name} />
            </div>
            <div className="text">{state.shortcuts[id].text}</div>
        </div>
    );
}

export default DesktopShortcut;