import { Router } from 'express'
import client from 'prom-client'

const router = Router()

// Crear registro de métricas
const register = new client.Registry()

// Añadir métricas por defecto (CPU, memoria, etc.)
client.collectDefaultMetrics({ register })

// Métricas personalizadas
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duración de peticiones HTTP en ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000]
})

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP',
  labelNames: ['method', 'route', 'status_code']
})

const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Número de conexiones activas'
})

const dbQueryDuration = new client.Histogram({
  name: 'db_query_duration_ms',
  help: 'Duración de queries a base de datos en ms',
  labelNames: ['query_type'],
  buckets: [0.1, 1, 5, 10, 50, 100, 500]
})

// Registrar métricas personalizadas
register.registerMetric(httpRequestDuration)
register.registerMetric(httpRequestsTotal)
register.registerMetric(activeConnections)
register.registerMetric(dbQueryDuration)

// Middleware para medir peticiones HTTP
export const metricsMiddleware = (req: any, res: any, next: any) => {
  const start = Date.now()
  
  // Incrementar conexiones activas
  activeConnections.inc()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    const route = req.route?.path || req.path || 'unknown'
    
    // Registrar duración
    httpRequestDuration
      .labels(req.method, route, res.statusCode.toString())
      .observe(duration)
    
    // Incrementar contador
    httpRequestsTotal
      .labels(req.method, route, res.statusCode.toString())
      .inc()
    
    // Decrementar conexiones activas
    activeConnections.dec()
  })
  
  next()
}

// Endpoint de métricas
router.get('/metrics', async (_req: any, res: any) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})

// Endpoint de health check
router.get('/health', (_req: any, res: any) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    dbType: process.env.DB_TYPE || 'sqlite'
  })
})

// Exportar métricas personalizadas para uso en otros módulos
export { dbQueryDuration, activeConnections }
export default router
