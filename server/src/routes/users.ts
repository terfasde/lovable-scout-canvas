import { Router } from 'express'
import { db } from '../db'
import { authMiddleware } from '../auth'

export const usersRouter = Router()

// Permite al propio usuario borrar su cuenta (cascade en todas las tablas)
usersRouter.delete('/me', authMiddleware, (req: any, res: any) => {
  const userId = (req as any).user?.id as string | undefined
  if (!userId) return res.status(401).json({ error: 'No autorizado' })
  const exists = db.prepare('SELECT id FROM users WHERE id = ?').get(userId)
  if (!exists) return res.status(404).json({ error: 'Usuario no encontrado' })
  const tx = db.transaction((id: string) => {
    db.prepare('DELETE FROM users WHERE id = ?').run(id)
  })
  tx(userId)
  return res.json({ ok: true })
})

export default usersRouter
