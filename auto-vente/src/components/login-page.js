import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from './ui';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa'; // Icône Google
import { login } from "../services/auth-service";
import AppLayout from './app-layout';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fonction de validation des champs
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isValidEmail(credentials.email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      setLoading(false);
      return;
    }

    try {
      const userData = await login(credentials.email, credentials.password);
      // Redirection basée sur le rôle
      if (userData.role === 'admin') {
        navigate('/admin');
      } else if (userData.role === 'client') {
        navigate('/profile');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Affichage des erreurs */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {/* Formulaire de connexion */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Champ email */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="nom@exemple.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="pl-10"
                    aria-label="Adresse e-mail"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Champ mot de passe */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">Mot de passe</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-10 pr-12"
                    aria-label="Mot de passe"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <a href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Bouton de connexion */}
              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>

              {/* Connexion avec Google */}
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
