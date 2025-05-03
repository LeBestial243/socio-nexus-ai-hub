
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ChartBar, User, FileText, MessageSquare, Calendar, Lock, DollarSign } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-50">
      {/* Navigation */}
      <header className="w-full py-4 px-4 md:px-8 border-b bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md gradient-blue-purple flex items-center justify-center">
              <span className="text-white font-bold text-xl">SN</span>
            </div>
            <span className="ml-2 font-poppins font-medium text-xl hidden md:block">
              SocioNexus
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-gray-600">
            <Link to="/dashboard" className="hover:text-socio-blue">Tableau de bord</Link>
            <Link to="/youth-profiles" className="hover:text-socio-blue">Profils jeunes</Link>
            <Link to="/documents" className="hover:text-socio-blue">Documents</Link>
          </div>
          
          <div>
            <Link to="/dashboard">
              <Button className="gradient-blue-purple hover:opacity-90 transition-opacity">
                Accéder à l'application
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-socio-blue to-socio-purple-dark">
          SocioNexus AI Hub
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          L'intelligence artificielle au service des travailleurs sociaux pour un accompagnement plus efficace et personnalisé
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/dashboard">
            <Button className="gradient-blue-purple hover:opacity-90 transition-opacity h-12 px-6 text-lg">
              Démarrer maintenant
            </Button>
          </Link>
          <Button variant="outline" className="h-12 px-6 text-lg border-socio-blue text-socio-blue hover:bg-socio-blue/5">
            Découvrir les fonctionnalités
          </Button>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Fonctionnalités principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <User size={24} className="text-socio-blue" />,
                title: "Gestion des profils jeunes",
                description: "Organisez et suivez les informations essentielles sur les jeunes que vous accompagnez."
              },
              {
                icon: <FileText size={24} className="text-socio-blue" />,
                title: "Organisation documentaire",
                description: "Créez des classeurs numériques pour stocker et organiser vos documents importants."
              },
              {
                icon: <MessageSquare size={24} className="text-socio-purple" />,
                title: "Transcription et analyse",
                description: "Convertissez automatiquement vos conversations en texte et obtenez des analyses pertinentes."
              },
              {
                icon: <ChartBar size={24} className="text-socio-purple" />,
                title: "Tableaux de bord",
                description: "Visualisez vos priorités et suivez l'évolution de vos projets en un coup d'œil."
              },
              {
                icon: <Calendar size={24} className="text-socio-purple-dark" />,
                title: "Suivi des projets",
                description: "Planifiez et suivez les projets éducatifs individuels des jeunes que vous accompagnez."
              },
              {
                icon: <Lock size={24} className="text-socio-purple-dark" />,
                title: "Confidentialité",
                description: "Protégez les données sensibles avec des contrôles d'accès précis et sécurisés."
              }
            ].map((feature, index) => (
              <Card key={index} className="border hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-16 gradient-blue-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Prêt à révolutionner votre pratique professionnelle ?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez SocioNexus et découvrez comment l'intelligence artificielle peut vous aider à vous concentrer sur l'essentiel : l'accompagnement humain.
          </p>
          <div className="flex justify-center">
            <Link to="/dashboard">
              <Button className="bg-white text-socio-blue hover:bg-white/90 h-12 px-6 text-lg">
                Commencer gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Plans tarifaires
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Des formules adaptées à tous les besoins, de l'éducateur indépendant à l'institution
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Solo",
                price: "19€",
                description: "Pour les professionnels indépendants",
                features: ["1 utilisateur", "20 profils jeunes", "5 GB de stockage", "Support par email"]
              },
              {
                name: "Équipe",
                price: "49€",
                description: "Pour les petites équipes",
                features: ["5 utilisateurs", "100 profils jeunes", "20 GB de stockage", "Support prioritaire"]
              },
              {
                name: "Établissement",
                price: "129€",
                description: "Pour les établissements",
                features: ["20 utilisateurs", "500 profils jeunes", "100 GB de stockage", "Support dédié"]
              },
              {
                name: "Institution",
                price: "Sur devis",
                description: "Pour les grandes institutions",
                features: ["Utilisateurs illimités", "Profils illimités", "Stockage illimité", "Support VIP"]
              }
            ].map((plan, index) => (
              <Card key={index} className={`border hover:shadow-md transition-all ${index === 2 ? "border-socio-purple" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-medium">{plan.name}</h3>
                      <p className="text-gray-500 text-sm">{plan.description}</p>
                    </div>
                    <DollarSign size={20} className="text-socio-blue" />
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-semibold">{plan.price}</span>
                    {plan.price !== "Sur devis" && <span className="text-gray-500"> / mois</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={index === 2 
                      ? "w-full gradient-blue-purple hover:opacity-90" 
                      : "w-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }
                  >
                    Choisir ce plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-md gradient-blue-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">SN</span>
              </div>
              <span className="ml-2 font-poppins font-medium">
                SocioNexus
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
              <Link to="/dashboard" className="text-gray-600 hover:text-socio-blue">Tableau de bord</Link>
              <Link to="/youth-profiles" className="text-gray-600 hover:text-socio-blue">Profils jeunes</Link>
              <Link to="/documents" className="text-gray-600 hover:text-socio-blue">Documents</Link>
              <a href="#" className="text-gray-600 hover:text-socio-blue">Contact</a>
              <a href="#" className="text-gray-600 hover:text-socio-blue">Mentions légales</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-gray-500 text-sm">
            <p>© 2025 SocioNexus AI Hub. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
