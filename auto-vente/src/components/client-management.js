import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Building2, User } from 'lucide-react';

const ClientManagement = () => {
  const [clients, setClients] = useState([
    {
      id: "CLI001",
      name: "Entreprise ABC",
      type: "company",
      email: "contact@abc.com",
      subsidiaries: ["Filiale 1", "Filiale 2", "Filiale 3"],
      fleetSize: 15
    },
    {
      id: "CLI002",
      name: "Jean Martin",
      type: "individual",
      email: "jean.martin@email.com",
      orders: 2
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newClient, setNewClient] = useState({
    id: '',
    name: '',
    type: 'company',
    email: '',
    subsidiaries: [],
    fleetSize: 0,
    orders: 0,
  });
  const [editClient, setEditClient] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const deleteClient = (clientId) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  const handleAddClient = () => {
    setClients([...clients, newClient]);
    setShowAddModal(false);
  };

  const handleEditClient = () => {
    setClients(clients.map(client => (client.id === editClient.id ? editClient : client)));
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Fonction pour vérifier si le formulaire est valide
  const isFormValid = () => {
    if (!newClient.id || !newClient.name || !newClient.email) {
      return false;
    }
    if (newClient.type === 'company' && newClient.subsidiaries.length === 0) {
      return false;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Clients</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un client
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher un client..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select 
          className="bg-gray-800 border border-gray-700 rounded-lg px-4"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tous les types</option>
          <option value="company">Entreprises</option>
          <option value="individual">Particuliers</option>
        </select>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Détails</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {clients
              .filter(client => {
                const matchesType = filterType === 'all' || client.type === filterType;
                const matchesSearch = client.name.toLowerCase().includes(searchTerm) || client.email.toLowerCase().includes(searchTerm);
                return matchesType && matchesSearch;
              })
              .length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Aucun client trouvé</td>
              </tr>
            ) : (
              clients
                .filter(client => {
                  const matchesType = filterType === 'all' || client.type === filterType;
                  const matchesSearch = client.name.toLowerCase().includes(searchTerm) || client.email.toLowerCase().includes(searchTerm);
                  return matchesType && matchesSearch;
                })
                .map(client => (
                  <tr key={client.id}>
                    <td className="px-6 py-4">{client.id}</td>
                    <td className="px-6 py-4">{client.name}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center">
                        {client.type === 'company' ? (
                          <><Building2 className="h-4 w-4 mr-2" /> Entreprise</>
                        ) : (
                          <><User className="h-4 w-4 mr-2" /> Particulier</>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">{client.email}</td>
                    <td className="px-6 py-4">
                      {client.type === 'company' ? (
                        <span>{client.subsidiaries.length} filiales, {client.fleetSize} véhicules</span>
                      ) : (
                        <span>{client.orders} commandes</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          className="p-2 hover:bg-gray-700 rounded"
                          onClick={() => {
                            setEditClient(client);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4 text-blue-400" />
                        </button>
                        <button 
                          className="p-2 hover:bg-gray-700 rounded"
                          onClick={() => deleteClient(client.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal d'ajout de client */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Ajouter un client</h3>
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ID</label>
                  <input 
                    type="text"
                    name="id"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                    value={newClient.id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <input 
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                    value={newClient.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                    value={newClient.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    name="type"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                    value={newClient.type}
                    onChange={handleChange}
                  >
                    <option value="company">Entreprise</option>
                    <option value="individual">Particulier</option>
                  </select>
                </div>
                {newClient.type === 'company' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Filiales</label>
                    <input 
                      type="text"
                      name="subsidiaries"
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                      value={newClient.subsidiaries.join(', ')}
                      onChange={(e) => {
                        const subsidiaries = e.target.value.split(',').map(item => item.trim());
                        setNewClient({ ...newClient, subsidiaries });
                      }}
                    />
                  </div>
                )}
                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleAddClient}
                    disabled={!isFormValid()}  // Désactive le bouton si le formulaire est invalide
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal d'édition de client */}
      {showEditModal && editClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Éditer le client</h3>
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <input 
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                    value={editClient.name}
                    onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                    value={editClient.email}
                    onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    name="type"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                    value={editClient.type}
                    onChange={(e) => setEditClient({ ...editClient, type: e.target.value })}
                  >
                    <option value="company">Entreprise</option>
                    <option value="individual">Particulier</option>
                  </select>
                </div>
                {editClient.type === 'company' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Filiales</label>
                    <input 
                      type="text"
                      name="subsidiaries"
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                      value={editClient.subsidiaries.join(', ')}
                      onChange={(e) => {
                        const subsidiaries = e.target.value.split(',').map(item => item.trim());
                        setEditClient({ ...editClient, subsidiaries });
                      }}
                    />
                  </div>
                )}
                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleEditClient}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Mettre à jour
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
