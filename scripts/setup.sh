#!/usr/bin/env bash
set -euo pipefail

# scripts/setup.sh — Instalador completo para desarrollo local
# Uso: bash scripts/setup.sh
# - Detecta Debian/Ubuntu y propone instalar paquetes de sistema
# - Instala nvm y Node 20.17.0 (si no está presente)
# - Instala dependencias npm en la raíz y en server/
# - Configura Husky (pre-commit) y lint-staged
# - Ejecuta checks básicos (type-check, lint, tests)

PROJ_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NODE_VERSION="20.17.0"

echo "🔧 Inicio del setup automático — proyecto: $PROJ_ROOT"

# Helpers
info() { echo "[INFO] $*"; }
warn() { echo "[WARN] $*"; }
error() { echo "[ERROR] $*"; exit 1; }

# Detectar Debian/Ubuntu
if [ -f /etc/debian_version ]; then
  DISTRO="debian"
else
  DISTRO="other"
fi

# 1) Instalar paquetes del sistema necesarios (solo Debian/Ubuntu)
if [ "$DISTRO" = "debian" ]; then
  info "Instalando paquetes de sistema (build-essential python3 pkg-config libsqlite3-dev curl git)..."
  sudo apt update
  sudo apt install -y build-essential python3 pkg-config libsqlite3-dev curl git ca-certificates
fi

# 2) Instalar nvm si no existe
NVM_DIR="$HOME/.nvm"

if ! command -v nvm >/dev/null 2>&1; then
  if [ -d "$NVM_DIR" ]; then
    info "nvm detectado en $NVM_DIR, cargando..."
    # shellcheck source=/dev/null
    export NVM_DIR="$NVM_DIR"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" || true
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" || true
  else
    info "Instalando nvm..."
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
    # Asegurarnos de cargar nvm en esta sesión
    export NVM_DIR="$NVM_DIR"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
      # shellcheck source=/dev/null
      \. "$NVM_DIR/nvm.sh"
      [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" || true
    else
      warn "No se pudo cargar nvm inmediatamente. Podés abrir una nueva terminal o ejecutar: export NVM_DIR=\"$NVM_DIR\" && source \"$NVM_DIR/nvm.sh\""
    fi
  fi
else
  info "nvm ya instalado: $(nvm --version 2>/dev/null || echo 'unknown')"
fi

# 3) Instalar Node versión requerida usando nvm
if command -v node >/dev/null 2>&1; then
  CURRENT_NODE=$(node -v)
  info "Node actual: $CURRENT_NODE"
fi

if ! command -v nvm >/dev/null 2>&1; then
  warn "nvm no disponible — no puedo instalar Node automáticamente. Instalá Node $NODE_VERSION manualmente o con asdf."
else
  if nvm ls "$NODE_VERSION" >/dev/null 2>&1; then
    info "Node $NODE_VERSION ya instalado via nvm"
  else
    info "Instalando Node $NODE_VERSION via nvm..."
    nvm install "$NODE_VERSION"
  fi
  info "Usando Node $NODE_VERSION"
  nvm use "$NODE_VERSION" >/dev/null
  nvm alias default "$NODE_VERSION" >/dev/null || true
fi

# 4) Verificar node & npm
if ! command -v node >/dev/null 2>&1; then
  error "Node no disponible. Instalá Node $NODE_VERSION y re-ejecutá este script."
fi
info "Node version: $(node -v)"
info "npm version: $(npm -v)"

# 5) Copiar .env.example -> .env.local si hace falta (NO sobrescribe)
cd "$PROJ_ROOT"
if [ -f .env.local ]; then
  info ".env.local ya existe — no se sobrescribe"
elif [ -f .env.example ]; then
  cp .env.example .env.local
  info "Copié .env.example -> .env.local (editá .env.local para valores locales)"
else
  warn "No existe .env.example — creá .env.local manualmente si corresponde"
fi

# 6) Instalar dependencias npm (preferir ci, fallback a install)
info "Instalando dependencias del frontend..."
if npm ci --silent; then
  info "npm ci completado"
else
  warn "npm ci falló; intentando 'npm install'..."
  npm install --silent
fi

# 7) Instalar dependencias del backend (si existe server/package.json)
if [ -d server ] && [ -f server/package.json ]; then
  info "Instalando dependencias del backend..."
  (cd server && npm install --silent)
fi

# 8) Configurar husky + lint-staged
info "Configurando Husky y lint-staged..."
if npm run -s prepare >/dev/null 2>&1; then
  info "husky install ejecutado"
else
  warn "No se pudo ejecutar 'npm run prepare' — revisá la configuración de npm scripts"
fi
if [ -f scripts/setup-husky.sh ]; then
  chmod +x scripts/setup-husky.sh
  ./scripts/setup-husky.sh || warn "No se pudo crear hook husky automáticamente"
fi

# 9) Ejecutar checks: type-check, lint, tests (no fallo bloqueante)
info "Ejecutando chequeos: type-check, lint, tests (no son bloqueantes)..."
if npm run -s type-check; then
  info "Type-check OK"
else
  warn "Type-check falló — revisá errores"
fi

if npm run -s lint; then
  info "Lint OK"
else
  warn "Lint mostró advertencias/errores"
fi

if npm run -s test:ci; then
  info "Tests corrieron OK"
else
  warn "Tests fallaron o no pudieron correr; revisá 'npm run test'"
fi

# 10) Sugerencia para el developer
cat <<EOF

✅ Setup finalizado (pasos intentados):
  - Paquetes de sistema instalados (si era Debian/Ubuntu)
  - nvm + Node $NODE_VERSION instalado y seleccionado
  - Dependencias npm instaladas en root y server/
  - Husky (pre-commit) intentado configurar
  - Ejecutados checks: type-check, lint, test

Siguientes pasos recomendados:
  1) Revisar y completar .env.local con tus valores locales
  2) Ejecutar 'npm run dev' para iniciar el entorno de desarrollo
  3) Probar rutas críticas y flujos (login, perfil, subida de imágenes)

EOF

exit 0
