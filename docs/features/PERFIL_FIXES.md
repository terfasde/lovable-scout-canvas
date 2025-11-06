# Correcciones para Perfil.tsx

## Problema 1: Fecha de nacimiento se muestra con un día de desfase

**Causa**: `new Date("2006-11-24")` se interpreta en UTC y al convertir a zona horaria local puede cambiar de día.

**Solución**: Parsear la fecha manualmente sin conversión UTC.

**Líneas 71-73** - Cambiar:

```tsx
const nacimiento = new Date(formData.fecha_nacimiento);
```

Por:

```tsx
// Parsear fecha sin conversión UTC para evitar desfase de días
const [year, month, day] = formData.fecha_nacimiento.split("-").map(Number);
const nacimiento = new Date(year, month - 1, day);
```

---

## Problema 2: El nombre de usuario no se actualiza visualmente después de guardar

**Causa**: Después de guardar, no se refresca el componente Navigation que muestra el username.

**Solución**: Recargar el perfil completo después de actualizar.

**Líneas 477-490** - Después del toast de éxito, agregar:

```tsx
toast({
  title: "¡Perfil actualizado!",
  description: "Tus cambios han sido guardados.",
});

// AGREGAR AQUÍ: Recargar el perfil desde el servidor para reflejar cambios
await getProfile();

// Limpiar estados temporales
setAvatarFile(null);
setAvatarPreview(null);
```

Y remover las líneas que actualizan manualmente formData y originalData, ya que `getProfile()` lo hará automáticamente.

---

## Implementación

Aplicar los cambios manualmente en `src/pages/Perfil.tsx`:

1. Buscar la línea 72: `const nacimiento = new Date(formData.fecha_nacimiento);`
2. Reemplazar por las 3 líneas del parche
3. Buscar la línea 477 con el toast de éxito
4. Agregar `await getProfile();` después del toast
5. Remover las líneas que setean manualmente formData y originalData (líneas ~480-490)
