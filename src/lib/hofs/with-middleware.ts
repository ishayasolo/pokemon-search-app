/**
 * Composed Higher-Order Function for combining multiple middleware
 * Allows chaining of HOFs for complex request processing
 */

/**
 * Type definition for a Higher-Order Function that wraps async functions
 * @template T - The argument types of the wrapped function
 * @template R - The return type of the wrapped function
 */
type HOF<T extends unknown[], R> = (
  fn: (...args: T) => Promise<R>
) => (...args: T) => Promise<R>;

/**
 * Composes multiple higher-order functions into a single middleware chain
 * Applies middleware functions from right to left (last to first)
 *
 * @template T - The argument types of the wrapped function
 * @template R - The return type of the wrapped function
 * @param middlewares - Variable number of HOF middleware functions
 * @returns A function that takes a target function and applies all middleware
 *
 * @example
 * ```typescript
 * // Create a composed middleware chain
 * const enhancedFetch = withMiddleware(
 *   withErrorHandler,
 *   withLogger,
 *   (fn) => withBaseUrl(fn, 'https://pokeapi.co/api/v2')
 * )(fetch);
 *
 * // Usage - applies error handling, logging, and base URL injection
 * const result = await enhancedFetch('/pokemon/pikachu');
 * ```
 */
export const withMiddleware = <T extends unknown[], R>(
  ...middlewares: HOF<T, R>[]
) => {
  return (fn: (...args: T) => Promise<R>) => {
    return middlewares.reduceRight((wrappedFn, middleware) => {
      return middleware(wrappedFn);
    }, fn);
  };
};
