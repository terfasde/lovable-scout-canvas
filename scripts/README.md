# 🔧 Scripts de Utilidad

Scripts auxiliares para facilitar el desarrollo y operación del proyecto.

---

## 📜 Scripts Disponibles

### `start.ps1` / `start.sh`

**Script principal para gestionar Docker**

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

| Comando | Descripción |
|---------|-------------|
| `full` | Inicia arquitectura completa (PostgreSQL + Monitoreo) |
| `dev` | Inicia modo desarrollo simple (SQLite) |
| `stop` | Detiene todos los servicios Docker |

**Ejemplos**:
```powershell
# Arquitectura completa con PostgreSQL, Prometheus y Grafana
.\scripts\start.ps1 full

# Desarrollo rápido con SQLite
.\scripts\start.ps1 dev

# Detener todo
.\scripts\start.ps1 stop
```

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

### `add-docker-to-path.ps1`

**Agregar Docker al PATH de Windows**

Útil si Docker no está en el PATH del sistema.

**Uso**:
```powershell
.\scripts\add-docker-to-path.ps1
```

---

### `run-docker-dev.cmd`

**Script batch para Windows CMD**

Alternativa al start.ps1 para usuarios que no pueden ejecutar PowerShell.

**Uso**:
```cmd
scripts\run-docker-dev.cmd
```

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

- **[Docker Quick Start](../docs/docker/QUICK_START.md)** - Uso de Docker
- **[Docker Architecture](../docs/docker/ARCHITECTURE.md)** - Arquitectura completa

---

**¿Necesitas un nuevo script?** Crea un issue o contribuye con un PR.
