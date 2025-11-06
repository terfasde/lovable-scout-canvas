# Configuración de Avatares en Supabase

Esta guía explica cómo configurar el almacenamiento de fotos de perfil (avatares) en Supabase.

## Pasos de configuración

### 1. Actualizar la tabla profiles

Ejecuta el siguiente SQL en **SQL Editor** de Supabase:

```sql
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

### 2. Crear el bucket de storage

1. Ve a **Storage** en el dashboard de Supabase
2. Haz clic en **New bucket**
3. Configura:
   - **Name**: `avatars`
   - **Public bucket**: ✅ **SÍ** (marcado)
   - **File size limit**: `4194304` (4MB en bytes)
   - **Allowed MIME types**: `image/*`
4. Haz clic en **Create bucket**

### 3. Configurar políticas RLS para el bucket

En **SQL Editor**, ejecuta las siguientes políticas:

```sql
-- Permitir a usuarios subir sus propios avatares
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Permitir a usuarios actualizar sus propios avatares
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Permitir a usuarios eliminar sus propios avatares
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Permitir lectura pública de avatares
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

## Verificación

1. Inicia sesión en la aplicación
2. Ve a **Editar perfil**
3. Haz clic en **Subir foto**
4. Selecciona una imagen (JPG, PNG o GIF, máximo 4MB)
5. Haz clic en **Guardar cambios**
6. Verifica que la foto aparece en:
   - El dropdown de perfil en la navegación
   - La página de ver perfil
   - La página de perfil público (si está habilitado)

## Funcionalidades implementadas

- ✅ Subida de foto de perfil
- ✅ **Editor de imagen con recorte circular** (estilo WhatsApp)
- ✅ **Control de zoom** para ajustar la imagen
- ✅ **Arrastrar para posicionar** la imagen dentro del círculo
- ✅ Preview en tiempo real del recorte
- ✅ Validación de tipo de archivo (solo imágenes)
- ✅ Validación de tamaño (máximo 4MB)
- ✅ Eliminación de foto anterior al subir nueva
- ✅ Botón para eliminar foto actual
- ✅ Mostrar iniciales cuando no hay foto
- ✅ Dropdown de perfil mejorado con iconos y separadores
- ✅ Avatar consistente en todas las vistas
- ✅ Imágenes siempre cuadradas (sin deformación)

## Componentes creados/modificados

- **`UserAvatar.tsx`**: Componente reutilizable que muestra foto o iniciales
- **`AvatarCropDialog.tsx`**: Editor de imagen con recorte circular, zoom y posicionamiento
- **`Navigation.tsx`**: Dropdown mejorado con avatar dinámico
- **`Perfil.tsx`**: Upload de foto con editor interactivo y validación
- **`PerfilView.tsx`**: Vista de perfil con avatar
- **`PerfilPublic.tsx`**: Perfil público con avatar

## Cómo funciona el editor de avatar

1. El usuario hace clic en **"Subir foto"**
2. Selecciona una imagen de su dispositivo
3. Se abre un **diálogo modal** con el editor
4. El usuario puede:
   - **Arrastrar** la imagen para posicionarla
   - Usar el **slider de zoom** para acercar/alejar
   - Ver el **preview en tiempo real** del recorte circular
5. Al hacer clic en **"Guardar foto"**, la imagen se recorta y procesa
6. La imagen recortada se sube a Supabase Storage
7. El avatar se actualiza en todas las vistas

## Tecnologías utilizadas

- **react-easy-crop**: Librería para el recorte de imágenes con soporte táctil
- **Canvas API**: Para procesar y convertir la imagen recortada
- **Blob API**: Para manejar la imagen como archivo binario antes de subirla

## Estructura de storage

Los avatares se guardan en:

```
avatars/
  {user_id}/
    {timestamp}.{extension}
```

Ejemplo:

```
avatars/
  abc-123-def/
    1730304123456.jpg
```

## Troubleshooting

### La foto no se sube

- Verifica que el bucket `avatars` existe y es público
- Confirma que las políticas RLS están activas
- Revisa que el tamaño no supere 4MB
- Asegúrate de que el archivo es una imagen válida

### No se ve la foto

- Verifica que la URL en `profiles.avatar_url` es correcta
- Confirma que el bucket es público
- Revisa la política "Anyone can view avatars"

### Error de permisos

- Verifica que el usuario está autenticado
- Confirma que las políticas usan `auth.uid()`
- Revisa que el `user_id` en la carpeta coincide con el usuario actual
