# ⚡ CONFIGURACIÓN RÁPIDA - SUPABASE PARA TESTING

## 🎯 PROBLEMA ACTUAL
Supabase está validando que los emails sean reales y rechaza "pepe@gmail.com" u otros emails de prueba.

---

## ✅ SOLUCIÓN INMEDIATA (3 pasos)

### 1️⃣ Ir a Supabase Dashboard
🔗 https://supabase.com/dashboard/project/lndqeaspuwwgdwbggayd/settings/auth

### 2️⃣ Desactivar Confirmación de Email

En **Authentication** → **Settings**:

**Buscar la sección "Email Auth" y configurar:**

```
✅ Enable Email Signup: ON
❌ Confirm email: OFF (DESACTIVAR ESTE)
❌ Secure email change: OFF
✅ Mailer Autoconfirm: ON (ACTIVAR ESTE)
```

### 3️⃣ Guardar y Esperar 30 segundos

Supabase tarda unos segundos en aplicar los cambios.

---

## 🧪 Ahora puedes usar:

- ✅ `test@test.com`
- ✅ `pepe@pepe.com`
- ✅ `admin@admin.com`
- ✅ Cualquier formato de email

---

## 🔧 Si sigue sin funcionar:

### Opción A: Usar un email real
Usa un email real temporalmente (tu Gmail, Outlook, etc.). No necesitarás confirmarlo porque Mailer Autoconfirm está ON.

### Opción B: Verificar configuración
1. Refresca la página de Supabase
2. Verifica que "Confirm email" está realmente OFF
3. Espera 1 minuto y vuelve a intentar

---

## 📸 Captura de Pantalla de Configuración Correcta

```
Email Auth
├─ Enable Email Signup .................. ✅ ON
├─ Confirm email ........................ ❌ OFF  ← IMPORTANTE
├─ Secure email change .................. ❌ OFF
└─ Mailer Autoconfirm ................... ✅ ON   ← IMPORTANTE
```

---

## ⚠️ RECORDATORIO

**ANTES DE PRODUCCIÓN**, vuelve a activar:
- ✅ Confirm email: ON
- ✅ Secure email change: ON
- ❌ Mailer Autoconfirm: OFF

Ver `EMAIL_VERIFICATION_SETUP.md` para instrucciones completas.

---

**Última actualización**: 29 de octubre de 2025  
**Estado**: Configuración para TESTING únicamente
