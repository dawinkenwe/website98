import React, { useCallback, useRef, useState } from 'react';
import { useAppContext } from '../AppContext';
import './Window.css'

const Window = ({ id }) => {
    const { state, dispatch } = useAppContext();
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });


    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 300, height: 200 });
    const { state, dispatch } = useAppContext();

    const handleMouseDown = (e) => {
        if (e.target.className === 'window-title') {
            e.preventDefault();

            setDragging(true);
            setOffset({
                x: e.clientX - state.components[id].x,
                y: e.clientY - state.components[id].y,
            });
            dispatch({ type: 'SET_ACTIVE_COMPONENT', component: id });
        }
    };

    const handleMouseMove = useCallback(
        (e) => {
            if (dragging && state.activeComponent.id === id) {
                dispatch({
                    type: 'SET_POSITION',
                    component: id,
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y,
                });
            }
        }, [dragging, state.activeComponent, id, offset, dispatch]
    );

    const handleMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    const onClose = () => {
        dispatch({ type: 'CLOSE_APP', payload: id });
    }

    return (
        <div className="window"
            style={{ left: `${state.components[id].x}px`, top: `${state.components[id].y}px`, width: '20rem', position: 'fixed' }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className="title-bar">
                <div className='window-title'>
                    {state.components[id].name}aaa
                </div>
                <div className="controls">
                    <div className="windows-box-shadow">_</div>
                    <div className="windows-box-shadow"> a</div>
                    <div className="windows-box-shadow" onClick={onClose}>X</div>
                </div>
            </div>
            <div className="window-body">
                {state.components[id].contents}
                <p style={{ textAlign: "center" }}>Window Contents</p>
            </div>
        </div>
    );
};

export default Window;