import React, { useState, useEffect } from 'react';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import AppLayout from './app-layout'; // Assure-toi que le chemin est correct

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/catalog/vehicles'); // Remplacez par l'URL réelle de votre API
        const data = await response.json();
        setVehicles(data); // Stocke les véhicules dans le state
        console.log(data)
      } catch (error) {
        console.error('Erreur lors de la récupération des véhicules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []); // La dépendance vide [] permet de récupérer les données une seule fois au montage du composant

  if (loading) {
    return <div>Chargement...</div>; // Affiche un message de chargement tant que les données ne sont pas récupérées
  }

  return (
    <AppLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-4xl font-bold text-blue-400 sm:text-5xl">
            Trouvez le véhicule de vos rêves
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez notre large sélection de véhicules neufs et d'occasion, des scooters aux automobiles électriques.
          </p>
          <div>
            <a
              href="/catalogue"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Voir le catalogue
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Large Sélection</h3>
            <p className="text-gray-300">Des véhicules pour tous les besoins et tous les budgets.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Personnalisation</h3>
            <p className="text-gray-300">Configurez votre véhicule selon vos préférences.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Financement</h3>
            <p className="text-gray-300">Solutions de paiement flexibles et crédit disponible.</p>
          </div>
        </div>

        {/* Featured Vehicles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400">Véhicules en Vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={vehicle.image} // Utilise l'URL de l'image du véhicule
                  alt={`Véhicule ${vehicle.Véhicule }`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{vehicle.Véhicule }</h3>
                  {/* <p className="text-gray-300 text-sm mb-4">{vehicle.description}</p> */}
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-bold">{vehicle.prix} €</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => alert(`${vehicle.Véhicule} ajouté au panier`)}
                        className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 text-sm flex items-center"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Ajouter
                      </button>
                      <a
                        href={`/vehicle/${vehicle.id}`}
                        className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-sm"
                      >
                        Voir détails
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
// import React, { useState, useEffect } from 'react';
// import { ChevronRight, ShoppingCart } from 'lucide-react';
// import AppLayout from './app-layout'; // Assure-toi que le chemin est correct

// const HomePage = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulation de récupération de données d'une API
//     const fetchVehicles = () => {
//       const simulatedVehicles = [
//         {
//           id: 1,
//           nom: "Tesla Model S",
//           description: "Une voiture électrique haut de gamme avec une performance exceptionnelle.",
//           prix: 79999,
//           image: "https://via.placeholder.com/400x300?text=Tesla+Model+S",
//         },
//         {
//           id: 2,
//           nom: "BMW Série 3",
//           description: "Une voiture de luxe avec des options de personnalisation infinies.",
//           prix: 45999,
//           image: "https://via.placeholder.com/400x300?text=BMW+Série+3",
//         },
//         {
//           id: 3,
//           nom: "Audi A4",
//           description: "Un modèle élégant avec une technologie avancée et une conduite confortable.",
//           prix: 38999,
//           image: "https://via.placeholder.com/400x300?text=Audi+A4",
//         },
//         {
//           id: 4,
//           nom: "Peugeot 208",
//           description: "Une citadine compacte, idéale pour la ville et l'économie de carburant.",
//           prix: 17999,
//           image: "https://via.placeholder.com/400x300?text=Peugeot+208",
//         },
//         {
//           id: 5,
//           nom: "Mercedes-Benz Classe A",
//           description: "Compacte et élégante, avec des équipements de sécurité de pointe.",
//           prix: 29999,
//           image: "https://via.placeholder.com/400x300?text=Mercedes+Classe+A",
//         },
//         {
//           id: 6,
//           nom: "Volkswagen Golf",
//           description: "Une voiture classique avec une bonne performance et une consommation optimisée.",
//           prix: 25999,
//           image: "https://via.placeholder.com/400x300?text=Volkswagen+Golf",
//         },
//       ];

//       setVehicles(simulatedVehicles); // Stocke les véhicules simulés dans le state
//       setLoading(false); // Fin du chargement
//     };

//     fetchVehicles();
//   }, []); // Le tableau vide [] permet de charger les données une seule fois au montage

//   if (loading) {
//     return <div>Chargement..</div>; // Affiche un message de chargement tant que les données ne sont pas récupérées
//   }

//   return (
//     <AppLayout>
//       <div className="space-y-12">
//         {/* Hero Section */}
//         <div className="text-center space-y-6 py-12">
//           <h1 className="text-4xl font-bold text-blue-400 sm:text-5xl">
//             Trouvez le véhicule de vos rêves
//           </h1>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             Découvrez notre large sélection de véhicules neufs et d'occasion, des scooters aux automobiles électriques.
//           </p>
//           <div>
//             <a
//               href="/catalogue"
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//             >
//               Voir le catalogue
//               <ChevronRight className="ml-2 h-5 w-5" />
//             </a>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="p-6 bg-gray-800 rounded-lg">
//             <h3 className="text-xl font-semibold text-blue-400 mb-3">Large Sélection</h3>
//             <p className="text-gray-300">Des véhicules pour tous les besoins et tous les budgets.</p>
//           </div>
//           <div className="p-6 bg-gray-800 rounded-lg">
//             <h3 className="text-xl font-semibold text-blue-400 mb-3">Personnalisation</h3>
//             <p className="text-gray-300">Configurez votre véhicule selon vos préférences.</p>
//           </div>
//           <div className="p-6 bg-gray-800 rounded-lg">
//             <h3 className="text-xl font-semibold text-blue-400 mb-3">Financement</h3>
//             <p className="text-gray-300">Solutions de paiement flexibles et crédit disponible.</p>
//           </div>
//         </div>

//         {/* Featured Vehicles */}
//         <div className="space-y-6">
//           <h2 className="text-2xl font-bold text-blue-400">Véhicules en Vedette</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {vehicles.map((vehicle) => (
//               <div key={vehicle.id} className="bg-gray-800 rounded-lg overflow-hidden">
//                 <img 
//                   src={vehicle.image} // Utilise l'URL de l'image du véhicule
//                   alt={`Véhicule ${vehicle.nom}`}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg mb-2">{vehicle.nom}</h3>
//                   <p className="text-gray-300 text-sm mb-4">{vehicle.description}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-blue-400 font-bold">{vehicle.prix} €</span>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => alert(`${vehicle.nom} ajouté au panier`)}
//                         className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 text-sm flex items-center"
//                       >
//                         <ShoppingCart className="mr-2 h-4 w-4" />
//                         Ajouter
//                       </button>
//                       <a
//                         href={`/vehicle/${vehicle.id}`}
//                         className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-sm"
//                       >
//                         Voir détails
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default HomePage;
