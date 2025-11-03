import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'
import { isLocalBackend, apiFetch } from '@/lib/backend'

// Tipo para el perfil
type Profile = Database['public']['Tables']['profiles']['Row']

// Calcular edad desde fecha de nacimiento
function calculateAge(fechaNacimiento: string | null): number | null {
  if (!fechaNacimiento) return null
  try {
    const birth = new Date(fechaNacimiento)
    if (isNaN(birth.getTime())) return null
    const now = new Date()
    let years = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--
    return years
  } catch {
    return null
  }
}

// Obtener un perfil
export async function getProfile(userId: string) {
  if (isLocalBackend()) {
    // En backend local, el endpoint devuelve el perfil del usuario autenticado (me)
    const me = await apiFetch('/profiles/me') as any
    // Calcular edad desde fecha_nacimiento
    if (me && me.fecha_nacimiento) {
      me.edad = calculateAge(me.fecha_nacimiento)
    }
    return me as Profile
  }
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
  if (isLocalBackend()) {
    // Mapea campos relevantes al backend local
    const body: any = {}
    if (profile.nombre_completo !== undefined) body.nombre_completo = profile.nombre_completo
    if (profile.telefono !== undefined) body.telefono = profile.telefono
    if ((profile as any).is_public !== undefined) body.is_public = (profile as any).is_public
    if ((profile as any).avatar_url !== undefined) body.avatar_url = (profile as any).avatar_url
    if ((profile as any).fecha_nacimiento !== undefined) body.fecha_nacimiento = (profile as any).fecha_nacimiento
    if ((profile as any).rol_adulto !== undefined) body.rol_adulto = (profile as any).rol_adulto
    if ((profile as any).seisena !== undefined) body.seisena = (profile as any).seisena
    if ((profile as any).patrulla !== undefined) body.patrulla = (profile as any).patrulla
    if ((profile as any).equipo_pioneros !== undefined) body.equipo_pioneros = (profile as any).equipo_pioneros
    if ((profile as any).comunidad_rovers !== undefined) body.comunidad_rovers = (profile as any).comunidad_rovers
    await apiFetch('/profiles/me', { method: 'PUT', body: JSON.stringify(body) })
    return
  }
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
  if (isLocalBackend()) {
    await apiFetch('/profiles/me', { method: 'PUT', body: JSON.stringify({ is_public: isPublic }) })
    return
  }
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