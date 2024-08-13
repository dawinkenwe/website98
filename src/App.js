import React, { useEffect, useRef } from 'react';

import Tasks from './components/Tasks';
import Window from './components/Window';
import StartButton from './components/StartButton';
import StartMenu from './components/StartMenu';
import Desktop from './components/Desktop';
import Clock from './components/Clock';

import useClickOutside from './hooks/useClickOutside';

import './App.css';
import { useAppContext } from './AppContext';

const App = () => {
    const { state, dispatch } = useAppContext();
    const startMenuRef = useRef(null);
    const startButtonRef = useRef(null);

    useClickOutside([startMenuRef, startButtonRef], () => {
        dispatch({
            'type': 'CLOSE_START_MENU'
        })
    });

    return (
        <div className="app">
            <div className='windows-div'>
                <Desktop />
                <div className="programs-view">
                    {state.componentIds.map(id => (<Window key={id} id={id} />)) }
                </div>
            </div>
            <div className="task-bar">
                <div ref={startMenuRef }>
                    <StartMenu />
                </div>
                <div ref={startButtonRef}>
                    <StartButton />
                </div>
                <Tasks />
                <Clock />
            </div>
        </div>
    );
};

export default App;
