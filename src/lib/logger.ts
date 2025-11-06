/**
 * Sistema de logging centralizado para la aplicación
 *
 * Ventajas:
 * - Un solo punto para configurar logging
 * - Fácil deshabilitar logs en producción
 * - Posibilidad de enviar logs a servicios externos (Sentry, LogRocket, etc.)
 * - Mejor control sobre qué se registra y cómo
 */

import { isLoggingEnabled, isDebugEnabled, isDevelopment } from "./env";

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  error?: Error;
}

class Logger {
  private enabledLevels: Set<LogLevel>;
  private logHistory: LogEntry[] = [];
  private maxHistorySize: number = 100;

  constructor() {
    // En producción, solo loguear warnings y errores (a menos que se habilite explícitamente)
    const loggingEnabled = isLoggingEnabled();
    const debugEnabled = isDebugEnabled();
    const devMode = isDevelopment();

    if (!loggingEnabled && !devMode) {
      // Producción sin logging habilitado: solo errores
      this.enabledLevels = new Set(["error"]);
    } else if (debugEnabled || devMode) {
      // Debug o desarrollo: todos los niveles
      this.enabledLevels = new Set(["info", "warn", "error", "debug"]);
    } else {
      // Logging habilitado pero no debug: info, warn, error
      this.enabledLevels = new Set(["info", "warn", "error"]);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return this.enabledLevels.has(level);
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
    error?: Error,
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      context,
      error,
    };
  }

  private addToHistory(entry: LogEntry): void {
    this.logHistory.push(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift(); // Eliminar el más antiguo
    }
  }

  private formatMessage(entry: LogEntry): string {
    const time = entry.timestamp.toLocaleTimeString();
    let msg = `[${time}] [${entry.level.toUpperCase()}] ${entry.message}`;

    if (entry.context && Object.keys(entry.context).length > 0) {
      msg += `\nContext: ${JSON.stringify(entry.context, null, 2)}`;
    }

    if (entry.error) {
      msg += `\nError: ${entry.error.message}`;
      if (entry.error.stack) {
        msg += `\nStack: ${entry.error.stack}`;
      }
    }

    return msg;
  }

  /**
   * Log informativo (solo en desarrollo)
   */
  info(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog("info")) return;

    const entry = this.createLogEntry("info", message, context);
    this.addToHistory(entry);

    if (isDevelopment()) {
      console.log(this.formatMessage(entry), context || "");
    }
  }

  /**
   * Log de advertencia
   */
  warn(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog("warn")) return;

    const entry = this.createLogEntry("warn", message, context);
    this.addToHistory(entry);

    console.warn(this.formatMessage(entry), context || "");
  }

  /**
   * Log de error
   */
  error(message: string, error?: Error, context?: Record<string, any>): void {
    if (!this.shouldLog("error")) return;

    const entry = this.createLogEntry("error", message, context, error);
    this.addToHistory(entry);

    console.error(this.formatMessage(entry), error || "", context || "");

    // En producción, aquí podrías enviar el error a Sentry u otro servicio
    // if (!this.isDevelopment) {
    //   Sentry.captureException(error, { extra: context });
    // }
  }

  /**
   * Log de debug (solo en desarrollo)
   */
  debug(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog("debug")) return;

    const entry = this.createLogEntry("debug", message, context);
    this.addToHistory(entry);

    if (isDevelopment()) {
      console.debug(this.formatMessage(entry), context || "");
    }
  }

  /**
   * Obtener historial de logs (útil para debugging)
   */
  getHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  /**
   * Limpiar historial
   */
  clearHistory(): void {
    this.logHistory = [];
  }

  /**
   * Log de evento de API
   */
  api(
    method: string,
    endpoint: string,
    status?: number,
    duration?: number,
    error?: Error,
  ): void {
    const context = {
      method,
      endpoint,
      status,
      duration: duration ? `${duration}ms` : undefined,
    };

    if (error) {
      this.error(`API Error: ${method} ${endpoint}`, error, context);
    } else {
      this.debug(`API Call: ${method} ${endpoint}`, context);
    }
  }
}

// Exportar instancia singleton
export const logger = new Logger();

// Exportar también para testing
export { Logger };
