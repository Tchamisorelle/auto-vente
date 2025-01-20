import React, { createContext, useContext, useState, useEffect } from 'react';
import { apilogin } from '../services/auth-service';

// Créer un contexte
const AuthContext = createContext();

// Provider qui enveloppe l'application et fournit l'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Charger l'utilisateur depuis localStorage au montage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // setUser(JSON.parse(storedUser)); // Récupérer et définir l'utilisateur
    }
  }, []);

  // Fonction pour se connecter
  const login = async (email, password) => {
    try {
      const userData = await apilogin(email, password); // Appel API
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Persister les données
    } catch (error) {
      console.error('connexion echouer:', error);
      throw error; // Relancer pour être géré par le composant appelant
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
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
