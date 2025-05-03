
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import YouthProfileCard from '@/components/youth/YouthProfileCard';
import { Plus, Search, Filter } from 'lucide-react';

// Données fictives pour la démo
const youthProfiles = [
  { 
    name: "Alexandre Dubois", 
    age: 16, 
    status: "Actif" as const, 
    priority: "high" as const, 
    documentCount: 12, 
    lastUpdate: "2 jours" 
  },
  { 
    name: "Léa Martin", 
    age: 14, 
    status: "Actif" as const, 
    priority: "medium" as const, 
    documentCount: 8, 
    lastUpdate: "5 jours" 
  },
  { 
    name: "Thomas Bernard", 
    age: 17, 
    status: "Urgent" as const, 
    priority: "high" as const, 
    documentCount: 15, 
    lastUpdate: "aujourd'hui" 
  },
  { 
    name: "Sophie Lambert", 
    age: 12, 
    status: "Actif" as const, 
    priority: "low" as const, 
    documentCount: 6, 
    lastUpdate: "1 semaine" 
  },
  { 
    name: "Maxime Rousseau", 
    age: 15, 
    status: "Actif" as const, 
    priority: "medium" as const, 
    documentCount: 10, 
    lastUpdate: "3 jours" 
  },
  { 
    name: "Emma Leroy", 
    age: 13, 
    status: "Inactif" as const, 
    priority: "low" as const, 
    documentCount: 7, 
    lastUpdate: "2 semaines" 
  }
];

const YouthProfiles = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Profils jeunes</h1>
          <p className="text-gray-500">Gérez les profils des jeunes sous votre responsabilité</p>
        </div>
        
        <Button className="bg-socio-blue hover:bg-socio-blue/90">
          <Plus size={16} className="mr-2" /> Ajouter un profil
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Rechercher un profil..." className="pl-10" />
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Basse</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {youthProfiles.map((profile, index) => (
          <YouthProfileCard
            key={index}
            name={profile.name}
            age={profile.age}
            status={profile.status}
            priority={profile.priority}
            documentCount={profile.documentCount}
            lastUpdate={profile.lastUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default YouthProfiles;
