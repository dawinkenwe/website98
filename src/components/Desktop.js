import React from 'react';
import './Desktop.css';
import DesktopShortcut from './DesktopShortcut';
import { useAppContext } from '../AppContext';

const Desktop = () => {
    const { state, dispatch } = useAppContext();
    return (
        <div className="desktop">
            {Object.entries(state.shortcuts).map(( [id, value])  => 
                <DesktopShortcut key={id} id={id} />
            )}
        </div>
    );
};

export default Desktop;