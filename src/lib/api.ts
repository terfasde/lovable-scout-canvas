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

// Marcar perfil como público/privado
export async function setProfilePublic(userId: string, isPublic: boolean) {
  // Primero intentamos actualizar; si no hay filas afectadas, insertamos esqueleto
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_public: isPublic })
    .eq('user_id', userId)
    .select('user_id')

  if (error) throw error

  if (!data || data.length === 0) {
    let existingProfile: Profile | null = null
    try {
      existingProfile = await getProfile(userId)
    } catch {
      existingProfile = null
    }

    const { data: authData } = await supabase.auth.getUser()
    const authUser = authData.user

    const nombreFallback = existingProfile?.nombre_completo || authUser?.user_metadata?.nombre || authUser?.email || 'Perfil sin nombre'
    const telefonoFallback = existingProfile?.telefono || authUser?.user_metadata?.telefono || ''

    const insertPayload: Database['public']['Tables']['profiles']['Insert'] = {
      user_id: userId,
      nombre_completo: nombreFallback,
      telefono: telefonoFallback,
      edad: existingProfile?.edad ?? null,
      seisena: existingProfile?.seisena ?? null,
      patrulla: existingProfile?.patrulla ?? null,
      equipo_pioneros: existingProfile?.equipo_pioneros ?? null,
      comunidad_rovers: existingProfile?.comunidad_rovers ?? null,
      fecha_nacimiento: existingProfile?.fecha_nacimiento ?? null,
      rol_adulto: existingProfile?.rol_adulto ?? null,
      is_public: isPublic,
      username: existingProfile?.username ?? null,
      username_updated_at: existingProfile?.username_updated_at ?? null,
    }

    const { error: insertError } = await supabase
      .from('profiles')
      .insert(insertPayload)

    if (insertError) throw insertError
  }
}