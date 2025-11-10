# 🔧 Scripts de Utilidad

Scripts auxiliares para facilitar el desarrollo y operación del proyecto.

---

## 📜 Scripts Disponibles

### `start.ps1` / `start.sh` (LEGACY)

Script legado para gestionar entornos Docker eliminados. Ya no se usa en el flujo estándar.

**Uso en Windows (PowerShell)**:

```powershell
.\scripts\start.ps1 <comando>
```

**Uso en Linux/Mac (Bash)**:

```bash
chmod +x scripts/start.sh
./scripts/start.sh <comando>
```

**Comandos**:

| Comando | Descripción (legacy)                                  |
| ------- | ----------------------------------------------------- |
| `full`  | Levantaba arquitectura completa (removida)            |
| `dev`   | Levantaba modo desarrollo con Docker (removido)       |
| `stop`  | Detenía contenedores Docker                           |

**Ejemplos**:

```powershell
# Ejemplos legacy (ya no funcionales tras la limpieza Docker)
.\scripts\start.ps1 full
.\scripts\start.ps1 dev
.\scripts\start.ps1 stop
```

---

### `deploy.ps1`

Empaqueta un build listo para subir a hosting estático, generando una carpeta versionada en `artifacts/<env>/` y un `MANIFEST.txt` con tamaños.

Opciones:

- Entornos: `staging` | `prod` (default `prod`)
- `-Zip` para crear un `.zip` además de la carpeta
- `-Destination <ruta>` para copiar el artefacto a un destino (p. ej., pendrive)

Uso rápido (PowerShell en Windows):

```powershell
# Staging
.\scripts\build.ps1 staging
.\scripts\deploy.ps1 staging -Zip

# Producción
.\scripts\deploy.ps1 prod -Zip

# Copiar a un destino (ej. E:\deploy)
.\scripts\deploy.ps1 prod -Zip -Destination "E:\deploy"

# Vía npm scripts
npm run deploy:staging
npm run deploy:staging:zip
npm run deploy:prod
npm run deploy:prod:zip

# Pasar parámetros extra a PowerShell a través de npm
npm run deploy:prod -- --Destination "E:\deploy"
```

Resultado:

- `artifacts/staging/dist-YYYYMMDD-HHMM/` o `artifacts/prod/dist-YYYYMMDD-HHMM/`
- `MANIFEST.txt` con listado de archivos y tamaños
- ZIP opcional si usas `-Zip`

---

### `export-to-pendrive.ps1`

**Exportar proyecto a un pendrive o disco externo**

Copia el proyecto completo excluyendo archivos innecesarios (node_modules, dist, .git, etc.)

**Uso**:

```powershell
# Modo interactivo (te pregunta la ruta de destino)
.\scripts\export-to-pendrive.ps1

# Especificar ruta directamente
.\scripts\export-to-pendrive.ps1 E:\lovable-scout-canvas
```

**¿Qué excluye?**:

- `node_modules/` (se regenera con npm install)
- `dist/` (archivos compilados)
- `.git/` (historial de Git)
- `server/node_modules/`
- `server/dist/`
- Archivos temporales y cache

**Después de copiar a la nueva computadora**:

1. Ver instrucciones en `INSTALACION.md`
2. Ejecutar `npm install` en raíz y en `server/`
3. Configurar archivo `.env`
4. Ejecutar `npm run dev`

---

### `add-docker-to-path.ps1` (LEGACY)

Script para agregar Docker al PATH (ya no requerido).

---

### `run-docker-dev.cmd` (LEGACY)

Script batch legacy para levantar Docker (removido).

---

## 🛠️ Crear Nuevos Scripts

### Convenciones

1. **Nombres descriptivos**: `nombre-accion.ps1` o `nombre-accion.sh`
2. **Comentarios**: Incluir descripción al inicio del archivo
3. **Cross-platform**: Crear versión `.ps1` (Windows) y `.sh` (Linux/Mac)
4. **Documentar**: Agregar entrada en este README

### Ejemplo de Script PowerShell

```powershell
# Mi Script de Ejemplo
# Descripción: Hace algo útil

param(
    [string]$Opcion = "default"
)

Write-Host "Ejecutando con opción: $Opcion" -ForegroundColor Green

# Tu código aquí
```

### Ejemplo de Script Bash

```bash
#!/bin/bash
# Mi Script de Ejemplo
# Descripción: Hace algo útil

OPCION=${1:-default}

echo "Ejecutando con opción: $OPCION"

# Tu código aquí
```

---

## 📚 Documentación Relacionada

> Se eliminaron referencias a documentación Docker. Recuperable vía historial Git si fuera necesario.

---

**¿Necesitas un nuevo script?** Crea un issue o contribuye con un PR.
