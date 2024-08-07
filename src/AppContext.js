import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import getInitialState from './helpers/initialState';
import { useMediaQuery } from 'react-responsive';
import Blog from './components/apps/Notepad';

/* TODO: Add help as a default program / landing page. */
const initialState = getInitialState();

const AppContext = createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case 'START_APP':
            const appId = uuidv4();
            return produce(state, draft => {
                draft.components[appId] = {
                    id: appId,
                    x: 6,
                    y: 6,
                    z: draft.nextZ,
                    width: state.deviceType === 'mobile' ? action.payload.defaultSize.mobile.width: action.payload.defaultSize.desktop.width,
                    height: state.deviceType === 'mobile' ? action.payload.defaultSize.mobile.height : action.payload.defaultSize.desktop.height,
                    minWidth: action.payload.minimumSize.width,
                    minHeight: action.payload.minimumSize.height,
                    name: action.payload.name,
                    contents: action.payload.contents,
                    icon: action.payload.icon,
                    minimized: false,
                    maximized: false,
                }
                draft.componentIds.push(appId)
                draft.activeComponent = appId;
                draft.nextZ += 1;
            });
        case 'OPEN_BLOG':
            const blogId = uuidv4();
            console.log(action);
            console.log('open blog ' + action.blogId)
            return produce(state, draft => {
                draft.components[blogId] = {
                    id: blogId,
                    x: 6,
                    y: 6,
                    z: draft.nextZ,
                    width: state.deviceType === 'mobile' ? action.payload.defaultSize.mobile.width : action.payload.defaultSize.desktop.width,
                    height: state.deviceType === 'mobile' ? action.payload.defaultSize.mobile.height : action.payload.defaultSize.desktop.height,
                    minWidth: action.payload.minimumSize.width,
                    minHeight: action.payload.minimumSize.height,
                    name: action.payload.name,
                    contents: <Blog blogKey={action.blogId} />,
                    icon: action.payload.icon,
                    minimized: false,
                }
                draft.componentIds.push(blogId)
                draft.activeComponent = blogId;
                draft.nextZ += 1;
            });
        case 'CLOSE_APP':
            return produce(state, draft => {
                delete draft.components[action.id];
                draft.componentIds = draft.componentIds.filter((id) => id !== action.id);
            });
        case 'TOGGLE_START_MENU':
            return produce(state, draft => {
                draft.isStartMenuOpen = !draft.isStartMenuOpen;
            });
        case 'SET_POSITION':
            return produce(state, draft => {
                draft.components[action.component].x = action.x;
                draft.components[action.component].y = action.y;

            });
        case 'SET_ACTIVE_COMPONENT':
            return produce(state, draft => {
                draft.components[action.component].z = draft.nextZ;
                draft.nextZ += 1;
                draft.activeComponent = action.component;
            });
        case 'TOGGLE_MINIMIZED':
            return produce(state, draft => {
                draft.components[action.id].z = draft.nextZ;
                draft.nextZ = draft.nextZ + 1;
                draft.components[action.id].minimized = !draft.components[action.id].minimized;
            });
        case 'TOGGLE_MAXIMIZED':
            console.log('maximized is: ' + state.components[action.id].maximized);
            console.log('width: ' + state.components[action.id].width + ' height ' + state.components[action.id].height);
            return produce(state, draft => {
                draft.components[action.id].z = draft.nextZ;
                draft.nextZ = draft.nextZ + 1;
                draft.components[action.id].maximized = !draft.components[action.id].maximized;
            })
        case 'DRAG_MAXIMIZED':
            return produce(state, draft => {
                console.log('width: ' + draft.components[action.payload.id].width)
                console.log('payload x: ' + action.payload.x);


                draft.components[action.payload.id].z = draft.nextZ;
                draft.nextZ = draft.nextZ + 1;
                draft.components[action.payload.id].maximized = false;
                draft.components[action.payload.id].y = '6';
                draft.components[action.payload.id].x = action.payload.x - (draft.components[action.payload.id].width / 2);
                console.log('set to ' + draft.components[action.payload.id].x);
            })
        case 'SET_DEVICE_TYPE':
            return produce(state, draft => {
                draft.deviceType = action.payload;
            });
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        if (isMobile) {
            dispatch({ type: 'SET_DEVICE_TYPE', payload: 'mobile' });
        } else if (isTablet) {
            dispatch({ type: 'SET_DEVICE_TYPE', payload: 'tablet' });
        } else {
            dispatch({ type: 'SET_DEVICE_TYPE', payload: 'desktop' });
        }
    }, [isMobile, isTablet]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };