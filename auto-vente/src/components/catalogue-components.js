// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Search, Grid, List } from 'lucide-react';
// import AppLayout from './app-layout';
// import { Link } from 'react-router-dom';

// const CataloguePage = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     type: 'all',
//     energy: 'all',
//     priceRange: 'all',
//   });
//   const [vehicles, setVehicles] = useState([]); // Stockage des véhicules
//   const [loading, setLoading] = useState(true); // Gestion du chargement
//   const [error, setError] = useState(null); // Gestion des erreurs

//   useEffect(() => {
//     // Requête API pour récupérer les véhicules
//     axios.get('/api/vehicles') // Remplacez par l'URL de votre API
//       .then((response) => {
//         setVehicles(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Erreur lors du chargement des véhicules');
//         setLoading(false);
//       });
//   }, []); // Se lance au premier rendu

//   const FilterSidebar = () => (
//     <div className="bg-gray-800 p-4 rounded-lg">
//       <h3 className="text-lg font-semibold mb-4">Filtres</h3>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">Type de véhicule</label>
//           <select
//             className="w-full bg-gray-700 border-gray-600 rounded-md"
//             value={filters.type}
//             onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//           >
//             <option value="all">Tous</option>
//             <option value="automobile">Automobile</option>
//             <option value="scooter">Scooter</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Énergie</label>
//           <select
//             className="w-full bg-gray-700 border-gray-600 rounded-md"
//             value={filters.energy}
//             onChange={(e) => setFilters({ ...filters, energy: e.target.value })}
//           >
//             <option value="all">Toutes</option>
//             <option value="electric">Électrique</option>
//             <option value="gasoline">Essence</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Gamme de prix</label>
//           <select
//             className="w-full bg-gray-700 border-gray-600 rounded-md"
//             value={filters.priceRange}
//             onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
//           >
//             <option value="all">Tous les prix</option>
//             <option value="0-10000">0 - 10 000 €</option>
//             <option value="10000-30000">10 000 - 30 000 €</option>
//             <option value="30000+">30 000 € et plus</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );

//   const filteredVehicles = vehicles.filter((vehicle) => {
//     const matchesSearchQuery = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesTypeFilter = filters.type === 'all' || vehicle.type === filters.type;
//     const matchesEnergyFilter = filters.energy === 'all' || vehicle.energy === filters.energy;
//     const matchesPriceRangeFilter =
//       filters.priceRange === 'all' ||
//       (filters.priceRange === '0-10000' && vehicle.price <= 10000) ||
//       (filters.priceRange === '10000-30000' && vehicle.price >= 10000 && vehicle.price <= 30000) ||
//       (filters.priceRange === '30000+' && vehicle.price > 30000);

//     return matchesSearchQuery && matchesTypeFilter && matchesEnergyFilter && matchesPriceRangeFilter;
//   });

//   const VehicleCard = ({ vehicle, isList }) => {
//     if (isList) {
//       return (
//         <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-750 transition-all duration-300">
//           <div className="flex items-center">
//             <img
//               src={vehicle.image}
//               alt={vehicle.name}
//               className="flex-grow h-64 object-cover"
//             />
//             <div className="flex-shrink-0 p-6 flex flex-col justify-between w-1/3 text-right">
//               <div>
//                 <h3 className="text-xl font-semibold mb-4">{vehicle.name}</h3>
//                 <p className="text-gray-300 mb-6">{vehicle.description}</p>
//                 <div className="flex justify-end gap-4 mb-4">
//                   <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
//                     {vehicle.type}
//                   </span>
//                   <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
//                     {vehicle.energy}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center mt-4">
//                 <span className="text-blue-400 font-bold text-xl">
//                   {vehicle.price.toLocaleString()} €
//                 </span>
//                 <Link
//                   to={`/vehicle/${vehicle.id}`} // Lien vers la page de détails
//                   className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300"
//                 >
//                   Voir détails
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
      
//     }
  
//     return (
//       <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
//         <img
//           src={vehicle.image}
//           alt={vehicle.name}
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-6">
//           <h3 className="text-xl font-semibold mb-3">{vehicle.name}</h3>
//           <p className="text-gray-300 mb-4">{vehicle.description}</p>
//           <div className="flex justify-between items-center">
//             <span className="text-blue-400 font-bold">{vehicle.price.toLocaleString()} €</span>
//             <Link
//               to={`/vehicle/${vehicle.id}`} // Lien vers la page de détails
//               className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300"
//             >
//               Voir détails
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <AppLayout>
//       <div className="flex flex-col space-y-6">
//         <div className="flex flex-col md:flex-row gap-4 items-center">
//           <div className="relative flex-1">
//             <input
//               type="text"
//               placeholder="Rechercher un véhicule..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>

