
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) {
      // Rediriger vers la page de connexion avec l'emplacement actuel enregistré
      navigate('/auth', { state: { from: location }, replace: true });
    }
  }, [user, isLoading, navigate, location]);

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

  return <>{children}</>;
};

export default RequireAuth;
