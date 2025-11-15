/**
 * Validación de configuración de variables de entorno
 * Se ejecuta al iniciar la aplicación para detectar configuraciones faltantes
 */

interface EnvValidation {
  key: string;
  required: boolean;
  description: string;
  validator?: (value: string) => boolean;
}

const ENV_VALIDATIONS: EnvValidation[] = [
  {
    key: "VITE_BACKEND",
    required: true,
    description: "Modo de backend (local | supabase)",
    validator: (value) => ["local", "supabase"].includes(value),
  },
  {
    key: "VITE_SUPABASE_URL",
    required: false, // Solo si VITE_BACKEND=supabase
    description: "URL de Supabase",
    validator: (value) => value.startsWith("https://") && value.includes(".supabase.co"),
  },
  {
    key: "VITE_SUPABASE_ANON_KEY",
    required: false, // Solo si VITE_BACKEND=supabase
    description: "Clave anónima de Supabase",
    validator: (value) => value.length > 100, // JWT típicamente > 100 chars
  },
  {
    key: "VITE_GOOGLE_MAPS_API_KEY",
    required: false,
    description: "API Key de Google Maps (para mapa de contacto)",
  },
  {
    key: "VITE_GALLERY_ADMIN_EMAILS",
    required: false,
    description: "Emails de administradores (separados por comas)",
  },
];

export function validateEnvironment(): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const isSupabase = import.meta.env.VITE_BACKEND === "supabase";
  
  ENV_VALIDATIONS.forEach(({ key, required, description, validator }) => {
    const value = import.meta.env[key];
    
    // Validación de Supabase solo si está en modo supabase
    const isSupabaseKey = key.includes("SUPABASE");
    const isRequiredNow = required || (isSupabaseKey && isSupabase);
    
    if (isRequiredNow && !value) {
      errors.push(`❌ ${key}: ${description} (REQUERIDA)`);
    } else if (!isRequiredNow && !value) {
      warnings.push(`⚠️ ${key}: ${description} (opcional)`);
    } else if (value && validator && !validator(value)) {
      errors.push(`❌ ${key}: Formato inválido - ${description}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function logEnvironmentStatus() {
  if (!import.meta.env.DEV) return; // Solo en desarrollo
  
  const { valid, errors, warnings } = validateEnvironment();
  
  console.log("🔧 Validación de Variables de Entorno:");
  console.log("━".repeat(50));
  
  if (valid) {
    console.log("✅ Configuración válida");
  } else {
    console.error("🚫 Configuración incompleta o inválida:");
    errors.forEach(error => console.error(error));
  }
  
  if (warnings.length > 0) {
    console.warn("\n⚠️ Configuraciones opcionales faltantes:");
    warnings.forEach(warning => console.warn(warning));
  }
  
  console.log("━".repeat(50));
  
  return valid;
}

/**
 * Valida que las variables críticas estén configuradas
 * Lanza error si falta configuración requerida en producción
 */
export function ensureRequiredEnv() {
  const { valid, errors } = validateEnvironment();
  
  if (!valid && import.meta.env.PROD) {
    const errorMessage = `
⚠️ CONFIGURACIÓN INCOMPLETA

Las siguientes variables de entorno son requeridas:
${errors.join('\n')}

Configúralas en:
- Netlify: Settings → Environment variables
- Vercel: Settings → Environment Variables
- Local: Crea .env.local con los valores necesarios

Consulta .env.example para más detalles.
    `.trim();
    
    throw new Error(errorMessage);
  }
  
  return valid;
}
