# Instrucciones para aplicar las migraciones pendientes

## Nuevas migraciones creadas

1. **add_comuni_threads.sql** - Sistema de hilos con imágenes y comentarios
2. **add_direct_messages.sql** - Sistema de mensajes directos
3. **add_profiles_directory.sql** - Actualización del RPC para incluir username

## Opción 1: Aplicar desde Supabase Dashboard (Recomendado)

### A. Sistema de Hilos (add_comuni_threads.sql)

1. Ve a tu proyecto Supabase: https://supabase.com/dashboard/project/lndqeaspuwwgdwbggayd
2. Abre **SQL Editor** en el menú lateral
3. Crea una nueva query
4. Copia y pega el contenido del archivo: `supabase/migrations/add_comuni_threads.sql`
5. Ejecuta (Run)

### B. Sistema de Mensajes Directos (add_direct_messages.sql)

1. En **SQL Editor**, crea otra nueva query
2. Copia y pega el contenido del archivo: `supabase/migrations/add_direct_messages.sql`
3. Ejecuta (Run)

### C. Actualizar RPC de Directorio (add_profiles_directory.sql)

1. En **SQL Editor**, crea otra nueva query
2. Copia y pega el contenido del archivo: `supabase/migrations/add_profiles_directory.sql`
3. Ejecuta (Run)

## Opción 2: Aplicar vía CLI (requiere configuración adicional)

Si querés usar la CLI de Supabase, primero necesitás linkear el proyecto:

```powershell
cd supabase
npx supabase link --project-ref lndqeaspuwwgdwbggayd
npx supabase db push
```

Esto te va a pedir el password de la base de datos (lo encontrás en Supabase Dashboard → Project Settings → Database).

## Verificación post-migración

Después de ejecutar las migraciones, verificá en Supabase Dashboard:

### Storage:

- **Storage** → Deberías ver el bucket `thread-images` creado
- Políticas activas para lectura pública y escritura autenticada

### Tablas:

- **Table Editor** → Deberías ver:
  - `threads`
  - `thread_comments`
  - `conversations`
  - `conversation_participants`
  - `messages`

### Funciones:

- **Database** → Functions → Deberías ver:
  - `list_profiles_directory` (actualizada con username)
  - `create_or_get_conversation`

### RLS Policies:

- Cada tabla debe tener sus políticas visibles en **Authentication** → Policies

## Activar verificación de email (paso manual pendiente)

Después de las migraciones, activá la confirmación de email:

1. Ve a **Authentication** → **Providers** → **Email**
2. Activa **Confirm email**
3. Verifica que el **Site URL** sea correcto (probablemente `http://localhost:5173` para desarrollo)
4. Guarda los cambios

## Testing

Una vez aplicadas las migraciones:

1. **Hilos**: Ve a "Comuni 7" → pestaña "Hilos" → Publica un hilo con texto e imagen
2. **Mensajes**: Ve a "Mensajes" → Busca un usuario → Abre chat → Envía mensajes
3. **Registro**: Intenta registrar un nuevo usuario → Deberías recibir email de confirmación

---

**Nota**: Las migraciones son idempotentes (se pueden ejecutar múltiples veces sin causar errores).
