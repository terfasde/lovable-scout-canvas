# Medidas de Imágenes y Logos del Sitio

## 📋 Resumen de Archivos Actuales

### Imágenes en `src/assets/`:
- `grupo-scout-logo.png` - 87.68 KB
- `hero-scouts.jpg` - 237.43 KB
- `community-scouts.jpg` - 91.89 KB
- `scout-emblem.jpg` - 136.06 KB

---

## 🎯 Especificaciones Detalladas por Ubicación

### 1. **Logo Principal de Navegación**
**Archivo:** `src/assets/grupo-scout-logo.png`  
**Ubicación:** Navbar (esquina superior izquierda)  
**Componente:** `src/components/Navigation.tsx`  
**Medidas CSS:**
```css
width: 48px  (w-12)
height: 48px (h-12)
object-fit: contain
```
**Medidas Recomendadas para Reemplazo:**
- **PNG o SVG:** 192x192px mínimo (4x el tamaño mostrado)
- **Óptimo:** 256x256px o 512x512px (para pantallas retina/4K)
- **Formato:** PNG con fondo transparente o SVG
- **Aspect Ratio:** 1:1 (cuadrado)

---

### 2. **Imagen Hero Principal**
**Archivo:** `src/assets/hero-scouts.jpg`  
**Ubicación:** Página principal, sección hero (pantalla completa)  
**Componente:** `src/components/Hero.tsx`  
**Medidas CSS:**
```css
width: 100% (w-full)
height: 100% (h-full)
min-height: 100vh
object-fit: cover
```
**Medidas Recomendadas para Reemplazo:**
- **Ancho mínimo:** 1920px
- **Óptimo:** 2560px o 3840px (para pantallas 4K)
- **Alto mínimo:** 1080px
- **Óptimo:** 1440px o 2160px
- **Aspect Ratio:** 16:9 preferible (1920x1080, 2560x1440, 3840x2160)
- **Formato:** JPG con compresión optimizada (80-90% calidad)
- **Peso máximo recomendado:** 300-500 KB

---

### 3. **Imagen de Comunidad**
**Archivo:** `src/assets/community-scouts.jpg`  
**Ubicación:** Sección "Sobre Nosotros" (About)  
**Componente:** `src/components/About.tsx`  
**Medidas CSS:**
```css
width: 100% (w-full)
aspect-ratio: 4/3
object-fit: cover
border-radius: 1rem (rounded-2xl)
```
**Medidas Recomendadas para Reemplazo:**
- **Aspect Ratio Requerido:** 4:3
- **Opciones de Resolución:**
  - Estándar: 1200x900px
  - Alta: 1600x1200px
  - 4K: 2560x1920px
- **Formato:** JPG optimizado
- **Peso recomendado:** 100-200 KB

---

### 4. **Emblema Scout**
**Archivo:** `src/assets/scout-emblem.jpg`  
**Ubicación:** Actualmente no usado en código visible  
**Medidas actuales:** 136.06 KB
**Uso potencial:** Fondos, decoraciones, páginas de detalle  
**Recomendación:** Si se usa como logo secundario, mismo criterio que logo principal

---

### 5. **Iconos de Unidades/Ramas**
**Ubicación:** `src/components/About.tsx` - Sección "Nuestras Unidades"  
**Componente:** Tarjetas de Manada, Tropa, Pioneros, Rovers, Staff, Comité  
**Medidas CSS:**
```css
Card Container:
  min-width: 140px
  aspect-ratio: 1/1 (aspect-square)

Contenedor de Icono:
  width: 56px  (w-14)
  height: 56px (h-14)

Icono:
  width: 28px  (w-7)
  height: 28px (h-7)
```
**Medidas Recomendadas para Iconos Personalizados:**
- **Por Icono Individual:** 
  - **SVG:** Viewbox 0 0 512 512 (escalable infinito)
  - **PNG:** 512x512px mínimo con fondo transparente
  - **Óptimo:** 1024x1024px para máxima calidad
- **Aspect Ratio:** 1:1 (cuadrado obligatorio)
- **Formato preferido:** SVG (vectorial, peso mínimo, escalable)
- **Alternativa:** PNG con transparencia
- **Peso por icono:** <20 KB (SVG) o <50 KB (PNG)
- **Colores:** Usar colores específicos de cada unidad (actualmente usa lucide-react icons)

**Iconos a Crear (6 unidades):**
1. **Manada** - Color amarillo/dorado
2. **Tropa** - Color verde
3. **Pioneros** - Color rojo
4. **Rovers** - Color azul oscuro
5. **Staff** - Color púrpura
6. **Comité de Padres** - Color azul claro

---

### 6. **Iconos de Valores**
**Ubicación:** `src/components/About.tsx` - Sección "Nuestros Valores"  
**Medidas CSS:**
```css
Contenedor:
  width: 56px  (w-14)
  height: 56px (h-14)

Icono:
  width: 28px  (w-7)
  height: 28px (h-7)
```
**Estado Actual:** Usa iconos de lucide-react (Users, Heart, Sparkles, Shield)  
**Si quieres personalizarlos:** Mismo criterio que iconos de unidades (512x512px SVG o PNG)

