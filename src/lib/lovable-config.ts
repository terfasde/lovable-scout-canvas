/**
 * Configuración de Supabase para Lovable
 * Este archivo tiene las credenciales hardcodeadas como fallback
 * si las variables de entorno no están disponibles
 */

const LOVABLE_CONFIG = {
  supabaseUrl: "https://lndqeaspuwwgdwbggayd.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZHFlYXNwdXd3Z2R3YmdnYXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NDI3NTcsImV4cCI6MjA3NzMxODc1N30.FLkW5mgkgcZCiUglXCFvXu4ZhHDgtKsbZxt6vxadrHM",
  googleMapsApiKey: "AIzaSyCdG8MYDQuZmbEDypnEMlokDCY2t9B8560",
  galleryAdminEmails: "franciscolorenzo2406@gmail.com",
};

// Función helper para obtener configuración con fallback
export function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL || LOVABLE_CONFIG.supabaseUrl;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || LOVABLE_CONFIG.supabaseAnonKey;
  
  // Solo log en desarrollo
  if (import.meta.env.DEV) {
    console.log("📦 Configuración de Supabase:");
    console.log("  URL:", url ? "✓" : "✗");
    console.log("  Key:", key ? "✓" : "✗");
    console.log("  Source:", import.meta.env.VITE_SUPABASE_URL ? "env vars" : "fallback hardcoded");
  }
  
  return { url, key };
}

export function getGoogleMapsKey() {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || LOVABLE_CONFIG.googleMapsApiKey;
}

export function getGalleryAdminEmails() {
  return import.meta.env.VITE_GALLERY_ADMIN_EMAILS || LOVABLE_CONFIG.galleryAdminEmails;
}
