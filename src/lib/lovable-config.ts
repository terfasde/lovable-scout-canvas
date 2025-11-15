/**
 * Configuración de Supabase para Lovable
 * ⚠️ SEGURIDAD: Las credenciales DEBEN venir de variables de entorno
 * NO hardcodear secrets en el código fuente
 */

// Función helper para obtener configuración de Supabase
export function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.error("❌ ERROR: Variables de entorno de Supabase no configuradas");
    console.error("   Asegúrate de configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY");
    throw new Error("Configuración de Supabase incompleta");
  }
  
  // Solo log en desarrollo
  if (import.meta.env.DEV) {
    console.log("📦 Configuración de Supabase:");
    console.log("  URL:", url ? "✓" : "✗");
    console.log("  Key:", key ? "✓" : "✗");
  }
  
  return { url, key };
}

export function getGoogleMapsKey() {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!key) {
    console.warn("⚠️ Google Maps API Key no configurada");
  }
  return key || "";
}

export function getGalleryAdminEmails() {
  return import.meta.env.VITE_GALLERY_ADMIN_EMAILS || "";
}
