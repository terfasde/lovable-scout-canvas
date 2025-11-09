/**
 * Supabase Client - Solo Cliente Real (Sin Mock)
 * Este archivo reemplaza completamente el anterior para evitar problemas
 * de compilación en Lovable. Solo usa el cliente real de Supabase.
 */

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/lovable-config";
import type { Database } from "./types";

// Obtener configuración con fallback
const { url, key } = getSupabaseConfig();

// Validar que tenemos las credenciales
if (!url || !key) {
  console.error("❌ ERROR: Variables de Supabase no configuradas");
  throw new Error("Supabase credentials missing");
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient<Database>(url, key);

// Solo log en desarrollo
if (import.meta.env.DEV) {
  console.log("✅ Cliente de Supabase inicializado correctamente");
}

export type { Database };
