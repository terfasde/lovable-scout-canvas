# Desarrollo con Docker (hot reload)

Este archivo describe cómo levantar frontend (Vite) y backend (Node/Express + SQLite) con recarga en vivo usando Docker.

## Servicios y puertos
- web (Vite): http://localhost:5173
- server (API local): http://localhost:8080

## Requisitos
- Docker Desktop instalado y en ejecución
- En Windows, si trabajas en OneDrive, añade tu ruta a File sharing en Docker Desktop o mueve el repo a C:\dev\...

## Arranque en modo desarrollo

Desde la raíz del repo:

```powershell
# Levantar ambos con bind mounts y hot reload
npm run dev:docker
```

- Al editar archivos en `src/` el frontend se recarga (HMR)
- Al editar archivos en `server/src/` el backend se reinicia (ts-node-dev)
- La base de datos y uploads persisten en tus carpetas locales `server/data` y `server/uploads`

## Variables de entorno
- El frontend, por defecto en este entorno, asume `VITE_BACKEND=local` y `VITE_API_BASE=http://localhost:8080`
- Si todavía usas Supabase para partes no migradas, define `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en tu entorno o añade líneas correspondientes en el compose.

## Notas
- Vite está configurado con `host: 0.0.0.0`, `strictPort: true` y `usePolling` para mejor compatibilidad con Docker en Windows.
- CORS del backend permite `ORIGIN=http://localhost:5173`.
- Si algún puerto está ocupado, cambia los mapeos en `docker-compose.dev.yml` y en `vite.config.ts` o `.env` del server.
