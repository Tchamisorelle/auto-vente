import React, { useState } from 'react';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import AppLayout from './app-layout';
import { Link } from 'react-router-dom';  // Pour gérer la navigation

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Tesla Model 3",
      price: 42900,
      quantity: 1,
      options: ["Autopilot", "Intérieur premium"],
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      name: "iPhone 13",
      price: 999,
      quantity: 2,
      options: ["128 Go", "Couleur bleue"],
      image: "/api/placeholder/400/300"
    }
  ]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <AppLayout>
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Votre Panier</h2>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Votre panier est vide</p>
              <Link
                to="/catalogue"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Continuer vos achats
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {/* Liste des articles */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 border-b border-gray-700 last:border-0">
                    <div className="flex items-center space-x-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <div className="text-sm text-gray-400 mt-1">
                          Options: {item.options.join(", ")}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-md hover:bg-gray-700 text-white"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            <span className="text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-md hover:bg-gray-700 text-white"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-blue-400 font-bold">
                              {(item.price * item.quantity).toLocaleString()} €
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-400 hover:bg-gray-700 rounded-md"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Résumé de la commande */}
              <div className="bg-gray-800 rounded-lg p-6 mt-6 shadow-md">
                <h3 className="text-lg font-semibold text-white mb-4">Résumé de la commande</h3>
                <div className="space-y-2 text-white">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{calculateTotal().toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (20%)</span>
                    <span>{(calculateTotal() * 0.2).toLocaleString()} €</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-blue-400">
                        {(calculateTotal() * 1.2).toLocaleString()} €
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to="/order"
                    className="w-full block text-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Procéder au paiement
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ShoppingCart;
