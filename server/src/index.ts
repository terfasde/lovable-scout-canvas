import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import http from 'node:http'
import path from 'node:path'

import { authRouter } from './routes/auth'
import { profilesRouter } from './routes/profiles'
import { groupsRouter } from './routes/groups'
import { uploadsRouter } from './routes/uploads'
import { followsRouter } from './routes/follows'
import { dmsRouter } from './routes/dms'
import './db' // ensure DB initialized
import { createSocket } from './socket'

const app = express()
app.use(cors({ origin: process.env.ORIGIN || true }))
app.use(express.json({ limit: '5mb' }))
app.use(morgan('dev'))

// Static uploads
const uploadsPath = path.join(process.cwd(), 'server', 'uploads')
app.use('/uploads', express.static(uploadsPath))

// API routes
app.use('/auth', authRouter)
app.use('/profiles', profilesRouter)
app.use('/groups', groupsRouter)
app.use('/upload', uploadsRouter)
app.use('/follows', followsRouter)
app.use('/dms', dmsRouter)

// Health
app.get('/health', (_req: any, res: any) => res.json({ ok: true }))

const port = Number(process.env.PORT || 4000)
const server = http.createServer(app)
const io = createSocket(server)
app.set('io', io)

server.listen(port, () => {
  console.log(`API local sin Supabase escuchando en http://localhost:${port}`)
})
