/**
 * Higher-Order Function for error handling
 * Transforms API errors into user-friendly messages
 */

/**
 * Represents an API error with optional status and code information
 * @interface ApiError
 */
export interface ApiError {
  /** The error message */
  message: string;
  /** Optional HTTP status code */
  status?: number;
  /** Optional error code */
  code?: string;
}

/**
 * Higher-order function that wraps an async function with error handling
 * Transforms various error types into user-friendly messages
 *
 * @template T - The argument types of the wrapped function
 * @template R - The return type of the wrapped function
 * @param fn - The async function to wrap with error handling
 * @returns A new function that handles errors gracefully
 *
 * @example
 * ```typescript
 * const safeFetch = withErrorHandler(fetch);
 * try {
 *   const result = await safeFetch('/api/data');
 * } catch (error) {
 *   // Error is now user-friendly
 *   console.log(error.message); // "Unable to connect to Pokémon API..."
 * }
 * ```
 */
export const withErrorHandler = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      // Transform different error types into user-friendly messages
      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          throw new Error(
            "Unable to connect to Pokémon API. Please check your internet connection."
          );
        }
        if (error.message.includes("404")) {
          throw new Error(
            "Pokémon not found. Please try a different search term."
          );
        }
        if (error.message.includes("500")) {
          throw new Error(
            "Pokémon API is currently unavailable. Please try again later."
          );
        }
        throw new Error(`Search failed: ${error.message}`);
      }

      // Handle unknown error types
      throw new Error("An unexpected error occurred. Please try again.");
    }
  };
};
