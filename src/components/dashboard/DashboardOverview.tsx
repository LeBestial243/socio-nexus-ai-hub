
import React from 'react';
import { User, FileText, Calendar, MessageSquare } from 'lucide-react';
import GradientCard from '../ui/GradientCard';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const statsData = [
  { 
    title: "Profils actifs", 
    count: 15, 
    icon: <User size={16} className="text-socio-blue-light" />, 
    change: "+3", 
    description: "depuis le mois dernier"
  },
  { 
    title: "Documents", 
    count: 87, 
    icon: <FileText size={16} className="text-socio-blue" />, 
    change: "+12", 
    description: "depuis le mois dernier" 
  },
  { 
    title: "Projets en cours", 
    count: 8, 
    icon: <Calendar size={16} className="text-socio-purple" />, 
    change: "+1", 
    description: "depuis le mois dernier"
  },
  { 
    title: "Conversations", 
    count: 32, 
    icon: <MessageSquare size={16} className="text-socio-purple-dark" />, 
    change: "+5", 
    description: "depuis le mois dernier"
  }
];

interface ProgressItemProps {
  label: string;
  progress: number;
  color: string;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ label, progress, color }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-medium">{progress}%</span>
    </div>
    <Progress value={progress} className={`h-2 ${color}`} />
  </div>
);

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Vue d'ensemble</h1>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-md bg-gray-100">{stat.icon}</div>
              <span className="text-xs font-medium text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-semibold mt-2">{stat.count}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>
      
      {/* Cartes d'information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte gradient principale */}
        <GradientCard
          title="Bienvenue sur SocioNexus"
          description="Votre assistant IA dédié aux travailleurs sociaux"
          gradient="blue-purple"
          className="lg:col-span-2"
        >
          <div className="space-y-4 mt-2">
            <p>SocioNexus utilise l'intelligence artificielle pour vous aider dans votre travail au quotidien. Explorez les fonctionnalités et découvrez comment elles peuvent vous aider à gagner du temps et à améliorer la qualité de votre accompagnement.</p>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="bg-white/20 border-white hover:bg-white/30">
                Tutoriel rapide
              </Button>
              <Button variant="outline" className="bg-white/20 border-white hover:bg-white/30">
                Programmer une démo
              </Button>
            </div>
          </div>
        </GradientCard>
        
        {/* Carte de progression */}
        <GradientCard
          title="Progression"
          icon={<Calendar size={16} className="text-socio-purple" />}
        >
          <div className="space-y-3 mt-2">
            <ProgressItem 
              label="Complétion des profils" 
              progress={85} 
              color="bg-socio-blue-light"
            />
            <ProgressItem 
              label="Documentation" 
              progress={62} 
              color="bg-socio-blue"
            />
            <ProgressItem 
              label="Projets éducatifs" 
              progress={45} 
              color="bg-socio-purple"
            />
            <ProgressItem 
              label="Analyse des incidents" 
              progress={30} 
              color="bg-socio-purple-dark"
            />
          </div>
        </GradientCard>
      </div>
    </div>
  );
};

export default DashboardOverview;
