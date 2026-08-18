import {useEffect, useState} from "react";
import { useAppContext } from '../../AppContext';
import MenuBar from './MenuBar'
import './Explorer.css'

const Explorer = () => {
    const { state, dispatch } = useAppContext();
    const [ selectedObjects, setSelectedObjects ] = useState([])
    const [ selectedFolder, setSelectedFolder ] = useState("My Computer")
    const options = {
        File: ["New", "Open", "Save", "Exit"],
        Edit: ["Undo", "Cut", "Copy", "Paste"],
        View: ["Zoom In", "Zoom Out", "Fullscreen"],
        Tools: ["Settings", "Options"],
        Help: ["About", "Documentation"],
    };

    return (
        <div className="explorer-body">
            <div className="explorer-menu-bar">
                <MenuBar options={options}></MenuBar>
            </div>

            <div className="row-two-left">
                <select>
                    <option>My Computer</option>
                </select>
            </div>
            <div className="row-two-right">2B</div>

            <div className="status-field-border" style={{padding: "8px"}}>All Folders</div>
            <div className="status-field-border">Contents of '{selectedFolder}'</div>

            <div className="row-four-left">4A</div>
            <div className="row-four-right">4B</div>

            <div className="bottom-bar">
                <div>{selectedObjects.length} object(s)</div>
                <div>5B</div>
            </div>
        </div>
    )
}

export default Explorer;