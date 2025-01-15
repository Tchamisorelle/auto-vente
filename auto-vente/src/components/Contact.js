import React, { useState } from 'react';
import { Button } from "./ui";
import { Mail, Phone, MapPin } from "lucide-react";
import backgroundImage from '../img/1.avif';
import AppLayout from './app-layout';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nom est requis';
    if (!formData.email) newErrors.email = 'Email est requis';
    if (!formData.message) newErrors.message = 'Message est requis';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      alert('Formulaire soumis avec succès');
      setFormData({ name: '', email: '', message: '' }); // Réinitialiser le formulaire
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <main className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Contactez-nous</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-lg bg-black/20 backdrop-blur-md">
                <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-full bg-primary/20">
                      <Phone className="text-primary" size={24} />
                    </span>
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-gray-300">+237 6 20 23 20 49</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-full bg-primary/20">
                      <Mail className="text-primary" size={24} />
                    </span>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-300">contact@autovente.fr</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-full bg-primary/20">
                      <MapPin className="text-primary" size={24} />
                    </span>
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-300">
                        Bastos
                        <br />
                        75008 Yaoundé, Cameroun
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-lg bg-black/20 backdrop-blur-md">
                <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                  </div>

                  <Button className="w-full">Envoyer</Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default Contact;
