
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  User, 
  FileText, 
  MessageSquare, 
  ChartBar, 
  Calendar, 
  Users, 
  Shield, 
  DollarSign, 
  Cog,
  Book
} from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
};

const navItems: NavItem[] = [
  {
    label: "Tableau de bord",
    icon: <ChartBar size={20} />,
    href: "/dashboard",
  },
  {
    label: "Profils jeunes",
    icon: <User size={20} />,
    href: "/youth-profiles",
  },
  {
    label: "Documents",
    icon: <FileText size={20} />,
    href: "/documents",
  },
  {
    label: "Conversations",
    icon: <MessageSquare size={20} />,
    href: "/conversations",
    disabled: true,
  },
  {
    label: "Rapports",
    icon: <Book size={20} />,
    href: "/reports",
    disabled: true,
  },
  {
    label: "Projets",
    icon: <Calendar size={20} />,
    href: "/projects",
    disabled: true,
  },
  {
    label: "Équipe",
    icon: <Users size={20} />,
    href: "/team",
    disabled: true,
  },
  {
    label: "Confidentialité",
    icon: <Shield size={20} />,
    href: "/privacy",
    disabled: true,
  },
  {
    label: "Tarification",
    icon: <DollarSign size={20} />,
    href: "/pricing",
    disabled: true,
  },
  {
    label: "Paramètres",
    icon: <Cog size={20} />,
    href: "/settings",
    disabled: true,
  }
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  return (
    <div 
      className={cn(
        "h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300 flex flex-col",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="p-4">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-md flex items-center justify-center"
        >
          {expanded ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Réduire
            </>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1 px-3">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  location.pathname === item.href
                    ? "bg-socio-blue text-white"
                    : "text-gray-700 hover:bg-gray-100",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={(e) => {
                  if (item.disabled) e.preventDefault();
                }}
              >
                {item.icon}
                {expanded && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto p-4">
        {expanded && (
          <div className="p-4 rounded-lg gradient-purple text-white">
            <p className="font-medium mb-2">Version démo</p>
            <p className="text-sm opacity-90 mb-3">Accès complet pour tests et développement</p>
            <div className="h-1.5 w-full bg-white/30 rounded-full">
              <div className="h-full rounded-full bg-white w-3/4"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
