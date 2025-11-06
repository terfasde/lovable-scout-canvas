Guía rápida: ejecutar sin Supabase (backend local)

1. Backend local

- Entra a la carpeta server
- Copia .env.example a .env y revisa PORT/JWT_SECRET/ORIGIN (por defecto PORT=8080)
- Ejecuta: npm install, luego npm run dev
- El API corre en http://localhost:8080

2. Frontend (modo local, opcional)

- Añade variables en un archivo .env.local del frontend:
  VITE_BACKEND=local
  VITE_API_BASE=http://localhost:8080
- Implementa un adaptador de backend para que las funciones de datos usen fetch contra el API cuando VITE_BACKEND=local.

3. Docker (frontend + backend)

- Con Docker instalado, desde la raíz del repo:
  docker compose up --build
- Servicios y puertos:
  - server (backend): http://localhost:8080
  - web (frontend): http://localhost:8081
- CORS ya está configurado con ORIGIN=http://localhost:8081

3. Rutas disponibles (resumen)

- POST /auth/register, /auth/login
- GET/PUT /profiles/me
- GET/POST /groups, GET /groups/:id, GET /groups/:id/members
- POST /groups/:id/join, POST /groups/:id/leave
- POST /groups/:id/members/invite, DELETE /groups/:id
- GET/POST /groups/:id/messages
- POST /upload/image (form-data: file)

Notas:

- Los archivos subidos se guardan en server/uploads y se sirven desde /uploads.
- La base de datos local es SQLite (server/data/app.db).
- Este backend es mínimo y no replica todas las reglas RLS; úsalas como referencia.
