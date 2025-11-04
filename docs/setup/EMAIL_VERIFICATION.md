# 📧 Configuración de Verificación de Email

## ⚠️ ESTADO ACTUAL: VERIFICACIÓN DE EMAIL **DESACTIVADA** PARA TESTING

La verificación de email está temporalmente desactivada para facilitar las pruebas de la aplicación.

---

## � CONFIGURACIÓN URGENTE EN SUPABASE (Para Testing)

### ⚡ Para poder registrarte con emails de prueba (test@test.com, etc.):

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard/project/lndqeaspuwwgdwbggayd)
2. **Authentication** → **Settings** → **Auth Settings**
3. Busca la sección **"Email"**
4. **DESACTIVA** (toggle OFF) la opción:
   - ✅ **"Enable email confirmations"** → OFF
   - ✅ **"Secure email change"** → OFF (opcional)
5. **ACTIVA** (toggle ON):
   - ✅ **"Enable Email Signup"** → ON
   - ✅ **"Disable Email Signups"** → OFF
6. Guarda los cambios

### 📝 Configuración Adicional (Importante):

En **Authentication** → **Settings** → **Email Auth**:
- **Mailer Autoconfirm**: ✅ **ON** (para testing - confirma automáticamente)
- **Email Confirmations**: ❌ **OFF** (para testing - no requiere confirmación)

---

## �🔧 Cómo Reactivar la Verificación de Email (Producción)

### Paso 1: Configurar Supabase Dashboard

1. Ir a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navegar a **Authentication** → **Email Templates**
3. Personalizar los templates de email si es necesario
4. Ir a **Authentication** → **Settings**
5. Asegurar que **"Enable email confirmations"** esté activado

### Paso 2: Modificar el Código en `src/pages/Auth.tsx`

Buscar la función `handleSignUp` y hacer los siguientes cambios:

#### Descomentar la línea de `emailRedirectTo`:

```typescript
// ANTES (línea ~56):
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    // emailRedirectTo: redirectUrl, // TEMPORAL: Commented for testing
    data: {
      nombre: nombreCompleto || null,
      telefono: telefono || null,
    },
  },
});

// DESPUÉS:
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: redirectUrl, // ✅ Reactivado
    data: {
      nombre: nombreCompleto || null,
      telefono: telefono || null,
    },
  },
});
```

#### Descomentar el mensaje de confirmación de email (línea ~79):

```typescript
// DESCOMENTAR ESTE BLOQUE:
toast({
  title: "Confirma tu correo electrónico",
  description: `Te enviamos un correo a ${email}. Abre ese email y haz clic en el enlace de confirmación (revisa también la carpeta de spam).`,
});
```

#### Comentar/eliminar el mensaje temporal de testing (línea ~86):

```typescript
// ELIMINAR O COMENTAR ESTE BLOQUE:
/*
toast({
  title: "¡Registro exitoso!",
  description: "Iniciando sesión automáticamente... (Modo testing - verificación de email desactivada)",
});
*/
```

#### Comentar el auto-login (línea ~91):

```typescript
// COMENTAR ESTAS LÍNEAS:
/*
if (data.session) {
  navigate("/");
}
*/
```

---

## 📋 Resumen de Cambios Necesarios

1. ✅ Descomentar `emailRedirectTo: redirectUrl`
2. ✅ Descomentar el toast de "Confirma tu correo electrónico"
3. ✅ Eliminar/comentar el toast de "Modo testing"
4. ✅ Comentar el auto-login `if (data.session) { navigate("/"); }`

---

## 🧪 Testing de Verificación de Email

### En Desarrollo (Local):
- Los emails de confirmación se enviarán a la dirección registrada
- Puedes ver los emails en el **Email Log** de Supabase Dashboard
- Para testing local, considera usar [Mailhog](https://github.com/mailhog/MailHog) o similar

### En Producción:
- Configurar un servicio SMTP real en Supabase
- Personalizar los templates de email con tu marca
- Probar con emails reales antes de lanzar

---

## 🔒 Configuración de Seguridad Recomendada

### En Supabase Dashboard → Authentication → Settings:

- **Enable email confirmations**: ✅ ON
- **Secure email change**: ✅ ON
- **Email confirmation timeout**: 24 horas (recomendado)
- **Mailer Autoconfirm**: ❌ OFF (para producción)

---

## 📌 Notas Importantes

- **NO SUBIR A PRODUCCIÓN** con la verificación de email desactivada
- La verificación de email es crucial para:
  - Prevenir registros con emails falsos
  - Asegurar que el usuario tiene acceso al email
  - Reducir spam y cuentas bot
  - Cumplir con mejores prácticas de seguridad

---

## ✅ Checklist Antes de Producción

- [ ] Descomentar `emailRedirectTo` en `Auth.tsx`
- [ ] Restaurar mensaje de confirmación de email
- [ ] Eliminar auto-login después de registro
- [ ] Activar "Enable email confirmations" en Supabase
- [ ] Configurar SMTP personalizado (opcional pero recomendado)
- [ ] Personalizar templates de email
- [ ] Probar flujo completo de registro + confirmación
- [ ] Documentar proceso para usuarios finales

---

**Fecha de desactivación temporal**: 29 de octubre de 2025  
**Motivo**: Testing y desarrollo  
**Reactivar antes de**: Deployment a producción
