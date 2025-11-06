# Arquitectura Local (Sin Supabase)

## 📋 Resumen

Este proyecto ha sido configurado para funcionar **completamente sin Supabase**. Todos los servicios de autenticación, almacenamiento y base de datos han sido reemplazados por implementaciones locales usando `localStorage` y mocks.

## 🔧 Cambios Implementados

### 1. Autenticación Local (`src/lib/auth-mock.ts`)

Se implementó un servicio de autenticación completo que simula todas las funcionalidades de Supabase Auth:

- ✅ **Registro de usuarios** (`signUp`)
- ✅ **Inicio de sesión** (`signInWithPassword`)
- ✅ **Cierre de sesión** (`signOut`)
- ✅ **Sesión persistente** (usando `localStorage`)
- ✅ **Actualización de usuario** (`updateUser`)
- ✅ **Gestión de usuarios por defecto**

**Usuario predeterminado:**

- Email: `admin@scout.com`
- Contraseña: cualquiera (validación simplificada en modo local)

### 2. Mock de Cliente Supabase (`src/integrations/supabase/client.ts`)

Reemplazado completamente para proporcionar compatibilidad con el código existente:

```typescript
// Antes (Supabase real)
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(url, key);

// Ahora (Mock local)
import { authMock } from "@/lib/auth-mock";
export const supabase = {
  /* implementación mock */
};
```

**Funcionalidades mockeadas:**

- `auth.*` → Usa `auth-mock.ts`
- `from(table).select()...` → Retorna arrays vacíos
- `storage.from(bucket).*` → Mock de almacenamiento
- `rpc(function, params)` → Retorna null
- `channel(name).*` → Mock de real-time

### 3. Dependencias Removidas

**Eliminados de `package.json`:**

- `@supabase/supabase-js`
- `@supabase/auth-ui-react`
- `supabase` (CLI)

**Resultado:** 36 paquetes menos, instalación más rápida.

### 4. Configuración de Entorno

**`.env.development` actualizado:**

```env
VITE_BACKEND=disabled
# VITE_BACKEND_URL=http://localhost:8080  # Comentado

# Supabase DESHABILITADO
# VITE_SUPABASE_URL=
# VITE_SUPABASE_ANON_KEY=
```

### 5. Exclusiones de Verificación

**TypeScript (`tsconfig.json`):**

```json
{
  "exclude": ["server", "node_modules", "dist"]
}
```

**ESLint (`eslint.config.js`):**

```javascript
{
  ignores: ["dist", "src/integrations/supabase/types.ts", "server/**"];
}
```

**VS Code (`.vscode/settings.json`):**

```json
{
  "search.exclude": {
    "server/**": true
  },
  "eslint.options": {
    "ignorePattern": "server/**/*"
  }
}
```

## 🚀 Cómo Usar

### Desarrollo Local (Sin Docker)

```bash
# Instalar dependencias (sin Supabase)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Con Docker (Recomendado)

```bash
# Opción 1: Docker Compose directo
docker compose up -d
docker compose logs -f web
docker compose down

# Opción 2: Script de PowerShell
.\scripts\start.ps1          # Inicia modo simple
.\scripts\start.ps1 stop     # Detiene servicios
```

**Acceso:**

- Frontend: http://localhost:5173
- Usuario: `admin@scout.com` / password: cualquiera

### Autenticación

**Registrar nuevo usuario:**

```typescript
const { data, error } = await supabase.auth.signUp({
  email: "nuevo@example.com",
  password: "cualquier-password",
  options: {
    data: {
      nombre: "Juan",
      apellido: "Pérez",
    },
  },
});
```

**Iniciar sesión:**

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: "admin@scout.com",
  password: "cualquiera",
});
```

**Obtener sesión actual:**

```typescript
const {
  data: { session },
} = await supabase.auth.getSession();
if (session) {
  console.log("Usuario autenticado:", session.user.email);
}
```

### Datos Persistentes

Todos los datos se guardan en `localStorage`:

- **Sesiones:** `scout_auth_session`
- **Usuarios:** `scout_users`

**Limpiar datos locales:**

```javascript
localStorage.removeItem("scout_auth_session");
localStorage.removeItem("scout_users");
```

## ⚠️ Limitaciones

### Funcionalidades No Disponibles

1. **Base de Datos Real:**
   - Queries a `profiles`, `eventos`, `groups`, etc. retornan arrays vacíos
   - No hay persistencia de datos más allá de autenticación

2. **Storage Real:**
   - Uploads de archivos retornan paths mockeados
   - No hay almacenamiento real de imágenes/avatares

3. **Real-time:**
   - No hay sincronización en tiempo real
   - `channel().on().subscribe()` no hace nada

4. **OAuth:**
   - Google/GitHub/etc login retornan error
   - Solo disponible email/password

### Soluciones Alternativas

**Para usar base de datos local (opcional):**

1. Instalar Python (requerido para `better-sqlite3`)
2. Instalar dependencias del servidor:
   ```bash
   cd server
   npm install
   ```
3. Iniciar servidor local:
   ```bash
   npm run dev:server
   ```
4. Cambiar `.env.development`:
   ```env
   VITE_BACKEND=local
   VITE_BACKEND_URL=http://localhost:8080
   ```

**Para implementar persistencia custom:**

- Usar IndexedDB en lugar de localStorage
- Implementar API REST simple con Express
- Conectar a backend propio

## 📁 Estructura de Archivos

```
src/
├── lib/
│   ├── auth-mock.ts          # ⭐ Servicio de autenticación local
│   ├── api.ts                 # Funciones de API (mockeadas)
│   ├── gallery.ts             # Galería (mockeada)
│   └── ...
├── integrations/
│   └── supabase/
│       ├── client.ts          # ⭐ Mock completo de Supabase
│       └── types.ts           # Tipos (sin cambios)
└── pages/
    ├── Auth.tsx               # Login/Register (funciona con mock)
    └── ...
```

## ✅ Verificación

**Compilación TypeScript:**

```bash
npm run type-check
# ✓ Sin errores
```

**ESLint:**

```bash
npm run lint
# ✓ Sin warnings ni errores
```

**Servidor de desarrollo:**

```bash
npm run dev
# ✓ Inicia en http://localhost:5173/
```

## 🔄 Volver a Supabase (Si es necesario)

1. Reinstalar dependencias:

   ```bash
   npm install @supabase/supabase-js @supabase/auth-ui-react
   ```

2. Restaurar `src/integrations/supabase/client.ts`:

   ```typescript
   import { createClient } from "@supabase/supabase-js";
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

3. Configurar `.env.development`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## 📚 Referencias

- [Documentación Original](../README.md)
- [Auth Mock Implementation](../src/lib/auth-mock.ts)
- [Supabase Mock Client](../src/integrations/supabase/client.ts)

---

**Última actualización:** Transición completa a arquitectura local sin Supabase
