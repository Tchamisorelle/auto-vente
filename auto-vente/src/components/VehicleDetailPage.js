// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // Importation du hook useParams pour récupérer l'ID du véhicule depuis l'URL
// import { ChevronLeft, ShoppingCart, Undo } from 'lucide-react'; // Icône pour la flèche retour, le panier et annuler
// import AppLayout from './app-layout'; // Composant pour la mise en page générale de l'application
// import axios from 'axios'; // Importation de la bibliothèque axios pour les appels API

// const VehicleDetailPage = () => {
//   const { id } = useParams(); // Récupère l'ID du véhicule à partir de l'URL
//   const [cart, setCart] = useState([]); // État pour le panier
//   const [selectedOptions, setSelectedOptions] = useState([]); // Options sélectionnées pour le véhicule
//   const [previousCartState, setPreviousCartState] = useState([]); // Historique de l'état du panier
//   const [vehicle, setVehicle] = useState(null); // Détails du véhicule
//   const [loading, setLoading] = useState(true); // Indicateur de chargement
//   const [error, setError] = useState(null); // Gestion des erreurs

//   useEffect(() => {
//     // Récupérer les détails du véhicule et les options via l'API
//     const fetchVehicleData = async () => {
//       try {
//         // Remplacez cette URL par celle de votre API pour récupérer les détails du véhicule
//         const vehicleResponse = await axios.get(`/api/vehicles/${id}`);
//         const optionsResponse = await axios.get(`/api/vehicles/${id}/options`);
        
//         setVehicle(vehicleResponse.data); // Met à jour les détails du véhicule
//         setSelectedOptions(optionsResponse.data.filter(option => option.isDefault)); // Met à jour les options par défaut
//         setLoading(false); // Terminer le chargement
//       } catch (error) {
//         setError('Une erreur est survenue lors du chargement des données.');
//         setLoading(false);
//       }
//     };

//     fetchVehicleData(); // Appel à l'API pour récupérer les données
//   }, [id]);

//   // Fonction pour ajouter le véhicule et les options au panier
//   const addToCart = () => {
//     setPreviousCartState([...cart]); // Enregistrer l'état actuel du panier avant d'ajouter
//     setCart([...cart, { vehicle, options: selectedOptions }]); // Ajouter le véhicule avec les options sélectionnées
//     alert(`${vehicle.name} a été ajouté au panier !`); // Affiche une alerte pour confirmer l'ajout
//   };

//   // Fonction pour gérer la sélection des options
//   const handleOptionChange = (option) => {
//     const updatedOptions = [...selectedOptions];
//     const optionIndex = updatedOptions.indexOf(option);

//     // Si l'option est déjà sélectionnée, on la retire
//     if (optionIndex !== -1) {
//       updatedOptions.splice(optionIndex, 1);
//     } else {
//       updatedOptions.push(option);
//     }

//     // Vérification des incompatibilités
//     const incompatibleOptions = option.incompatibleWith.filter((incompatibleOption) =>
//       updatedOptions.includes(incompatibleOption)
//     );

//     if (incompatibleOptions.length > 0) {
//       alert(`Les options suivantes sont incompatibles: ${incompatibleOptions.join(', ')}`);
//       return; // Si incompatibilités, on ne met pas à jour
//     }

//     setSelectedOptions(updatedOptions);
//   };

//   // Fonction pour revenir à l'état précédent du panier
//   const undoCartState = () => {
//     setCart(previousCartState);
//     alert('Retour à l\'état précédent du panier');
//   };

//   // Si les données sont en cours de chargement, afficher un indicateur
//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   // Si une erreur est survenue lors du chargement des données, afficher un message d'erreur
//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <AppLayout> {/* Utilisation du composant AppLayout pour entourer la page de détails */}
//       <div className="space-y-12 py-12"> {/* Espace vertical entre les sections */}
        
//         <div className="text-center"> {/* Centre du texte */}
//           <h1 className="text-3xl font-bold text-blue-400 mb-4">{vehicle.name}</h1> {/* Titre du véhicule */}
          
//           {/* Image du véhicule */}
//           <img
//             src={vehicle.image} // Utilisation de l'image du véhicule
//             alt={vehicle.name} // Texte alternatif pour l'image
//             className="w-full max-w-2xl mx-auto mb-6 rounded-lg shadow-lg object-cover" // Classe pour la mise en page de l'image (taille, marges, etc.)
//           />
          
//           {/* Description du véhicule */}
//           <p className="text-xl text-gray-300 mb-6">{vehicle.description}</p>
          
//           {/* Affichage du prix du véhicule */}
//           <div className="text-xl font-semibold text-blue-400 mb-6">{vehicle.price}</div>
          
//           {/* Sélection des options */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-blue-400">Options disponibles</h2>
//             <div className="space-y-2">
//               {vehicle.options.map((option, index) => (
//                 <div key={index} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={option.name}
//                     checked={selectedOptions.includes(option.name)}
//                     onChange={() => handleOptionChange(option)}
//                     className="mr-2"
//                   />
//                   <label htmlFor={option.name} className="text-gray-300">{option.name}</label>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Bouton Ajouter au panier */}
//           <div className="mt-6">
//             <button
//               onClick={addToCart}
//               className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
//             >
//               <ShoppingCart className="mr-2 h-5 w-5" />
//               Ajouter au panier
//             </button>
//           </div>
          
