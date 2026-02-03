import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger, LogLevel, perfMonitor } from '@/lib/logger';

describe('Logger', () => {
  beforeEach(() => {
    logger.clearLogs();
    vi.clearAllMocks();
  });

  it('should log debug messages', () => {
    const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    
    logger.debug('Test debug message', { data: 'test' });
    
    const logs = logger.getLogs(LogLevel.DEBUG);
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Test debug message');
    expect(logs[0].level).toBe(LogLevel.DEBUG);
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should log info messages', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    
    logger.info('Test info message');
    
    const logs = logger.getLogs(LogLevel.INFO);
    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogLevel.INFO);
    
    consoleSpy.mockRestore();
  });

  it('should log warnings', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    logger.warn('Test warning', { reason: 'test' });
    
    const logs = logger.getLogs(LogLevel.WARN);
    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogLevel.WARN);
    
    consoleSpy.mockRestore();
  });

  it('should log errors with stack trace', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const testError = new Error('Test error');
    
    logger.error('Error occurred', testError);
    
    const logs = logger.getLogs(LogLevel.ERROR);
    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogLevel.ERROR);
    expect(logs[0].context).toBeDefined();
    
    consoleSpy.mockRestore();
  });

  it('should export logs as JSON', () => {
    logger.info('Test message 1');
    logger.warn('Test message 2');
    
    const exported = logger.exportLogs();
    const parsed = JSON.parse(exported);
    
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(2);
  });

  it('should clear all logs', () => {
    logger.info('Test message');
    expect(logger.getLogs()).toHaveLength(1);
    
    logger.clearLogs();
    expect(logger.getLogs()).toHaveLength(0);
  });

  it('should filter logs by level', () => {
    logger.debug('Debug message');
    logger.info('Info message');
    logger.warn('Warn message');
    logger.error('Error message', new Error('test'));
    
    expect(logger.getLogs(LogLevel.DEBUG)).toHaveLength(1);
    expect(logger.getLogs(LogLevel.INFO)).toHaveLength(1);
    expect(logger.getLogs(LogLevel.WARN)).toHaveLength(1);
    expect(logger.getLogs(LogLevel.ERROR)).toHaveLength(1);
  });
});

describe('Performance Monitor', () => {
  it('should measure synchronous operations', () => {
    perfMonitor.start('test-operation');
    
    // Simulate some work
    let sum = 0;
    for (let i = 0; i < 1000; i++) {
      sum += i;
    }
    
    const duration = perfMonitor.end('test-operation');
    
    expect(duration).toBeGreaterThanOrEqual(0);
  });

  it('should measure function execution', () => {
    const testFn = () => {
      let result = 0;
      for (let i = 0; i < 100; i++) {
        result += i;
      }
      return result;
    };
    
    const result = perfMonitor.measure('test-function', testFn);
    
    expect(result).toBe(4950); // Sum of 0-99
  });

  it('should measure async operations', async () => {
    const asyncFn = async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return 'done';
    };
    
    const result = await perfMonitor.measureAsync('async-operation', asyncFn);
    
    expect(result).toBe('done');
  });

  it('should handle missing start mark', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const duration = perfMonitor.end('non-existent');
    
    expect(duration).toBe(0);
    
    consoleSpy.mockRestore();
  });
});
