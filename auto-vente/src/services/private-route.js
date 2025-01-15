import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider'; // Importer le hook useAuth

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Accéder à l'état d'authentification
  
  if (!user) {
    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
    return <Navigate to="/login" />;
  }


  // Si l'utilisateur est un utilisateur normal (role !== 'admin')
  return children; // Rendre les enfants (la page protégée pour l'utilisateur)
};

export default PrivateRoute;
