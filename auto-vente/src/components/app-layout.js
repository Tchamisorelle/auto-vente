import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, Shield } from 'lucide-react';
import UserDropdown from './UserDropdown';
import { useAuth } from './AuthProvider';

const AppLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null); // État pour le rôle de l'utilisateur

  // Récupérer le rôle depuis localStorage lors du montage du composant
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    console.log('Récupération du rôle depuis localStorage:', storedRole);  // Debug
    setRole(storedRole);
  }, []);
 
  
  // Vérifier si l'utilisateur est admin ou client
  const isAdmin = role === 'admin';
  const isClient = role === 'client';

  // Détecter la page active en fonction de l'URL
  const currentPath = window.location.pathname;

  // Générer les classes CSS pour les liens de navigation
  const getNavLinkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      currentPath === path ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'
    }`;

  // Rendu conditionnel du layout en fonction du rôle
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Barre de navigation (fixée en haut) */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo et marque */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-400">SaleVehicule</h1>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/" className={getNavLinkClass('/')}>Accueil</a>
              <a href="/catalogue" className={getNavLinkClass('/catalogue')}>Catalogue</a>
              <a href="/order" className={getNavLinkClass('/order')}>Mes Commandes</a>
              <div className="flex items-center space-x-4">
                <a href="/cart" className="p-2 rounded-full hover:bg-gray-700">
                  <ShoppingCart className="h-5 w-5" />
                </a>
                {isAdmin && (
                  <a
                    href="/admin"
                    className="p-2 rounded-full hover:bg-gray-700"
                    title="Panneau d'administration"
                  >
                    <Shield className="h-5 w-5 text-blue-400" />
                  </a>
                )}
                <UserDropdown />
              </div>
            </div>

            {/* Bouton du menu mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className={getNavLinkClass('/')}>Accueil</a>
              <a href="/catalogue" className={getNavLinkClass('/catalogue')}>Catalogue</a>
              <a href="/order" className={getNavLinkClass('/cart')}>Mes Commandes</a>
              {isAdmin && (
                <a href="/admin" className={getNavLinkClass('/admin')}>Panneau Admin</a>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Contenu principal (flex-grow pour pousser le footer vers le bas) */}
      <main className="flex-grow max-w-full px-8 py-6">
        {children}
      </main>

      {/* Pied de page (fixé en bas) */}
      <footer className="bg-gray-800 border-t border-gray-700 sticky bottom-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm">© 2025 SaleVehicule.</p>
            <div className="flex space-x-4">
              <a href="/contact" className="text-sm hover:text-blue-400">Contact</a>
              <a href="/mentions-legales" className="text-sm hover:text-blue-400">Mentions Légales</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
