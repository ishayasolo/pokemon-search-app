import { describe, it, expect, vi } from 'vitest'
import { withErrorHandler } from '@/lib/hofs/with-error-handler'

describe('withErrorHandler', () => {
  it('should pass through successful results', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withErrorHandler(mockFn)
    
    const result = await wrappedFn('test')
    
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledWith('test')
  })

  it('should transform fetch errors into user-friendly messages', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('fetch failed'))
    const wrappedFn = withErrorHandler(mockFn)
    
    await expect(wrappedFn('test')).rejects.toThrow(
      'Unable to connect to Pokémon API. Please check your internet connection.'
    )
  })

  it('should transform 404 errors into user-friendly messages', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('404 Not Found'))
    const wrappedFn = withErrorHandler(mockFn)
    
    await expect(wrappedFn('test')).rejects.toThrow(
      'Pokémon not found. Please try a different search term.'
    )
  })

  it('should transform 500 errors into user-friendly messages', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('500 Internal Server Error'))
    const wrappedFn = withErrorHandler(mockFn)
    
    await expect(wrappedFn('test')).rejects.toThrow(
      'Pokémon API is currently unavailable. Please try again later.'
    )
  })

  it('should wrap generic errors with search failed message', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('Some other error'))
    const wrappedFn = withErrorHandler(mockFn)
    
    await expect(wrappedFn('test')).rejects.toThrow(
      'Search failed: Some other error'
    )
  })

  it('should handle non-Error objects', async () => {
    const mockFn = vi.fn().mockRejectedValue('string error')
    const wrappedFn = withErrorHandler(mockFn)
    
    await expect(wrappedFn('test')).rejects.toThrow(
      'An unexpected error occurred. Please try again.'
    )
  })

  it('should preserve function signature', async () => {
    const mockFn = vi.fn().mockResolvedValue('result')
    const wrappedFn = withErrorHandler(mockFn)
    
    // Test with multiple arguments
    const result = await wrappedFn('arg1', 'arg2', 'arg3')
    
    expect(result).toBe('result')
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3')
  })
})
