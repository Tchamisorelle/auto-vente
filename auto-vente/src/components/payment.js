// import React, { useState } from 'react';
// import { CreditCard, Truck, Calendar } from 'lucide-react';
// import AppLayout from './app-layout';
// import { useLocation } from 'react-router-dom'; 
// import axios from 'axios';

// const Paie = () => {
//   const location = useLocation();
//   const [paymentMethod, setPaymentMethod] = useState('cash');
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     country: 'FR',
//     creditCardNumber: '',
//     creditCardExpiry: '',
//     creditCardCVC: ''
//   });
  
//   const orders = location.state?.cart || [];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Étape 1 : Finaliser la commande - Mise à jour de l'état à "en cours"
//     try {
//       const orderData = {
//         user: formData,
//         items: orders,
//         status: 'en cours'
//       };
//       const orderResponse = await axios.post('/api/order', orderData);
//       console.log('Commande soumise:', orderResponse.data);

//       // Étape 2 : Confirmer le paiement
//       if (paymentMethod === 'creditCard') {
//         const paymentData = {
//           orderId: orderResponse.data.orderId,
//           method: 'creditCard',
//           amount: calculateTotal(orders),
//           status: 'confirmed',
//           paymentDetails: {
//             creditCardNumber: formData.creditCardNumber,
//             creditCardExpiry: formData.creditCardExpiry,
//             creditCardCVC: formData.creditCardCVC
//           }
//         };
//         const paymentResponse = await axios.post('/api/payment', paymentData);
//         console.log('Paiement confirmé:', paymentResponse.data);
//       } else {
//         // Paiement à la livraison
//         const paymentResponse = await axios.post('/api/payment', {
//           orderId: orderResponse.data.orderId,
//           method: 'cash',
//           amount: calculateTotal(orders),
//           status: 'confirmed'
//         });
//         console.log('Paiement à la livraison confirmé:', paymentResponse.data);
//       }

//       // Étape 3 : Mettre à jour l'état après la livraison
//       const deliveryResponse = await axios.post('/api/delivery', {
//         orderId: orderResponse.data.orderId,
//         status: 'livrée'
//       });
//       console.log('Commande livrée:', deliveryResponse.data);

//     } catch (error) {
//       console.error('Erreur lors de la commande:', error);
//     }
//   };

//   // Fonction pour calculer le total de la commande
//   const calculateTotal = (orders) => {
//     return orders.reduce((total, vehicle) => total + vehicle.price, 0);
//   };

//   return (
//     <AppLayout>
//       <div className="max-w-4xl mx-auto space-y-8">
//         <h2 className="text-2xl font-bold">Finaliser votre commande</h2>

//         {/* Liste des véhicules ou produits commandés */}
//         <div className="bg-gray-800 rounded-lg p-6">
//           <h3 className="text-lg font-semibold mb-4">Vos commandes</h3>
//           <div className="space-y-4">
//             {orders.length > 0 ? (
//               <ul className="space-y-2">
//                 {orders.map((vehicle, index) => (
//                   <li key={index} className="flex justify-between items-center">
//                     <span>{vehicle.name}</span>
//                     <span>{vehicle.price.toLocaleString()} €</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Aucune commande ajoutée.</p>
//             )}
//           </div>
//         </div>

