# 📊 Monitoreo - Prometheus & Grafana

Stack de monitoreo completo para Scout Canvas.

---

## 🎯 Servicios de Monitoreo

### Prometheus

**Recolector y almacenamiento de métricas**

- **URL**: http://localhost:9090
- **Intervalo de scraping**: 15 segundos
- **Configuración**: `prometheus.yml`

**Targets monitoreados**:

- ✅ Prometheus (self-monitoring)
- ✅ Backend API Scout (`server:8080/metrics`)
- ✅ PostgreSQL (via postgres_exporter)

### Grafana

**Visualización y dashboards**

- **URL**: http://localhost:3000
- **Usuario**: `admin`
- **Contraseña**: `admin`
- **Datasource**: Prometheus (auto-configurado)

---

## 🚀 Uso Rápido

### (Legacy) Inicio de servicios

Los ejemplos anteriores usaban Docker Compose y fueron removidos. Si deseas restaurarlos, recupera `docker-compose.full.yml` desde el historial de Git.

### Acceder a las interfaces

1. **Prometheus**: http://localhost:9090
   - Ver targets: http://localhost:9090/targets
   - Hacer queries: http://localhost:9090/graph

2. **Grafana**: http://localhost:3000
   - Login: `admin` / `admin`
   - Datasource ya configurado automáticamente

---

## 📈 Métricas Disponibles

### Métricas del Backend API

El servidor expone métricas en `/metrics`:

```bash
curl http://localhost:8080/metrics
```

**Métricas principales**:

| Métrica                          | Tipo      | Descripción                   |
| -------------------------------- | --------- | ----------------------------- |
| `http_requests_total`            | Counter   | Total de requests HTTP        |
| `http_request_duration_seconds`  | Histogram | Duración de requests          |
| `nodejs_heap_size_total_bytes`   | Gauge     | Memoria heap de Node.js       |
| `nodejs_heap_size_used_bytes`    | Gauge     | Memoria heap usada            |
| `process_cpu_user_seconds_total` | Counter   | Tiempo CPU usado              |
| `process_resident_memory_bytes`  | Gauge     | Memoria residente del proceso |

### Métricas de PostgreSQL

El `postgres_exporter` expone métricas de la base de datos:

| Métrica                 | Descripción                          |
| ----------------------- | ------------------------------------ |
| `pg_up`                 | Estado de la conexión (1=up, 0=down) |
| `pg_stat_database_*`    | Estadísticas de base de datos        |
| `pg_stat_user_tables_*` | Estadísticas de tablas               |
| `pg_locks_count`        | Número de locks activos              |

---

## 📊 Crear Dashboards en Grafana

### Importar dashboard pre-configurado

1. Ir a Grafana: http://localhost:3000
2. Login: `admin` / `admin`
3. **+ → Import**
4. Usar IDs de dashboards populares:
   - **Node.js Application Dashboard**: `11159`
   - **PostgreSQL Database**: `9628`
   - **Express.js Dashboard**: `10959`

### Crear dashboard personalizado

1. **+ → Create → Dashboard**
2. **Add visualization**
3. Seleccionar datasource: **Prometheus**
4. Escribir query PromQL:

```promql
# Requests por segundo
rate(http_requests_total[5m])

# Uso de memoria
nodejs_heap_size_used_bytes / nodejs_heap_size_total_bytes * 100

# Duración promedio de requests
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])

# Conexiones activas a PostgreSQL
pg_stat_activity_count
```

---

## 🔍 Queries Útiles de Prometheus

### Rendimiento del Backend

```promql
# Tasa de requests por segundo
rate(http_requests_total[5m])

# Requests por método HTTP
sum by (method) (rate(http_requests_total[5m]))

# Requests por endpoint
sum by (path) (rate(http_requests_total[5m]))

# Percentil 95 de latencia
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

### Recursos del Sistema

```promql
# Uso de CPU
rate(process_cpu_user_seconds_total[5m]) * 100

# Uso de memoria (MB)
nodejs_heap_size_used_bytes / 1024 / 1024

# Garbage collection
rate(nodejs_gc_duration_seconds_sum[5m])
```

### Base de Datos

```promql
# Conexiones activas
pg_stat_activity_count

# Transacciones por segundo
rate(pg_stat_database_xact_commit[5m])

# Tamaño de la base de datos
pg_database_size_bytes
```

---

## ⚠️ Configurar Alertas

### Crear archivo de alertas

Editar `prometheus.yml` y agregar:

```yaml
rule_files:
  - "alerts.yml"
```

### Ejemplo de alertas (`alerts.yml`)

```yaml
groups:
  - name: scout_alerts
    interval: 30s
    rules:
      # Alerta si el servidor está caído
      - alert: ServerDown
        expr: up{job="scout-backend"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Backend API está caído"
          description: "El servidor no responde desde hace {{ $value }} minutos"

      # Alerta si la latencia es muy alta
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Latencia alta detectada"
          description: "P95 latency: {{ $value }}s"

      # Alerta si el uso de memoria es alto
      - alert: HighMemoryUsage
        expr: (nodejs_heap_size_used_bytes / nodejs_heap_size_total_bytes) > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Uso de memoria alto"
          description: "Heap usage: {{ $value | humanizePercentage }}"
```

---

## 🛠️ Troubleshooting

### Prometheus no recolecta métricas del backend

1. Verificar que el servidor expone `/metrics`:

   ```bash
   curl http://localhost:8080/metrics
   ```

2. Ver targets en Prometheus:
   - http://localhost:9090/targets
   - Estado debe ser "UP"

3. Verificar configuración en `prometheus.yml`:
   ```yaml
   - job_name: "scout-backend"
     static_configs:
       - targets: ["server:8080"]
   ```

### Grafana no muestra datos

1. Verificar datasource:
   - **Configuration → Data Sources → Prometheus**
   - URL debe ser: `http://prometheus:9090`
   - Click en "Save & Test"

2. Verificar que hay métricas en Prometheus:
   - http://localhost:9090/graph
   - Query: `up{job="scout-backend"}`

### Ver logs de los servicios

```bash
# Logs de Prometheus
docker compose -f docker-compose.full.yml logs prometheus -f

# Logs de Grafana
docker compose -f docker-compose.full.yml logs grafana -f
```

---

## 📚 Recursos

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [PromQL Cheat Sheet](https://promlabs.com/promql-cheat-sheet/)
- [Node.js Metrics with prom-client](https://github.com/siimon/prom-client)

---

**Stack completo funcionando** 🎉

Ahora tienes visibilidad completa del rendimiento de tu aplicación Scout Canvas.
