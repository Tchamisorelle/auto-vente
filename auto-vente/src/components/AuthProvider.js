import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer un contexte pour l'authentification
const AuthContext = createContext();

// Hook personnalisé pour accéder au contexte
export const useAuth = () => useContext(AuthContext);

// AuthProvider pour gérer l'état d'authentification et les données utilisateur
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Récupérer les données de l'utilisateur depuis le localStorage au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Charger l'utilisateur depuis localStorage
    }
  }, []);

  // Fonction de login
  const login = (credentials) => {
    // Simuler des utilisateurs avec rôles
    const simulatedUsers = {
      admin: { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' },
      client: { email: 'client@example.com', password: 'client123', role: 'client', name: 'Client User' },
    };

    // Vérifier les informations d'identification et simuler une connexion
    const userData = simulatedUsers[credentials.email === 'admin@example.com' ? 'admin' : 'client'];

    if (userData && userData.password === credentials.password) {
      localStorage.setItem('user', JSON.stringify(userData)); // Sauvegarder l'utilisateur dans le localStorage
      setUser(userData); // Mettre à jour l'état utilisateur
      return userData;
    }

    throw new Error('Email ou mot de passe incorrect');
  };

  // Fonction de logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
