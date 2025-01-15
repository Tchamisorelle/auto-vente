// src/services/api.js

// URLs de base pour les différents services
const API_BASE_URL = 'http://localhost:3000/api'; // Frontend API (si applicable)
const BASE_URL_USERS = 'http://localhost:8079/SERVICE-COSTUMER/api';
const BASE_URL_ADMIN = 'http://localhost:8079/SERVICE-ADMIN/api';

// Gestion centralisée des appels API
export const api = {
  // Requête GET
  get: (url, base = BASE_URL_USERS) => 
    fetch(`${base}${url}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur lors de l'appel GET : ${res.statusText}`);
        return res.json();
      }),

  // Requête POST
  post: (url, data, base = BASE_URL_USERS) => 
    fetch(`${base}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur lors de l'appel POST : ${res.statusText}`);
        return res.json();
      }),

  // Requête PUT
  put: (url, data, base = BASE_URL_USERS) => 
    fetch(`${base}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur lors de l'appel PUT : ${res.statusText}`);
        return res.json();
      }),

  // Requête DELETE
  delete: (url, base = BASE_URL_USERS) => 
    fetch(`${base}${url}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur lors de l'appel DELETE : ${res.statusText}`);
        return res.json();
      }),
};

// Exemples de fonctions spécifiques pour le système de vente de véhicules

// Récupérer la liste des véhicules
export const getVehicles = async () => {
  try {
    return await api.get('/vehicles');
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules :', error);
    throw error;
  }
};

// Ajouter un nouveau véhicule
export const addVehicle = async (vehicleData) => {
  try {
    return await api.post('/vehicles', vehicleData);
  } catch (error) {
    console.error("Erreur lors de l'ajout d\'un véhicule :", error);
    throw error;
  }
};

// Mettre à jour un véhicule
export const updateVehicle = async (vehicleId, updatedData) => {
  try {
    return await api.put(`/vehicles/${vehicleId}`, updatedData);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du véhicule :', error);
    throw error;
  }
};

// Supprimer un véhicule
export const deleteVehicle = async (vehicleId) => {
  try {
    return await api.delete(`/vehicles/${vehicleId}`);
  } catch (error) {
    console.error('Erreur lors de la suppression du véhicule :', error);
    throw error;
  }
};
