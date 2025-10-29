import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LineaTemporal from "./pages/LineaTemporal";
import Historia from "./pages/Historia";
import Bauen from "./pages/Bauen";
import Galeria from "./pages/Galeria";
import Contacto from "./pages/Contacto";
import Eventos from "./pages/Eventos";
import Auth from "./pages/Auth";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import Manada from "./pages/ramas/manada";
import Tropa from "./pages/ramas/tropa";
import Pioneros from "./pages/ramas/pioneros";
import Rovers from "./pages/ramas/rovers";
import Staff from "./pages/ramas/staff";
import Comite from "./pages/ramas/comite";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/linea-temporal" element={<LineaTemporal />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/bauen" element={<Bauen />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/perfil" element={<Perfil />} />
          {/* Ramas pages */}
          <Route path="/ramas/manada" element={<Manada />} />
          <Route path="/ramas/tropa" element={<Tropa />} />
          <Route path="/ramas/pioneros" element={<Pioneros />} />
          <Route path="/ramas/rovers" element={<Rovers />} />
          <Route path="/ramas/staff" element={<Staff />} />
          <Route path="/ramas/comite" element={<Comite />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
