
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, FileText, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useYouthProfiles, YouthProfile } from '@/hooks/useYouthProfiles';
import YouthProfileModal from './YouthProfileModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface YouthProfileCardProps {
  name: string;
  age: number;
  status: 'actif' | 'inactif' | 'urgent';
  priority: 'high' | 'medium' | 'low';
  documentCount: number;
  lastUpdate: string;
  image?: string;
  profileId: string;
}

const YouthProfileCard: React.FC<YouthProfileCardProps> = ({
  name,
  age,
  status,
  priority,
  documentCount,
  lastUpdate,
  image,
  profileId
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [profile, setProfile] = useState<YouthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchYouthProfileById, updateYouthProfile, deleteYouthProfile } = useYouthProfiles();

  const statusColors = {
    'actif': 'bg-green-100 text-green-800',
    'inactif': 'bg-gray-100 text-gray-800',
    'urgent': 'bg-red-100 text-red-800'
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

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      const profileData = await fetchYouthProfileById(profileId);
      setProfile(profileData);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (formData: Partial<YouthProfile>) => {
    updateYouthProfile({ id: profileId, ...formData });
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteYouthProfile(profileId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
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
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant="outline" className={`${statusColors[status]} border-0`}>
              {status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/20 hover:bg-white/40">
                  <MoreVertical size={16} className="text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" /> Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <Edit size={14} className="mr-1" /> Éditer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal d'édition */}
      {profile && (
        <YouthProfileModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdate}
          initialData={profile}
          isLoading={isLoading}
          title="Modifier le profil jeune"
        />
      )}

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce profil ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données associées à ce profil seront supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default YouthProfileCard;
