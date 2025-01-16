import React, { useState } from 'react';
import { User, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
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
