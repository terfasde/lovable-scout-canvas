# 🚀 Guía Rápida de Deploy

## 📦 Dos ambientes configurados

### 1️⃣ LOCAL (http://localhost:5173)

```bash
# Instalar dependencias
npm install

# Iniciar entorno de desarrollo
npm run dev
```

- ✅ Hot reload automático (Vite)
- ✅ Sin necesidad de Docker
- ✅ Variables leídas desde .env.development

### 2️⃣ PÚBLICO con Netlify (URL pública)

#### Setup inicial (solo una vez):

1. **Conectar repo a Netlify:**
   - Ve a [app.netlify.com](https://app.netlify.com)
   - "Add new site" → "Import existing project"
   - Conecta con GitHub y selecciona `lovable-scout-canvas`

2. **Configurar variables de entorno en Netlify:**
   - Settings → Environment variables → Add
   - Copia las variables de `.env.production`:
     ```
     VITE_BACKEND=supabase
     VITE_SUPABASE_URL=https://lndqeaspuwwgdwbggayd.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     VITE_GOOGLE_MAPS_API_KEY=AIzaSyCdG8MYDQuZmbEDypnEMlokDCY2t9B8560
     VITE_GALLERY_ADMIN_EMAILS=franciscolorenzo2406@gmail.com
     VITE_ENV=production
     ```

3. **Build settings (ya configuradas en netlify.toml):**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

#### Deploy automático:

```bash
# Cada push a main despliega automáticamente
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

#### Deploy manual:

```bash
# Instalar Netlify CLI (una sola vez)
npm install -g netlify-cli

# Deploy de prueba
netlify deploy

# Deploy a producción
netlify deploy --prod
```

---

## 🔧 Troubleshooting

### Error CORS o localhost:8080
→ Verifica que `.env.development` tenga `VITE_BACKEND=supabase`

### Build falla en Netlify
→ Revisa que las variables estén configuradas en Netlify UI

### No aparece el menú de usuario tras login
→ Ya está corregido con la creación automática de perfil

---

## 📝 Resumen de archivos

- `.env.development` → Entorno local
- `.env.production` → Entorno producción
- `vercel.json` → Rewrites/headers para SPA
- `scripts/` → Utilidades de build/deploy

> Eliminado: docker-compose.* y netlify.toml (migrado a Vercel)
