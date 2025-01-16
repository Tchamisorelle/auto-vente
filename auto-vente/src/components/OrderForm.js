// import React, { useState, useEffect } from 'react';
// import { Search, FileText, Download, Check } from 'lucide-react';
// import AppLayout from './app-layout'; // Assurez-vous que le chemin est correct
// import { fetchOrders } from '../services/api'; // Remplacez par votre service réel

// const OrderManagementClient = () => {
//   const [orders, setOrders] = useState([]);
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const loadOrders = async () => {
//       try {
//         const data = await fetchOrders(); // Appel API pour récupérer les commandes
//         setOrders(data);
//       } catch (error) {
//         console.error('Erreur lors du chargement des commandes :', error);
//       }
//     };

//     loadOrders();
//   }, []);

//   const handleValidateOrder = async (orderId) => {
//     try {
//       // Simuler un appel pour valider la commande
//       const response = await fetch(`/api/orders/${orderId}/validate`, {
//         method: 'POST',
//       });

//       if (response.ok) {
//         // Mettre à jour localement le statut
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.id === orderId ? { ...order, status: 'validated' } : order
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Erreur lors de la validation de la commande :', error);
//     }
//   };

//   const filteredOrders = orders.filter(
//     (order) =>
//       (filterStatus === 'all' || order.status === filterStatus) &&
//       (searchTerm === '' || order.id.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const handleDownloadDocument = async (orderId, format) => {
//     try {
//       // Télécharger le document au format souhaité
//       const response = await fetch(`/api/documents/${orderId}?format=${format}`, {
//         method: 'GET',
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `document-${orderId}.${format}`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error('Erreur lors du téléchargement du document :', error);
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="space-y-12">
//         <div className="text-center space-y-6 py-12">
//           <h1 className="text-4xl font-bold text-blue-400 sm:text-5xl">Gestion de Commandes</h1>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             Consultez, gérez vos commandes et téléchargez les documents nécessaires.
//           </p>
//         </div>

//         {/* Filtres */}
//         <div className="flex justify-between items-center mb-6">
//           <select
//             className="bg-black border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="all">Tous les statuts</option>
//             <option value="pending">En attente</option>
//             <option value="validated">Validée</option>
//             <option value="documents_ready">Documents prêts</option>
//           </select>
//           <div className="relative max-w-md">
//             <input
//               type="text"
//               placeholder="Rechercher une commande..."
//               className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow-md border border-gray-300 focus:outline-none"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>
//         </div>

//         {/* Tableau des commandes */}
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Statut</th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-sm">{order.id}</td>
//                   <td className="px-6 py-4 text-sm">{order.status}</td>
//                   <td className="px-6 py-4 text-sm">
//                     {order.status === 'pending' && (
//                       <button
//                         className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                         onClick={() => handleValidateOrder(order.id)}
//                       >
//                         Valider
//                       </button>
//                     )}
//                     {order.status === 'documents_ready' && (
//                       <div className="flex space-x-2">
//                         <button
//                           className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                           onClick={() => handleDownloadDocument(order.id, 'pdf')}
//                         >
//                           PDF
//                         </button>
//                         <button
//                           className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                           onClick={() => handleDownloadDocument(order.id, 'xlsx')}
//                         >
//                           Excel
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default OrderManagementClient;

import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, Check } from 'lucide-react';
import AppLayout from './app-layout'; // Assurez-vous que le chemin est correct

// Données simulées pour les commandes
const simulateOrders = [
  { id: '12345', status: 'pending' },
  { id: '67890', status: 'validated' },
  { id: '54321', status: 'documents_ready' },
  { id: '98765', status: 'pending' },
  { id: '11223', status: 'validated' },
];

const OrderManagementClient = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        // Remplacer par un appel API réel si nécessaire
        const data = simulateOrders; // Utilisation des données simulées
        setOrders(data);
      } catch (error) {
        console.error('Erreur lors du chargement des commandes :', error);
      }
    };

    loadOrders();
  }, []);

  const handleValidateOrder = async (orderId) => {
    try {
      // Simuler un appel pour valider la commande
      const response = await fetch(`/api/orders/${orderId}/validate`, {
        method: 'POST',
      });

      if (response.ok) {
        // Mettre à jour localement le statut
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: 'validated' } : order
          )
        );
      }
    } catch (error) {
      console.error('Erreur lors de la validation de la commande :', error);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      (filterStatus === 'all' || order.status === filterStatus) &&
      (searchTerm === '' || order.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDownloadDocument = async (orderId, format) => {
    try {
      // Télécharger le document au format souhaité
      const response = await fetch(`/api/documents/${orderId}?format=${format}`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document-${orderId}.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du document :', error);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-12">
        <div className="text-center space-y-6 py-12">
          <h1 className="text-4xl font-bold text-blue-400 sm:text-5xl">Gestion de Commandes</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Consultez, gérez vos commandes et téléchargez les documents nécessaires.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex justify-between items-center mb-6">
          <select
            className="bg-black border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="validated">Validée</option>
            <option value="documents_ready">Documents prêts</option>
          </select>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Rechercher une commande..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue shadow-md border border-gray-300 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Tableau des commandes */}
        <div className="bg-gray shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm">{order.id}</td>
                  <td className="px-6 py-4 text-sm">{order.status}</td>
                  <td className="px-6 py-4 text-sm">
                    {order.status === 'pending' && (
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => handleValidateOrder(order.id)}
                      >
                        Valider
                      </button>
                    )}
                    {order.status === 'documents_ready' && (
                      <div className="flex space-x-2">
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          onClick={() => handleDownloadDocument(order.id, 'pdf')}
                        >
                          PDF
                        </button>
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          onClick={() => handleDownloadDocument(order.id, 'xlsx')}
                        >
                          Excel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default OrderManagementClient;
