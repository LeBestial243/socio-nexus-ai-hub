
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface YouthProfile {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string | null;
  arrival_date: string | null;
  organization_id: string;
  status: string;
  priority: string;
  avatar_url: string | null;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useYouthProfiles = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fonction pour calculer l'âge à partir de la date de naissance
  const calculateAge = (birthDate: string | null): number => {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birthDateObject = new Date(birthDate);
    let age = today.getFullYear() - birthDateObject.getFullYear();
    const monthDiff = today.getMonth() - birthDateObject.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObject.getDate())) {
      age--;
    }
    
    return age;
  };

  // Fonction pour récupérer la liste des profils jeunes
  const fetchYouthProfiles = async (): Promise<YouthProfile[]> => {
    const { data, error } = await supabase
      .from('juveniles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  };

  // Fonction pour récupérer un profil jeune par ID
  const fetchYouthProfileById = async (id: string): Promise<YouthProfile> => {
    const { data, error } = await supabase
      .from('juveniles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Profil jeune non trouvé');
    }

    return data;
  };

  // Fonction pour créer un nouveau profil jeune
  const createYouthProfile = async (profileData: Omit<YouthProfile, 'id' | 'created_at' | 'updated_at'>): Promise<YouthProfile> => {
    const { data, error } = await supabase
      .from('juveniles')
      .insert(profileData)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // Fonction pour mettre à jour un profil jeune
  const updateYouthProfile = async ({ id, ...updates }: Partial<YouthProfile> & { id: string }): Promise<YouthProfile> => {
    const { data, error } = await supabase
      .from('juveniles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // Fonction pour supprimer un profil jeune
  const deleteYouthProfile = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('juveniles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  };

  // Requête pour obtenir tous les profils jeunes
  const { data: youthProfiles, isLoading, error } = useQuery({
    queryKey: ['youthProfiles'],
    queryFn: fetchYouthProfiles
  });

  // Mutation pour créer un profil jeune
  const createMutation = useMutation({
    mutationFn: createYouthProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['youthProfiles'] });
      toast({
        title: 'Profil créé',
        description: 'Le profil jeune a été créé avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la création du profil: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Mutation pour mettre à jour un profil jeune
  const updateMutation = useMutation({
    mutationFn: updateYouthProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['youthProfiles'] });
      toast({
        title: 'Profil mis à jour',
        description: 'Le profil jeune a été mis à jour avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la mise à jour du profil: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Mutation pour supprimer un profil jeune
  const deleteMutation = useMutation({
    mutationFn: deleteYouthProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['youthProfiles'] });
      toast({
        title: 'Profil supprimé',
        description: 'Le profil jeune a été supprimé avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la suppression du profil: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  return {
    youthProfiles,
    isLoading,
    error,
    fetchYouthProfileById,
    createYouthProfile: createMutation.mutate,
    updateYouthProfile: updateMutation.mutate,
    deleteYouthProfile: deleteMutation.mutate,
    calculateAge,
  };
};
