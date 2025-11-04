# Configuración de Google Maps API

## Problema: "This page can't load Google Maps correctly"

Este error aparece cuando la API key de Google Maps tiene restricciones o no está configurada correctamente.

## Solución paso a paso

### 1. Ve a Google Cloud Console
- Abre https://console.cloud.google.com/
- Selecciona tu proyecto o crea uno nuevo

### 2. Habilita las APIs necesarias
Ve a **APIs & Services > Library** y habilita:
- ✅ **Maps JavaScript API** (REQUERIDA)
- ✅ **Maps Embed API** (opcional pero recomendada)
- ✅ **Geocoding API** (si necesitas búsquedas)

### 3. Configura tu API Key

#### A. Crear o editar la API Key
1. Ve a **APIs & Services > Credentials**
2. Si ya tienes una key, haz clic en ella para editarla
3. Si no, crea una nueva: **+ CREATE CREDENTIALS > API key**

#### B. Configurar restricciones (IMPORTANTE)

**Opción 1: Sin restricciones (desarrollo local)**
- En "Application restrictions" selecciona **None**
- ⚠️ Solo para desarrollo local, NO para producción

**Opción 2: Restricción por dominio HTTP (producción)**
- En "Application restrictions" selecciona **HTTP referrers (web sites)**
- Agrega los dominios permitidos:
  ```
  http://localhost:*/*
  http://127.0.0.1:*/*
  https://tu-dominio.com/*
  ```

**Opción 3: Restricción por IP (servidor)**
- Solo si corres el backend desde IPs fijas

#### C. Configurar restricciones de API
1. En "API restrictions" selecciona **Restrict key**
2. Marca solo las APIs que usas:
   - Maps JavaScript API
   - Maps Embed API (opcional)

#### D. Guardar cambios
- Haz clic en **Save**
- ⏱️ Los cambios pueden tardar hasta 5 minutos en aplicarse

### 4. Actualiza tu archivo .env

Copia la API key y pégala en tu archivo `.env`:

```bash
VITE_GOOGLE_MAPS_API_KEY="TU_API_KEY_AQUI"
```

### 5. Reinicia el servidor de desarrollo

```bash
npm run dev
```

## Verificación

1. Abre la consola del navegador (F12)
2. Ve a la página de Contacto
3. Si ves errores, revisa:
   - ✅ La API key está bien copiada (sin espacios)
   - ✅ Maps JavaScript API está habilitada
   - ✅ Las restricciones permiten localhost o tu dominio
   - ✅ Esperaste 5 minutos después de cambios en restricciones

## Errores comunes y soluciones

### "This page can't load Google Maps correctly"
- **Causa**: Restricciones de dominio/IP mal configuradas
- **Solución**: Verifica que localhost esté permitido en HTTP referrers

### "This API project is not authorized to use this API"
- **Causa**: Maps JavaScript API no está habilitada
- **Solución**: Habilítala en APIs & Services > Library

### "The Google Maps JavaScript API has been disabled"
- **Causa**: Billing no configurado o límites excedidos
- **Solución**: Configura billing en Google Cloud Console

### "RefererNotAllowedMapError"
- **Causa**: El dominio actual no está en la lista permitida
- **Solución**: Agrega `http://localhost:*/*` a HTTP referrers

### Mapa gris sin errores
- **Causa**: Facturación no habilitada
- **Solución**: Ve a Billing y habilita una cuenta de facturación (tienen $200 gratis/mes)

### Error OR_BACR2_44 al habilitar billing
- **Causa**: Restricciones de cuenta, permisos insuficientes o problemas con método de pago
- **Soluciones posibles**:
  1. Verifica que tu cuenta de Google sea de tipo "personal" (no organización)
  2. Usa una tarjeta de crédito válida (no prepago ni virtual en algunos casos)
  3. Intenta desde navegador en modo incógnito
  4. Verifica que tu país esté soportado para Google Cloud billing
  5. Contacta soporte de Google Cloud si persiste
- **Alternativa**: Usa Google Maps Embed (gratis, sin billing) - ver sección abajo

## ALTERNATIVA: Google Maps Embed (Sin billing requerido)

Si tienes problemas habilitando billing, puedes usar **Google Maps Embed API** que es **100% gratis** y no requiere configurar facturación.

### Ventajas
- ✅ Completamente gratis, sin límites
- ✅ No requiere billing habilitado
- ✅ Funciona inmediatamente
- ✅ Mismo resultado visual

### Desventajas
- ❌ Menos personalización
- ❌ No puedes agregar marcadores personalizados programáticamente
- ❌ Controles limitados

### Cómo usar Embed API

1. Ve a Google Cloud Console > APIs & Services > Library
2. Busca y habilita **"Maps Embed API"** (NO "Maps JavaScript API")
3. Crea una API key sin restricciones o con HTTP referrers
4. En `src/pages/Contacto.tsx`, cambia el import:

```tsx
// Comenta esta línea:
// import MapComponent from "../components/MapComponent";

// Descomenta esta línea:
import MapComponent from "../components/MapComponentEmbed";
```

5. Guarda y reinicia el servidor: `npm run dev`

El mapa funcionará inmediatamente sin necesidad de billing.

## Modo desarrollo sin API key

Si no quieres configurar Google Maps ahora, el componente mostrará un placeholder:

```
🗺️ Mapa deshabilitado. Configura VITE_GOOGLE_MAPS_API_KEY para habilitarlo.
```

Para deshabilitar, simplemente comenta o elimina la variable del `.env`:

```bash
# VITE_GOOGLE_MAPS_API_KEY="..."
```

## Cuotas gratuitas de Google Maps

Google ofrece **$200 USD gratis por mes**, que equivalen a:
- ~28,000 cargas de mapa por mes
- ~40,000 peticiones de geocoding

Para sitios pequeños/medianos, esto es **completamente gratuito**.

## Recursos adicionales

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation/javascript)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
