import { describe, it, expect, vi } from 'vitest'
import { withBaseUrl } from '@/lib/hofs/with-base-url'

describe('withBaseUrl', () => {
  it('should prepend base URL to relative URL strings', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withBaseUrl(mockFn, 'https://api.example.com')
    
    await wrappedFn('/pokemon/pikachu')
    
    expect(mockFn).toHaveBeenCalledWith('https://api.example.com/pokemon/pikachu')
  })

  it('should prepend base URL to objects with url property', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withBaseUrl(mockFn, 'https://api.example.com')
    
    await wrappedFn({ url: '/pokemon/pikachu', method: 'GET' })
    
    expect(mockFn).toHaveBeenCalledWith({
      url: 'https://api.example.com/pokemon/pikachu',
      method: 'GET'
    })
  })

  it('should pass through absolute URLs unchanged', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withBaseUrl(mockFn, 'https://api.example.com')
    
    await wrappedFn('https://other-api.com/pokemon/pikachu')
    
    expect(mockFn).toHaveBeenCalledWith('https://other-api.com/pokemon/pikachu')
  })

  it('should pass through non-string, non-object arguments unchanged', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withBaseUrl(mockFn, 'https://api.example.com')
    
    await wrappedFn(123, { data: 'test' })
    
    expect(mockFn).toHaveBeenCalledWith(123, { data: 'test' })
  })

  it('should handle empty arguments', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withBaseUrl(mockFn, 'https://api.example.com')
    
    await wrappedFn()
    
    expect(mockFn).toHaveBeenCalledWith()
  })

  it('should handle objects without url property', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withBaseUrl(mockFn, 'https://api.example.com')
    
    const input = { method: 'GET', data: 'test' }
    await wrappedFn(input)
    
    expect(mockFn).toHaveBeenCalledWith(input)
  })

  it('should handle null and undefined arguments', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withBaseUrl(mockFn, 'https://api.example.com')
    
    await wrappedFn(null)
    await wrappedFn(undefined)
    
    expect(mockFn).toHaveBeenCalledWith(null)
    expect(mockFn).toHaveBeenCalledWith(undefined)
  })

  it('should preserve function return value', async () => {
    const mockFn = vi.fn().mockResolvedValue('test result')
    const wrappedFn = withBaseUrl(mockFn, 'https://api.example.com')
    
    const result = await wrappedFn('/test')
    
    expect(result).toBe('test result')
  })
})
