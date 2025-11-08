# Checklist de Funcionalidades - Lovable Deployment

## ✅ Configuración Inicial

### Variables de Entorno en Lovable
- [ ] `VITE_SUPABASE_URL` configurada
- [ ] `VITE_SUPABASE_ANON_KEY` configurada
- [ ] `VITE_GOOGLE_MAPS_API_KEY` configurada
- [ ] `VITE_GALLERY_ADMIN_EMAILS` configurada
- [ ] **NO** incluir `VITE_BACKEND` (o dejar vacía para usar Supabase)

### Migraciones de Supabase
- [ ] Todas las migraciones aplicadas en el proyecto de Supabase
- [ ] Tablas existentes: profiles, eventos, gallery_images, messages, conversations, follows, groups, group_members, group_messages
- [ ] Storage buckets: avatars, gallery, thread-images, group-covers

## 🔐 Autenticación

### Registro
- [ ] Puede registrar nuevo usuario con email y contraseña
- [ ] Muestra mensaje de confirmación de email
- [ ] Se crea perfil automáticamente al registrarse
- [ ] No muestra errores de CORS o API

### Login
- [ ] Puede iniciar sesión con credenciales válidas
- [ ] Muestra error claro con credenciales inválidas
- [ ] Redirige a página principal después del login
- [ ] Mantiene sesión al recargar página

### Logout
- [ ] Cierra sesión correctamente
- [ ] Limpia todos los datos de sesión
- [ ] Redirige a página de login
- [ ] No permite acceder a rutas protegidas después

### Recuperación de Contraseña
- [ ] Envía email de recuperación
- [ ] Link funciona correctamente
- [ ] Puede cambiar contraseña

## 👤 Perfiles

### Perfil Propio
- [ ] Muestra información correcta del usuario
- [ ] Puede editar nombre completo
- [ ] Puede cambiar foto de perfil
- [ ] Puede actualizar biografía
- [ ] Puede cambiar visibilidad (público/privado)
- [ ] Puede cambiar username
- [ ] Cambios se guardan correctamente

### Perfiles Públicos
- [ ] Puede ver perfiles de otros usuarios
- [ ] URL de perfil público funciona (/perfil/:username)
- [ ] Respeta configuración de privacidad
- [ ] No muestra información privada si perfil es privado

## 📅 Eventos

### Visualización
- [ ] Lista de eventos se carga correctamente
- [ ] Muestra detalles de cada evento
- [ ] Imágenes se cargan correctamente
- [ ] Fechas se muestran en formato correcto
- [ ] Mapa de ubicación funciona (si aplica)

### Administración (Solo Admins)
- [ ] Puede crear nuevos eventos
- [ ] Puede editar eventos existentes
- [ ] Puede eliminar eventos
- [ ] Puede subir imágenes para eventos

## 🖼️ Galería

### Visualización
- [ ] Imágenes se cargan correctamente
- [ ] Grid de galería se muestra bien
- [ ] Modal de imagen completa funciona
- [ ] Puede navegar entre imágenes

### Administración (Solo Admins)
- [ ] Puede subir nuevas imágenes
- [ ] Puede organizar en álbumes
- [ ] Puede eliminar imágenes
- [ ] Las imágenes se suben a Supabase Storage

## 💬 Mensajería

### Mensajes Directos
- [ ] Puede ver lista de conversaciones
- [ ] Puede enviar mensajes nuevos
- [ ] Mensajes se entregan en tiempo real
- [ ] Puede ver mensajes antiguos
- [ ] Notificaciones funcionan

### Chat Grupal
- [ ] Puede ver grupos
- [ ] Puede unirse a grupos
- [ ] Puede enviar mensajes en grupos
- [ ] Mensajes grupales en tiempo real

## 🏕️ Grupos/Ramas

### Visualización
- [ ] Página de Manada carga correctamente
- [ ] Página de Tropa carga correctamente
- [ ] Página de Pioneros carga correctamente
- [ ] Página de Rovers carga correctamente
- [ ] Página de Staff/Comité carga correctamente
- [ ] Contenido se muestra apropiadamente

## 📍 Otras Páginas

### Navegación
- [ ] Página de inicio (Hero) carga correctamente
- [ ] Página "Acerca de" funciona
- [ ] Página de Historia funciona
- [ ] Página de Línea Temporal funciona
- [ ] Página de Contacto funciona
- [ ] Todas las animaciones funcionan

### UI/UX
- [ ] Navegación responsive funciona en móvil
- [ ] Menú hamburguesa funciona en móvil
- [ ] Tema/estilos se aplican correctamente
- [ ] Componentes shadcn/ui funcionan
- [ ] Toasts/notificaciones se muestran
- [ ] Loading states funcionan

## 🔍 Errores Comunes a Verificar

### En la Consola del Navegador
- [ ] No hay errores de CORS
- [ ] No hay errores "Failed to fetch"
- [ ] No hay errores "Invalid API key"
- [ ] No hay errores de autenticación
- [ ] No hay warnings críticos de React

### En Supabase Dashboard
- [ ] Las queries se ejecutan correctamente
- [ ] No hay errores en los logs
- [ ] RLS policies permiten acceso apropiado
- [ ] Storage policies permiten subir archivos

### En Lovable
- [ ] Build se completa sin errores
- [ ] Deploy es exitoso
- [ ] Variables de entorno están configuradas
- [ ] No hay errores en los logs de deployment

## 🚀 Performance

### Carga Inicial
- [ ] Página carga en menos de 3 segundos
- [ ] Imágenes se cargan progresivamente
- [ ] No hay bloqueos de render

### Navegación
- [ ] Transiciones entre páginas son suaves
- [ ] No hay lag al cambiar de ruta
- [ ] Scroll es fluido

## 🐛 Testing de Escenarios

### Nuevo Usuario
1. [ ] Registrarse con email nuevo
2. [ ] Recibir email de confirmación
3. [ ] Confirmar email (click en link)
4. [ ] Iniciar sesión
5. [ ] Completar perfil
6. [ ] Subir foto de perfil
7. [ ] Hacer perfil público
8. [ ] Explorar la aplicación

### Usuario Existente
1. [ ] Iniciar sesión
2. [ ] Ver perfil propio
3. [ ] Editar información
4. [ ] Ver eventos
5. [ ] Ver galería
6. [ ] Enviar mensaje a otro usuario
7. [ ] Cerrar sesión

### Flujo de Mensajería
1. [ ] Usuario A inicia sesión
2. [ ] Usuario A va a perfil de Usuario B
3. [ ] Usuario A envía mensaje a Usuario B
4. [ ] Usuario B inicia sesión
5. [ ] Usuario B ve notificación de mensaje
6. [ ] Usuario B responde mensaje
7. [ ] Usuario A recibe respuesta en tiempo real

## 📝 Notas

### Problemas Encontrados
```
(Anota aquí cualquier problema que encuentres)


```

### Mejoras Sugeridas
```
(Anota aquí ideas para mejorar)


```

### Contacto de Soporte
Si encuentras problemas:
1. Revisa los logs en la consola del navegador (F12)
2. Revisa los logs de Supabase
3. Verifica las variables de entorno en Lovable
4. Consulta LOVABLE_ENV_SETUP.md para configuración
