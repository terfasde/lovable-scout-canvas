# Docker: Ejecutar la app Vite + Supabase

Este proyecto es un frontend (Vite + React + TS) que consume Supabase. Aquí tienes dos formas:

- Producción/local simple: contenerizar solo el frontend y apuntar a Supabase Cloud (recomendado)
- Desarrollo local de Supabase: usa Supabase CLI (internamente ya usa Docker). No se recomienda recrear a mano todos los servicios en un compose propio.

## 1) Contenedor del frontend (Nginx)

### Prerrequisitos
- Docker Desktop (Windows con WSL2)
- Variables públicas de Supabase (desde tu proyecto):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

Estas variables se inyectan en build-time (Vite).

### Build & run con Dockerfile

1. Build de imagen (sustituye por tus valores):

```powershell
# En PowerShell
$env:VITE_SUPABASE_URL="https://<tu-ref>.supabase.co"; \
$env:VITE_SUPABASE_ANON_KEY="<tu-anon-key>"; \
 docker build -t scout-app:latest .
```

2. Ejecutar contenedor:

```powershell
docker run -p 8080:80 --name scout-web scout-app:latest
```

Visita http://localhost:8080

### Usando docker-compose

1. Crea un archivo `.env` (o exporta en tu shell) con:

```
VITE_SUPABASE_URL=https://<tu-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<tu-anon-key>
```

2. Levanta el servicio:

```powershell
docker compose up --build -d
```

Visita http://localhost:8080

Notas:
- El Dockerfile hace build con Node y sirve `dist/` con Nginx. `nginx.conf` incluye fallback a `index.html` (SPA) y cache básico de assets.
- Si quieres rehacer la imagen al cambiar código, usa `--build` o activa una `volume` de `./dist` (solo si ya hiciste `npm run build` local).

## 2) Desarrollo local de Supabase

Para levantar Supabase local, usa su CLI (ellos ya mantienen un compose con varios servicios: Postgres, Auth, Realtime, Studio…):

```powershell
# Instala CLI si no lo tienes (opcional)
# winget install Supabase.Supabase # o usa su instalador

# En el repo del proyecto
supabase init     # crea carpeta .supabase
supabase start    # levanta todos los servicios locales en Docker
supabase status   # verifica

# Aplica migraciones SQL que ya tienes en supabase/migrations
supabase db reset # o supabase db push
```

Luego exporta en `.env.local` (para Vite en dev) los endpoints locales provistos por `supabase start` y ejecuta `npm run dev` fuera de Docker para un loop de desarrollo más rápido.

## 3) Producción y CD

- Puedes publicar la imagen en cualquier registry (GHCR, Docker Hub) y ejecutar en tu host/VM u orquestador (ECS, K8s).
- Como alternativa al contenedor, al ser una SPA estática, puedes servir `dist/` en Netlify/Vercel/Cloudflare Pages sin Nginx.

## 4) Troubleshooting

- 404 al refrescar rutas: asegúrate de usar la `nginx.conf` incluida (tiene `try_files ... /index.html`).
- Variables VITE_* undefined en runtime: recuerda que Vite las inyecta en build; si cambian, reconstruye la imagen.
- Supabase `RLS` bloquea acciones: verifica que tu proyecto en Docker apunte al mismo Supabase Cloud en el que aplicaste migraciones.
