import React from 'react';
import { useAppContext } from '../AppContext';
import './DesktopShortcut.css';
import DoubleTap from './DoubleTap';


const DesktopShortcut = ({ id }) => {
    const { state, dispatch } = useAppContext();

    return (
        <DoubleTap onDoubleTap={() => console.log('TAPPED')}>
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