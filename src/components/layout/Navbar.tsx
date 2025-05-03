
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-2"
          >
            <span className="text-xl font-semibold bg-gradient-to-r from-socio-blue-light to-socio-purple bg-clip-text text-transparent">
              SocioNexus
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <ProfileMenu />
          ) : (
            <Button asChild className="bg-socio-blue hover:bg-socio-blue/90">
              <Link to="/auth">Connexion</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
