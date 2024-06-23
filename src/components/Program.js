import React from 'react';
import "98.css";
import { useAppContext } from '../AppContext';

const Program = ({ program }) => {
    const [state, dispatch] = useAppContext();

    const onClose = () => {
        dispatch({ type: 'CLOSE_APP', payload: program });
    }

    return (
        <div style={{ width: 300 }} className="window">
            <div className="title-bar">
                <div className="title-bar-text">{program.name}</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" onClick={onClose} />
                </div>
            </div>

            <div className="window-body">
                { program.contents }
                <p style={{ textAlign: "center" }}>Window Contents</p>
            </div>
        </div>
    );
};

export default Program;