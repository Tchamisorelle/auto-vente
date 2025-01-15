// CartContext.js
import React, { createContext, useContext, useState } from 'react';

// Création du contexte
const CartContext = createContext();

// Fournisseur de contexte
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fonction pour ajouter un item au panier
  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Fonction pour obtenir le nombre d'items dans le panier
  const getTotalItems = () => cartItems.length;

  const value = {
    cartItems,
    addItemToCart,
    getTotalItems, // Exposez la fonction ici
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook pour accéder au contexte
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
