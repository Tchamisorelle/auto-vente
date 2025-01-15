import React, { useState } from 'react';
import { Dialog } from './ui';
import { Plus, X } from 'lucide-react';

const VehicleForm = ({ isOpen, onClose, onSubmit }) => {
  const [vehicle, setVehicle] = useState({
    type: 'car',
    fuelType: 'electric',
    name: '',
    price: '',
    stock: '',
    options: [],
    availableOptions: [
      { id: 1, name: 'Sièges sportifs', incompatibleWith: [2] },
      { id: 2, name: 'Sièges en cuir', incompatibleWith: [1] },
      { id: 3, name: 'GPS Navigation', incompatibleWith: [] },
      { id: 4, name: 'Toit ouvrant', incompatibleWith: [] }
    ]
  });

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (optionId) => {
    const option = vehicle.availableOptions.find(opt => opt.id === optionId);
    const isSelected = selectedOptions.includes(optionId);

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      const hasIncompatible = selectedOptions.some(id => 
        option.incompatibleWith.includes(id)
      );

      if (hasIncompatible) {
        alert("Cette option est incompatible avec d'autres options sélectionnées");
        return;
      }

      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...vehicle,
      options: selectedOptions.map(id => 
        vehicle.availableOptions.find(opt => opt.id === id)
      )
    });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Ajouter un véhicule</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de véhicule</label>
            <select
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              value={vehicle.type}
              onChange={(e) => setVehicle({...vehicle, type: e.target.value})}
            >
              <option value="car">Automobile</option>
              <option value="scooter">Scooter</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type de motorisation</label>
            <select
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              value={vehicle.fuelType}
              onChange={(e) => setVehicle({...vehicle, fuelType: e.target.value})}
            >
              <option value="electric">Électrique</option>
              <option value="gasoline">Essence</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nom du véhicule</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              value={vehicle.name}
              onChange={(e) => setVehicle({...vehicle, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Prix (€)</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              value={vehicle.price}
              onChange={(e) => setVehicle({...vehicle, price: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Stock</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              value={vehicle.stock}
              onChange={(e) => setVehicle({...vehicle, stock: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Options</label>
            <div className="space-y-2">
              {vehicle.availableOptions.map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`option-${option.id}`}
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionSelect(option.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`option-${option.id}`} className="text-sm">
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Ajouter le véhicule
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default VehicleForm;
