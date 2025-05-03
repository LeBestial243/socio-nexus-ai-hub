
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import YouthProfileCard from '@/components/youth/YouthProfileCard';
import YouthProfileModal from '@/components/youth/YouthProfileModal';
import { useYouthProfiles, YouthProfile } from '@/hooks/useYouthProfiles';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Search, Filter } from 'lucide-react';

const YouthProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { youthProfiles, isLoading, createYouthProfile } = useYouthProfiles();
  const { profile } = useAuth();

  // Filtre des profils jeunes
  const filteredProfiles = youthProfiles?.filter(profile => {
    const matchesSearch = searchTerm
      ? `${profile.first_name} ${profile.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesStatus = statusFilter === 'all' || profile.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || profile.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Gestion de la création d'un nouveau profil
  const handleCreateProfile = (formData: Partial<YouthProfile>) => {
    if (!profile?.organization_id) return;
    
    createYouthProfile({
      ...formData,
      organization_id: profile.organization_id,
    } as any);
    
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Profils jeunes</h1>
          <p className="text-gray-500">Gérez les profils des jeunes sous votre responsabilité</p>
        </div>
        
        <Button 
          className="bg-socio-blue hover:bg-socio-blue/90"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={16} className="mr-2" /> Ajouter un profil
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Rechercher un profil..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
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
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-socio-blue"></div>
        </div>
      ) : filteredProfiles?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Aucun profil jeune trouvé</p>
          <Button 
            variant="outline" 
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={16} className="mr-2" /> Ajouter un profil
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles?.map((profile) => (
            <YouthProfileCard
              key={profile.id}
              name={`${profile.first_name} ${profile.last_name}`}
              age={profile.birth_date ? new Date().getFullYear() - new Date(profile.birth_date).getFullYear() : 0}
              status={profile.status as any}
              priority={profile.priority as any}
              documentCount={0} // À implémenter avec une relation vers les documents
              lastUpdate={new Date(profile.updated_at).toLocaleDateString('fr-FR')}
              image={profile.avatar_url || undefined}
              profileId={profile.id}
            />
          ))}
        </div>
      )}

      {/* Modal pour la création d'un nouveau profil */}
      <YouthProfileModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProfile}
        isLoading={isLoading}
        title="Créer un nouveau profil jeune"
      />
    </div>
  );
};

export default YouthProfiles;
