import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleOptions from './components/VehicleOptions';
import OrderForm from './components/OrderForm';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './components/home-page';
import CataloguePage from './components/catalogue-components';
import AdminDashboard from './components/admin-dashboard';
import ClientManagement from './components/client-management';
import OrderManagement from './components/order-management';
import VehicleForm from './components/vehicle-form';
import DocumentCartManager from './components/document-cart-manager';
import PrivateRoute from './services/private-route';
import { AuthProvider } from './components/AuthProvider'; // Import du AuthProvider
import LoginPage from './components/login-page';
import ProfilePage from './components/ProfilPage';
import Contact from './components/Contact';
import VehicleDetailPage from './components/VehicleDetailPage';

function App() {
  return (
    <AuthProvider> {/* AuthProvider pour gérer l'état d'authentification */}
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicle-options" element={<VehicleOptions />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/document" element={<DocumentCartManager />} />
          <Route path="/vehicule-form" element={<VehicleForm />} />
          <Route path="/vehicle/:id" element={<VehicleDetailPage />} /> 
          <Route path='/contact' element={<Contact />} />
          
          {/* Route pour page 404 */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
          
          {/* Routes protégées */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/client-management" 
            element={
              <PrivateRoute>
                <ClientManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/order-management" 
            element={
              <PrivateRoute>
                <OrderManagement />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
