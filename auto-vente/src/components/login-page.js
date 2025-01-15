import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from './ui';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa'; // Importation de l'icône Google depuis react-icons
import { useAuth } from './AuthProvider';
import AppLayout from './app-layout'; // Ajout de AppLayout
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate

const LoginPage = () => {
  const { login } = useAuth(); // Utilisation de la fonction login du contexte d'authentification
  const [showPassword, setShowPassword] = useState(false); // Définir l'état pour afficher/masquer le mot de passe
  const [credentials, setCredentials] = useState({ email: '', password: '' }); // Initialiser l'état des identifiants
  const [loading, setLoading] = useState(false); // État de chargement lors de la connexion
  const [error, setError] = useState(''); // État pour l'affichage des erreurs

  // Initialisation de navigate pour rediriger après la connexion
  const navigate = useNavigate();

  // Fonction de gestion de la connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simuler la connexion de l'utilisateur
      const userData = await login(credentials);  // La fonction login retourne les données de l'utilisateur
      if (userData?.role === 'admin') {
        navigate('/admin'); // Redirection vers la page admin si l'utilisateur est un admin
      } else if (userData?.role === 'client') {
        navigate('/profile'); // Redirection vers la page profil si l'utilisateur est un client
      } else {
        navigate('/'); // Redirection vers la page d'accueil pour d'autres rôles
      }
    } catch (error) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout> {/* AppLayout entourant la page de connexion */}
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <Card className="w-full max-w-xl"> {/* Augmenter max-w-md à max-w-lg pour une carte plus large */}
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">{error}</div>}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="nom@exemple.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mot de passe</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-10 pr-12"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
              
              {/* Bouton Google */}
              <div className="mt-6 flex items-center justify-center">
                <Button variant="secondary" className="flex items-center space-x-2">
                  <FaGoogle className="h-5 w-5 text-gray-500" />
                  <span>Se connecter avec Google</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
