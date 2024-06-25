import React from 'react';
import './StartMenu.css'
import { getProgramIcon } from '../helpers/programMap';
import { useAppContext } from '../AppContext';

const StartMenu = () => {
    const {state, dispatch} = useAppContext();

    const openProgram = (programName) => {
        const programContents = <p>Program Contents</p>
        const newProgram = { name: programName, contents: programContents, icon: getProgramIcon(programName) };
        dispatch({ type: 'START_APP', payload: newProgram});
        dispatch({ type: 'TOGGLE_START_MENU' });    
    };

    /* Import menu items from file? use mapping and {} */
    return (
                <div id="start-menu" class="windows-box-shadow" style={{ display: state.isStartMenuOpen ? 'block' : 'none' }}>
                    <div id="windows-start-menu-blue">Windows<span>98</span></div>
                    <ul>
                        <li class="line help" onClick={() => openProgram("help")}><label for="windows-help-input"><img src={getProgramIcon('help')} alt="help" />Help</label></li>
                    <li class="calendar" onClick={() => openProgram("calendar")}><label for="windows-calendar-input"><img src={getProgramIcon('calendar')} alt="calendar" />Calendar</label></li>
                    <li class="notepad" onClick={() => openProgram("notepad")}><label for="windows-notepad-input"><img src={getProgramIcon('notepad')} alt="notepad" />Notepad</label></li>
                    </ul>
                </div>
    );
};

export default StartMenu;