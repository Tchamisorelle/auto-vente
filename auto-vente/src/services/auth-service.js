import axios from "axios";

const API_URL = 'http://localhost:8081/api/auth';

export const apilogin = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors la connexion');
    }

    const data = await response.json();
    const { token, role } = data;

    // Stocker le token et le rôle dans le localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    return data;
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue lors de la connexion');
  }
};


// export const apilogin = async (email, password) => {
  
//   // Simulation des données de l'utilisateur comme si elles provenaient de l'API
//   const simulatedUserData = {
//     role: email === 'test@example.com' && password === '123' ? 'admin' : 'client',  // Rôle attribué en fonction des informations de connexion
//     token: 'mockToken12345',  // Token simulé
//      user: {  // Informations utilisateur simulées
//       id: '12345',
//       name: 'John Doe',
//       email: email,
//       phone: '0123456789',
//       address: '123 Rue Exemple, Paris, France',
//       preferences: {
//         language: 'fr',
//         contactMethod: 'email',
//       }
//     }
//   };

//   // Simuler un délai de réponse de l'API
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (simulatedUserData.role !== 'guest') {
//         // Stocker le token, rôle, et les données utilisateur simulés
//         localStorage.setItem("token", simulatedUserData.token);
//         localStorage.setItem("role", simulatedUserData.role);
//         localStorage.setItem("user", JSON.stringify(simulatedUserData.user));  // Stocker l'utilisateur

//         resolve(simulatedUserData);  // Retourner les données simulées
//       } else {
//         reject(new Error('Identifiants incorrects.'));
//       }
//     }, 1000);  // Délai de 1 seconde pour simuler une requête
//   });
// };


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;  // Retourne les données de la réponse après enregistrement
  } catch (error) {
    // Gestion d'erreur pour afficher le message d'erreur
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
