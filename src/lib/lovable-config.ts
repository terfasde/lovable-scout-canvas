/**
 * Configuración de Supabase para Lovable
 * Este archivo tiene las credenciales hardcodeadas como fallback
 * si las variables de entorno no están disponibles
 */



// Función helper para obtener configuración con fallback
export function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (import.meta.env.DEV) {
    console.log("📦 Configuración de Supabase:");
    console.log("  URL:", url ? "✓" : "✗");
    console.log("  Key:", key ? "✓" : "✗");
  }
  return { url, key };
}

export function getGoogleMapsKey() {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
}

export function getGalleryAdminEmails() {
  return import.meta.env.VITE_GALLERY_ADMIN_EMAILS;
}
