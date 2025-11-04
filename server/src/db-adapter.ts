import pg from 'pg'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type BetterSqliteDatabase = ReturnType<typeof Database>

// Determinar qué tipo de base de datos usar
const currentDbType = process.env.DB_TYPE || 'sqlite'

/**
 * Conexión a PostgreSQL
 */
let pgPool: pg.Pool | null = null

if (currentDbType === 'postgres') {
  const { Pool } = pg
  pgPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'scoutdb',
    user: process.env.DB_USER || 'scoutuser',
    password: process.env.DB_PASSWORD || '',
    max: 20, // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

  // Verificar conexión
  pgPool.on('connect', () => {
    console.log('✅ Conectado a PostgreSQL')
  })

  pgPool.on('error', (err: Error) => {
    console.error('❌ Error en PostgreSQL:', err)
  })
}

/**
 * Conexión a SQLite (fallback)
 */
let sqliteDb: BetterSqliteDatabase | null = null

if (currentDbType === 'sqlite') {
  const dataDir = path.join(__dirname, '../data')
  sqliteDb = new Database(path.join(dataDir, 'app.db'))
  sqliteDb.pragma('journal_mode = WAL')
  console.log('✅ Usando SQLite en:', path.join(dataDir, 'app.db'))
}

/**
 * Wrapper unificado para queries
 */
export const query = async (sql: string, params: any[] = []): Promise<any[]> => {
  if (currentDbType === 'postgres' && pgPool) {
    const result = await pgPool.query(sql, params)
    return result.rows
  } else if (currentDbType === 'sqlite' && sqliteDb) {
    // Convertir sintaxis PostgreSQL ($1, $2) a SQLite (?, ?)
    const sqliteSql = sql.replace(/\$\d+/g, '?')
    const stmt = sqliteDb.prepare(sqliteSql)
    
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return stmt.all(...params)
    } else {
      const info = stmt.run(...params)
      return [{ lastID: info.lastInsertRowid, changes: info.changes }]
    }
  }
  throw new Error('No hay conexión a base de datos disponible')
}

/**
 * Ejecutar query con un solo resultado
 */
export const queryOne = async (sql: string, params: any[] = []): Promise<any | null> => {
  const results = await query(sql, params)
  return results.length > 0 ? results[0] : null
}

/**
 * Cerrar conexiones
 */
export const closeDb = async () => {
  if (pgPool) {
    await pgPool.end()
    console.log('🔌 PostgreSQL desconectado')
  }
  if (sqliteDb) {
    sqliteDb.close()
    console.log('🔌 SQLite cerrado')
  }
}

// Exportar el pool directamente para casos especiales
export { pgPool, sqliteDb }
export const db = sqliteDb // Mantener compatibilidad con código existente
export const dbType = currentDbType
