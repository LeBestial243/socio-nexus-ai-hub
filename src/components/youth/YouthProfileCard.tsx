
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, FileText, Plus, MessageSquare } from 'lucide-react';

interface YouthProfileProps {
  name: string;
  age: number;
  status: 'Actif' | 'Inactif' | 'Urgent';
  priority: 'high' | 'medium' | 'low';
  documentCount: number;
  lastUpdate: string;
  image?: string;
}

const YouthProfileCard: React.FC<YouthProfileProps> = ({
  name,
  age,
  status,
  priority,
  documentCount,
  lastUpdate,
  image
}) => {
  const statusColors = {
    'Actif': 'bg-green-100 text-green-800',
    'Inactif': 'bg-gray-100 text-gray-800',
    'Urgent': 'bg-red-100 text-red-800'
  };
  
  const priorityColors = {
    'high': 'bg-red-50 text-red-700 border-red-200',
    'medium': 'bg-yellow-50 text-yellow-800 border-yellow-200',
    'low': 'bg-green-50 text-green-700 border-green-200'
  };

  const priorityLabels = {
    'high': 'Priorité haute',
    'medium': 'Priorité moyenne',
    'low': 'Priorité basse'
  };

  return (
    <Card className="overflow-hidden border hover:shadow-md transition-shadow">
      <div className="relative h-28 bg-gradient-to-r from-socio-blue-light to-socio-purple">
        <div className="absolute -bottom-8 left-4">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center border-2 border-white">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <User size={24} className="text-gray-400" />
            )}
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className={`${statusColors[status]} border-0`}>
            {status}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-10 pb-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{age} ans</p>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className={`${priorityColors[priority]}`}>
            {priorityLabels[priority]}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FileText size={14} />
            <span>{documentCount} documents</span>
          </div>
          <div>
            Mis à jour: {lastUpdate}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText size={14} className="mr-1" /> Dossier
          </Button>
          <Button size="sm" className="flex-1 bg-socio-blue hover:bg-socio-blue/90">
            <Plus size={14} className="mr-1" /> Action
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default YouthProfileCard;
