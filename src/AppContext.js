import React, { createContext, useReducer, useContext } from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    components: {},
    componentIds: [],
    activeComponent: '',
    isStartMenuOpen: false,
    nextZ: 10
}

const AppContext = createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case 'START_APP':
            console.log(state);
            const appId = uuidv4();
            return produce(state, draft => {
                draft.components[appId] = {
                    id: appId,
                    x: action.payload.openPosition.x,
                    y: action.payload.openPosition.y,
                    z: draft.nextZ,
                    width: action.payload.defaultSize.width,
                    height: action.payload.defaultSize.height,
                    name: action.payload.name,
                    contents: action.payload.contents,
                    icon: action.payload.icon,
                    minimized: false,
                }
                draft.componentIds.push(appId)
                draft.activeComponent = appId;
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
            console.log('SETTING MINIMIZED')
            return produce(state, draft => {
                draft.components[action.id].minimized = !draft.components[action.id].minimized;
            })
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };