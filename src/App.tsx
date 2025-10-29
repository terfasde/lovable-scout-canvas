import { useEffect, useState, createContext, useContext } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import LineaTemporal from "./pages/LineaTemporal"
import Historia from "./pages/Historia"
import Bauen from "./pages/Bauen"
import Galeria from "./pages/Galeria"
import Contacto from "./pages/Contacto"
import Eventos from "./pages/Eventos"
import Auth from "./pages/Auth"
import Perfil from "./pages/Perfil"
import PerfilView from "./pages/PerfilView"
import PerfilCompartir from "./pages/PerfilCompartir"
import PerfilPublic from "./pages/PerfilPublic"
import NotFound from "./pages/NotFound"
import Manada from "./pages/ramas/manada"
import Tropa from "./pages/ramas/tropa"
import Pioneros from "./pages/ramas/pioneros"
import Rovers from "./pages/ramas/rovers"
import Staff from "./pages/ramas/staff"
import Comite from "./pages/ramas/comite"
import { supabase } from "../supabase/client"

const queryClient = new QueryClient()

// 🧠 Contexto global de usuario Supabase
interface SupabaseUserContextType {
  user: any | null
}

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
})

export const useSupabaseUser = () => useContext(SupabaseUserContext)

// 🌐 Proveedor de usuario Supabase
const SupabaseUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Escuchar cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <SupabaseUserContext.Provider value={{ user }}>
      {children}
    </SupabaseUserContext.Provider>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SupabaseUserProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/linea-temporal" element={<LineaTemporal />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/bauen" element={<Bauen />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/perfil" element={<PerfilView />} />
            <Route path="/perfil/editar" element={<Perfil />} />
            <Route path="/perfil/compartir" element={<PerfilCompartir />} />
            <Route path="/perfil/public/:id" element={<PerfilPublic />} />

            {/* Ramas */}
            <Route path="/ramas/manada" element={<Manada />} />
            <Route path="/ramas/tropa" element={<Tropa />} />
            <Route path="/ramas/pioneros" element={<Pioneros />} />
            <Route path="/ramas/rovers" element={<Rovers />} />
            <Route path="/ramas/staff" element={<Staff />} />
            <Route path="/ramas/comite" element={<Comite />} />

            {/* Ruta por defecto */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SupabaseUserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
