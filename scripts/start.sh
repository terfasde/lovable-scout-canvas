#!/bin/bash
# Script de inicio rápido para Docker Compose (Linux/Mac)
# Uso: ./start.sh [modo]
#   ./start.sh dev     → Modo desarrollo simple (SQLite)
#   ./start.sh full    → Arquitectura completa (PostgreSQL + Monitoreo)
#   ./start.sh stop    → Detener servicios

set -e

MODO="${1:-full}"

echo "🐋 Docker Compose - Aplicación Scout"
echo "===================================="
echo ""

show_menu() {
    echo "Modos disponibles:"
    echo "  dev   - Desarrollo simple (web + server + SQLite)"
    echo "  full  - Arquitectura completa (PostgreSQL + PgAdmin + Prometheus + Grafana)"
    echo "  stop  - Detener servicios actuales"
    echo ""
}

start_dev() {
    echo "🚀 Iniciando modo DESARROLLO (SQLite)..."
    echo ""
    docker compose -f docker-compose.dev.yml up -d
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Servicios iniciados correctamente!"
        echo ""
        echo "Accede a:"
        echo "  Frontend:  http://localhost:5173"
        echo "  Backend:   http://localhost:8080"
        echo ""
        echo "Ver logs:    docker compose -f docker-compose.dev.yml logs -f"
        echo "Detener:     docker compose -f docker-compose.dev.yml down"
        echo ""
    fi
}

start_full() {
    echo "🚀 Iniciando arquitectura COMPLETA (PostgreSQL + Monitoreo)..."
    echo ""
    docker compose -f docker-compose.full.yml up -d
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Todos los servicios iniciados correctamente!"
        echo ""
        echo "Accede a:"
        echo "  Frontend:   http://localhost:5173"
        echo "  Backend:    http://localhost:8080"
        echo "  PgAdmin:    http://localhost:5050  (admin@scout.local / admin123)"
        echo "  Prometheus: http://localhost:9090"
        echo "  Grafana:    http://localhost:3000  (admin / admin123)"
        echo ""
        echo "Ver logs:    docker compose -f docker-compose.full.yml logs -f"
        echo "Detener:     docker compose -f docker-compose.full.yml down"
        echo ""
        echo "📚 Documentación completa: DOCKER_ARCHITECTURE.md"
        echo ""
    fi
}

stop_services() {
    echo "🛑 Deteniendo servicios..."
    echo ""
    
    echo "Deteniendo modo dev..."
    docker compose -f docker-compose.dev.yml down 2>/dev/null || true
    
    echo "Deteniendo modo full..."
    docker compose -f docker-compose.full.yml down 2>/dev/null || true
    
    echo ""
    echo "✅ Servicios detenidos"
    echo ""
}

# Main
case "$MODO" in
    dev)
        start_dev
        ;;
    full)
        start_full
        ;;
    stop)
        stop_services
        ;;
    help|--help|-h)
        show_menu
        ;;
    *)
        echo "⚠️  Modo '$MODO' no reconocido"
        echo ""
        show_menu
        echo "Uso: ./start.sh [dev|full|stop]"
        echo ""
        exit 1
        ;;
esac
