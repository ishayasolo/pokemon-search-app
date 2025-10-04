/**
 * Higher-Order Function for injecting base URL
 * Ensures consistent API base URL across all requests
 */

/**
 * Higher-order function that wraps an async function to inject a base URL
 * Automatically prepends the base URL to relative URLs in function arguments
 *
 * @template T - The argument types of the wrapped function
 * @template R - The return type of the wrapped function
 * @param fn - The async function to wrap with base URL injection
 * @param baseUrl - The base URL to prepend to relative URLs
 * @returns A new function that automatically handles base URL injection
 *
 * @example
 * ```typescript
 * const apiFetch = withBaseUrl(fetch, 'https://pokeapi.co/api/v2');
 *
 * // These calls are equivalent:
 * await apiFetch('/pokemon/pikachu');
 * await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
 *
 * // Also works with objects containing url property:
 * await apiFetch({ url: '/pokemon/pikachu', method: 'GET' });
 * ```
 */
export const withBaseUrl = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  baseUrl: string
) => {
  return async (...args: T): Promise<R> => {
    // If the first argument is a URL string, prepend the base URL
    if (
      args.length > 0 &&
      typeof args[0] === "string" &&
      args[0].startsWith("/")
    ) {
      const newArgs = [baseUrl + args[0], ...args.slice(1)] as T;
      return fn(...newArgs);
    }

    // If the first argument is an object with a url property, modify it
    if (
      args.length > 0 &&
      typeof args[0] === "object" &&
      args[0] !== null &&
      "url" in args[0]
    ) {
      const newArgs = [
        { ...args[0], url: baseUrl + (args[0] as { url: string }).url },
        ...args.slice(1),
      ] as T;
      return fn(...newArgs);
    }

    // Otherwise, pass through unchanged
    return fn(...args);
  };
};
