/**
 * Rate limiting middleware para proteger el API backend
 * Previene abuso y ataques DDoS simples
 */

interface RateLimitOptions {
  /**
   * Ventana de tiempo en milisegundos
   */
  windowMs: number;
  /**
   * Máximo de requests por ventana
   */
  max: number;
  /**
   * Mensaje de error personalizado
   */
  message?: string;
  /**
   * Código de estado HTTP
   */
  statusCode?: number;
  /**
   * Headers a incluir en la respuesta
   */
  headers?: boolean;
  /**
   * Función para obtener la key del cliente (por defecto IP)
   */
  keyGenerator?: (req: any) => string;
  /**
   * Función para manejar cuando se excede el límite
   */
  handler?: (req: any, res: any) => void;
  /**
   * Omitir ciertos requests
   */
  skip?: (req: any) => boolean;
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

// Store en memoria (en producción usa Redis)
const store = new Map<string, RateLimitInfo>();

/**
 * Limpiar entradas expiradas cada 5 minutos
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, info] of store.entries()) {
    if (now > info.resetTime) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Crear middleware de rate limiting
 */
export function rateLimit(options: RateLimitOptions) {
  const {
    windowMs,
    max,
    message = 'Demasiadas solicitudes, por favor intenta más tarde',
    statusCode = 429,
    headers = true,
    keyGenerator = (req: any) => req.ip || req.socket?.remoteAddress || 'unknown',
    handler,
    skip,
  } = options;

  return (req: any, res: any, next: any) => {
    // Omitir si aplica
    if (skip && skip(req)) {
      return next();
    }

    const key = keyGenerator(req);
    const now = Date.now();

    // Obtener o crear info de rate limit
    let info = store.get(key);

    if (!info || now > info.resetTime) {
      // Crear nueva ventana
      info = {
        count: 0,
        resetTime: now + windowMs,
      };
      store.set(key, info);
    }

    // Incrementar contador
    info.count++;

    // Calcular tiempo restante
    const remaining = Math.max(0, max - info.count);
    const resetTime = Math.ceil((info.resetTime - now) / 1000);

    // Añadir headers si está habilitado
    if (headers && res.setHeader) {
      res.setHeader('X-RateLimit-Limit', max.toString());
      res.setHeader('X-RateLimit-Remaining', remaining.toString());
      res.setHeader('X-RateLimit-Reset', resetTime.toString());
    }

    // Verificar si excedió el límite
    if (info.count > max) {
      if (headers && res.setHeader) {
        res.setHeader('Retry-After', resetTime.toString());
      }

      if (handler) {
        return handler(req, res);
      }

      if (res.status && res.json) {
        return res.status(statusCode).json({
          error: message,
          retryAfter: resetTime,
        });
      } else {
        // Fallback para non-Express responses
        res.statusCode = statusCode;
        res.end(JSON.stringify({ error: message, retryAfter: resetTime }));
        return;
      }
    }

    next();
  };
}

/**
 * Presets comunes de rate limiting
 */
export const rateLimitPresets = {
  /**
   * Límite estricto para endpoints de autenticación
   */
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 intentos
    message: 'Demasiados intentos de login, intenta en 15 minutos',
  },

  /**
   * Límite moderado para APIs generales
   */
  api: {
    windowMs: 60 * 1000, // 1 minuto
    max: 60, // 60 requests
    message: 'Límite de API excedido',
  },

  /**
   * Límite generoso para endpoints públicos
   */
  public: {
    windowMs: 60 * 1000, // 1 minuto
    max: 100, // 100 requests
  },

  /**
   * Límite muy estricto para operaciones costosas
   */
  expensive: {
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10, // 10 requests
    message: 'Límite de operaciones costosas excedido',
  },

  /**
   * Límite para uploads de archivos
   */
  upload: {
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 20, // 20 uploads
    message: 'Límite de uploads excedido, intenta en 1 hora',
  },
};

/**
 * Rate limiter específico por usuario (requiere autenticación)
 */
export function rateLimitPerUser(options: RateLimitOptions) {
  return rateLimit({
    ...options,
    keyGenerator: (req) => {
      // Usar user ID si está disponible, sino fallback a IP
      const userId = (req as any).user?.id || (req as any).user?.sub;
      return userId || req.ip || 'unknown';
    },
  });
}

/**
 * Rate limiter que incrementa el delay progresivamente (slowdown)
 */
export function slowDown(options: {
  windowMs: number;
  delayAfter: number;
  delayMs: number;
  maxDelayMs?: number;
}) {
  const {
    windowMs,
    delayAfter,
    delayMs,
    maxDelayMs = 10000, // Máximo 10 segundos de delay
  } = options;

  return (req: any, res: any, next: any) => {
    const key = (req.ip || req.socket?.remoteAddress || 'unknown') as string;
    const now = Date.now();

    let info = store.get(key);

    if (!info || now > info.resetTime) {
      info = {
        count: 0,
        resetTime: now + windowMs,
      };
      store.set(key, info);
    }

    info.count++;

    if (info.count > delayAfter) {
      const delay = Math.min(
        (info.count - delayAfter) * delayMs,
        maxDelayMs
      );

      setTimeout(next, delay);
    } else {
      next();
    }
  };
}
