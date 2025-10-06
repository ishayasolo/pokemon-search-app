import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils/cn'

describe('cn utility function', () => {
  it('should combine multiple class strings', () => {
    const result = cn('px-2', 'py-1', 'bg-red-500')
    expect(result).toBe('px-2 py-1 bg-red-500')
  })

  it('should handle conditional classes with objects', () => {
    const result = cn('base-class', { 'active': true, 'disabled': false })
    expect(result).toBe('base-class active')
  })

  it('should handle arrays of classes', () => {
    const result = cn(['px-2', 'py-1'], 'bg-red-500')
    expect(result).toBe('px-2 py-1 bg-red-500')
  })

  it('should filter out falsy values', () => {
    const result = cn('px-2', null, 'py-1', undefined, 'bg-red-500', false)
    expect(result).toBe('px-2 py-1 bg-red-500')
  })

  it('should handle empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle mixed input types', () => {
    const result = cn(
      'base-class',
      { 'conditional': true },
      ['array-class'],
      'string-class',
      null,
      undefined
    )
    expect(result).toBe('base-class conditional array-class string-class')
  })

  it('should deduplicate Tailwind classes', () => {
    const result = cn('px-2 px-4', 'py-1 py-2')
    // tailwind-merge should handle this, keeping the last occurrence
    expect(result).toBe('px-4 py-2')
  })

  it('should handle complex conditional logic', () => {
    const isActive = true
    const isDisabled = false
    const variant = 'primary'
    
    const result = cn(
      'base-button',
      {
        'active': isActive,
        'disabled': isDisabled,
        'primary': variant === 'primary',
        'secondary': variant === 'secondary'
      }
    )
    
    expect(result).toBe('base-button active primary')
  })
})
