import React, { useState } from 'react';
import { Search, FileText, Check, X, CreditCard, DollarSign } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      clientName: "Jean Dupont",
      vehicle: "Tesla Model 3",
      status: "pending",
      paymentType: "credit",
      totalAmount: 44900,
      date: "2024-01-15",
      country: "France"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const calculateTax = (amount, country) => {
    const taxRates = {
      'France': 0.2,
      'Belgium': 0.21,
      'Germany': 0.19
    };
    return amount * (taxRates[country] || 0.2);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher une commande..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select 
          className="bg-gray-800 border border-gray-700 rounded-lg px-4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="validated">Validée</option>
          <option value="delivered">Livrée</option>
        </select>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Client</th>
              <th className="px-6 py-3 text-left">Véhicule</th>
              <th className="px-6 py-3 text-left">Montant</th>
              <th className="px-6 py-3 text-left">Taxes</th>
              <th className="px-6 py-3 text-left">Paiement</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.clientName}</td>
                <td className="px-6 py-4">{order.vehicle}</td>
                <td className="px-6 py-4">{order.totalAmount.toLocaleString('fr-FR')} €</td>
                <td className="px-6 py-4">
                  {calculateTax(order.totalAmount, order.country).toLocaleString('fr-FR')} €
                </td>
                <td className="px-6 py-4">
                  {order.paymentType === 'credit' ? 
                    <CreditCard className="h-5 w-5 text-blue-400" /> : 
                    <DollarSign className="h-5 w-5 text-green-400" />
                  }
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    order.status === 'validated' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {order.status === 'pending' ? 'En attente' :
                     order.status === 'validated' ? 'Validée' : 'Livrée'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 hover:bg-gray-700 rounded"
                      onClick={() => updateOrderStatus(order.id, 'validated')}
                    >
                      <Check className="h-4 w-4 text-green-400" />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-700 rounded"
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                    >
                      <FileText className="h-4 w-4 text-blue-400" />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-700 rounded"
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    >
                      <X className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
