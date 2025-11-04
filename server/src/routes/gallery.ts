import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import { authMiddleware } from '../auth'

const baseDir = path.join(process.cwd(), 'server', 'uploads', 'gallery')
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true })

// Multer para uploads por álbum
const storage = multer.diskStorage({
  destination: (req: any, _file: any, cb: any) => {
    const album = String(req.params.album || '').trim()
    if (!album) return cb(new Error('Álbum requerido'))
    const dir = path.join(baseDir, album)
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (_req: any, file: any, cb: any) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname) || '.jpg'
    cb(null, `${unique}${ext}`)
  }
})
const upload = multer({ storage })

export const galleryRouter = Router()

// Listar álbumes (carpetas dentro de gallery)
galleryRouter.get('/albums', authMiddleware, (_req: any, res: any) => {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true })
  const folders = entries.filter(e => e.isDirectory()).map(e => ({ name: e.name }))
  res.json(folders)
})

// Crear álbum
galleryRouter.post('/albums', authMiddleware, (req: any, res: any) => {
  const name = String(req.body?.name || '').trim()
  if (!name) return res.status(400).json({ error: 'Nombre requerido' })
  const dir = path.join(baseDir, name)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  res.status(201).json({ name })
})

// Listar imágenes de un álbum
galleryRouter.get('/albums/:album/images', authMiddleware, (req: any, res: any) => {
  const album = String(req.params.album || '').trim()
  const dir = path.join(baseDir, album)
  if (!fs.existsSync(dir)) return res.json([])
  const files = fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile())
    .map(e => ({
      url: `/uploads/gallery/${album}/${e.name}`,
      path: `${album}/${e.name}`
    }))
  res.json(files)
})

// Subir imágenes a un álbum
galleryRouter.post('/albums/:album/images', authMiddleware, upload.array('files', 20), (req: any, res: any) => {
  const album = String(req.params.album || '').trim()
  const files = (req.files as any[] | undefined) || []
  const out = files.map((f: any) => ({ url: `/uploads/gallery/${album}/${f.filename}`, path: `${album}/${f.filename}` }))
  res.status(201).json(out)
})

// Eliminar imagen
galleryRouter.delete('/images', authMiddleware, (req: any, res: any) => {
  const pathParam = String(req.query.path || '').trim() // formato: album/filename
  if (!pathParam || pathParam.includes('..')) return res.status(400).json({ error: 'Ruta inválida' })
  const filePath = path.join(baseDir, pathParam)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  res.json({ ok: true })
})

// Eliminar álbum entero
galleryRouter.delete('/albums/:album', authMiddleware, (req: any, res: any) => {
  const album = String(req.params.album || '').trim()
  const dir = path.join(baseDir, album)
  if (fs.existsSync(dir)) {
    // borrar recursivo
    fs.rmSync(dir, { recursive: true, force: true })
  }
  res.json({ ok: true })
})
