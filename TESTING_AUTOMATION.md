# 🤖 Automatización del Sistema de Seguidores

Este documento explica cómo automatizar completamente el setup y testing del sistema de seguidores.

## 📋 Scripts SQL Disponibles

### 1. `add_follow_system.sql`
Crea la infraestructura del sistema de seguidores:
- Enum `follow_status` (pending, accepted, blocked)
- Tabla `follows` con composite primary key
- Trigger `auto_accept_public_follow` para auto-aceptar follows a perfiles públicos
- Políticas RLS para follows

### 2. `add_profiles_directory.sql`
Crea función RPC para descubrir usuarios:
- Función `list_profiles_directory()` con SECURITY DEFINER
- Retorna datos mínimos (id, nombre, avatar, edad, is_public)
- Bypass de RLS para permitir descubrimiento

### 3. `tune_profiles_policies.sql`
Políticas RLS claras y separadas:
- `profiles_read_self`: Leer tu propio perfil
- `profiles_read_public`: Cualquier autenticado lee perfiles públicos
- `profiles_read_accepted_follower`: Seguidores aceptados leen perfiles privados

### 4. `seed_test_data.sql` ⭐ **NUEVO**
Crea datos de prueba automáticamente:
- 4 usuarios con contraseñas conocidas
- 2 perfiles públicos + 2 privados
- 5 relaciones de seguimiento (algunas aceptadas, otras pendientes)

---

## 🚀 Setup Automático Completo

### Opción A: Ejecución Ordenada (Recomendado)

1. **Abre Supabase SQL Editor** en tu proyecto

2. **Ejecuta los 4 scripts EN ORDEN:**

```sql
-- Paso 1: Sistema de seguidores
\i supabase/migrations/add_follow_system.sql

-- Paso 2: Directorio de usuarios
\i supabase/migrations/add_profiles_directory.sql

-- Paso 3: Políticas claras
\i supabase/migrations/tune_profiles_policies.sql

-- Paso 4: Datos de prueba
\i supabase/migrations/seed_test_data.sql
```

> ⚠️ **NOTA**: Si `\i` no funciona en el SQL Editor web, copia y pega el contenido de cada archivo manualmente en orden.

### Opción B: Script Único (Avanzado)

Si tienes acceso CLI con `supabase` instalado:

```powershell
# Navega al directorio del proyecto
cd c:\Users\usuario\OneDrive\Documentos\GitHub\lovable-scout-canvas

# Aplica todas las migraciones
supabase db push

# O ejecuta manualmente
Get-Content supabase/migrations/add_follow_system.sql | supabase db execute
Get-Content supabase/migrations/add_profiles_directory.sql | supabase db execute
Get-Content supabase/migrations/tune_profiles_policies.sql | supabase db execute
Get-Content supabase/migrations/seed_test_data.sql | supabase db execute
```

---

## 👥 Usuarios de Prueba Creados

| Usuario | Email | Contraseña | Edad | Rama | Visibilidad |
|---------|-------|------------|------|------|-------------|
| María González | `test.maria@example.com` | `password123` | 9 | Manada | 🔒 Privado |
| Juan Pérez | `test.juan@example.com` | `password123` | 13 | Tropa | 🌐 Público |
| Ana Rodríguez | `test.ana@example.com` | `password123` | 16 | Pioneros | 🔒 Privado |
| Pedro Martínez | `test.pedro@example.com` | `password123` | 19 | Rover | 🌐 Público |

### Relaciones Pre-configuradas

```
✅ María → Juan (aceptado, porque Juan es público)
⏳ Juan → María (pendiente, esperando que María acepte)
✅ Ana → Pedro (aceptado, porque Pedro es público)
✅ Pedro → Juan (aceptado, ambos públicos)
⏳ Ana → María (pendiente, esperando que María acepte)
```

---

## 🧪 Testing Automatizado

### Prueba 1: Login con María (Privado)

1. **Abre la app en ventana normal**
   ```
   http://localhost:5173/auth
   ```

2. **Login:**
   - Email: `test.maria@example.com`
   - Password: `password123`

3. **Verifica en `/perfil`:**
   - ✅ 1 seguidor (Juan, pendiente)
   - ✅ 1 seguidor (Ana, pendiente)
   - ✅ 1 siguiendo (Juan, aceptado)
   - ✅ Botón "Aceptar" para Juan y Ana

4. **Verifica en `/usuarios`:**
   - ✅ Ve a Juan (público)
   - ✅ Ve a Pedro (público)
   - ✅ NO ve a Ana (privada, no es seguidora aceptada)

### Prueba 2: Login con Juan (Público) en Incógnito

1. **Abre ventana incógnito:**
   ```
   Ctrl + Shift + N (Chrome/Edge)
   Ctrl + Shift + P (Firefox)
   ```

2. **Login:**
   - Email: `test.juan@example.com`
   - Password: `password123`

