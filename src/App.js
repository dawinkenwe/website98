import React, { useEffect, useRef, useState } from 'react';
import Taskbar from './components/Taskbar.js';
import Program from './components/Program.js';
import StartMenu from './components/StartMenu'
import './App.css';
import { getProgramIcon } from './helpers/programMap.js';

const App = () => {
    const [programs, setPrograms] = useState([]);
    const [taskbarItems, setTaskbarItems] = useState([]);
    const [isStartMenuVisible, setStartMenuVisible] = useState(false);
    const startMenuRef = useRef(null);

    const handleStartButtonClick = () => {
        setStartMenuVisible(!isStartMenuVisible);
    };

    const openProgram = (programName) => {
        const programContents = <p>Program Contents</p>
        const newProgram = { id: Date.now(), name: programName, contents: programContents };
        const newTaskbarItem = { id: newProgram.id, name: programName, icon: getProgramIcon(programName) };
        setPrograms([...programs, newProgram]);
        setTaskbarItems([...taskbarItems, newTaskbarItem]);
        setStartMenuVisible(false);
    };

    const closeProgram = (programId) => {
        setPrograms(programs.filter(program => program.id !== programId));
        setTaskbarItems(taskbarItems.filter(taskbarItem => taskbarItem.id !== programId));
    };

    useEffect(() => {
        const handleClickOutsideStartMenu = (event) => {
            if (
                startMenuRef.current &&
                !startMenuRef.current.contains(event.target)
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


    return (
        <div className="app">
            <div className="programs-view">
                {programs.map(program => (
                    <Program key={program.id} name={program.name} onClose={closeProgram} />
                )) }
            </div>
            <Taskbar onStartButtonClick={handleStartButtonClick} items={taskbarItems} />
            <StartMenu onMenuItemClick={openProgram} ref={startMenuRef} isVisible={isStartMenuVisible} />
        </div>
    );
};

export default App;
