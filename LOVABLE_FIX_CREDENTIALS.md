# 🚨 PROBLEMA DETECTADO: Variables de Supabase Inconsistentes

## El Problema

Tu configuración actual tiene **claves de DOS proyectos diferentes de Supabase**:

1. **URL del proyecto**: `https://kjywwpctpogrpixvffww.supabase.co`
2. **Anon Key**: De proyecto `lndqeaspuwwgdwbggayd` (diferente!)

Esto causa que la autenticación **FALLE** porque las credenciales no coinciden.

---

## 🔍 Cómo Identificar el Proyecto Correcto

### Opción 1: Revisar el Dashboard de Supabase

1. Ve a https://supabase.com/dashboard
2. Busca tu proyecto "Grupo Scout Séptimo"
3. Ve a **Settings** > **API**
4. Copia la información de:
   - **Project URL**: `https://[REF].supabase.co`
   - **anon/public key**: `eyJhbG...`

### Opción 2: Verificar cuál proyecto tiene tus datos

Haz un test en cada proyecto:

**Proyecto kjywwpctpogrpixvffww:**
```bash
curl https://kjywwpctpogrpixvffww.supabase.co/rest/v1/profiles \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqeXd3cGN0cG9ncnBpeHZmZnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2ODk4NDEsImV4cCI6MjA3NzI2NTg0MX0.LKnQeOUVKH5KgfwbFgXuZcpHn-iIc8p_ylB-LkQ0whc"
```

**Proyecto lndqeaspuwwgdwbggayd:**
```bash
curl https://lndqeaspuwwgdwbggayd.supabase.co/rest/v1/profiles \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZHFlYXNwdXd3Z2R3YmdnYXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NDI3NTcsImV4cCI6MjA3NzMxODc1N30.FLkW5mgkgcZCiUglXCFvXu4ZhHDgtKsbZxt6vxadrHM"
```

El que **NO** devuelva error 401 es el correcto.

---

## ✅ Solución: Configurar Variables en Lovable

Una vez que identifiques el proyecto correcto, configura en **Lovable**:

### Si el proyecto correcto es `kjywwpctpogrpixvffww`:

```bash
# En Lovable Environment Variables:
VITE_SUPABASE_URL=https://kjywwpctpogrpixvffww.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqeXd3cGN0cG9ncnBpeHZmZnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2ODk4NDEsImV4cCI6MjA3NzI2NTg0MX0.LKnQeOUVKH5KgfwbFgXuZcpHn-iIc8p_ylB-LkQ0whc
VITE_GOOGLE_MAPS_API_KEY=AIzaSyCdG8MYDQuZmbEDypnEMlokDCY2t9B8560
VITE_GALLERY_ADMIN_EMAILS=franciscolorenzo2406@gmail.com
```

### Si el proyecto correcto es `lndqeaspuwwgdwbggayd`:

```bash
# En Lovable Environment Variables:
VITE_SUPABASE_URL=https://lndqeaspuwwgdwbggayd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZHFlYXNwdXd3Z2R3YmdnYXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NDI3NTcsImV4cCI6MjA3NzMxODc1N30.FLkW5mgkgcZCiUglXCFvXu4ZhHDgtKsbZxt6vxadrHM
VITE_GOOGLE_MAPS_API_KEY=AIzaSyCdG8MYDQuZmbEDypnEMlokDCY2t9B8560
VITE_GALLERY_ADMIN_EMAILS=franciscolorenzo2406@gmail.com
```

**⚠️ IMPORTANTE**: NO incluyas `VITE_BACKEND` en Lovable

---

## 🔧 Debugging: Verificar Variables en Lovable

Después de configurar, abre la consola del navegador en tu sitio de Lovable (F12) y deberías ver:

```
☁️ Modo PRODUCCIÓN: Usando Supabase real
📍 VITE_BACKEND: (vacío - por defecto Supabase)
🔗 VITE_SUPABASE_URL: ✓ Configurado
🔑 VITE_SUPABASE_ANON_KEY: ✓ Configurado
✅ Cliente de Supabase creado exitosamente
```

Si ves algún `✗ FALTA`, significa que las variables NO están configuradas en Lovable.

---

## 📝 Checklist de Verificación

- [ ] Identificar cuál proyecto de Supabase tiene tus datos
- [ ] Ir a Lovable > Settings > Environment Variables
- [ ] Configurar `VITE_SUPABASE_URL` con el proyecto correcto
- [ ] Configurar `VITE_SUPABASE_ANON_KEY` del MISMO proyecto
- [ ] Configurar `VITE_GOOGLE_MAPS_API_KEY`
- [ ] Configurar `VITE_GALLERY_ADMIN_EMAILS`
- [ ] **NO** configurar `VITE_BACKEND` (déjalo vacío)
- [ ] Guardar y redeploy en Lovable
- [ ] Abrir consola del navegador y verificar logs
- [ ] Probar login/registro

---

## 🐛 Si Sigue sin Funcionar

1. **Abre la consola del navegador** (F12) en https://gruposcoutseptimo7.lovable.app/auth
2. Busca mensajes de error en rojo
3. Busca los logs que agregamos (🔧, ☁️, ✓, ✗, etc.)
4. Toma screenshot y comparte qué mensaje aparece

## 📚 Recursos

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Lovable Docs - Environment Variables](https://docs.lovable.dev/environment-variables)
- Archivo de referencia: `LOVABLE_ENV_SETUP.md`