---

### 7. **Imágenes de Galería**
**Ubicación:** `src/pages/Galeria.tsx`  
**Medidas CSS:**
```css
aspect-ratio: 1/1 (aspect-square)
object-fit: cover
```
**Medidas Recomendadas:**
- **Fotografías en Grid:** 800x800px mínimo
- **Óptimo:** 1200x1200px o 1600x1600px
- **Aspect Ratio:** 1:1 (cuadrado)
- **Formato:** JPG optimizado (85-90% calidad)
- **Peso por imagen:** 100-300 KB

---

### 8. **Avatares de Usuario**
**Ubicación:** Perfiles, componentes de usuario  
**Componente:** `src/components/UserAvatar.tsx`  
**Medidas CSS:**
```css
Pequeño: 32px (w-8 h-8)
Mediano: 40px (w-10 h-10)
Grande: 96-160px (w-24-w-40)
```
**Medidas Recomendadas:**
- **Storage en Supabase:** 400x400px
- **Óptimo:** 512x512px
- **Aspect Ratio:** 1:1 (cuadrado)
- **Formato:** JPG o PNG
- **Peso máximo:** 200 KB

---

## 📐 Tabla Resumen de Medidas Recomendadas

| Tipo de Imagen | Medidas Óptimas | Aspect Ratio | Formato | Peso Máx |
|---|---|---|---|---|
| **Logo Principal** | 512x512px | 1:1 | PNG/SVG | 100 KB |
| **Hero Principal** | 2560x1440px | 16:9 | JPG | 500 KB |
| **Comunidad** | 1600x1200px | 4:3 | JPG | 200 KB |
| **Iconos Unidades** | 512x512px | 1:1 | SVG/PNG | 50 KB |
| **Iconos Valores** | 512x512px | 1:1 | SVG/PNG | 50 KB |
| **Galería** | 1200x1200px | 1:1 | JPG | 300 KB |
| **Avatares** | 512x512px | 1:1 | JPG/PNG | 200 KB |

---

## 🎨 Guía de Colores para Iconos de Unidades

Según el diseño actual del sitio, los colores hover de cada unidad son:

1. **Manada**: `bg-yellow-500` (#eab308)
2. **Tropa**: `bg-green-600` (#16a34a)
3. **Pioneros**: `bg-red-600` (#dc2626)
4. **Rovers**: `bg-blue-900` (#1e3a8a)
5. **Staff**: `bg-purple-600` (#9333ea)
6. **Comité de Padres**: `bg-blue-400` (#60a5fa)

---

## 🔧 Cómo Reemplazar las Imágenes

### Para el Logo Principal:
1. Crear/diseñar tu logo en 512x512px (PNG con transparencia o SVG)
2. Reemplazar el archivo: `src/assets/grupo-scout-logo.png`
3. No necesitas cambiar código

### Para Imagen Hero:
1. Preparar imagen 2560x1440px en JPG optimizado
2. Reemplazar: `src/assets/hero-scouts.jpg`
3. No necesitas cambiar código

### Para Imagen Comunidad:
1. Preparar imagen 1600x1200px (4:3) en JPG
2. Reemplazar: `src/assets/community-scouts.jpg`
3. No necesitas cambiar código

### Para Iconos de Unidades:
Actualmente usa iconos de lucide-react. Para usar iconos personalizados:

**Opción 1: Usar SVG directamente**
```tsx
// En src/components/About.tsx
import ManadaIcon from "@/assets/icons/manada.svg";

const branches = [
  {
    title: "Manada",
    icon: () => <img src={ManadaIcon} alt="Manada" className="w-7 h-7" />,
    // ... resto del código
  }
]
```

**Opción 2: Usar como componente SVG**
Crear archivos `.tsx` para cada icono en `src/components/icons/` con el SVG inline.

---

## 📝 Notas Importantes

- **Optimización**: Usa herramientas como TinyPNG, ImageOptim o Squoosh para comprimir
- **Nombres de archivo**: Mantén los nombres existentes para evitar cambios en código
- **Formato SVG**: Preferible para logos e iconos (escalable sin pérdida de calidad)
- **Retina/4K**: Las medidas recomendadas son 2x-4x el tamaño de visualización para pantallas de alta densidad
- **Aspect Ratios**: Respeta los aspect ratios especificados para evitar distorsión

---

## ✅ Checklist de Imágenes a Customizar

- [ ] Logo principal (512x512px PNG/SVG)
- [ ] Imagen Hero (2560x1440px JPG)
- [ ] Imagen Comunidad (1600x1200px JPG)
- [ ] 6 Iconos de Unidades (512x512px SVG/PNG cada uno)
  - [ ] Manada
  - [ ] Tropa
  - [ ] Pioneros
  - [ ] Rovers
  - [ ] Staff
  - [ ] Comité de Padres
- [ ] Iconos de Valores (opcional, 512x512px SVG/PNG)
- [ ] Emblema Scout (si se va a usar)

---

**Generado:** 9 de noviembre de 2025  
**Última actualización:** 9 de noviembre de 2025
