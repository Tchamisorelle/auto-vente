// import React, { useState } from 'react';
// import AppLayout from './app-layout';
// import OrderManagement from './order-management';
// import ClientManagement from './client-management';
// import VehicleForm from './vehicle-form';
// import { 
//   Users, Package, ShoppingCart, Settings, 
//   Plus, Edit, Trash2, Search, FileText 
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('vehicles');
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);  // Nouveau state pour gérer l'édition
//   const [currentVehicle, setCurrentVehicle] = useState(null);  // Vehicle actuellement en cours d'édition
//   const [vehicles, setVehicles] = useState([]);
//   const [filteredVehicles, setFilteredVehicles] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
//   const [orders, setOrders] = useState([]);
//   const [clients, setClients] = useState([]);

//   const handleAddVehicleClick = () => {
//     setIsFormOpen(true);
//     setIsEditing(false);  // Quand on ajoute un véhicule, on n'est pas en mode édition
//   };

//   const handleEditVehicleClick = (vehicle) => {
//     setCurrentVehicle(vehicle);  // On définit le véhicule à éditer
//     setIsFormOpen(true);  // Ouvre le formulaire
//     setIsEditing(true);  // On active le mode édition
//   };

//   const handleFormClose = () => {
//     setIsFormOpen(false); // Fermer le formulaire
//   };

//   const handleFormSubmit = (vehicleData) => {
//     if (isEditing) {
//       // Si c'est un véhicule existant, on met à jour les informations
//       setVehicles(vehicles.map(vehicle =>
//         vehicle.id === vehicleData.id ? vehicleData : vehicle
//       ));
//     } else {
//       // Sinon, on ajoute un nouveau véhicule
//       setVehicles([...vehicles, vehicleData]);
//     }
//     setIsFormOpen(false);
//     filterVehicles(searchQuery, vehicleTypeFilter);
//   };

//   const filterVehicles = (searchQuery, vehicleTypeFilter) => {
//     let filtered = [...vehicles];

//     if (searchQuery) {
//       filtered = filtered.filter(vehicle =>
//         vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (vehicleTypeFilter !== 'all') {
//       filtered = filtered.filter(vehicle => vehicle.type === vehicleTypeFilter);
//     }

//     setFilteredVehicles(filtered);
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     filterVehicles(query, vehicleTypeFilter);
//   };

//   const handleVehicleTypeChange = (e) => {
//     const type = e.target.value;
//     setVehicleTypeFilter(type);
//     filterVehicles(searchQuery, type);
//   };

//   return (
//     <AppLayout>
//       <div className="min-h-screen bg-gray-900">
//         <div className="flex">
//           <div className="w-64 bg-gray-800 min-h-screen p-4">
//             <h2 className="text-xl font-bold text-blue-400 mb-6">Administration</h2>
//             <nav className="space-y-2">
//               <button
//                 onClick={() => setActiveTab('vehicles')}
//                 className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
//                   activeTab === 'vehicles' ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`}
//               >
//                 <Package className="h-5 w-5" />
//                 <span>Véhicules</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab('orders')}
//                 className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
//                   activeTab === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`}
//               >
//                 <ShoppingCart className="h-5 w-5" />
//                 <span>Commandes</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab('clients')}
//                 className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
//                   activeTab === 'clients' ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`}
//               >
//                 <Users className="h-5 w-5" />
//                 <span>Clients</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab('settings')}
//                 className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
//                   activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`}
//               >
//                 <Settings className="h-5 w-5" />
//                 <span>Paramètres</span>
//               </button>
//             </nav>
//           </div>

//           <div className="flex-1 p-6">
//             {activeTab === 'vehicles' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-2xl font-bold">Gestion des Véhicules</h2>
//                   <button 
//                     className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
//                     onClick={handleAddVehicleClick}
//                   >
//                     <Plus className="h-5 w-5 mr-2" />
//                     Ajouter un véhicule
//                   </button>
//                 </div>
//                 {isFormOpen && (
//                   <VehicleForm 
//                     isOpen={isFormOpen} 
//                     onClose={handleFormClose} 
//                     onSubmit={handleFormSubmit} 
//                     vehicle={currentVehicle}  // Passer le véhicule à éditer
//                   />
//                 )}

//                 <div className="flex gap-4">
//                   <div className="relative flex-1">
//                     <input
//                       type="text"
//                       placeholder="Rechercher un véhicule..."
//                       value={searchQuery}
//                       onChange={handleSearchChange}
//                       className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
//                     />
//                     <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                   <select 
//                     className="bg-gray-800 border border-gray-700 rounded-lg px-4"
//                     value={vehicleTypeFilter}
//                     onChange={handleVehicleTypeChange}
//                   >
//                     <option value="all">Tous les types</option>
//                     <option value="car">Automobiles</option>
//                     <option value="scooter">Scooters</option>
//                   </select>
//                 </div>

