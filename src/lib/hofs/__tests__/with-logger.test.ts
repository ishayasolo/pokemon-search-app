import { describe, it, expect, vi, beforeEach } from 'vitest'
import { withLogger } from '@/lib/hofs/with-logger'

describe('withLogger', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should log successful function calls', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withLogger(mockFn, { method: 'GET', url: '/api/test' })
    
    await wrappedFn('test')
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/Starting GET/),
      expect.objectContaining({
        url: '/api/test',
        args: 'test'
      })
    )
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/Success/),
      expect.objectContaining({
        url: '/api/test',
        resultType: 'string',
        hasData: false
      })
    )
  })

  it('should log function errors', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('test error'))
    const wrappedFn = withLogger(mockFn, { method: 'POST', url: '/api/test' })
    
    await expect(wrappedFn('test')).rejects.toThrow('test error')
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/Starting POST/),
      expect.objectContaining({
        url: '/api/test',
        args: 'test'
      })
    )
    
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(/Error/),
      expect.objectContaining({
        url: '/api/test',
        error: 'test error'
      })
    )
  })

  it('should use default context when none provided', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const wrappedFn = withLogger(mockFn)
    
    await wrappedFn('test')
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/Starting API call/),
      expect.objectContaining({
        args: 'test'
      })
    )
  })

  it('should measure execution time', async () => {
    const mockFn = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve('success'), 100))
    )
    const wrappedFn = withLogger(mockFn)
    
    await wrappedFn('test')
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/Success \(\d+ms\)/),
      expect.any(Object)
    )
  })

  it('should detect data property in results', async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: 'test', success: true })
    const wrappedFn = withLogger(mockFn)
    
    await wrappedFn('test')
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/Success/),
      expect.objectContaining({
        hasData: true
      })
    )
  })

  it('should handle non-Error rejections', async () => {
    const mockFn = vi.fn().mockRejectedValue('string error')
    const wrappedFn = withLogger(mockFn)
    
    await expect(wrappedFn('test')).rejects.toBe('string error')
    
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(/Error/),
      expect.objectContaining({
        error: 'Unknown error'
      })
    )
  })
})
