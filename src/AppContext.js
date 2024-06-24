import React, { createContext, useReducer, useContext } from 'react';

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
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, { runningApps: [] , isStartMenuOpen: false});

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };