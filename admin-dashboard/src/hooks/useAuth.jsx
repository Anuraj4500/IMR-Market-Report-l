import React, { createContext, useContext, useState } from 'react';
 
// Create Auth Context
const AuthContext = createContext();
 
// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check sessionStorage for login state
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });
 
  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true'); // Ensure session storage is updated
  };
 
  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn'); // Clear session storage on logout
  };
 
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 
// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};