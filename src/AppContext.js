import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
    components: {
        component1: { x: 100, y: 100 },
        component2: { x: 200, y: 200 },
    },
    activeComponent: null,
    isStartMenuOpen: false,
    runningApps: []
}

const AppContext = createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case 'START_APP':
            console.log(state.runningApps);
            return {
                ...state,
                runningApps: [...state.runningApps, action.payload]
            };
        case 'CLOSE_APP':
            return {
                ...state,
                runningApps: state.runningApps.filter(app => app.id !== action.payload.id)
            };
        case 'TOGGLE_START_MENU':
            return { ...state, isStartMenuOpen: !state.isStartMenuOpen };
        case 'SET_POSITION':
            console.log('setting position with action ' + action)
            return {
                ...state,
                components: {
                    ...state.components,
                    [action.component]: { x: action.x, y: action.y },
                },
            };
        case 'SET_ACTIVE_COMPONENT':
            return {
                ...state,
                activeComponent: action.component,
            }
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