import React, { useCallback, useRef, useState } from 'react';
import { useAppContext } from '../AppContext';
import './Window.css'

const Window = ({ id }) => {
    const { state, dispatch } = useAppContext();
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);

    /* We need to set the width and height of the element on load so that when we maximize and unmaximize there is a width to calculate with.*/

    const handleMouseDown = (e) => {
        if (e.target.className === 'window-title') {
            e.preventDefault();
            e.stopPropagation();

            setDragging(true);
            setOffset({
                x: e.clientX - state.components[id].x,
                y: e.clientY - state.components[id].y,
            });
        }
        dispatch({ type: 'SET_ACTIVE_COMPONENT', component: id });
    };

    const handleMouseMove = useCallback(
        (e) => {
            if (dragging && state.activeComponent === id) {
                e.preventDefault();
                e.stopPropagation();
                if (state.components[id].maximized) {
                    dispatch({ 'type': 'DRAG_MAXIMIZED', payload: { x: e.clientX, id: id }});
                }
                dispatch({
                    type: 'SET_POSITION',
                    component: id,
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y,
                });
            }
        }, [dragging, state.activeComponent, id, offset, dispatch, state.components]
    );

    const handleMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    const handleTouchStart = (e) => {
        if (e.target.className === 'window-title') {
            const touch = e.targetTouches[0];
            e.stopPropagation();

            setDragging(true);
            setOffset({
                x: touch.pageX - state.components[id].x,
                y: touch.pageY - state.components[id].y,
            });
        }
        dispatch({ type: 'SET_ACTIVE_COMPONENT', component: id });
    }

    const handleTouchMove = useCallback(
        (e) => {
            if (dragging && state.activeComponent === id) {
                e.stopPropagation();
                if (state.components[id].maximized) {
                    dispatch({ 'type': 'TOGGLE_MAXIMIZED', id: id });
                }
                const touch = e.targetTouches[0];
                dispatch({
                    type: 'SET_POSITION',
                    component: id,
                    x: touch.pageX - offset.x,
                    y: touch.pageY - offset.y,
                })

            }
        }, [dragging, state.activeComponent, id, offset, dispatch]
    )

    const handleTouchEnd = useCallback(() => {
        setDragging(false);
    }, []);


    const onClose = () => {
        dispatch({ type: 'CLOSE_APP', id: id });
    }

    const toggleMinimized = () => {
        dispatch({ type: 'TOGGLE_MINIMIZED', id: id, minimized: true})
    }

    const toggleMaximized = () => {
        dispatch({type: 'TOGGLE_MAXIMIZED', id: id})
    }


    return (
        <div className="window"
            style={{
                left: state.components[id].maximized ? '6px' : `${state.components[id]['x']}px`,
                top: state.components[id].maximized ? '6px' : `${state.components[id].y}px`,
                width: state.components[id].maximized ? '100%' : `${state.components[id].width}`,
                height: state.components[id].maximized ? '100%' : `${state.components[id].height}`,
                position: 'absolute',
                zIndex: `${state.components[id].minimized ? 0: state.components[id].z}`,
                minWidth: `${state.components[id].minWidth}`,
                minHeight: `${state.components[id].minHeight}`,
            }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={windowRef}
        >
            <div className="title-bar">
                <div className='window-title'>
                    {state.components[id].name}
                </div>
                <div className="controls">
                    <div className="windows-box-shadow" onClick={toggleMinimized}><img src={ require('../img/minimize.png')} alt="minimize" /></div>
                    <div className="windows-box-shadow" onClick={toggleMaximized}><img src={require('../img/maximize.png')} alt="maximize" /></div>
                    <div className="windows-box-shadow" onClick={onClose}><img src={require('../img/chunky_close.png')} alt="close" /></div>
                </div>
            </div>
            <div className="window-body">
                {state.components[id].contents}
            </div>
        </div>
    );
};

export default Window;