//                 <div className="bg-gray-800 rounded-lg overflow-hidden">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-gray-700">
//                         <th className="px-6 py-3 text-left">ID</th>
//                         <th className="px-6 py-3 text-left">Nom</th>
//                         <th className="px-6 py-3 text-left">Type</th>
//                         <th className="px-6 py-3 text-left">Prix</th>
//                         <th className="px-6 py-3 text-left">Stock</th>
//                         <th className="px-6 py-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-700">
//                       {filteredVehicles.map((vehicle, index) => (
//                         <tr key={index}>
//                           <td className="px-6 py-4">{index + 1}</td>
//                           <td className="px-6 py-4">{vehicle.name}</td>
//                           <td className="px-6 py-4">{vehicle.type}</td>
//                           <td className="px-6 py-4">{vehicle.price} €</td>
//                           <td className="px-6 py-4">{vehicle.stock}</td>
//                           <td className="px-6 py-4">
//                             <div className="flex space-x-2">
//                               <button className="p-2 hover:bg-gray-700 rounded" onClick={() => handleEditVehicleClick(vehicle)}>
//                                 <Edit className="h-4 w-4" />
//                               </button>
//                               <button className="p-2 hover:bg-gray-700 rounded">
//                                 <Trash2 className="h-4 w-4" />
//                               </button>
//                               <button className="p-2 hover:bg-gray-700 rounded">
//                                 <FileText className="h-4 w-4" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'orders' && <OrderManagement />}
//             {activeTab === 'clients' && <ClientManagement />}
//             {activeTab === 'settings' && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold">Paramètres</h2>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default AdminDashboard;

//// avc API

import React, { useState, useEffect } from 'react';
import AppLayout from './app-layout';
import OrderManagement from './order-management';
import ClientManagement from './client-management';
import VehicleForm from './vehicle-form';
import { 
  Users, Package, ShoppingCart, Settings, 
  Plus, Edit, Trash2, Search, FileText 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  // Nouveau state pour gérer l'édition
  const [currentVehicle, setCurrentVehicle] = useState(null);  // Vehicle actuellement en cours d'édition
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);

  // Fonction pour récupérer les véhicules depuis l'API
  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/catalog/vehicles');  // Remplace par l'URL de ton API
      const data = await response.json();
      setVehicles(data);
      setFilteredVehicles(data);  // Initialiser les véhicules filtrés avec toutes les données
    } catch (error) {
      console.error("Erreur lors de la récupération des véhicules:", error);
    }
  };

  // Utiliser useEffect pour récupérer les véhicules dès que le composant se charge
  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicleClick = () => {
    setIsFormOpen(true);
    setIsEditing(false);  // Quand on ajoute un véhicule, on n'est pas en mode édition
  };

  const handleEditVehicleClick = (vehicle) => {
    setCurrentVehicle(vehicle);  // On définit le véhicule à éditer
    setIsFormOpen(true);  // Ouvre le formulaire
    setIsEditing(true);  // On active le mode édition
  };

  const handleFormClose = () => {
    setIsFormOpen(false); // Fermer le formulaire
  };

  const handleFormSubmit = async (vehicleData) => {
    try {
      if (isEditing) {
        // Mise à jour du véhicule
        const response = await fetch(`/api/catalog/vehicles/${vehicleData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vehicleData),
        });
        const updatedVehicle = await response.json();
        setVehicles(vehicles.map(vehicle => vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle));
      } else {
        // Ajout d'un nouveau véhicule
        const response = await fetch(`/api/catalog/vehicles/${vehicleData.type}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vehicleData),
        });
        const newVehicle = await response.json();
        setVehicles([...vehicles, newVehicle]);
      }
      setIsFormOpen(false);
      filterVehicles(searchQuery, vehicleTypeFilter);
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour du véhicule:", error);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await fetch(`/api/catalog/vehicles/${id}`, {
        method: 'DELETE',
      });
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule:", error);
    }
  };

  const filterVehicles = (searchQuery, vehicleTypeFilter) => {
    let filtered = [...vehicles];

    if (searchQuery) {
      filtered = filtered.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (vehicleTypeFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.type === vehicleTypeFilter);
    }

    setFilteredVehicles(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterVehicles(query, vehicleTypeFilter);
  };

  const handleVehicleTypeChange = (e) => {
    const type = e.target.value;
    setVehicleTypeFilter(type);
    filterVehicles(searchQuery, type);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-900">
        <div className="flex">
          <div className="w-64 bg-gray-800 min-h-screen p-4">
            <h2 className="text-xl font-bold text-blue-400 mb-6">Administration</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('vehicles')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'vehicles' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <Package className="h-5 w-5" />
                <span>Véhicules</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Commandes</span>
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'clients' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Clients</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </button>
            </nav>
          </div>

          <div className="flex-1 p-6">
            {activeTab === 'vehicles' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Gestion des Véhicules</h2>
                  <button 
                    className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={handleAddVehicleClick}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Ajouter un véhicule
                  </button>
                </div>
                {isFormOpen && (
                  <VehicleForm 
                    isOpen={isFormOpen} 
                    onClose={handleFormClose} 
                    onSubmit={handleFormSubmit} 
                    vehicle={currentVehicle}  // Passer le véhicule à éditer
                  />
                )}

                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Rechercher un véhicule..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <select 
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4"
                    value={vehicleTypeFilter}
                    onChange={handleVehicleTypeChange}
                  >
                    <option value="all">Tous les types</option>
                    <option value="car">Automobiles</option>
                    <option value="scooter">Scooters</option>
                  </select>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Nom</th>
                        <th className="px-6 py-3 text-left">Type</th>
                        <th className="px-6 py-3 text-left">Prix</th>
                        <th className="px-6 py-3 text-left">Stock</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredVehicles.map((vehicle, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{vehicle.name}</td>
                          <td className="px-6 py-4">{vehicle.type}</td>
                          <td className="px-6 py-4">{vehicle.price} €</td>
                          <td className="px-6 py-4">{vehicle.stock}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="p-2 hover:bg-gray-700 rounded" onClick={() => handleEditVehicleClick(vehicle)}>
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-2 hover:bg-gray-700 rounded" onClick={() => handleDeleteVehicle(vehicle.id)}>
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button className="p-2 hover:bg-gray-700 rounded">
                                <FileText className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && <OrderManagement />}
            {activeTab === 'clients' && <ClientManagement />}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Paramètres</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;

