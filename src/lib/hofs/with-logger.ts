/**
 * Higher-Order Function for logging requests and responses
 * Useful for debugging API calls
 */

/**
 * Context information for logging operations
 * @interface LogContext
 */
export interface LogContext {
  /** HTTP method or operation name */
  method?: string;
  /** URL being called */
  url?: string;
  /** Custom timestamp (if not provided, current time is used) */
  timestamp?: string;
}

/**
 * Higher-order function that wraps an async function with logging capabilities
 * Logs start time, duration, success/failure, and contextual information
 *
 * @template T - The argument types of the wrapped function
 * @template R - The return type of the wrapped function
 * @param fn - The async function to wrap with logging
 * @param context - Optional context information for logging
 * @returns A new function that logs execution details
 *
 * @example
 * ```typescript
 * const loggedFetch = withLogger(fetch, {
 *   method: 'GET',
 *   url: '/api/pokemon'
 * });
 *
 * // Will log:
 * // [2024-01-01T00:00:00.000Z] Starting GET { url: '/api/pokemon', args: '/api/pokemon' }
 * // [2024-01-01T00:00:00.000Z] Success (1204ms) { url: '/api/pokemon', resultType: 'object', hasData: true }
 * ```
 */
export const withLogger = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  context?: LogContext
) => {
  return async (...args: T): Promise<R> => {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] Starting ${context?.method || "API call"}`, {
      url: context?.url,
      args: args.length > 0 ? args[0] : undefined,
    });

    try {
      const result = await fn(...args);
      const duration = Date.now() - startTime;

      console.log(`[${timestamp}] Success (${duration}ms)`, {
        url: context?.url,
        resultType: typeof result,
        hasData: result && typeof result === "object" && "data" in result,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      console.error(`[${timestamp}] Error (${duration}ms)`, {
        url: context?.url,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw error;
    }
  };
};
