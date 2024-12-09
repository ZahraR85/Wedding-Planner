import { createContext, useContext, useReducer } from 'react';

// Initial State
const initialState = {
  hoveredDropdown: null,
  selectedCity: 'All Cities',
  searchTerm: '',
};

// Reducer Function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOVERED_DROPDOWN':
      return { ...state, hoveredDropdown: action.payload };
    case 'CLEAR_HOVERED_DROPDOWN':
      return { ...state, hoveredDropdown: null };
    case 'SET_SELECTED_CITY':
      return { ...state, selectedCity: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
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
  const setSelectedCity = (city) =>
    dispatch({ type: 'SET_SELECTED_CITY', payload: city });
  const setSearchTerm = (term) =>
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });

  return (
    <AppContext.Provider
      value={{
        ...state,
        setHoveredDropdown,
        clearHoveredDropdown,
        setSelectedCity,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
