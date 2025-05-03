
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="w-full h-16 border-b bg-white">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-md gradient-blue-purple flex items-center justify-center">
              <span className="text-white font-bold text-xl">SN</span>
            </div>
            <span className="ml-2 font-poppins font-medium text-xl hidden md:block">
              SocioNexus
            </span>
          </Link>
          <div className="hidden md:flex items-center ml-6 relative w-64">
            <Search size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-8 h-9 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Search size={20} className="text-gray-500 md:hidden" />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings size={20} className="text-gray-500" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User size={18} className="mr-2" />
              <span>Admin</span>
            </Button>
            <div className="w-9 h-9 rounded-full bg-socio-purple-dark/20 flex items-center justify-center">
              <User size={16} className="text-socio-purple-dark" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
