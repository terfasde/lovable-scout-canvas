import { useEffect, useState, createContext, useContext, Suspense, lazy } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import ScrollToTop from "@/components/ScrollToTop"
import Index from "./pages/Index"
const LineaTemporal = lazy(() => import("./pages/LineaTemporal"))
const Historia = lazy(() => import("./pages/Historia"))
const Bauen = lazy(() => import("./pages/Bauen"))
const Galeria = lazy(() => import("./pages/Galeria"))
const Contacto = lazy(() => import("./pages/Contacto"))
const Eventos = lazy(() => import("./pages/Eventos"))
const Auth = lazy(() => import("./pages/Auth"))
const Perfil = lazy(() => import("./pages/Perfil"))
const PerfilView = lazy(() => import("./pages/PerfilView"))
const PerfilCompartir = lazy(() => import("./pages/PerfilCompartir"))
const PerfilPublic = lazy(() => import("./pages/PerfilPublic"))
const Usuarios = lazy(() => import("./pages/Usuarios"))
const Mensajes = lazy(() => import("./pages/Mensajes"))
const GrupoDetail = lazy(() => import("@/pages/GrupoDetail"))
const NotFound = lazy(() => import("./pages/NotFound"))
const Manada = lazy(() => import("./pages/ramas/manada"))
const Tropa = lazy(() => import("./pages/ramas/tropa"))
const Pioneros = lazy(() => import("./pages/ramas/pioneros"))
const Rovers = lazy(() => import("./pages/ramas/rovers"))
const Staff = lazy(() => import("./pages/ramas/staff"))
const Comite = lazy(() => import("./pages/ramas/comite"))
import { supabase } from "../supabase/client"
import BackgroundFX from "@/components/BackgroundFX"
import ErrorBoundary from "@/components/ErrorBoundary"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos (antes cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

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
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SupabaseUserProvider>
            <BackgroundFX />
            <ScrollToTop />
            <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Cargando…</div>}>
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
            <Route path="/perfil-public/:id" element={<PerfilPublic />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/mensajes" element={<Mensajes />} />
            <Route path="/grupos/:id" element={<GrupoDetail />} />

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
            </Suspense>
          </SupabaseUserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </ErrorBoundary>
)

export default App
