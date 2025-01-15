import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from './ui';
import { Bell, Moon, Edit, Save } from 'lucide-react';
import { useAuth } from './AuthProvider';
import AppLayout from './app-layout';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null); // Initialisez à null
  const [editedProfile, setEditedProfile] = useState(null); // Initialisez à null

  // Récupérer les données depuis localStorage lorsque le composant est monté
  useEffect(() => {
    const storedProfile = localStorage.getItem('user'); // Récupérer les données 'user' depuis localStorage
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile); // Parse les données en objet
      if (parsedProfile && parsedProfile.name && parsedProfile.email) {
        // Assurez-vous que les préférences existent et sont correctement initialisées
        const profileWithDefaults = {
          ...parsedProfile,
          preferences: parsedProfile.preferences || {
            notifications: false,
            darkMode: false,
          },
        };
        setProfile(profileWithDefaults); // Mettre à jour l'état du profil
        setEditedProfile(profileWithDefaults); // Mettre à jour l'état de l'édition
      } else {
        console.error('Les données du profil ne sont pas valides dans le localStorage');
      }
    } else {
      console.error('Aucun profil trouvé dans le localStorage');
    }
  }, []);

  const handleSave = async () => {
    try {
      // Simuler un appel API pour sauvegarder les modifications
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(editedProfile);
      setIsEditing(false);

      // Sauvegarder les données mises à jour dans localStorage
      localStorage.setItem('user', JSON.stringify(editedProfile));

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const togglePreference = (key) => {
    // Vérifier si 'preferences' est défini, sinon l'initialiser
    if (!editedProfile.preferences) {
      setEditedProfile({
        ...editedProfile,
        preferences: {
          notifications: false,
          darkMode: false,
          [key]: !editedProfile[key], // Modifie la préférence de la clé donnée
        },
      });
    } else {
      setEditedProfile({
        ...editedProfile,
        preferences: {
          ...editedProfile.preferences,
          [key]: !editedProfile.preferences[key], // Modifie la préférence de la clé donnée
        },
      });
    }
  };

  if (!profile) {
    return <div>Chargement...</div>; // Affiche un indicateur de chargement pendant que les données sont récupérées
  }

  return (
    <AppLayout> {/* Ajout de AppLayout */}
      <div className="min-h-screen bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profil</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={isEditing ? "default" : "primary"}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? <><Save className="h-5 w-5 mr-2" /> Sauvegarder</> : <><Edit className="h-5 w-5 mr-2" /> Modifier</>}
                </Button>
                <Button variant="destructive" onClick={logout}>Déconnexion</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom</label>
                      <Input
                        type="text"
                        value={isEditing ? editedProfile.name : profile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={isEditing ? editedProfile.email : profile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Préférences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Notifications</span>
                      </div>
                      <button
                        onClick={() => isEditing && togglePreference('notifications')}
                        disabled={!isEditing}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          editedProfile.preferences.notifications ? 'bg-blue-600' : 'bg-gray-700'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          editedProfile.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Moon className="h-5 w-5" />
                        <span>Mode sombre</span>
                      </div>
                      <button
                        onClick={() => isEditing && togglePreference('darkMode')}
                        disabled={!isEditing}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          editedProfile.preferences.darkMode ? 'bg-blue-600' : 'bg-gray-700'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          editedProfile.preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
