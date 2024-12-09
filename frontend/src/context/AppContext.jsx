import { createContext, useContext, useReducer } from 'react';

// Initial State
const initialState = {
  hoveredDropdown: null,
};

// Reducer Function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOVERED_DROPDOWN':
      return { ...state, hoveredDropdown: action.payload };
    case 'CLEAR_HOVERED_DROPDOWN':
      return { ...state, hoveredDropdown: null };
    default:
      return state;
  }
};

// Create Context
const AppContext = createContext();

// Custom Hook
export const useAppContext = () => {
  return useContext(AppContext);
};

// Context Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setHoveredDropdown = (type) =>
    dispatch({ type: 'SET_HOVERED_DROPDOWN', payload: type });
  const clearHoveredDropdown = () =>
    dispatch({ type: 'CLEAR_HOVERED_DROPDOWN' });

  return (
    <AppContext.Provider value={{ ...state, setHoveredDropdown, clearHoveredDropdown }}>
      {children}
    </AppContext.Provider>
  );
};
