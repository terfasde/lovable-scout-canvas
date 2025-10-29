import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'

// Tipo para el perfil
type Profile = Database['public']['Tables']['profiles']['Row']

// Obtener un perfil
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data as Profile
}

// Actualizar un perfil
export async function updateProfile(profile: Partial<Profile> & { user_id: string }) {
  // Evitar duplicados por unique(user_id): usar update basado en filtro
  const { error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('user_id', profile.user_id)

  if (error) throw error
}

// Obtener eventos
export async function getEventos() {
  const { data, error } = await supabase
    .from('eventos')
    .select()
    .order('fecha_inicio', { ascending: true })

  if (error) throw error
  return data
}

// Crear un evento
export async function createEvento(evento: Record<string, any>) {
  const { error } = await supabase
    .from('eventos')
    .insert(evento)

  if (error) throw error
}

// Marcar perfil como público/privado (campo libre, casteado a any porque no está en los tipos generados)
export async function setProfilePublic(userId: string, isPublic: boolean) {
  // Primero intentamos actualizar; si no hay filas afectadas, insertamos esqueleto
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_public: isPublic } as any)
    .eq('user_id', userId)
    .select('user_id')

  if (error) throw error

  if (!data || data.length === 0) {
    // Crear registro mínimo si no existía
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ user_id: userId, nombre_completo: '', telefono: '', is_public: isPublic } as any)

    if (insertError) throw insertError
  }
}