
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import OrganizationForm from '@/components/organization/OrganizationForm';

const OrganizationSetup: React.FC = () => {
  const { profile, isLoading } = useAuth();

  // Si l'utilisateur a déjà une organisation, rediriger vers le tableau de bord
  if (!isLoading && profile?.organization_id) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient-blue-purple bg-clip-text text-transparent bg-gradient-to-r from-socio-blue-light to-socio-purple mb-2">
          Configuration de votre organisation
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Pour commencer, créez votre structure sociale ou rejoignez une structure existante
        </p>
      </div>
      <OrganizationForm />
    </div>
  );
};

export default OrganizationSetup;
