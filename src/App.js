import React, { useEffect, useRef, useState } from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import StartMenu from './components/StartMenu'
import './App.css';
import { getProgramIcon } from './helpers/programMap';
import { useAppContext } from './AppContext';

const App = () => {
    const { state, dispatch } = useAppContext();
    const startMenuRef = useRef(null);
    const startButtonRef = useRef(null);

    /*
    useEffect(() => {
        const handleClickOutsideStartMenu = (event) => {
            if (
                startMenuRef.current &&
                !startMenuRef.current.contains(event.target) &&
                startButtonRef.current &&
                !startButtonRef.current.contains(event.target)
            ) {
                setStartMenuVisible(false);
            }
        };
        if (isStartMenuVisible) {
            document.addEventListener('click', handleClickOutsideStartMenu);
        } else {
            document.removeEventListener('click', handleClickOutsideStartMenu)
        }

        return () => {
            document.removeEventListener('click', handleClickOutsideStartMenu);
        };
    }, [isStartMenuVisible]);
    */

    return (
            <div className="app">
                <div className="programs-view">
                {state.componentIds.map(id => (
                        !state.components[id].minimized && <Window key={id} id={id} />
                    )) }
                </div>
                <StartMenu />
                <Taskbar />
            </div>
    );
};

export default App;
