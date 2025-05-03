
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/auth/AuthForm';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Auth: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  useEffect(() => {
    // Ne rediriger que si l'utilisateur est connecté ET que nous ne sommes pas déjà en train de rediriger
    if (user && !isLoading && !isRedirecting) {
      setIsRedirecting(true);
      console.log("Utilisateur connecté, redirection depuis la page d'authentification");
      
      // Récupérer la page précédente stockée dans l'état de l'emplacement, ou aller à la page d'accueil
      const state = location.state as LocationState | null;
      const destination = state?.from?.pathname || '/dashboard';
      
      navigate(destination, { replace: true });
    }
  }, [user, isLoading, navigate, location, isRedirecting]);

  // Si l'utilisateur est en cours de chargement, afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-socio-blue"></div>
      </div>
    );
  }

  // Si l'utilisateur est déjà connecté, ne pas rendre le composant Auth
  // Le useEffect ci-dessus s'occupera de la redirection
  if (user) {
    return null;
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
