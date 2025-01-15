const API_URL = 'http://localhost:8079/SERVICE-AUTHENTIFICATION/auth';

export const authService = {
  // Connexion de l'utilisateur
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Échec de la connexion');

      const data = await response.json();
      
      // Sauvegarder le token JWT et les informations de l'utilisateur dans localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Déconnexion de l'utilisateur
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Rediriger vers la page de connexion
  },

  // Récupérer les informations de l'utilisateur courant
  async getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Impossible de récupérer les détails de l\'utilisateur');

      return response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      throw error;
    }
  },

  // Récupérer le token JWT stocké dans localStorage
  getToken() {
    return localStorage.getItem('token');
  },

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated() {
    return !!this.getToken();
  },
};
