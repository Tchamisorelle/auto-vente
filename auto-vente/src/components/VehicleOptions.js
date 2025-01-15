import React, { useState } from 'react';
import { Check, X, AlertCircle, Plus } from 'lucide-react';

import AppLayout from './app-layout'; // Assure-toi que le chemin est correct

const VehicleOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  // Exemple de données d'options
  const availableOptions = [
    {
      id: 1,
      name: "Sièges en cuir",
      price: 1200,
      category: "Intérieur",
      incompatibleWith: [2],
      description: "Sièges en cuir véritable avec coutures contrastées"
    },
    {
      id: 2,
      name: "Sièges sportifs",
      price: 1500,
      category: "Intérieur",
      incompatibleWith: [1],
      description: "Sièges baquets sport avec maintien latéral renforcé"
    },
    {
      id: 3,
      name: "Système de navigation",
      price: 800,
      category: "Technologie",
      incompatibleWith: [],
      description: "Système de navigation GPS avec cartographie 3D"
    }
  ];

  const isOptionIncompatible = (option) => {
    return selectedOptions.some(selectedOption => 
      option.incompatibleWith.includes(selectedOption.id) ||
      availableOptions.find(o => o.id === selectedOption.id)?.incompatibleWith.includes(option.id)
    );
  };

  const toggleOption = (option) => {
    if (selectedOptions.find(o => o.id === option.id)) {
      setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
    } else if (!isOptionIncompatible(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const calculateTotal = () => {
    return selectedOptions.reduce((total, option) => total + option.price, 0);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Personnalisez votre véhicule</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Liste des options */}
          <div className="md:col-span-2 space-y-4">
            {availableOptions.map((option) => {
              const isSelected = selectedOptions.find(o => o.id === option.id);
              const incompatible = isOptionIncompatible(option);

              return (
                <div
                  key={option.id}
                  className={`bg-gray-800 rounded-lg p-4 ${
                    incompatible ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold">{option.name}</h3>
                        <span className="ml-2 px-2 py-1 text-sm bg-gray-700 rounded">
                          {option.category}
                        </span>
                      </div>
                      <p className="text-gray-400 mt-1">{option.description}</p>
                      <p className="text-blue-400 font-bold mt-2">
                        {option.price.toLocaleString()} €
                      </p>
                    </div>
                    <button
                      onClick={() => toggleOption(option)}
                      disabled={incompatible && !isSelected}
                      className={`p-2 rounded-md ${
                        isSelected
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : incompatible
                          ? 'bg-gray-700 cursor-not-allowed'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {incompatible && !isSelected && (
                    <div className="mt-2 flex items-center text-sm text-yellow-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>Incompatible avec une option sélectionnée</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Résumé des options sélectionnées */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Options sélectionnées</h3>
              {selectedOptions.length === 0 ? (
                <p className="text-gray-400">Aucune option sélectionnée</p>
              ) : (
                <div className="space-y-2">
                  {selectedOptions.map((option) => (
                    <div key={option.id} className="flex justify-between items-center">
                      <span>{option.name}</span>
                      <span className="text-blue-400">{option.price.toLocaleString()} €</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total options</span>
                      <span className="text-blue-400">{calculateTotal().toLocaleString()} €</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Valider les options
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VehicleOptions;
