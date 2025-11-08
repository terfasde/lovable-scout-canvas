/**
 * Componente de Debug para verificar configuración de Supabase
 * 
 * USO:
 * 1. Importa este componente en src/pages/Auth.tsx
 * 2. Agrégalo al inicio del componente: <SupabaseDebug />
 * 3. Verifica en la consola y en pantalla qué está pasando
 * 4. Una vez identificado el problema, ELIMINA este componente
 */

import { useEffect, useState } from "react";

export const SupabaseDebug = () => {
  const [config, setConfig] = useState({
    backend: "",
    supabaseUrl: "",
    supabaseKey: "",
    isLocal: false,
  });

  useEffect(() => {
    const backend = import.meta.env.VITE_BACKEND || "(vacío)";
    const url = import.meta.env.VITE_SUPABASE_URL || "(FALTA)";
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY || "(FALTA)";
    const isLocal = (backend || "supabase").toLowerCase() === "local";

    setConfig({
      backend,
      supabaseUrl: url,
      supabaseKey: key.substring(0, 50) + "..." + (key ? " ✓" : " ✗"),
      isLocal,
    });

    console.log("=== SUPABASE DEBUG ===");
    console.log("VITE_BACKEND:", backend);
    console.log("VITE_SUPABASE_URL:", url);
    console.log("VITE_SUPABASE_ANON_KEY:", key ? "✓ Configurado" : "✗ FALTA");
    console.log("Modo Local:", isLocal);
    console.log("=====================");
  }, []);

  // Solo mostrar en desarrollo
  if (import.meta.env.PROD) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        background: "#1a1a1a",
        color: "#fff",
        padding: "10px",
        fontSize: "11px",
        fontFamily: "monospace",
        zIndex: 9999,
        borderRadius: "5px",
        maxWidth: "300px",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
        🔍 Supabase Config
      </div>
      <div>Backend: {config.backend}</div>
      <div>Modo: {config.isLocal ? "🔧 LOCAL" : "☁️ PRODUCCIÓN"}</div>
      <div>URL: {config.supabaseUrl}</div>
      <div>Key: {config.supabaseKey}</div>
    </div>
  );
};
