import React, { useState } from 'react';
import { ShoppingCart, User, Menu } from 'lucide-react';
import UserDropdown from './UserDropdown';

const AppLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Détecter la page active en fonction de l'URL
  const currentPath = window.location.pathname;

  const getNavLinkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      currentPath === path ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Navigation Bar (fixed at the top) */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-400">SaleVehicule</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/" className={getNavLinkClass('/')}>
                Accueil
              </a>
              <a href="/catalogue" className={getNavLinkClass('/catalogue')}>
                Catalogue
              </a>
              <a href="/cart" className={getNavLinkClass('/cart')}>
                Mes Commandes
              </a>
              <div className="flex items-center space-x-4">
                <a href="/cart" className="p-2 rounded-full hover:bg-gray-700">
                  <ShoppingCart className="h-5 w-5" />
                </a>
                <UserDropdown />
              </div>
            </div>

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className={getNavLinkClass('/')}>
                Accueil
              </a>
              <a href="/catalogue" className={getNavLinkClass('/catalogue')}>
                Catalogue
              </a>
              <a href="/cart" className={getNavLinkClass('/cart')}>
                Mes Commandes
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content (flex-grow to push footer down) */}
      <main className="flex-grow max-w-full px-8 py-6">
        {children}
      </main>

      {/* Footer (fixed at the bottom) */}
      <footer className="bg-gray-800 border-t border-gray-700 sticky bottom-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm">© 2025 SaleVehicule.</p>
            <div className="flex space-x-4">
              <a href="/contact" className="text-sm hover:text-blue-400">Contact</a>
              <a href="/mentions-legales" className="text-sm hover:text-blue-400"></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
