import React from 'react';
import './StartMenu.css'
import { getProgramIcon } from '../helpers/programMap';

const StartMenu = React.forwardRef(({ onMenuItemClick, isVisible }, ref) => {
    /* Import menu items from file? use mapping and {} */
    return (
        <div id="start-menu" class="windows-box-shadow" style={{ display: isVisible ? 'block': 'none'} }>
            <div id="windows-start-menu-blue">Windows<span>98</span></div>
            <ul>
                <li class="line help" onClick={() => onMenuItemClick("help")}><label for="windows-help-input"><img src={getProgramIcon('help')} alt="help" />Help</label></li>
                <li class="calendar" onClick={() => onMenuItemClick("calendar")}><label for="windows-calendar-input"><img src={getProgramIcon('calendar')} alt="calendar" />Calendar</label></li>
                <li class="notepad" onClick={() => onMenuItemClick("notepad")}><label for="windows-notepad-input"><img src={getProgramIcon('notepad')} alt="notepad" />Notepad</label></li>
            </ul>
        </div>
    );
});

export default StartMenu;