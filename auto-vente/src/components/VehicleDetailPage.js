import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Importation du hook useParams pour récupérer l'ID du véhicule depuis l'URL
import { ChevronLeft, ShoppingCart } from 'lucide-react'; // Icône pour la flèche retour et le panier
import AppLayout from './app-layout'; // Composant pour la mise en page générale de l'application

const VehicleDetailPage = () => {
  const { id } = useParams(); // Récupère l'ID du véhicule à partir de l'URL
  const [cart, setCart] = useState([]); // État pour le panier

  // Exemple de données statiques pour un véhicule. Dans une application réelle, ces données proviendraient probablement d'une API.
  const vehicle = {
    id,
    name: `Véhicule Modèle ${id}`, // Le nom du véhicule basé sur l'ID
    description: 'Description détaillée du véhicule, incluant ses caractéristiques techniques, ses performances et ses fonctionnalités.',
    price: '29,999 €', // Le prix du véhicule
    image: `/api/placeholder/800/600`, // URL de l'image du véhicule, ici un espace réservé
    features: [
      'Moteur 200 CV',
      'Transmission automatique',
      'Jantes en alliage',
      'Système de navigation',
      'Caméra de recul'
    ] // Liste des caractéristiques du véhicule
  };

  // Fonction pour ajouter le véhicule au panier
  const addToCart = () => {
    setCart([...cart, vehicle]); // Ajoute le véhicule au panier
    alert(`${vehicle.name} a été ajouté au panier !`); // Affiche une alerte pour confirmer l'ajout
  };

  return (
    <AppLayout> {/* Utilisation du composant AppLayout pour entourer la page de détails */}
      <div className="space-y-12 py-12"> {/* Espace vertical entre les sections */}
        
        <div className="text-center"> {/* Centre du texte */}
          <h1 className="text-3xl font-bold text-blue-400 mb-4">{vehicle.name}</h1> {/* Titre du véhicule */}
          
          {/* Image du véhicule */}
          <img
            src={vehicle.image} // Utilisation de l'image du véhicule
            alt={vehicle.name} // Texte alternatif pour l'image
            className="w-full max-w-2xl mx-auto mb-6 rounded-lg shadow-lg object-cover" // Classe pour la mise en page de l'image (taille, marges, etc.)
          />
          
          {/* Description du véhicule */}
          <p className="text-xl text-gray-300 mb-6">{vehicle.description}</p>
          
          {/* Affichage du prix du véhicule */}
          <div className="text-xl font-semibold text-blue-400 mb-6">{vehicle.price}</div>
          
          {/* Bouton Ajouter au panier */}
          <div className="mt-6">
            <button
              onClick={addToCart}
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Ajouter au panier
            </button>
          </div>
        </div>

        {/* Section des caractéristiques */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-400">Caractéristiques</h2> {/* Titre de la section des caractéristiques */}
          <ul className="list-disc pl-5 space-y-2 text-gray-300"> {/* Liste des caractéristiques avec puces */}
            {vehicle.features.map((feature, index) => (
              <li key={index}>{feature}</li> 
            ))}
          </ul>
        </div>

        {/* Bouton de retour au catalogue */}
        <div className="mt-8 text-center">
          <a
            href="/catalogue" // Lien de retour vers la page du catalogue
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700" // Styles pour le bouton
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> {/* Icône de flèche de retour */}
            Retour au catalogue {/* Texte du bouton */}
          </a>
        </div>
      </div>
    </AppLayout>
  );
};

export default VehicleDetailPage; // Exportation du composant pour l'utiliser ailleurs dans l'application
