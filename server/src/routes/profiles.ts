import { Router } from 'express'
import { db } from '../db'
import { z } from 'zod'
import { authMiddleware } from '../auth'

export const profilesRouter = Router()

// Helper para calcular edad
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

profilesRouter.get('/me', authMiddleware, (req: any, res: any) => {
  const userId = (req as any).user.id as string
  const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId) as any
  const user = db.prepare('SELECT id, email, username, created_at FROM users WHERE id = ?').get(userId) as any
  const result = { ...profile, ...user }
  // Calcular edad si hay fecha de nacimiento
  if (result.fecha_nacimiento) {
    result.edad = calculateAge(result.fecha_nacimiento)
  }
  // No cachear
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  res.json(result)
})

const updateSchema = z.object({
  nombre_completo: z.string().optional(),
  telefono: z.string().optional(),
  is_public: z.boolean().optional(),
  avatar_url: z.string().url().optional(),
  fecha_nacimiento: z.string().optional(),
  rol_adulto: z.string().optional(),
  seisena: z.string().optional(),
  patrulla: z.string().optional(),
  equipo_pioneros: z.string().optional(),
  comunidad_rovers: z.string().optional()
})

profilesRouter.put('/me', authMiddleware, (req: any, res: any) => {
  const userId = (req as any).user.id as string
  const parse = updateSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() })
  const { nombre_completo, telefono, is_public, avatar_url, fecha_nacimiento, rol_adulto, seisena, patrulla, equipo_pioneros, comunidad_rovers } = parse.data
  const existing = db.prepare('SELECT user_id FROM profiles WHERE user_id = ?').get(userId)
  if (!existing) {
    db.prepare(`INSERT INTO profiles (user_id, nombre_completo, telefono, is_public, avatar_url, fecha_nacimiento, rol_adulto, seisena, patrulla, equipo_pioneros, comunidad_rovers) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(userId, nombre_completo ?? null, telefono ?? null, is_public ? 1 : 0, avatar_url ?? null, 
           fecha_nacimiento ?? null, rol_adulto ?? null, seisena ?? null, patrulla ?? null, 
           equipo_pioneros ?? null, comunidad_rovers ?? null)
  } else {
    db.prepare(`UPDATE profiles SET 
      nombre_completo = COALESCE(?, nombre_completo), 
      telefono = COALESCE(?, telefono), 
      is_public = COALESCE(?, is_public), 
      avatar_url = COALESCE(?, avatar_url),
      fecha_nacimiento = COALESCE(?, fecha_nacimiento),
      rol_adulto = COALESCE(?, rol_adulto),
      seisena = COALESCE(?, seisena),
      patrulla = COALESCE(?, patrulla),
      equipo_pioneros = COALESCE(?, equipo_pioneros),
      comunidad_rovers = COALESCE(?, comunidad_rovers)
      WHERE user_id = ?`)
      .run(nombre_completo ?? null, telefono ?? null, typeof is_public === 'boolean' ? (is_public ? 1 : 0) : null, 
           avatar_url ?? null, fecha_nacimiento ?? null, rol_adulto ?? null, 
           seisena ?? null, patrulla ?? null, equipo_pioneros ?? null, comunidad_rovers ?? null, userId)
  }
  const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId) as any
  const user = db.prepare('SELECT id, email, username, created_at FROM users WHERE id = ?').get(userId) as any
  const result = { ...profile, ...user }
  // Calcular edad si hay fecha de nacimiento
  if (result.fecha_nacimiento) {
    result.edad = calculateAge(result.fecha_nacimiento)
  }
  res.json(result)
})

// Obtener un perfil por ID (si es público o es el propio)
profilesRouter.get('/:id', authMiddleware, (req: any, res: any) => {
  const me = (req as any).user.id as string
  const id = req.params.id as string
  const profile = db.prepare('SELECT p.*, u.username FROM profiles p JOIN users u ON u.id = p.user_id WHERE p.user_id = ?').get(id) as any
  if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' })
  if (id !== me && !profile.is_public) return res.status(403).json({ error: 'Perfil privado' })
  res.json({ user_id: profile.user_id, nombre_completo: profile.nombre_completo, avatar_url: profile.avatar_url, username: profile.username })
})

// Obtener múltiples perfiles por IDs (batch)
profilesRouter.post('/batch', authMiddleware, (req: any, res: any) => {
  const me = (req as any).user.id as string
  const ids = (Array.isArray(req.body?.ids) ? req.body.ids : []) as string[]
  if (!Array.isArray(ids) || ids.length === 0) return res.json([])
  // Usamos un IN dinámico
  const placeholders = ids.map(() => '?').join(',')
  const rows = db.prepare(`
    SELECT p.user_id, p.nombre_completo, p.avatar_url, p.is_public, u.username
    FROM profiles p JOIN users u ON u.id = p.user_id
    WHERE p.user_id IN (${placeholders})
  `).all(...ids) as any[]
  // Filtramos los privados salvo que sea yo
  const out = rows
    .filter(r => r.is_public || r.user_id === me)
    .map(r => ({ user_id: r.user_id, nombre_completo: r.nombre_completo, avatar_url: r.avatar_url, username: r.username }))
  res.json(out)
})

// Directorio de perfiles (con búsqueda/paginación simples)
profilesRouter.get('/directory', authMiddleware, (req: any, res: any) => {
  const me = (req as any).user.id as string
  const q = String(req.query.q || '').trim().toLowerCase()
  const limit = Math.min(parseInt(String(req.query.limit || '100')) || 100, 200)
  const offset = parseInt(String(req.query.offset || '0')) || 0

  // Traer perfiles + username y calcular edad si hay fecha_nacimiento
  let rows = db.prepare(`
    SELECT p.user_id, p.nombre_completo, p.avatar_url, p.fecha_nacimiento, p.is_public, u.username
    FROM profiles p JOIN users u ON u.id = p.user_id
    ORDER BY p.nombre_completo COLLATE NOCASE ASC
  `).all() as any[]

  if (q) {
    rows = rows.filter(r => String(r.nombre_completo || '').toLowerCase().includes(q) || String(r.username || '').toLowerCase().includes(q))
  }

  // paginado
  rows = rows.slice(offset, offset + limit)

  const out = rows.map(r => {
    let edad: number | null = null
    if (r.fecha_nacimiento) {
      try {
        const birth = new Date(r.fecha_nacimiento)
        if (!isNaN(birth.getTime())) {
          const now = new Date()
          let years = now.getFullYear() - birth.getFullYear()
          const m = now.getMonth() - birth.getMonth()
          if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--
          edad = years
        }
      } catch (e) {
        // ignore invalid date
      }
    }
    return { user_id: r.user_id, nombre_completo: r.nombre_completo, avatar_url: r.avatar_url, edad, is_public: !!r.is_public, username: r.username }
  })

  res.json(out)
})
