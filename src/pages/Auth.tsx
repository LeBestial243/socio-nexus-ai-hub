
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/auth/AuthForm';

const Auth: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Si l'utilisateur est déjà connecté, rediriger vers le tableau de bord
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
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
