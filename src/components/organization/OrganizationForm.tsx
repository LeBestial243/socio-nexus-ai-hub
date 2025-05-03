
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Schéma de validation pour le formulaire de création d'organisation
const organizationSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({ message: 'Adresse e-mail invalide' }).optional().or(z.literal('')),
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

const OrganizationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = async (values: OrganizationFormValues) => {
    if (!user || !profile) {
      toast({
        title: 'Erreur',
        description: 'Vous devez être connecté pour créer une organisation',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Créer l'organisation
      const { data: organization, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: values.name,
          address: values.address || null,
          phone: values.phone || null,
          email: values.email || null,
        })
        .select()
        .single();

      if (orgError) {
        throw new Error(orgError.message);
      }

      // Mettre à jour le profil de l'utilisateur avec l'ID de l'organisation
      const { error: updateError } = await updateProfile({ organization_id: organization.id });

      if (updateError) {
        throw new Error(updateError.message);
      }

      toast({
        title: 'Organisation créée',
        description: `L'organisation ${organization.name} a été créée avec succès.`,
      });

      // Rediriger vers le tableau de bord
      window.location.href = '/dashboard';

    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de la création de l\'organisation',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Créer une organisation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom de l'organisation</Label>
              <Input
                id="name"
                placeholder="Nom de votre structure"
                disabled={isLoading}
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Adresse (optionnelle)</Label>
              <Textarea
                id="address"
                placeholder="Adresse complète"
                disabled={isLoading}
                {...form.register('address')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone (optionnel)</Label>
              <Input
                id="phone"
                placeholder="Numéro de téléphone"
                disabled={isLoading}
                {...form.register('phone')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email (optionnel)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email de contact"
                disabled={isLoading}
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="mt-4 bg-socio-blue hover:bg-socio-blue/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                'Créer l\'organisation'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-gray-500">
          Cette organisation sera associée à votre profil.
        </p>
      </CardFooter>
    </Card>
  );
};

export default OrganizationForm;
