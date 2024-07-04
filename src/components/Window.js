import React, { useCallback, useRef, useState } from 'react';
import { useAppContext } from '../AppContext';
import './Window.css'

const Window = ({ id }) => {
    const { state, dispatch } = useAppContext();
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);

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
        dispatch({
            type: 'SET_WIDTH_HEIGHT',
            id: id,
            width: windowRef.current.offsetWidth + 'px',
            height: windowRef.current.offsetHeight + 'px',
        })
    }, []);

    const handleTouchStart = (e) => {
        if (e.target.className === 'window-title') {
            const touch = e.targetTouches[0];
            e.preventDefault();
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
                e.preventDefault();
                e.stopPropagation();
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
        dispatch({
            type: 'SET_WIDTH_HEIGHT',
            id: id,
            width: windowRef.current.offsetWidth + 'px',
            height: windowRef.current.offsetHeight + 'px',
        })
    }, []);


    const onClose = () => {
        dispatch({ type: 'CLOSE_APP', id: id });
    }

    const toggleMinimized = () => {
        dispatch({ type: 'TOGGLE_MINIMIZED', id: id, minimized: true})
    }


    return (
        <div className="window"
            style={{
                left: `${state.components[id]['x']}px`,
                top: `${state.components[id].y}px`,
                width: `${state.components[id].width}`,
                height: `${state.components[id].height}`,
                position: 'fixed',
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
                    <div className="windows-box-shadow" onClick={toggleMinimized}>_</div>
                    <div className="windows-box-shadow"> a</div>
                    <div className="windows-box-shadow" onClick={onClose}>X</div>
                </div>
            </div>
            <div className="window-body">
                {state.components[id].contents}
            </div>
        </div>
    );
};

export default Window;