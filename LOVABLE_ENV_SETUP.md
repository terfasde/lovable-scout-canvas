# Configuración de Variables de Entorno en Lovable

Para que tu aplicación funcione correctamente en Lovable, necesitas configurar las siguientes variables de entorno en el panel de Lovable:

## Variables Requeridas para Supabase (Producción)

```bash
# NO incluir VITE_BACKEND o dejar vacío (por defecto usa Supabase)
# VITE_BACKEND=""

# Credenciales de Supabase
VITE_SUPABASE_URL="https://kjywwpctpogrpixvffww.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqeXd3cGN0cG9ncnBpeHZmZnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2ODk4NDEsImV4cCI6MjA3NzI2NTg0MX0.LKnQeOUVKH5KgfwbFgXuZcpHn-iIc8p_ylB-LkQ0whc"

# Google Maps (para el mapa de ubicación)
VITE_GOOGLE_MAPS_API_KEY="AIzaSyCdG8MYDQuZmbEDypnEMlokDCY2t9B8560"

# Admin de galería (emails con permisos de admin)
VITE_GALLERY_ADMIN_EMAILS="franciscolorenzo2406@gmail.com"
```

## ¿Cómo configurar en Lovable?

1. Ve a tu proyecto en Lovable
2. Busca la sección de "Environment Variables" o "Settings"
3. Agrega cada variable con su valor correspondiente
4. **IMPORTANTE**: NO incluyas la variable `VITE_BACKEND` o déjala vacía - esto hará que use Supabase real
5. Guarda los cambios y redeploya tu aplicación

## Verificación de Configuración de Supabase

Asegúrate de que tu proyecto de Supabase tenga:

### 1. Tablas necesarias
- `profiles` - Perfiles de usuario
- `eventos` - Eventos del grupo scout
- `gallery_images` - Imágenes de la galería
- `messages` - Mensajes privados
- `conversations` - Conversaciones
- `follows` - Seguidores
- `groups` - Grupos
- `group_members` - Miembros de grupos
- `group_messages` - Mensajes de grupos

### 2. Storage Buckets
- `avatars` - Fotos de perfil
- `gallery` - Galería de fotos
- `thread-images` - Imágenes de hilos/posts
- `group-covers` - Portadas de grupos

### 3. Políticas RLS (Row Level Security)
Verifica que las políticas de seguridad permitan:
- Lectura pública de perfiles públicos
- Los usuarios puedan actualizar su propio perfil
- Los usuarios puedan subir imágenes a su carpeta
- etc.

### 4. Autenticación
En el panel de Supabase:
- Ve a "Authentication" > "Providers"
- Asegúrate de que "Email" esté habilitado
- Configura las URLs permitidas para redirección:
  - URL de tu app en Lovable (ej: `https://tu-proyecto.lovable.app`)
  - `http://localhost:5173` (para desarrollo local)

## Funcionalidades que deben funcionar

✅ **Autenticación**
- Registro de nuevos usuarios
- Inicio de sesión con email/contraseña
- Cierre de sesión
- Recuperación de contraseña

✅ **Perfiles**
- Ver perfil propio
- Editar perfil (nombre, foto, bio, etc.)
- Perfiles públicos/privados
- Ver perfiles de otros usuarios

✅ **Eventos**
- Ver lista de eventos
- Ver detalles de eventos
- (Admins) Crear/editar eventos

✅ **Galería**
- Ver fotos de la galería
- (Admins) Subir nuevas fotos
- (Admins) Organizar en álbumes

✅ **Mensajería**
- Enviar mensajes privados
- Ver conversaciones
- Notificaciones en tiempo real

✅ **Grupos**
- Ver grupos
- Unirse a grupos
- Chat grupal

## Problemas Comunes

### Error: "Invalid API key" o "Failed to fetch"
- Verifica que `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` estén correctamente configurados
- Asegúrate de que NO haya espacios al inicio/final de las variables

### Error: "User not authorized" o errores de permisos
- Revisa las políticas RLS en Supabase
- Verifica que los usuarios tengan permisos para leer/escribir en las tablas

### Las imágenes no se suben
- Verifica que los buckets de Storage existan
- Revisa las políticas de acceso de Storage
- Asegúrate de que los usuarios autenticados puedan subir a sus carpetas

### El login/registro no funciona
- Verifica que la autenticación por email esté habilitada en Supabase
- Revisa la configuración de URLs permitidas
- Comprueba que la tabla `profiles` tenga un trigger para crear perfiles automáticamente

## Desarrollo Local vs Producción

### Desarrollo Local (Docker)
```bash
VITE_BACKEND="local"
VITE_API_BASE="http://localhost:8080"
```
- Usa backend Express local
- Usa SQLite para base de datos
- Usa MinIO o localStorage para archivos

### Producción (Lovable)
```bash
# NO incluir VITE_BACKEND (o dejar vacío)
VITE_SUPABASE_URL="https://..."
VITE_SUPABASE_ANON_KEY="..."
```
- Usa Supabase real
- Usa PostgreSQL de Supabase
- Usa Supabase Storage para archivos

## Contacto

Si tienes problemas, revisa:
1. La consola del navegador (F12) para ver errores
2. Los logs de Supabase en el dashboard
3. La configuración de variables de entorno en Lovable
