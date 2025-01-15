import React, { useState } from 'react';
import { Trash2, ShoppingCart, File, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui';
import { Button } from './ui';
import { Alert, AlertTitle, AlertDescription } from './ui';

const DocumentCartManager = () => {
  // État pour les documents et le panier
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Document 1.pdf', type: 'PDF', size: '2.5MB' },
    { id: 2, name: 'Page web.html', type: 'HTML', size: '1.2MB' },
    { id: 3, name: 'Rapport.pdf', type: 'PDF', size: '3.8MB' }
  ]);

  const [cart, setCart] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Fonctions de gestion du panier
  const addToCart = (doc) => {
    if (!cart.find(item => item.id === doc.id)) {
      setCart([...cart, doc]);
    }
  };

  const removeFromCart = (docId) => {
    setCart(cart.filter(item => item.id !== docId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Fonction pour le type d'icône
  const getFileIcon = (type) => {
    return type === 'PDF' ? <File className="w-5 h-5"/> : <FileText className="w-5 h-5"/>;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Liste des documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documents disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map(doc => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedDoc(doc)}
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(doc.type)}
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-500">{doc.type} - {doc.size}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(doc);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Détails du document sélectionné */}
      {selectedDoc && (
        <Alert>
          <AlertTitle>Document sélectionné : {selectedDoc.name}</AlertTitle>
          <AlertDescription>
            Type: {selectedDoc.type} | Taille: {selectedDoc.size}
          </AlertDescription>
        </Alert>
      )}

      {/* Panier */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Panier ({cart.length} documents)</CardTitle>
          {cart.length > 0 && (
            <Button variant="destructive" size="sm" onClick={clearCart}>
              <Trash2 className="w-4 h-4 mr-2" />
              Vider le panier
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              Le panier est vide
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(item.type)}
                    <span>{item.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentCartManager;
