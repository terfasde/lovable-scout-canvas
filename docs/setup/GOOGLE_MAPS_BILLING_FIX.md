# Solución Rápida al Error OR_BACR2_44

El error `OR_BACR2_44` impide habilitar billing en Google Cloud. Aquí está la solución alternativa.

## ✅ SOLUCIÓN: Usar Google Maps Embed API (GRATIS, sin billing)

### Paso 1: Habilitar Maps Embed API

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Ve a **APIs & Services > Library**
3. Busca **"Maps Embed API"**
4. Haz clic en **Enable**

### Paso 2: Verificar tu API Key

1. Ve a **APIs & Services > Credentials**
2. Haz clic en tu API key
3. En **Application restrictions**:
   - Opción fácil: Selecciona **None** (solo desarrollo)
   - Opción segura: Selecciona **HTTP referrers** y agrega:
     ```
     http://localhost:*/*
     http://127.0.0.1:*/*
     ```
4. En **API restrictions**:
   - Selecciona **Restrict key**
   - Marca solo: **Maps Embed API**
5. Haz clic en **Save**
6. Espera 5 minutos para que los cambios se apliquen

### Paso 3: Cambiar el componente de mapa

Abre `src/pages/Contacto.tsx` y modifica las líneas 9-11:

**ANTES:**
```tsx
// Usa MapComponentEmbed si tienes problemas con billing de Google Cloud
// import MapComponent from "../components/MapComponentEmbed";
import MapComponent from "../components/MapComponent";
```

**DESPUÉS:**
```tsx
// Usa MapComponentEmbed si tienes problemas con billing de Google Cloud
import MapComponent from "../components/MapComponentEmbed";
// import MapComponent from "../components/MapComponent";
```

### Paso 4: Reiniciar el servidor

```bash
npm run dev
```

## ✅ Listo!

El mapa debería funcionar ahora. Abre http://localhost:5173/contacto y verifica.

## Diferencias entre las dos versiones

| Característica | MapComponent (JavaScript API) | MapComponentEmbed (Embed API) |
|---|---|---|
| Requiere billing | ✅ Sí | ❌ No |
| Costo | Gratis hasta $200/mes | 100% gratis sin límites |
| Personalización | Alta | Limitada |
| Marcadores personalizados | ✅ Sí | ❌ No |
| Controles de zoom/pan | ✅ Sí | ✅ Sí |
| Funciona inmediatamente | ❌ No (necesita billing) | ✅ Sí |

## Si aún tienes problemas

1. Verifica que `VITE_GOOGLE_MAPS_API_KEY` esté en tu `.env`
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que esperaste 5 minutos después de cambiar restricciones
4. Prueba desde modo incógnito

## Volver a la versión JavaScript API

Si en el futuro logras habilitar billing, simplemente invierte el cambio en `Contacto.tsx`:

```tsx
import MapComponent from "../components/MapComponent";
// import MapComponent from "../components/MapComponentEmbed";
```

Y habilita **Maps JavaScript API** en Google Cloud Console.
