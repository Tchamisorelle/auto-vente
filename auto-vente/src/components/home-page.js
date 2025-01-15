import React from 'react';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import AppLayout from './app-layout'; // Assure-toi que le chemin est correct

const HomePage = () => {
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={`/api/placeholder/400/300`}
                  alt={`Featured vehicle ${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Véhicule Modèle {i}</h3>
                  <p className="text-gray-300 text-sm mb-4">Description courte du véhicule...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-bold">29,999 €</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => alert(`Véhicule Modèle ${i} ajouté au panier`)}
                        className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 text-sm flex items-center"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Ajouter
                      </button>
                      <a
                        href={`/vehicle/${i}`}
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
