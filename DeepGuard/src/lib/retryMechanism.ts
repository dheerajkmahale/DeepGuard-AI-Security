/**
 * Retry Mechanism Utility
 * Provides robust retry logic for failed operations
 */

interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoff?: boolean;
  onRetry?: (attempt: number, error: Error) => void;
}

/**
 * Retry a function with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoff = true,
    onRetry,
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        throw new Error(
          `Operation failed after ${maxAttempts} attempts: ${lastError.message}`
        );
      }

      const delay = backoff ? delayMs * Math.pow(2, attempt - 1) : delayMs;
      
      if (onRetry) {
        onRetry(attempt, lastError);
      }

      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`, lastError);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Retry with timeout
 */
export async function retryWithTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  retryOptions?: RetryOptions
): Promise<T> {
  return Promise.race([
    retryOperation(operation, retryOptions),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    ),
  ]);
}

/**
 * Circuit breaker pattern
 */
export class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }

  getState() {
    return this.state;
  }

  reset() {
    this.failures = 0;
    this.state = 'closed';
  }
}

/**
 * Batch retry for multiple operations
 */
export async function retryBatch<T>(
  operations: (() => Promise<T>)[],
  options?: RetryOptions
): Promise<{ results: T[]; errors: Error[] }> {
  const results: T[] = [];
  const errors: Error[] = [];

  await Promise.all(
    operations.map(async (op, index) => {
      try {
        const result = await retryOperation(op, options);
        results[index] = result;
      } catch (error) {
        errors[index] = error as Error;
      }
    })
  );

  return { results, errors };
}
