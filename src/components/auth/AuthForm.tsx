
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Schéma de validation pour le formulaire de connexion
const loginSchema = z.object({
  email: z.string().email({ message: 'Adresse e-mail invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

// Schéma de validation pour le formulaire d'inscription
const registerSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  lastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse e-mail invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
  confirmPassword: z.string(),
  role: z.enum(['educateur', 'psychologue', 'assistant_social', 'administrateur', 'direction']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  // Formulaire de connexion
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Formulaire d'inscription
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'educateur',
    },
  });

  // Gérer la soumission du formulaire de connexion
  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await signIn(values.email, values.password);
      if (error) {
        throw new Error(error.message || 'Échec de la connexion');
      }
      toast({
        title: 'Connexion réussie',
        description: 'Vous êtes maintenant connecté.',
      });
    } catch (error: any) {
      setAuthError(error.message);
      toast({
        title: 'Erreur de connexion',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la soumission du formulaire d'inscription
  const handleRegister = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log("Tentative d'inscription avec les valeurs:", values);
      
      const { error } = await signUp(
        values.email,
        values.password,
        { 
          first_name: values.firstName, 
          last_name: values.lastName, 
          role: values.role 
        }
      );
      
      console.log("Résultat de l'inscription:", error ? `Erreur: ${error.message}` : "Réussite");
      
      if (error) {
        throw new Error(error.message || 'Échec de l\'inscription');
      }
      
      // Si l'inscription réussit, passez à l'onglet de connexion
      toast({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.',
      });
      
      setActiveTab('login');
      
      // Réinitialiser le formulaire d'inscription
      registerForm.reset();
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      setAuthError(error.message);
      toast({
        title: 'Erreur d\'inscription',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="rounded-l-md">Connexion</TabsTrigger>
          <TabsTrigger value="register" className="rounded-r-md">Inscription</TabsTrigger>
        </TabsList>

        {authError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        {/* Formulaire de connexion */}
        <TabsContent value="login">
          <CardHeader>
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte SocioNexus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={loginForm.handleSubmit(handleLogin)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    placeholder="exemple@domaine.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...loginForm.register('email')}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...loginForm.register('password')}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading} className="bg-socio-blue hover:bg-socio-blue/90">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </TabsContent>

        {/* Formulaire d'inscription */}
        <TabsContent value="register">
          <CardHeader>
            <CardTitle className="text-2xl">Inscription</CardTitle>
            <CardDescription>
              Créez votre compte pour accéder à SocioNexus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={registerForm.handleSubmit(handleRegister)}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Prénom"
                      disabled={isLoading}
                      {...registerForm.register('firstName')}
                    />
                    {registerForm.formState.errors.firstName && (
                      <p className="text-sm text-red-500">{registerForm.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Nom"
                      disabled={isLoading}
                      {...registerForm.register('lastName')}
                    />
                    {registerForm.formState.errors.lastName && (
                      <p className="text-sm text-red-500">{registerForm.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    placeholder="exemple@domaine.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...registerForm.register('email')}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...registerForm.register('password')}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...registerForm.register('confirmPassword')}
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>Rôle professionnel</Label>
                  <RadioGroup defaultValue="educateur" {...registerForm.register('role')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="educateur" id="educateur" />
                      <Label htmlFor="educateur">Éducateur</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="psychologue" id="psychologue" />
                      <Label htmlFor="psychologue">Psychologue</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="assistant_social" id="assistant_social" />
                      <Label htmlFor="assistant_social">Assistant social</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="administrateur" id="administrateur" />
                      <Label htmlFor="administrateur">Administrateur</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="direction" id="direction" />
                      <Label htmlFor="direction">Direction</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" disabled={isLoading} className="bg-socio-purple hover:bg-socio-purple/90">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    'S\'inscrire'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </TabsContent>
      </Tabs>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-gray-500">
          © 2025 SocioNexus. Tous droits réservés.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
