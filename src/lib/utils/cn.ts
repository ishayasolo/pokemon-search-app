import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for combining and merging CSS classes
 * Combines clsx for conditional classes and tailwind-merge for Tailwind CSS class deduplication
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn('px-2 py-1', 'bg-red-500') // 'px-2 py-1 bg-red-500'
 *
 * // Conditional classes
 * cn('base-class', { 'active': isActive, 'disabled': isDisabled })
 *
 * // Tailwind class deduplication
 * cn('px-2 px-4') // 'px-4' (px-4 overrides px-2)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
