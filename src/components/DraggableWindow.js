import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import './DraggableWindow.css'

const DraggableWindow = ({ id }) => {
    const { state, dispatch } = useAppContext();
    const componentRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

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
            if (dragging && state.activeComponent === id) {
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

    return (
        <div
            ref={componentRef}
            className="draggable-window"
            style={{ left: `${state.components[id].x}px`, top: `${state.components[id].y}px`, position: 'fixed' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div className="window-title">Draggable Component {id}</div>
            <div className="window-content">
                Window Content!!
            </div>
        </div>
    );
};

export default DraggableWindow;