
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import YouthProfiles from "./pages/YouthProfiles";
import Documents from "./pages/Documents";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Auth from "./pages/Auth";
import OrganizationSetup from "./pages/OrganizationSetup";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";

const queryClient = new QueryClient();

// Layout pour les pages d'application (avec Navbar et Sidebar)
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/organization-setup" element={
              <RequireAuth>
                <OrganizationSetup />
              </RequireAuth>
            } />
            <Route path="/dashboard" element={
              <RequireAuth>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </RequireAuth>
            } />
            <Route path="/youth-profiles" element={
              <RequireAuth>
                <AppLayout>
                  <YouthProfiles />
                </AppLayout>
              </RequireAuth>
            } />
            <Route path="/documents" element={
              <RequireAuth>
                <AppLayout>
                  <Documents />
                </AppLayout>
              </RequireAuth>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