//           {/* Bouton Annuler la dernière action */}
//           <div className="mt-4">
//             <button
//               onClick={undoCartState}
//               className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
//             >
//               <Undo className="mr-2 h-5 w-5" />
//               Annuler
//             </button>
//           </div>
//         </div>

//         {/* Section des caractéristiques */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold text-blue-400">Caractéristiques</h2> {/* Titre de la section des caractéristiques */}
//           <ul className="list-disc pl-5 space-y-2 text-gray-300"> {/* Liste des caractéristiques avec puces */}
//             {vehicle.features.map((feature, index) => (
//               <li key={index}>{feature}</li> 
//             ))}
//           </ul>
//         </div>

//         {/* Bouton de retour au catalogue */}
//         <div className="mt-8 text-center">
//           <a
//             href="/catalogue" // Lien de retour vers la page du catalogue
//             className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700" // Styles pour le bouton
//           >
//             <ChevronLeft className="mr-2 h-5 w-5" /> {/* Icône de flèche de retour */}
//             Retour au catalogue {/* Texte du bouton */}
//           </a>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default VehicleDetailPage; // Exportation du composant pour l'utiliser ailleurs dans l'application
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { ChevronLeft, ShoppingCart, Undo } from 'lucide-react'; 
import AppLayout from './app-layout'; 
import axios from 'axios'; 

const VehicleDetailPage = () => {
  const { id } = useParams(); 
  const [cart, setCart] = useState([]); 
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [previousCartState, setPreviousCartState] = useState([]); 
  const [vehicle, setVehicle] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    // Simuler les données de véhicule
    const fetchVehicleData = async () => {
      try {
        // Données fictives pour le véhicule
        const vehicleResponse = {
          data: {
            name: "Véhicule X",
            description: "Un excellent véhicule avec de nombreuses options.",
            price: "25 000 €",
            image: "https://example.com/vehicle.jpg",
            options: [
              { name: "Option 1", isDefault: true, incompatibleWith: [] },
              { name: "Option 2", isDefault: false, incompatibleWith: [] },
              { name: "Option 3", isDefault: false, incompatibleWith: ["Option 2"] }
            ],
            features: ["Caractéristiques 1", "Caractéristiques 2", "Caractéristiques 3"]
          }
        };

        const optionsResponse = {
          data: vehicleResponse.data.options.filter(option => option.isDefault) // Simule les options par défaut
        };

        setVehicle(vehicleResponse.data); 
        setSelectedOptions(optionsResponse.data); 
        setLoading(false); 
      } catch (error) {
        setError('Une erreur est survenue lors du chargement des données.');
        setLoading(false);
      }
    };

    fetchVehicleData(); 
  }, [id]);

  const addToCart = () => {
    setPreviousCartState([...cart]); 
    setCart([...cart, { vehicle, options: selectedOptions }]); 
    alert(`${vehicle.name} a été ajouté au panier !`); 
  };

  const handleOptionChange = (option) => {
    const updatedOptions = [...selectedOptions];
    const optionIndex = updatedOptions.indexOf(option);

    if (optionIndex !== -1) {
      updatedOptions.splice(optionIndex, 1);
    } else {
      updatedOptions.push(option);
    }

    const incompatibleOptions = option.incompatibleWith.filter((incompatibleOption) =>
      updatedOptions.includes(incompatibleOption)
    );

    if (incompatibleOptions.length > 0) {
      alert(`Les options suivantes sont incompatibles: ${incompatibleOptions.join(', ')}`);
      return; 
    }

    setSelectedOptions(updatedOptions);
  };

  const undoCartState = () => {
    setCart(previousCartState);
    alert('Retour à l\'état précédent du panier');
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AppLayout> 
      <div className="space-y-12 py-12"> 
        <div className="text-center"> 
          <h1 className="text-3xl font-bold text-blue-400 mb-4">{vehicle.name}</h1> 
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full max-w-2xl mx-auto mb-6 rounded-lg shadow-lg object-cover"
          />
          <p className="text-xl text-gray-300 mb-6">{vehicle.description}</p>
          <div className="text-xl font-semibold text-blue-400 mb-6">{vehicle.price}</div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-400">Options disponibles</h2>
            <div className="space-y-2">
              {vehicle.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.name}
                    checked={selectedOptions.includes(option.name)}
                    onChange={() => handleOptionChange(option)}
                    className="mr-2"
                  />
                  <label htmlFor={option.name} className="text-gray-300">{option.name}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={addToCart}
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Ajouter au panier
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={undoCartState}
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <Undo className="mr-2 h-5 w-5" />
              Annuler
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-400">Caractéristiques</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {vehicle.features.map((feature, index) => (
              <li key={index}>{feature}</li> 
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/catalogue"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Retour au catalogue
          </a>
        </div>
      </div>
    </AppLayout>
  );
};

export default VehicleDetailPage;
