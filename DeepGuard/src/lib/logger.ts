/**
 * Logging Service
 * Centralized logging system for the application
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: any;
  stack?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;
  private minLevel: LogLevel = LogLevel.DEBUG;

  constructor() {
    // Load logs from localStorage on init
    this.loadLogs();
    
    // Set production log level
    if (process.env.NODE_ENV === 'production') {
      this.minLevel = LogLevel.WARN;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private createLogEntry(level: LogLevel, message: string, context?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      stack: level === LogLevel.ERROR ? new Error().stack : undefined,
    };
  }

  private persistLogs() {
    try {
      const recentLogs = this.logs.slice(-this.maxLogs);
      localStorage.setItem('app_logs', JSON.stringify(recentLogs));
    } catch (error) {
      console.error('Failed to persist logs:', error);
    }
  }

  private loadLogs() {
    try {
      const stored = localStorage.getItem('app_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  }

  debug(message: string, context?: any) {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    
    const entry = this.createLogEntry(LogLevel.DEBUG, message, context);
    this.logs.push(entry);
    console.debug(`[DEBUG] ${message}`, context);
    this.persistLogs();
  }

  info(message: string, context?: any) {
    if (!this.shouldLog(LogLevel.INFO)) return;
    
    const entry = this.createLogEntry(LogLevel.INFO, message, context);
    this.logs.push(entry);
    console.info(`[INFO] ${message}`, context);
    this.persistLogs();
  }

  warn(message: string, context?: any) {
    if (!this.shouldLog(LogLevel.WARN)) return;
    
    const entry = this.createLogEntry(LogLevel.WARN, message, context);
    this.logs.push(entry);
    console.warn(`[WARN] ${message}`, context);
    this.persistLogs();
  }

  error(message: string, error?: Error | any, context?: any) {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    const entry = this.createLogEntry(LogLevel.ERROR, message, {
      error: error?.message || error,
      stack: error?.stack,
      ...context,
    });
    this.logs.push(entry);
    console.error(`[ERROR] ${message}`, error, context);
    this.persistLogs();
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (!level) return this.logs;
    return this.logs.filter(log => log.level === level);
  }

  clearLogs() {
    this.logs = [];
    localStorage.removeItem('app_logs');
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  setLogLevel(level: LogLevel) {
    this.minLevel = level;
  }
}

// Export singleton instance
export const logger = new Logger();

// Performance monitoring
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  start(label: string) {
    this.marks.set(label, performance.now());
    logger.debug(`Performance: ${label} started`);
  }

  end(label: string): number {
    const startTime = this.marks.get(label);
    if (!startTime) {
      logger.warn(`Performance: No start mark found for ${label}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(label);
    
    logger.info(`Performance: ${label} completed`, { duration: `${duration.toFixed(2)}ms` });
    return duration;
  }

  measure(label: string, fn: () => any): any {
    this.start(label);
    const result = fn();
    this.end(label);
    return result;
  }

  async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    try {
      const result = await fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}

export const perfMonitor = new PerformanceMonitor();
