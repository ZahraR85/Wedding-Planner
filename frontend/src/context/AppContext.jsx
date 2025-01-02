import { createContext, useContext, useReducer } from 'react';

// Create context for app state
const AppContext = createContext();

// Initial state
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

// Define reducer function
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
        userRole: action.payload.role, // Set Role on authentication
      };
    case 'SIGN_OUT':
      return { ...state, isAuthenticated: false, userId: null, userRole: null };
      case 'ADD_TO_SHOPPING_CARD':
        // Check if serviceName exists in payload and shopping card
        if (!action.payload || !action.payload.serviceName) {
          console.error('Item must have a serviceName property');
          return state; // No action if the item does not have serviceName
        }
      
        // Prevent duplicates by checking if the service already exists in the cart
        const isDuplicate = state.shoppingCard.some(
          (cardItem) => cardItem.serviceName === action.payload.serviceName
        );
      
        if (isDuplicate) {
          return state; // Return the existing state if duplicate
        }
      
        // Create a unique ID for the item using serviceName and timestamp
        const uniqueItem = {
          ...action.payload,
          id: action.payload.serviceName + '-' + new Date().getTime(), // Unique ID
        };
      
        return {
          ...state,
          shoppingCard: [...state.shoppingCard, uniqueItem], // Add new unique item
        };
      
    case 'CLEAR_SHOPPING_CARD':
      return { ...state, shoppingCard: [] };
    default:
      return state;
  }
};

// AppProvider component to provide state to the app
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

  // Add to shopping card
  const addToShoppingCard = (item) => {
    // Ensure each item in the shopping cart has a unique ID
    const uniqueItem = { ...item, id: item.serviceName + '-' + new Date().getTime() }; // or use any other unique ID
    dispatch({ type: 'ADD_TO_SHOPPING_CARD', payload: uniqueItem });
  };

  const clearShoppingCard = () => dispatch({ type: 'CLEAR_SHOPPING_CARD' });
  const removeFromShoppingCard = (itemId) => dispatch({ type: 'REMOVE_FROM_SHOPPING_CARD', payload: { id: itemId } });

  // Get shopping card count
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

// Custom hook to access app context
export const useAppContext = () => useContext(AppContext);
