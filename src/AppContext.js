import React, { createContext, useReducer, useContext } from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    components: {
        component1: { x: 100, y: 100, z: 10 },
        component2: { x: 200, y: 200, z: 11 },
    },
    componentIds: ['component1', 'component2'],
    activeComponent: 'component2',
    isStartMenuOpen: false,
    nextZ: 10
}

const AppContext = createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case 'START_APP':
            const appId = uuidv4();
            return produce(state, draft => {
                draft.components[appId] = {
                    id: appId,
                    z: draft.nextZ,
                    name: action.payload.name,
                    contents: action.payload.contents,
                    icon: action.payload.icon
                }
                draft.componentIds.push(appId)
                draft.activeComponent = appId;
                draft.nextZ += 1;
            });
        case 'CLOSE_APP':
            return produce(state, draft => {
                delete draft.components[action.id];
                draft.componentIds.filter((id) => id !== action.id);
            });
        case 'TOGGLE_START_MENU':
            return produce(state, draft => {
                draft.isStartMenuOpen = !draft.isStartMenuOpen;
            });
        case 'SET_POSITION':
            console.log('setting position with action ' + action)
            return produce(state, draft => {
                draft.components[action.component].x = action.x;
                draft.components[action.component].y = action.y;

            });
        case 'SET_ACTIVE_COMPONENT':
            console.log(action);
            return produce(state, draft => {
                draft.components[action.component].z = draft.nextZ;
                draft.nextZ += 1;
                draft.activeComponent = action.component;
            });
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    console.log(state);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };