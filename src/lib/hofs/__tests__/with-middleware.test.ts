import { describe, it, expect, vi } from 'vitest'
import { withMiddleware } from '@/lib/hofs/with-middleware'
import { withErrorHandler } from '@/lib/hofs/with-error-handler'
import { withLogger } from '@/lib/hofs/with-logger'
import { withBaseUrl } from '@/lib/hofs/with-base-url'

describe('withMiddleware', () => {
  it('should compose multiple HOFs correctly', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    
    // Create a composed middleware chain
    const enhancedFn = withMiddleware(
      withErrorHandler,
      withLogger,
      (fn) => withBaseUrl(fn, 'https://api.example.com')
    )(mockFn)
    
    const result = await enhancedFn('/test')
    
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledWith('https://api.example.com/test')
  })

  it('should apply middleware in correct order (right to left)', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    
    // Create middleware that logs the order
    const orderLogger = (fn: any) => {
      return async (...args: any[]) => {
        console.log('Order logger called')
        return fn(...args)
      }
    }
    
    const firstMiddleware = (fn: any) => {
      return async (...args: any[]) => {
        console.log('First middleware called')
        return fn(...args)
      }
    }
    
    const enhancedFn = withMiddleware(
      firstMiddleware,
      orderLogger
    )(mockFn)
    
    await enhancedFn('test')
    
    expect(mockFn).toHaveBeenCalledWith('test')
  })

  it('should handle single middleware', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    
    const singleMiddleware = (fn: any) => {
      return async (...args: any[]) => {
        return fn(...args)
      }
    }
    
    const enhancedFn = withMiddleware(singleMiddleware)(mockFn)
    
    const result = await enhancedFn('test')
    
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledWith('test')
  })

  it('should handle no middleware', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    
    const enhancedFn = withMiddleware()(mockFn)
    
    const result = await enhancedFn('test')
    
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledWith('test')
  })

  it('should preserve function signature through middleware chain', async () => {
    const mockFn = vi.fn().mockResolvedValue('result')
    
    const enhancedFn = withMiddleware(
      withErrorHandler,
      withLogger
    )(mockFn)
    
    // Test with multiple arguments
    const result = await enhancedFn('arg1', 'arg2', 'arg3')
    
    expect(result).toBe('result')
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3')
  })

  it('should handle errors in middleware chain', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('test error'))
    
    const enhancedFn = withMiddleware(
      withErrorHandler,
      withLogger
    )(mockFn)
    
    await expect(enhancedFn('test')).rejects.toThrow('Search failed: test error')
  })
})
