import React, { useEffect, useRef, useState } from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import StartMenu from './components/StartMenu'
import './App.css';
import { getProgramIcon } from './helpers/programMap';
import { useAppContext } from './AppContext';

const App = () => {
    const { state, dispatch } = useAppContext();
    const [programs, setPrograms] = useState([]);
    const [taskbarItems, setTaskbarItems] = useState([]);
    const [isStartMenuVisible, setStartMenuVisible] = useState(false);
    const startMenuRef = useRef(null);
    const startButtonRef = useRef(null);


    const handleStartButtonClick = () => {
        setStartMenuVisible(!isStartMenuVisible);
    };

    const openProgram = (programName) => {
        const programContents = <p>Program Contents</p>
        const newProgram = { id: Date.now(), name: programName, contents: programContents };
        const newTaskbarItem = { id: newProgram.id, name: programName, icon: getProgramIcon(programName), x:0, y:0, };
        setPrograms([...programs, newProgram]);
        setTaskbarItems([...taskbarItems, newTaskbarItem]);
        setStartMenuVisible(false);
    };

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

    console.log(state.componentIds);
    return (
            <div className="app">
                <div className="programs-view">
                {state.componentIds.map(id => (
                        <Window key={id} id={id} />
                    )) }
                </div>
                <StartMenu onMenuItemClick={openProgram} ref={startMenuRef} isVisible={isStartMenuVisible} />
                <Taskbar onStartButtonClick={handleStartButtonClick} startButtonRef={startButtonRef} items={taskbarItems} />
            </div>
    );
};

export default App;
