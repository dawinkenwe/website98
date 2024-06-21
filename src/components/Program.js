import React from 'react';
import "98.css";

const Window = ({ id, onClose }) => {
    return (
        <div style={{ width: 300 }} className="window">
            <div className="title-bar">
                <div className="title-bar-text">Window {id}</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" onClick={() => onClose(id)} />
                </div>
            </div>

            <div className="window-body">
                <p style={{ textAlign: "center" }}>Window Contents</p>
            </div>
        </div>
    );
};

export default Window;