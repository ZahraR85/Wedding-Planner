import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  selectedCity: 'All Cities',
  searchTerm: '',
  hoveredDropdown: null,
  isDropdownOpen: false,
  userId: null, // User ID for authenticated user
  isAuthenticated: false, // Tracks if the user is authenticated
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CITY':
      return { ...state, selectedCity: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_HOVERED_DROPDOWN':
      return { ...state, hoveredDropdown: action.payload };
    case 'CLEAR_HOVERED_DROPDOWN':
      return { ...state, hoveredDropdown: null };
    case 'SET_DROPDOWN_OPEN':
      return { ...state, isDropdownOpen: action.payload };
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        userId: action.payload.userId,
      };
    case 'SIGN_OUT':
      return { ...state, isAuthenticated: false, userId: null };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions to modify state
  const setSelectedCity = (city) => dispatch({ type: 'SET_SELECTED_CITY', payload: city });
  const setSearchTerm = (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  const setHoveredDropdown = (dropdown) => dispatch({ type: 'SET_HOVERED_DROPDOWN', payload: dropdown });
  const clearHoveredDropdown = () => dispatch({ type: 'CLEAR_HOVERED_DROPDOWN' });
  const setDropdownOpen = (isOpen) => dispatch({ type: 'SET_DROPDOWN_OPEN', payload: isOpen });

  const setAuth = (isAuthenticated, userId) =>
    dispatch({ type: 'SET_AUTH', payload: { isAuthenticated, userId } });

  const signOut = () => dispatch({ type: 'SIGN_OUT' });

  return (
    <AppContext.Provider
      value={{
        ...state,
        setSelectedCity,
        setSearchTerm,
        setHoveredDropdown,
        clearHoveredDropdown,
        setDropdownOpen,
        setAuth,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
