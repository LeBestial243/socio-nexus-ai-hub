
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { YouthProfile } from '@/hooks/useYouthProfiles';
import { Loader2, CalendarIcon } from 'lucide-react';

const youthProfileSchema = z.object({
  first_name: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  last_name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  birth_date: z.date().nullable().optional(),
  arrival_date: z.date().nullable().optional(),
  status: z.string().default('actif'),
  priority: z.string().default('medium'),
  notes: z.string().nullable().optional(),
});

type YouthProfileFormValues = z.infer<typeof youthProfileSchema>;

interface YouthProfileFormProps {
  onSubmit: (data: any) => void;
  initialData?: Partial<YouthProfile>;
  isLoading?: boolean;
}

const YouthProfileForm: React.FC<YouthProfileFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    initialData?.birth_date ? new Date(initialData.birth_date) : undefined
  );
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(
    initialData?.arrival_date ? new Date(initialData.arrival_date) : undefined
  );
  const { profile } = useAuth();

  const form = useForm<YouthProfileFormValues>({
    resolver: zodResolver(youthProfileSchema),
    defaultValues: {
      first_name: initialData?.first_name || '',
      last_name: initialData?.last_name || '',
      birth_date: initialData?.birth_date ? new Date(initialData.birth_date) : null,
      arrival_date: initialData?.arrival_date ? new Date(initialData.arrival_date) : null,
      status: initialData?.status || 'actif',
      priority: initialData?.priority || 'medium',
      notes: initialData?.notes || '',
    },
  });

  const handleSubmit = (values: YouthProfileFormValues) => {
    if (!profile?.organization_id) {
      return;
    }

    const formattedData = {
      ...values,
      organization_id: profile.organization_id,
      birth_date: values.birth_date ? values.birth_date.toISOString().split('T')[0] : null,
      arrival_date: values.arrival_date ? values.arrival_date.toISOString().split('T')[0] : null,
    };

    onSubmit(formattedData);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name">Prénom</Label>
          <Input
            id="first_name"
            placeholder="Prénom"
            {...form.register('first_name')}
            disabled={isLoading}
          />
          {form.formState.errors.first_name && (
            <p className="text-sm text-red-500">{form.formState.errors.first_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Nom</Label>
          <Input
            id="last_name"
            placeholder="Nom"
            {...form.register('last_name')}
            disabled={isLoading}
          />
          {form.formState.errors.last_name && (
            <p className="text-sm text-red-500">{form.formState.errors.last_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Date de naissance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${!birthDate ? "text-muted-foreground" : ""}`}
                disabled={isLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDate ? (
                  format(birthDate, 'PPP', { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={(date) => {
                  setBirthDate(date);
                  form.setValue('birth_date', date);
                }}
                initialFocus
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Date d'arrivée</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${!arrivalDate ? "text-muted-foreground" : ""}`}
                disabled={isLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {arrivalDate ? (
                  format(arrivalDate, 'PPP', { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={arrivalDate}
                onSelect={(date) => {
                  setArrivalDate(date);
                  form.setValue('arrival_date', date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            defaultValue={initialData?.status || 'actif'}
            onValueChange={(value) => form.setValue('status', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="actif">Actif</SelectItem>
              <SelectItem value="inactif">Inactif</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priorité</Label>
          <Select
            defaultValue={initialData?.priority || 'medium'}
            onValueChange={(value) => form.setValue('priority', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">Haute</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="low">Basse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Notes sur le jeune..."
          {...form.register('notes')}
          disabled={isLoading}
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="bg-socio-blue hover:bg-socio-blue/90">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement en cours...
          </>
        ) : initialData?.id ? (
          'Mettre à jour le profil'
        ) : (
          'Créer le profil'
        )}
      </Button>
    </form>
  );
};

export default YouthProfileForm;
