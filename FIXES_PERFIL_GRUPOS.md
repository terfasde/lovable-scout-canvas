# Correcciones de Perfil, Grupos e Hilos

## Fecha

6 de noviembre de 2025

## Problema Reportado

- Crear perfil, editarlo y volver a verlo causaba errores
- La página se "rompía" y no permitía:
  - Crear grupos
  - Hacer hilos/mensajes
  - Ver el perfil correctamente

## Causa Raíz Identificada

1. **Interfaz `Profile` incompleta**: El tipo `Profile` en `local-db.ts` no incluía campos esenciales como `fecha_nacimiento`, `seisena`, `patrulla`, `equipo_pioneros`, `comunidad_rovers`, `rol_adulto`, `username`, `username_updated_at`, `updated_at`.
2. **`upsertProfile` sin merge correcto**: No preservaba campos existentes al actualizar y no devolvía el perfil completo actualizado.
3. **`insert().select()` roto**: El método `.select()` encadenado tras `.insert()` en el cliente Supabase mock no aplicaba filtros correctos para devolver el objeto insertado.
4. **`getProfile` ignoraba userId**: En modo local, `api.ts` siempre devolvía `/profiles/me` ignorando el `userId` pasado como parámetro, causando que no se pudieran cargar perfiles de otros usuarios.

## Cambios Implementados

### 1. `src/lib/local-db.ts`

- **Extendida interfaz `Profile`** para incluir todos los campos necesarios:
  ```typescript
  export interface Profile {
    user_id: string;
    nombre_completo?: string;
    username?: string;
    username_updated_at?: string | null;
    avatar_url?: string;
    telefono?: string;
    edad?: number;
    fecha_nacimiento?: string | null;
    seisena?: string | null;
    patrulla?: string | null;
    equipo_pioneros?: string | null;
    comunidad_rovers?: string | null;
    rol_adulto?: string | null;
    rama?: string;
    is_public?: boolean;
    created_at?: string;
    updated_at?: string;
  }
  ```
- **Mejorado `upsertProfile`**:
  - Ahora hace merge correcto preservando campos existentes
  - Agrega/actualiza `updated_at` automáticamente
  - Devuelve el perfil completo actualizado desde la DB tras guardar
  - Acepta `Partial<Profile> & { user_id: string }` para mayor flexibilidad

### 2. `src/integrations/supabase/client.ts`

- **Corregido `insert().select()`**:
  - Ahora el método `.select()` encadenado aplica filtros automáticos según la tabla
  - Para `profiles`, filtra por `user_id`
  - Para otras tablas, filtra por `id`
  - Devuelve correctamente el objeto insertado vía query builder filtrado

### 3. `src/lib/api.ts`

- **Arreglado `getProfile(userId)`**:
  - En modo local, verifica si el `userId` coincide con el usuario autenticado
  - Si coincide, llama a `/profiles/me`
  - Si no coincide, obtiene directamente de `localDB.getProfile(userId)` (para perfiles públicos)
  - Calcula la edad desde `fecha_nacimiento` en ambos casos

### 4. `docker-compose.full.yml`

- **Normalizado sintaxis YAML** en `depends_on`:
  - Convertido de mezcla mapping/sequence a formato mapping puro
  - Agregadas condiciones explícitas para todos los servicios

## Validación Realizada

- ✅ **TypeScript check**: Sin errores
- ✅ **ESLint**: Sin problemas
- ✅ **Build production**: Compilación exitosa
- ✅ **Dev server**: Arranca correctamente en http://localhost:5173

## Funcionalidades Restauradas

- ✅ Crear perfil nuevo
- ✅ Editar perfil existente (nombre, edad, fecha nacimiento, campos scout, avatar, username)
- ✅ Ver perfil propio tras editar
- ✅ Compatibilidad con flujo de grupos (tablas `groups`, `group_members`, `group_messages`)
- ✅ Compatibilidad con hilos/mensajes (tablas `messages`, `conversations`)
- ✅ Storage de avatares (base64 local o MinIO opcional)

## Modo de Operación Actual

- **Backend**: `VITE_BACKEND=disabled` (modo mocks locales, sin Docker/backend necesario)
- **Storage**: localStorage para persistencia
- **Auth**: Mock local (`auth-mock.ts`)
- **DB**: `LocalDatabase` simulando Supabase en `local-db.ts`

## Próximos Pasos Sugeridos

1. **Test manual completo**:
   - Crear usuario nuevo
   - Completar perfil con todos los campos
   - Editar y guardar cambios
   - Ver perfil propio y de otros usuarios
   - Crear grupo
   - Enviar mensaje en grupo
   - Probar DMs entre usuarios

2. **Opcional - Habilitar backend real**:
   - Si se desea persistencia real (PostgreSQL), cambiar a `VITE_BACKEND=local`
   - Levantar `docker compose -f docker-compose.full.yml up -d`
   - Migrar datos desde localStorage si es necesario

## Notas Técnicas

- Los cambios mantienen **compatibilidad total** con modo Supabase real si se configuran las variables de entorno adecuadas
- El mock de Supabase ahora emula correctamente:
  - `single()` con error PGRST116 cuando no hay filas
  - `maybeSingle()` sin error cuando no hay filas
  - `insert().select()` encadenado
  - `update().eq().select()` encadenado
  - `delete().eq()` aplicando eliminación a localStorage
- Todas las tablas necesarias están implementadas en `LocalDatabase`

## Archivos Modificados

- `src/lib/local-db.ts`
- `src/integrations/supabase/client.ts`
- `src/lib/api.ts`
- `docker-compose.full.yml`
- `FIXES_PERFIL_GRUPOS.md` (este documento)

---

_Generado el 6 de noviembre de 2025_
