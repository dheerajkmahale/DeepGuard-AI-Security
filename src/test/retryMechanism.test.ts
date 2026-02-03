import { describe, it, expect, vi } from 'vitest';
import { retryOperation, retryWithTimeout, CircuitBreaker } from '@/lib/retryMechanism';

describe('Retry Mechanism', () => {
  describe('retryOperation', () => {
    it('should succeed on first attempt', async () => {
      const operation = vi.fn().mockResolvedValueOnce('success');
      
      const result = await retryOperation(operation);
      
      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure', async () => {
      const operation = vi.fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockRejectedValueOnce(new Error('fail 2'))
        .mockResolvedValueOnce('success');
      
      const result = await retryOperation(operation, { maxAttempts: 3, delayMs: 10 });
      
      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should throw after max attempts', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('always fails'));
      
      await expect(
        retryOperation(operation, { maxAttempts: 3, delayMs: 10 })
      ).rejects.toThrow('Operation failed after 3 attempts');
      
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should call onRetry callback', async () => {
      const operation = vi.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('success');
      const onRetry = vi.fn();
      
      await retryOperation(operation, { maxAttempts: 3, delayMs: 10, onRetry });
      
      expect(onRetry).toHaveBeenCalledTimes(1);
      expect(onRetry).toHaveBeenCalledWith(1, expect.any(Error));
    });

    it('should use exponential backoff', async () => {
      const operation = vi.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('success');
      
      const start = Date.now();
      await retryOperation(operation, { maxAttempts: 2, delayMs: 100, backoff: true });
      const duration = Date.now() - start;
      
      // First retry should wait ~100ms with backoff
      expect(duration).toBeGreaterThanOrEqual(90);
    });
  });

  describe('retryWithTimeout', () => {
    it('should succeed within timeout', async () => {
      const operation = vi.fn().mockResolvedValueOnce('success');
      
      const result = await retryWithTimeout(operation, 1000);
      
      expect(result).toBe('success');
    });

    it('should timeout if operation takes too long', async () => {
      const operation = vi.fn().mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve('success'), 2000))
      );
      
      await expect(
        retryWithTimeout(operation, 100)
      ).rejects.toThrow('Operation timed out');
    });
  });

  describe('CircuitBreaker', () => {
    it('should allow operations when closed', async () => {
      const breaker = new CircuitBreaker(3, 1000);
      const operation = vi.fn().mockResolvedValueOnce('success');
      
      const result = await breaker.execute(operation);
      
      expect(result).toBe('success');
      expect(breaker.getState()).toBe('closed');
    });

    it('should open after threshold failures', async () => {
      const breaker = new CircuitBreaker(2, 1000);
      const operation = vi.fn().mockRejectedValue(new Error('fail'));
      
      // First failure
      await expect(breaker.execute(operation)).rejects.toThrow('fail');
      expect(breaker.getState()).toBe('closed');
      
      // Second failure - should open circuit
      await expect(breaker.execute(operation)).rejects.toThrow('fail');
      expect(breaker.getState()).toBe('open');
      
      // Third attempt should fail immediately
      await expect(breaker.execute(operation)).rejects.toThrow('Circuit breaker is open');
    });

    it('should reset on success', async () => {
      const breaker = new CircuitBreaker(3, 1000);
      const operation = vi.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce('success');
      
      await expect(breaker.execute(operation)).rejects.toThrow('fail');
      await breaker.execute(operation);
      
      expect(breaker.getState()).toBe('closed');
    });

    it('should allow manual reset', async () => {
      const breaker = new CircuitBreaker(1, 1000);
      const operation = vi.fn().mockRejectedValue(new Error('fail'));
      
      await expect(breaker.execute(operation)).rejects.toThrow('fail');
      expect(breaker.getState()).toBe('open');
      
      breaker.reset();
      expect(breaker.getState()).toBe('closed');
    });
  });
});
