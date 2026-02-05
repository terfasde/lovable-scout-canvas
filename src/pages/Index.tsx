
import Hero from "@/components/Hero";
import About from "@/components/About";
import { lazy, Suspense, useEffect, useState } from "react";

const AdminDashboard = lazy(() => import("./admin/Dashboard"));

// Componente para mostrar el panel admin de forma segura
function AdminSection() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>("");
  
  useEffect(() => {
    console.log("📍 AdminSection useEffect iniciado");
    
    try {
      const userStr = localStorage.getItem("adminUser");
      console.log("📍 adminUser en localStorage:", userStr ? "SÍ" : "NO");
      
      if (userStr) {
        const userData = JSON.parse(userStr);
        console.log("📍 Usuario parseado:", userData?.email, "Rol:", userData?.role);
        setUser(userData);
        setDebugInfo(`✅ Usuario: ${userData?.email}, Rol: ${userData?.role}`);
      } else {
        console.log("⚠️  No hay usuario en localStorage");
        setDebugInfo("❌ No hay usuario en localStorage");
      }
    } catch (err) {
      console.error("❌ Error al leer usuario:", err);
      setDebugInfo(`❌ Error: ${err}`);
    }
    setLoading(false);
  }, []);
  
  const isAdmin = user?.role === "admin";
  
  if (loading) return <div className="p-4">Cargando...</div>;
  
  return (
    <div className="p-4 border rounded bg-yellow-50 dark:bg-yellow-900/20 mb-8">
      <div className="text-sm font-mono mb-4">
        <div>DEBUG INFO:</div>
        <div>{debugInfo}</div>
        <div>isAdmin: {String(isAdmin)}</div>
        <div>user: {user ? JSON.stringify({email: user.email, role: user.role}) : "null"}</div>
      </div>
      
      {isAdmin && (
        <div className="my-8 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-600">⚙️ Panel de Administración</h2>
          <Suspense fallback={<div className="text-center p-8">Cargando panel admin...</div>}>
            <AdminDashboard />
          </Suspense>
        </div>
      )}
    </div>
  );
}

const Index = () => {
  return (
    <div id="main-content" className="min-h-screen">
      <Hero />
      <About />
      <AdminSection />
    </div>
  );
};

export default Index;
