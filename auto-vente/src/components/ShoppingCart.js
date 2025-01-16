// import React, { useState, useEffect } from 'react';
// import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
// import AppLayout from './app-layout';
// import { Link } from 'react-router-dom';

// const ShoppingCart = () => {
//   const [cart, setCart] = useState([]);
//   const [cartHistory, setCartHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fonction pour récupérer les données du panier depuis l'API
//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const response = await fetch('/api/cart');
//         const data = await response.json();
//         setCart(data.items);
//         setCartHistory([data.items]); // Garder l'historique de l'état du panier
//       } catch (error) {
//         console.error('Erreur lors du chargement du panier:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartData();
//   }, []);

//   // Calcul du total du panier
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   // Supprimer un article du panier
//   const removeItem = (id) => {
//     const newCart = cart.filter(item => item.id !== id);
//     setCart(newCart);
//     setCartHistory([...cartHistory, newCart]);
//   };

//   // Mettre à jour la quantité d'un article
//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
//     const newCart = cart.map(item =>
//       item.id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(newCart);
//     setCartHistory([...cartHistory, newCart]);
//   };

//   // Revenir à un état précédent du panier
//   const undoLastAction = () => {
//     if (cartHistory.length > 1) {
//       const previousCart = cartHistory[cartHistory.length - 2];
//       setCart(previousCart);
//       setCartHistory(cartHistory.slice(0, -1)); // Supprimer l'historique de l'état actuel
//     }
//   };

//   // Vérifier les incompatibilités d'options
//   const checkIncompatibilities = (item) => {
//     // Logique des incompatibilités : ici, vous pouvez implémenter votre propre logique
//     const incompatibleOptions = item.options.includes('Sièges en cuir') && item.options.includes('Sièges chauffants');
//     return incompatibleOptions ? 'Incompatibilité détectée' : '';
//   };

//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   return (
//     <AppLayout>
//       <div className="bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <h2 className="text-2xl font-bold mb-6 text-white">Votre Panier</h2>

//           {cart.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-400 mb-4">Votre panier est vide</p>
//               <Link
//                 to="/catalogue"
//                 className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//               >
//                 <ChevronLeft className="mr-2 h-5 w-5" />
//                 Continuer vos achats
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {/* Liste des articles */}
//               <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
//                 {cart.map((item) => (
//                   <div key={item.id} className="p-6 border-b border-gray-700 last:border-0">
//                     <div className="flex items-center space-x-6">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-24 h-24 object-cover rounded-md"
//                       />
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-white">{item.name}</h3>
//                         <div className="text-sm text-gray-400 mt-1">
//                           Options: {item.options.join(", ")}
//                         </div>
//                         {checkIncompatibilities(item) && (
//                           <div className="text-red-500 mt-2">{checkIncompatibilities(item)}</div>
//                         )}
//                         <div className="mt-4 flex items-center justify-between">
//                           <div className="flex items-center space-x-4">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="p-1 rounded-md hover:bg-gray-700 text-white"
//                             >
//                               <ChevronLeft className="h-5 w-5" />
//                             </button>
//                             <span className="text-white">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="p-1 rounded-md hover:bg-gray-700 text-white"
//                             >
//                               <ChevronRight className="h-5 w-5" />
//                             </button>
//                           </div>

//                           <div className="flex items-center space-x-4">
//                             <span className="text-blue-400 font-bold">
//                               {(item.price * item.quantity).toLocaleString()} €
//                             </span>
//                             <button
//                               onClick={() => removeItem(item.id)}
//                               className="p-2 text-red-400 hover:bg-gray-700 rounded-md"
//                             >
//                               <Trash2 className="h-5 w-5" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Résumé de la commande */}
//               <div className="bg-gray-800 rounded-lg p-6 mt-6 shadow-md">
//                 <h3 className="text-lg font-semibold text-white mb-4">Résumé de la commande</h3>
//                 <div className="space-y-2 text-white">
//                   <div className="flex justify-between">
//                     <span>Sous-total</span>
//                     <span>{calculateTotal().toLocaleString()} €</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>TVA (20%)</span>
//                     <span>{(calculateTotal() * 0.2).toLocaleString()} €</span>
//                   </div>
//                   <div className="border-t border-gray-700 pt-2 mt-2">
//                     <div className="flex justify-between font-bold">
//                       <span>Total</span>
//                       <span className="text-blue-400">
//                         {(calculateTotal() * 1.2).toLocaleString()} €
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex justify-between">
//                   <button
//                     onClick={undoLastAction}
//                     className="w-full text-center px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//                   >
//                     Annuler la dernière action
//                   </button>
//                   <Link
//                     to="/paie"
//                     className="w-full text-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                   >
//                     Procéder au paiement
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default ShoppingCart;
import React, { useState, useEffect } from 'react';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import AppLayout from './app-layout';
import { Link } from 'react-router-dom'; // Pour gérer la navigation

// Fonction pour simuler l'appel API pour récupérer les données du panier
const fetchCartData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
    }, 1000); // Simule un délai de 1 seconde pour l'appel API
  });
};

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les données du panier lors du chargement du composant
  useEffect(() => {
    const loadCartData = async () => {
      const data = await fetchCartData();
      setCart(data);
      setLoading(false);
    };

    loadCartData();
  }, []);

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

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Chargement...</p>
            </div>
          ) : cart.length === 0 ? (
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
                    to="/paie"
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
