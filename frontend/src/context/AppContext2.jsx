import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  selectedCity: 'All Cities',
  searchTerm: '',
  hoveredDropdown: null,
  isDropdownOpen: false,
  userId: null,
  isAuthenticated: false,
  role: null, // Store role here
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
        role: action.payload.role, // Add role to state
      };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setSelectedCity = (city) => dispatch({ type: 'SET_SELECTED_CITY', payload: city });
  const setSearchTerm = (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  const setHoveredDropdown = (dropdown) => dispatch({ type: 'SET_HOVERED_DROPDOWN', payload: dropdown });
  const clearHoveredDropdown = () => dispatch({ type: 'CLEAR_HOVERED_DROPDOWN' });
  const setDropdownOpen = (isOpen) => dispatch({ type: 'SET_DROPDOWN_OPEN', payload: isOpen });

  // Set Auth and fetch role
  const setAuth = async (isAuthenticated, userId) => {
    if (isAuthenticated && userId) {
      try {
        const userId = '675ae6f230c8b5e0e5fe5049';
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }
        const { role } = await response.json(); // The role will come from the backend
        dispatch({
          type: 'SET_AUTH',
          payload: { isAuthenticated, userId, role },
        });
      } catch (error) {
        console.error('Error fetching role:', error);
        dispatch({
          type: 'SET_AUTH',
          payload: { isAuthenticated: false, userId: null, role: null },
        });
      }
    } else {
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, userId: null, role: null },
      });
    }
  };  

  const logout = () => dispatch({ type: 'LOGOUT' });

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
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext2 = () => useContext(AppContext);