//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-700'}`}
//             >
//               <Grid className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700'}`}
//             >
//               <List className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-64 flex-shrink-0">
//             <FilterSidebar />
//           </div>

//           <div className="flex-1">
//             <div className={`grid gap-6 ${
//               viewMode === 'grid' 
//                 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
//                 : 'grid-cols-1'
//             }`}>
//               {filteredVehicles.map((vehicle) => (
//                 <VehicleCard 
//                   key={vehicle.id} 
//                   vehicle={vehicle} 
//                   isList={viewMode === 'list'}
//                 />
//               ))} 
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default CataloguePage;

import React, { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import AppLayout from './app-layout';
import { Link } from 'react-router-dom';

const CataloguePage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    energy: 'all',
    priceRange: 'all',
  });
  const [vehicles, setVehicles] = useState([]);

  // Simuler un appel API pour récupérer les véhicules
  useEffect(() => {
    // Simuler une réponse API avec des données fictives
    const fetchVehicles = async () => {
      const data = [
        {
          id: 1,
          name: 'Tesla Model 3',
          type: 'automobile',
          energy: 'electric',
          price: 42900,
          image: 'https://via.placeholder.com/400x300',
          description: 'Berline électrique performante',
        },
        {
          id: 2,
          name: 'Vespa Elettrica',
          type: 'scooter',
          energy: 'electric',
          price: 7499,
          image: 'https://via.placeholder.com/400x300',
          description: 'Scooter électrique urbain',
        },
        {
          id: 3,
          name: 'BMW iX',
          type: 'automobile',
          energy: 'electric',
          price: 84900,
          image: 'https://via.placeholder.com/400x300',
          description: 'SUV électrique haut de gamme',
        },
        // Ajoute plus de véhicules fictifs si nécessaire
      ];
      setVehicles(data);
    };
    fetchVehicles();
  }, []);

  const FilterSidebar = () => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Filtres</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Type de véhicule</label>
          <select
            className="w-full bg-gray-700 border-gray-600 rounded-md"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="all">Tous</option>
            <option value="automobile">Automobile</option>
            <option value="scooter">Scooter</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Énergie</label>
          <select
            className="w-full bg-gray-700 border-gray-600 rounded-md"
            value={filters.energy}
            onChange={(e) => setFilters({ ...filters, energy: e.target.value })}
          >
            <option value="all">Toutes</option>
            <option value="electric">Électrique</option>
            <option value="gasoline">Essence</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gamme de prix</label>
          <select
            className="w-full bg-gray-700 border-gray-600 rounded-md"
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          >
            <option value="all">Tous les prix</option>
            <option value="0-10000">0 - 10 000 €</option>
            <option value="10000-30000">10 000 - 30 000 €</option>
            <option value="30000+">30 000 € et plus</option>
          </select>
        </div>
      </div>
    </div>
  );

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearchQuery = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTypeFilter = filters.type === 'all' || vehicle.type === filters.type;
    const matchesEnergyFilter = filters.energy === 'all' || vehicle.energy === filters.energy;
    const matchesPriceRangeFilter =
      filters.priceRange === 'all' ||
      (filters.priceRange === '0-10000' && vehicle.price <= 10000) ||
      (filters.priceRange === '10000-30000' && vehicle.price >= 10000 && vehicle.price <= 30000) ||
      (filters.priceRange === '30000+' && vehicle.price > 30000);

    return matchesSearchQuery && matchesTypeFilter && matchesEnergyFilter && matchesPriceRangeFilter;
  });

  const VehicleCard = ({ vehicle, isList }) => {
    if (isList) {
      return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-750 transition-all duration-300">
          <div className="flex items-center">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="flex-grow h-64 object-cover"
            />
            <div className="flex-shrink-0 p-6 flex flex-col justify-between w-1/3 text-right">
              <div>
                <h3 className="text-xl font-semibold mb-4">{vehicle.name}</h3>
                <p className="text-gray-300 mb-6">{vehicle.description}</p>
                <div className="flex justify-end gap-4 mb-4">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {vehicle.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {vehicle.energy}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-blue-400 font-bold text-xl">
                  {vehicle.price.toLocaleString()} €
                </span>
                <Link
                  to={`/vehicle/${vehicle.id}`} // Lien vers la page de détails
                  className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300"
                >
                  Voir détails
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3">{vehicle.name}</h3>
          <p className="text-gray-300 mb-4">{vehicle.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-400 font-bold">{vehicle.price.toLocaleString()} €</span>
            <Link
              to={`/vehicle/${vehicle.id}`} // Lien vers la page de détails
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300"
            >
              Voir détails
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher un véhicule..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredVehicles.map((vehicle) => (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  isList={viewMode === 'list'}
                />
              ))} 
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CataloguePage;
