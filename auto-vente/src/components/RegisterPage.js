import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Textarea } from './ui';
import { Mail, Lock, Eye, EyeOff, User, Phone, Building, FileText } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa'; // Icône Google
import { register } from "../services/auth-service";
import AppLayout from './app-layout';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false); // Détecter si l'utilisateur est un professionnel ou non
  const [credentials, setCredentials] = useState({
    name: '',
    firstName: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: '',
    language: '',
    communicationMethod: '',
    companyName: '',
    registrationNumber: '',
    companyAddress: '',
    subsidiaries: '',
    responsibleName: '',
    responsibleContact: '',
    bulkPurchase: false,
    paymentTerms: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fonction de validation des champs
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isValidEmail(credentials.email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      setLoading(false);
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      await register(credentials);
      navigate('/login'); // Redirection vers la page de connexion après inscription
    } catch (err) {
      setError(err.message || 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Affichage des erreurs */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {/* Formulaire d'inscription */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Champ Nom et Prénom */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="firstName">Prénom</label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Votre prénom"
                  value={credentials.firstName}
                  onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">Nom</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  value={credentials.name}
                  onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                />
              </div>

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

              {/* Champ téléphone */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="phone">Numéro de téléphone</label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  value={credentials.phone}
                  onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                />
              </div>

              {/* Champ adresse */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="address">Adresse postale</label>
                <Input
                    id="address"
                    type="text"
                    placeholder="Votre adresse complète"
                    value={credentials.address}
                    onChange={(e) => setCredentials({ ...credentials, address: e.target.value })}
                    as="textarea" // Ajoutez cette ligne pour le transformer en textarea
                />
                </div>


              {/* Choix utilisateur ou entreprise */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Type d'utilisateur</label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={isBusiness ? 'secondary' : 'primary'}
                    onClick={() => setIsBusiness(false)}
                  >
                    Particulier
                  </Button>
                  <Button
                    type="button"
                    variant={isBusiness ? 'primary' : 'secondary'}
                    onClick={() => setIsBusiness(true)}
                  >
                    Entreprise
                  </Button>
                </div>
              </div>

              {isBusiness && (
                <>
                  {/* Champs spécifiques pour les entreprises */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="companyName">Nom de l'entreprise</label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Nom de l'entreprise"
                      value={credentials.companyName}
                      onChange={(e) => setCredentials({ ...credentials, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="registrationNumber">Numéro d'immatriculation</label>
                    <Input
                      id="registrationNumber"
                      type="text"
                      placeholder="Numéro d'immatriculation"
                      value={credentials.registrationNumber}
                      onChange={(e) => setCredentials({ ...credentials, registrationNumber: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="companyAddress">Adresse du siège social</label>
                    <Textarea
                      id="companyAddress"
                      placeholder="Adresse du siège social"
                      value={credentials.companyAddress}
                      onChange={(e) => setCredentials({ ...credentials, companyAddress: e.target.value })} 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="responsibleName">Nom du responsable</label>
                    <Input
                      id="responsibleName"
                      type="text"
                      placeholder="Nom du responsable"
                      value={credentials.responsibleName}
                      onChange={(e) => setCredentials({ ...credentials, responsibleName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="responsibleContact">Contact du responsable</label>
                    <Input
                      id="responsibleContact"
                      type="text"
                      placeholder="Contact du responsable"
                      value={credentials.responsibleContact}
                      onChange={(e) => setCredentials({ ...credentials, responsibleContact: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="bulkPurchase">Intérêt pour l'achat en gros (flottes)</label>
                    <Input
                      id="bulkPurchase"
                      type="checkbox"
                      checked={credentials.bulkPurchase}
                      onChange={(e) => setCredentials({ ...credentials, bulkPurchase: e.target.checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="paymentTerms">Conditions de paiement</label>
                    <Input
                      id="paymentTerms"
                      type="text"
                      placeholder="Conditions de paiement (comptant ou crédit)"
                      value={credentials.paymentTerms}
                      onChange={(e) => setCredentials({ ...credentials, paymentTerms: e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* Champ nom d'utilisateur et mot de passe */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="username">Nom d'utilisateur</label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>

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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmer le mot de passe"
                    value={credentials.confirmPassword}
                    onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                    className="pl-10 pr-12"
                    aria-label="Confirmer le mot de passe"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                    aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Enregistrement...' : 'S\'inscrire'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default RegisterPage;
