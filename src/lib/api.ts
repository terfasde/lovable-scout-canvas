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
  const { error } = await supabase
    .from('profiles')
    .upsert(profile)

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
export async function createEvento(evento: Omit<Database['public']['Tables']['eventos']['Row'], 'id' | 'created_at'>) {
  const { error } = await supabase
    .from('eventos')
    .insert(evento)

  if (error) throw error
}