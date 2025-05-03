
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/auth/AuthForm';

const Auth: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Si l'utilisateur est en cours de chargement, afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-socio-blue"></div>
      </div>
    );
  }

  // Si l'utilisateur est déjà connecté, ne pas rendre le composant Auth
  if (user) {
    return null; // Le useEffect ci-dessus s'occupera de la redirection
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient-blue-purple bg-clip-text text-transparent bg-gradient-to-r from-socio-blue-light to-socio-purple mb-2">
          SocioNexus AI Hub
        </h1>
        <p className="text-lg text-gray-600">
          Plateforme intelligente pour travailleurs sociaux
        </p>
      </div>
      <AuthForm />
    </div>
  );
};

export default Auth;
