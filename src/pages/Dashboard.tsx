
import React from 'react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import AIAssistant from '@/components/ai/AIAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="overview" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="activities">Activités</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>Mai 2025</span>
              </div>
            </div>
            
            <TabsContent value="overview" className="space-y-4">
              <DashboardOverview />
            </TabsContent>
            
            <TabsContent value="activities">
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border">
                <p className="text-gray-400">Les activités seront disponibles prochainement</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/3">
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
