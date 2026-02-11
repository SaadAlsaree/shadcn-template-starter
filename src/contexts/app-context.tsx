'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  sidebarOpen: boolean;
  notifications: number;
}

type AppAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'SET_NOTIFICATIONS'; payload: number };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    sidebarOpen: true,
    notifications: 3
  });

  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });
  const setSidebar = (open: boolean) =>
    dispatch({ type: 'SET_SIDEBAR', payload: open });

  return (
    <AppContext.Provider value={{ state, dispatch, toggleSidebar, setSidebar }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
