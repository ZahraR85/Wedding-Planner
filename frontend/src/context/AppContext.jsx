import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  selectedCity: 'All Cities',
  searchTerm: '',
  hoveredDropdown: null,
  isDropdownOpen: false,
  userId: null, // User ID for authenticated user
  isAuthenticated: false, // Tracks if the user is authenticated
  userRole: null, // Role of the authenticated user
  shoppingCard: [], // State for shopping card items
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
        role: action.payload.role, // Set Role on authentication
      };
      case 'REMOVE_FROM_SHOPPING_CARD':
  return { 
    ...state, 
    shoppingCard: state.shoppingCard.filter(item => item.id !== action.payload.id) 
  };
    case 'SIGN_OUT':
      return { ...state, isAuthenticated: false, userId: null , userRole: null};
      case 'ADD_TO_SHOPPING_CARD':
        return { ...state, shoppingCard: [...state.shoppingCard, action.payload] };
      case 'CLEAR_SHOPPING_CARD':
        return { ...state, shoppingCard: [] };
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

  const setAuth = (isAuthenticated, userId, role) =>
    
    dispatch({ type: 'SET_AUTH', payload: { isAuthenticated, userId, role } });

  const signOut = () => dispatch({ type: 'SIGN_OUT' });

  const addToShoppingCard = (item) => dispatch({ type: 'ADD_TO_SHOPPING_CARD', payload: item });
  const clearShoppingCard = () => dispatch({ type: 'CLEAR_SHOPPING_CARD' });
  const removeFromShoppingCard = (itemId) => dispatch({ type: 'REMOVE_FROM_SHOPPING_CARD', payload: { id: itemId } });
  // Get shopping cart count
  const shoppingCardCount = state.shoppingCard.length;

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
        addToShoppingCard,
        clearShoppingCard,
        removeFromShoppingCard,
        shoppingCardCount, // Expose shopping card count here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
