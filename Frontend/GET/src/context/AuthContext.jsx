import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedAuthState = sessionStorage.getItem("authState");
    return storedAuthState
      ? JSON.parse(storedAuthState)
      : { token: null, userId: null, username: null, role: null };
  });

  const login = (token, userId, username, role) => {
    const newAuthState = { token, userId, username, role };
    setAuthState(newAuthState);
    sessionStorage.setItem("authState", JSON.stringify(newAuthState));
  };

  const logout = () => {
    setAuthState({ token: null, userId: null, username: null, role: null });
    sessionStorage.removeItem("authState");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
