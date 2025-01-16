import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from './ui';
import { Bell, Moon, Edit, Save } from 'lucide-react';
import { useAuth } from './AuthProvider';
import AppLayout from './app-layout';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    preferences: {
      notifications: false,
      darkMode: false,
    },
  });
  const navigate = useNavigate(); // Hook pour la navigation

  const handleClick = () => {
    navigate('/profile');  // Redirige vers la page de profil
  };
  
  const [editedProfile, setEditedProfile] = useState(profile);

  // Charger les données depuis localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('user');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);

      // S'assurer que 'preferences' existe et définir des valeurs par défaut si nécessaire
      const profileWithDefaults = {
        ...parsedProfile,
        preferences: parsedProfile.preferences || {
          notifications: false,
          darkMode: false,
        },
      };

      // Mettre à jour le profil avec les données du localStorage
      setProfile(profileWithDefaults);
      setEditedProfile(profileWithDefaults);
    }
  }, []);

  const handleSave = async () => {
    try {
      // Simuler une sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfile(editedProfile);
      setIsEditing(false);

      // Sauvegarder dans localStorage
      localStorage.setItem('user', JSON.stringify(editedProfile));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const togglePreference = (key) => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle onClick={handleClick}>Profil</CardTitle> {/* Le titre devient cliquable */}
              <div className="flex space-x-2">
                <Button
                  variant={isEditing ? 'default' : 'primary'}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-5 w-5 mr-2" /> Sauvegarder
                    </>
                  ) : (
                    <>
                      <Edit className="h-5 w-5 mr-2" /> Modifier
                    </>
                  )}
                </Button>
                <Button variant="destructive" onClick={logout}>
                  Déconnexion
                </Button>
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
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={editedProfile.email}
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
                          editedProfile.preferences && editedProfile.preferences.notifications
                            ? 'bg-blue-600'
                            : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            editedProfile.preferences && editedProfile.preferences.notifications
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
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
                          editedProfile.preferences && editedProfile.preferences.darkMode
                            ? 'bg-blue-600'
                            : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            editedProfile.preferences && editedProfile.preferences.darkMode
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          }`}
                        />
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
