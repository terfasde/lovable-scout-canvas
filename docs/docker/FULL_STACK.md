# Full Dev Stack (Docker)

Este stack brinda un entorno completo de desarrollo con:

- web: Vite + React (app)
- postgres: Base de datos PostgreSQL 16
- pgadmin: UI para administrar la base
- mailhog: SMTP para pruebas (captura y visualización de correos)
- minio: Almacenamiento S3-compatible para subir archivos localmente

> Nota: La app actualmente usa un mock local (localStorage + base64) para storage y DB. Este stack permite migrar fácilmente a servicios reales cuando lo decidas.

## Comandos rápidos

- Levantar todo:

```powershell
npm run docker:full
```

- Ver logs de todos los servicios:

```powershell
npm run docker:full:logs
```

- Detener y borrar volúmenes:

```powershell
npm run docker:full:down
```

## Puertos y accesos

- App (web): http://localhost:5173/
- PostgreSQL: localhost:5432 (scoutuser / scout_secure_password_2024, DB: scoutdb)
- pgAdmin: http://localhost:5050 (admin@scout.local / admin123)
- Mailhog (UI): http://localhost:8025 (SMTP: 1025)
- MinIO (Console): http://localhost:9001 (API S3: 9000) — minio / minio12345

## Variables útiles (futuras integraciones)

Cuando quieras conectar la app a estos servicios, podrás exponer variables:

- Database
  - VITE_DB_URL (o configurar en un backend)
- Storage
  - VITE_STORAGE=minio
  - VITE_MINIO_ENDPOINT=http://localhost:9000
  - VITE_MINIO_ACCESS_KEY=minio
  - VITE_MINIO_SECRET_KEY=minio12345
- SMTP
  - VITE_SMTP_HOST=localhost
  - VITE_SMTP_PORT=1025

## Preguntas frecuentes

- ¿Por qué la app usa todavía localStorage?
  - Para que funcione 100% standalone y offline sin depender de contenedores. El stack full está listo para cuando quieras dar el paso a servicios reales.

- ¿Puedo mantener ambos modos?
  - Sí. Usa `docker-compose.yml` para modo simple (solo web) y `docker-compose.full.yml` para el stack completo.

- ¿Se puede usar Supabase local?
  - Sí, pero requiere el CLI de Supabase o un compose específico multi-servicio (Gotrue, Realtime, etc.). Si te interesa, lo armamos como siguiente iteración.

## Siguientes pasos (opcionales)

- Agregar un backend ligero (Node/Express) para usar Postgres real
- Cambiar el mock de `storage` para usar MinIO cuando `VITE_STORAGE=minio`
- Añadir seeds/migraciones para Postgres
