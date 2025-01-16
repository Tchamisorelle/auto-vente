// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Créer un contexte
const AuthContext = createContext();

// Provider qui enveloppe l'application et fournit l'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fonction pour se connecter
  const login = (userData) => {
    setUser(userData);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour accéder au contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
