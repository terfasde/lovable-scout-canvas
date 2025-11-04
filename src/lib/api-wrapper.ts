/**
 * Wrapper para API calls con manejo robusto de errores
 * Proporciona retry logic, timeout, y mejores mensajes de error
 */

import { logger } from './logger';

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }

  /**
   * Verificar si el error es de red (conexión perdida, etc.)
   */
  isNetworkError(): boolean {
    return !this.status || this.status === 0;
  }

  /**
   * Verificar si el error es de autenticación
   */
  isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  /**
   * Verificar si el error es de validación
   */
  isValidationError(): boolean {
    return this.status === 400 || this.status === 422;
  }

  /**
   * Verificar si el error es del servidor
   */
  isServerError(): boolean {
    return this.status ? this.status >= 500 : false;
  }

  /**
   * Obtener mensaje user-friendly
   */
  getUserMessage(): string {
    if (this.isNetworkError()) {
      return 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
    }
    if (this.isAuthError()) {
      return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
    }
    if (this.isValidationError()) {
      return this.message || 'Los datos proporcionados no son válidos.';
    }
    if (this.isServerError()) {
      return 'Error del servidor. Por favor, intenta nuevamente más tarde.';
    }
    return this.message || 'Ocurrió un error inesperado.';
  }
}

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Realizar fetch con timeout
 */
async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new APIError('Tiempo de espera agotado', 0, 'TIMEOUT');
    }
    throw error;
  }
}

/**
 * Realizar fetch con reintentos automáticos
 */
async function fetchWithRetry(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { retries = 0, retryDelay = 1000, ...fetchOptions } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchOptions);
      
      // Si el error es 5xx, reintentamos
      if (response.status >= 500 && attempt < retries) {
        logger.warn(`Intento ${attempt + 1}/${retries + 1} falló con status ${response.status}`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        continue;
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < retries) {
        logger.warn(`Intento ${attempt + 1}/${retries + 1} falló: ${lastError.message}`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
      }
    }
  }

  throw lastError || new APIError('Todos los reintentos fallaron');
}

/**
 * Wrapper principal para API calls
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const startTime = performance.now();
  const url = endpoint.startsWith('http') ? endpoint : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'}${endpoint}`;

  try {
    logger.debug(`API Request: ${options.method || 'GET'} ${endpoint}`);

    const response = await fetchWithRetry(url, {
      retries: options.retries ?? 2, // Por defecto 2 reintentos
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const duration = performance.now() - startTime;

    // Loguear respuesta
    logger.api(
      options.method || 'GET',
      endpoint,
      response.status,
      duration
    );

    // Manejar respuestas no exitosas
    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch {
        // Si no es JSON, usar texto
        errorData = { message: await response.text() };
      }

      throw new APIError(
        errorData.message || errorData.error || `HTTP ${response.status}`,
        response.status,
        errorData.code,
        errorData
      );
    }

    // Parsear respuesta JSON
    try {
      return await response.json();
    } catch (error) {
      // Si no es JSON, devolver texto o vacío
      const text = await response.text();
      return (text ? text : {}) as T;
    }
  } catch (error) {
    const duration = performance.now() - startTime;

    if (error instanceof APIError) {
      logger.api(
        options.method || 'GET',
        endpoint,
        error.status,
        duration,
        error
      );
      throw error;
    }

    // Error de red u otro tipo de error
    const apiError = new APIError(
      error instanceof Error ? error.message : 'Error desconocido',
      0,
      'NETWORK_ERROR'
    );

    logger.api(
      options.method || 'GET',
      endpoint,
      undefined,
      duration,
      apiError
    );

    throw apiError;
  }
}

/**
 * Helpers para métodos HTTP comunes
 */
export const api = {
  get: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