//         {/* Formulaire d'ajout des informations personnelles */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Informations personnelles */}
//           <div className="bg-gray-800 rounded-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Prénom</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-700 border-gray-600 rounded-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Nom</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-700 border-gray-600 rounded-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-700 border-gray-600 rounded-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Téléphone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-700 border-gray-600 rounded-md"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Méthode de paiement */}
//           <div className="bg-gray-800 rounded-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Méthode de paiement</h3>
//             <div className="flex items-center space-x-6">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="creditCard"
//                   checked={paymentMethod === 'creditCard'}
//                   onChange={() => setPaymentMethod('creditCard')}
//                   className="mr-2"
//                 />
//                 <CreditCard className="h-5 w-5 text-white" />
//                 <span className="ml-2 text-white">Carte de crédit</span>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="cash"
//                   checked={paymentMethod === 'cash'}
//                   onChange={() => setPaymentMethod('cash')}
//                   className="mr-2"
//                 />
//                 <span className="ml-2 text-white">Paiement à la livraison</span>
//               </div>
//             </div>
//             {paymentMethod === 'creditCard' && (
//               <div className="space-y-4 mt-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Numéro de carte</label>
//                   <input
//                     type="text"
//                     name="creditCardNumber"
//                     value={formData.creditCardNumber}
//                     onChange={handleInputChange}
//                     className="w-full bg-gray-700 border-gray-600 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Expiration</label>
//                     <input
//                       type="text"
//                       name="creditCardExpiry"
//                       value={formData.creditCardExpiry}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-700 border-gray-600 rounded-md"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">CVC</label>
//                     <input
//                       type="text"
//                       name="creditCardCVC"
//                       value={formData.creditCardCVC}
//                       onChange={handleInputChange}
//                       className="w-full bg-gray-700 border-gray-600 rounded-md"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Informations d'expédition */}
//           <div className="bg-gray-800 rounded-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Adresse de livraison</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Adresse</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-700 border-gray-600 rounded-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Ville</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-700 border-gray-600 rounded-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Code postal</label>
//                 <input
//                   type="text"
//                   name="postalCode"
//                   value={formData.postalCode}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-700 border-gray-600 rounded-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Pays</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   className="w-full bg-gray-700 border-gray-600 rounded-md"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
//             >
//               Finaliser la commande
//             </button>
//           </div>
//         </form>
//       </div>
//     </AppLayout>
//   );
// };

// export default Paie;
import React, { useState, useEffect } from 'react';
import { CreditCard, Truck, Calendar } from 'lucide-react';
import AppLayout from './app-layout';
import { useLocation } from 'react-router-dom'; // Pour obtenir les données de la commande

const Paie = () => {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'FR',
    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCVC: ''
  });

  // Simulation des données API
  const orders = [
    { name: 'Voiture A', price: 25000 },
    { name: 'Voiture B', price: 30000 },
  ];

  // Fonction pour simuler un appel API (par exemple, en changeant l'état de la commande)
  const [orderStatus, setOrderStatus] = useState('en cours');
  
  useEffect(() => {
    // Simuler la confirmation du paiement après 3 secondes
    const paymentConfirmationTimeout = setTimeout(() => {
      setOrderStatus('validée');  // Simule la mise à jour après paiement
    }, 3000);

    // Simuler la mise à jour de l'état de la livraison après 6 secondes
    const deliveryTimeout = setTimeout(() => {
      setOrderStatus('livrée');  // Simule la mise à jour après la livraison
    }, 6000);

    return () => {
      clearTimeout(paymentConfirmationTimeout);
      clearTimeout(deliveryTimeout);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Commande soumise:', formData);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold">Finaliser votre commande</h2>

        {/* Liste des véhicules ou produits commandés */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Vos commandes</h3>
          <div className="space-y-4">
            {orders.length > 0 ? (
              <ul className="space-y-2">
                {orders.map((vehicle, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{vehicle.name}</span>
                    <span>{vehicle.price.toLocaleString()} €</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune commande ajoutée.</p>
            )}
          </div>
        </div>

        {/* Affichage de l'état de la commande */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">État de la commande</h3>
          <p className="text-white">{`Statut actuel: ${orderStatus}`}</p>
        </div>

        {/* Formulaire d'ajout des informations personnelles */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Méthode de paiement</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={() => setPaymentMethod('creditCard')}
                  className="mr-2"
                />
                <CreditCard className="h-5 w-5 text-white" />
                <span className="ml-2 text-white">Carte de crédit</span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="mr-2"
                />
                <span className="ml-2 text-white">Paiement à la livraison</span>
              </div>
            </div>
            {paymentMethod === 'creditCard' && (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Numéro de carte</label>
                  <input
                    type="text"
                    name="creditCardNumber"
                    value={formData.creditCardNumber}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border-gray-600 rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiration</label>
                    <input
                      type="text"
                      name="creditCardExpiry"
                      value={formData.creditCardExpiry}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border-gray-600 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVC</label>
                    <input
                      type="text"
                      name="creditCardCVC"
                      value={formData.creditCardCVC}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border-gray-600 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Informations d'expédition */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Adresse de livraison</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ville</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code postal</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pays</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            >
              Finaliser la commande
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default Paie;
