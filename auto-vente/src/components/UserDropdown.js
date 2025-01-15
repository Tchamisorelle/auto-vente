import React, { useState } from 'react';
import { User, LogIn, LogOut } from 'lucide-react'; // Ajoute des icônes pour login et logout
import { Link, useNavigate } from 'react-router-dom'; // Ajoute useNavigate pour la redirection
import { useAuth } from './AuthProvider';

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Pour la redirection après déconnexion

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    logout(); // Appeler la fonction de déconnexion
    setIsDropdownOpen(false); // Fermer le menu déroulant
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <div className="relative">
      <button
        onClick={handleDropdownToggle}
        className="p-2 rounded-full hover:bg-gray-700"
      >
        <User className="h-5 w-5" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-100 rounded-lg shadow-lg z-20">
          <div className="py-2">
            {user ? (
              <>
                {/* Afficher l'option Profil et Déconnexion si l'utilisateur est connecté */}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              // Afficher le lien de Connexion si l'utilisateur n'est pas connecté
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
