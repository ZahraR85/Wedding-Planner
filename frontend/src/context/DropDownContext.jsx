import { createContext, useContext, useReducer } from 'react';

const DropdownContext = createContext();

const initialState = {
  facilitiesDropdownOpen: false,
};

function dropdownReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FACILITIES':
      return { ...state, facilitiesDropdownOpen: !state.facilitiesDropdownOpen };
    case 'CLOSE_ALL':
      return { facilitiesDropdownOpen: false };
    default:
      return state;
  }
}

export function DropdownProvider({ children }) {
  const [state, dispatch] = useReducer(dropdownReducer, initialState);

  return (
    <DropdownContext.Provider value={{ state, dispatch }}>
      {children}
    </DropdownContext.Provider>
  );
}

export function useDropdown() {
  return useContext(DropdownContext);
}
