import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    username: null,
    role: null,
  });

  // Function to set authentication state
  const login = (token, username, role) => {
    setAuthState({ token, username, role });
  };

  // Function to clear authentication state
  const logout = () => {
    setAuthState({ token: null, username: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
  