3. **Verifica en `/perfil`:**
   - ✅ 2 seguidores (María aceptada, Pedro aceptado)
   - ✅ 1 siguiendo (María, pendiente porque ella es privada)

4. **Navega a `/usuarios`:**
   - ✅ Ve a Pedro (público)
   - ✅ Ve a María (público, ya la sigue y está pendiente)
   - ✅ NO ve a Ana (privada, no relacionados)

5. **Acepta la solicitud de María** (si quieres):
   - Esto auto-acepta porque Juan es público (ya debería estar aceptada)

### Prueba 3: Flujo Completo con Ana y Pedro

```powershell
# Terminal 1 - Ana (privado)
# Login: test.ana@example.com / password123
# → Ir a /perfil → Ver 1 siguiendo (Pedro), 0 seguidores, 1 pendiente (María pendiente)
# → Ir a /usuarios → Ver solo a Pedro (público)

# Terminal 2 - Pedro (público)  
# Login: test.pedro@example.com / password123
# → Ir a /perfil → Ver 1 seguidora (Ana), 1 siguiendo (Juan)
# → Ir a /usuarios → Ver a Juan (público), NO ver a María ni Ana (privados)
```

---

## 🔄 Automatización del Frontend

### Script de Login Automático (Opcional)

Puedes crear un helper para auto-login en desarrollo:

```typescript
// src/lib/testHelpers.ts
import { supabase } from '@/integrations/supabase/client';

export const autoLogin = async (testUser: 'maria' | 'juan' | 'ana' | 'pedro') => {
  const credentials = {
    maria: { email: 'test.maria@example.com', password: 'password123' },
    juan: { email: 'test.juan@example.com', password: 'password123' },
    ana: { email: 'test.ana@example.com', password: 'password123' },
    pedro: { email: 'test.pedro@example.com', password: 'password123' },
  };

  const { data, error } = await supabase.auth.signInWithPassword(credentials[testUser]);
  
  if (error) {
    console.error('Auto-login failed:', error);
    return null;
  }
  
  console.log(`✅ Auto-logged in as ${testUser.toUpperCase()}`);
  return data;
};

// Uso en consola del navegador:
// autoLogin('maria').then(() => window.location.reload())
```

---

## 🗑️ Limpiar Datos de Prueba

Si necesitas resetear y volver a empezar:

```sql
-- Eliminar relaciones de seguimiento
delete from public.follows 
where follower_id in (
  'a1111111-1111-1111-1111-111111111111',
  'b2222222-2222-2222-2222-222222222222',
  'c3333333-3333-3333-3333-333333333333',
  'd4444444-4444-4444-4444-444444444444'
);

-- Eliminar perfiles de prueba
delete from public.profiles 
where user_id in (
  'a1111111-1111-1111-1111-111111111111',
  'b2222222-2222-2222-2222-222222222222',
  'c3333333-3333-3333-3333-333333333333',
  'd4444444-4444-4444-4444-444444444444'
);

-- Eliminar usuarios de prueba (requiere permisos service_role)
delete from auth.users 
where id in (
  'a1111111-1111-1111-1111-111111111111',
  'b2222222-2222-2222-2222-222222222222',
  'c3333333-3333-3333-3333-333333333333',
  'd4444444-4444-4444-4444-444444444444'
);
```

Luego re-ejecuta `seed_test_data.sql`.

---

## ✅ Checklist de Validación

Después de ejecutar los scripts, verifica:

- [ ] ✅ Tabla `follows` existe con 5 rows
- [ ] ✅ Función `list_profiles_directory()` accesible vía RPC
- [ ] ✅ 3 políticas en `profiles`: read_self, read_public, read_accepted_follower
- [ ] ✅ 4 usuarios pueden hacer login
- [ ] ✅ Página `/usuarios` muestra usuarios públicos por defecto
- [ ] ✅ María ve solicitudes pendientes de Juan y Ana en `/perfil`
- [ ] ✅ Juan ve seguidores (María, Pedro) en `/perfil`

**Verificación SQL rápida:**

```sql
-- Contar usuarios de prueba
select count(*) from auth.users 
where email like 'test.%@example.com';
-- Debe retornar: 4

-- Ver todas las relaciones
select 
  pf.nombre_completo as follower,
  pd.nombre_completo as followed,
  f.status,
  f.created_at
from follows f
join profiles pf on f.follower_id = pf.user_id
join profiles pd on f.followed_id = pd.user_id
order by f.created_at desc;
-- Debe retornar: 5 rows
```

---

## 🎯 Resumen: Setup en 3 Pasos

1. **Ejecuta 4 SQLs en orden** (add_follow_system → add_profiles_directory → tune_profiles_policies → seed_test_data)
2. **Login con cualquier usuario** (`test.{nombre}@example.com` / `password123`)
3. **Prueba los flujos** (seguir, aceptar, ver listas)

¡Todo automático! 🚀
