
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: 'educateur' | 'psychologue' | 'assistant_social' | 'administrateur' | 'direction';
  organization_id: string | null;
  position: string | null;
  avatar_url: string | null;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { first_name: string; last_name: string; role: string }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Initialisation du contexte d'authentification");
    
    // Configurer l'écouteur d'événements d'authentification AVANT de vérifier la session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Événement d'authentification:", event, "User ID:", currentSession?.user?.id || "Aucun");
        
        // Mise à jour synchrone des états de session et d'utilisateur
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          setProfile(null);
          setIsLoading(false);
          console.log("Utilisateur déconnecté, profil effacé");
        } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && currentSession?.user) {
          // Utiliser setTimeout pour éviter les problèmes potentiels de deadlock
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // ENSUITE vérifier l'état de la session au chargement
    const initSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        console.log("Session au chargement:", currentSession?.user?.id || "Aucune session");
        
        if (currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          await fetchProfile(currentSession.user.id);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
        setIsLoading(false);
      }
    };

    initSession();

    return () => {
      console.log("Nettoyage de l'écouteur d'authentification");
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Chargement du profil pour l'utilisateur:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      console.log("Profil récupéré:", data);
      if (data) {
        setProfile(data as Profile);
      } else {
        console.warn("Aucun profil trouvé pour l'utilisateur:", userId);
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement du profil:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger votre profil.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Tentative de connexion avec:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      console.log("Résultat de connexion:", data?.user?.id, "Erreur:", error?.message || "Aucune");
      
      if (error) {
        // Messages d'erreur personnalisés et plus descriptifs
        if (error.message.includes("Email not confirmed")) {
          throw new Error("Veuillez confirmer votre email avant de vous connecter.");
        } else if (error.message.includes("Email logins are disabled")) {
          throw new Error("L'authentification par email est désactivée. Veuillez contacter l'administrateur.");
        } else if (error.message.includes("Invalid login credentials")) {
          throw new Error("Identifiants invalides. Vérifiez votre email et mot de passe.");
        } else {
          throw error;
        }
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Erreur de connexion détaillée:', error);
      return { error };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData: { first_name: string; last_name: string; role: string }
  ) => {
    try {
      console.log("Tentative d'inscription avec:", email, "et les données:", userData);
      
      // Vérification des données avant envoi
      if (!email || !password || !userData.first_name || !userData.last_name || !userData.role) {
        throw new Error("Tous les champs sont obligatoires");
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
          },
        },
      });
      
      console.log("Résultat d'inscription:", data?.user?.id, "Erreur:", error?.message || "Aucune", "Status:", data?.user?.identities?.[0]?.identity_data);
      
      if (error) {
        console.error("Erreur d'inscription détaillée:", error);
        throw error;
      }

      // Vérifier si l'utilisateur a été créé avec succès
      if (data && data.user) {
        toast({
          title: 'Compte créé',
          description: 'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.',
        });
      } else {
        // Cas où l'email de confirmation est requis
        toast({
          title: 'Vérification requise',
          description: 'Un email de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.',
        });
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Erreur d\'inscription complète:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("Déconnexion réussie");
    } catch (error: any) {
      console.error('Erreur de déconnexion:', error.message);
      toast({
        title: 'Erreur',
        description: 'Un problème est survenu lors de la déconnexion.',
        variant: 'destructive',
      });
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error('Utilisateur non connecté');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      if (profile) {
        setProfile({ ...profile, ...updates });
      }

      toast({
        title: 'Profil mis à jour',
        description: 'Votre profil a été mis à jour avec succès.',
      });

      return { error: null };
    } catch (error: any) {
      console.error('Erreur de mise à jour du profil:', error.message);
      return { error };
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
