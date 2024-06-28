import React from 'react';
import './StartMenu.css'
import { getProgramInfo, getProgramIcon } from '../helpers/programMap';
import { useAppContext } from '../AppContext';

const StartMenu = () => {
    const {state, dispatch} = useAppContext();

    const openProgram = (programName) => {
        dispatch({ type: 'START_APP', payload: getProgramInfo(programName )});
        dispatch({ type: 'TOGGLE_START_MENU' });    
    };

    /* TODO: Import menu items from file? use mapping and {} */
    return (
                <div id="start-menu" class="windows-box-shadow" style={{ display: state.isStartMenuOpen ? 'block' : 'none' }}>
                    <div id="windows-start-menu-blue">Windows<span>98</span></div>
                    <ul>
                        <li className="windows-update" onClick={() => openProgram("windowsUpdate")}><label for="windows-update-input"><img src={getProgramIcon('windowsUpdate')} alt="help" />Windows Update</label></li>
                        <li className="programs" onClick={() => openProgram("help")}><label for="windows-help-input"><img src={getProgramIcon('help')} alt="help" />Help</label></li>
                        <li className="documents" onClick={() => openProgram("documents")}><label for="windows-documents-input"><img src={getProgramIcon('documents')} alt="documents" />Documents</label></li>
                        <li onClick={() => openProgram("help")}><label for="windows-help-input"><img src={getProgramIcon('help')} alt="help" />Help</label></li>
                        <li className="calendar" onClick={() => openProgram("calendar")}><label for="windows-calendar-input"><img src={getProgramIcon('calendar')} alt="calendar" />Calendar</label></li>
                        <li className="notepad" onClick={() => openProgram("notepad")}><label for="windows-notepad-input"><img src={getProgramIcon('notepad')} alt="notepad" />Notepad</label></li>
                    </ul>
                </div>
    );
};

export default StartMenu;