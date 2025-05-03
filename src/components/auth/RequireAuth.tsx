
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  useEffect(() => {
    // Ne rediriger que si nous ne sommes pas en train de charger ET que l'utilisateur n'est pas connecté
    // ET que nous ne sommes pas déjà en train de rediriger (pour éviter les boucles)
    if (!isLoading && !user && !isRedirecting) {
      console.log("Redirection vers la page d'authentification depuis:", location.pathname);
      setIsRedirecting(true);
      // Rediriger vers la page de connexion avec l'emplacement actuel enregistré
      navigate('/auth', { state: { from: location }, replace: true });
    }
  }, [user, isLoading, navigate, location, isRedirecting]);

  // Afficher un indicateur de chargement pendant que nous vérifions l'authentification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-socio-blue"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, ne rien rendre pendant la redirection
  if (!user) {
    return null;
  }

  // L'utilisateur est authentifié, afficher le contenu protégé
  return <>{children}</>;
};

export default RequireAuth;
