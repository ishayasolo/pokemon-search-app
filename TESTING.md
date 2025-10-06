# Unit Tests Documentation

## Overview

This project includes comprehensive unit tests for core Higher-Order Functions (HOFs) and data transformation utilities. The tests ensure reliability, maintainability, and proper functionality of critical application components.

## Test Framework

- **Framework**: Vitest
- **Environment**: jsdom (for DOM testing)
- **Coverage**: v8 provider
- **Assertions**: Vitest built-in expect

## Test Structure

```
src/
├── lib/
│   ├── hofs/
│   │   └── __tests__/
│   │       ├── with-error-handler.test.ts
│   │       ├── with-logger.test.ts
│   │       ├── with-base-url.test.ts
│   │       └── with-middleware.test.ts
│   └── utils/
│       └── __tests__/
│           ├── transformers.test.ts
│           └── cn.test.ts
└── test/
    └── setup.ts
```

## Test Coverage

### Higher-Order Functions (HOFs)

#### 1. `withErrorHandler` (7 tests)
- ✅ Passes through successful results
- ✅ Transforms fetch errors into user-friendly messages
- ✅ Transforms 404 errors into user-friendly messages
- ✅ Transforms 500 errors into user-friendly messages
- ✅ Wraps generic errors with search failed message
- ✅ Handles non-Error objects
- ✅ Preserves function signature

#### 2. `withLogger` (6 tests)
- ✅ Logs successful function calls with timing
- ✅ Logs function errors with timing
- ✅ Uses default context when none provided
- ✅ Measures execution time accurately
- ✅ Detects data property in results
- ✅ Handles non-Error rejections

#### 3. `withBaseUrl` (8 tests)
- ✅ Prepends base URL to relative URL strings
- ✅ Prepends base URL to objects with url property
- ✅ Passes through absolute URLs unchanged
- ✅ Passes through non-string, non-object arguments unchanged
- ✅ Handles empty arguments
- ✅ Handles objects without url property
- ✅ Handles null and undefined arguments
- ✅ Preserves function return value

#### 4. `withMiddleware` (6 tests)
- ✅ Composes multiple HOFs correctly
- ✅ Applies middleware in correct order (right to left)
- ✅ Handles single middleware
- ✅ Handles no middleware
- ✅ Preserves function signature through middleware chain
- ✅ Handles errors in middleware chain

### Data Transformation Utilities

#### 1. `transformPokemonData` (5 tests)
- ✅ Transforms raw Pokémon data correctly
- ✅ Capitalizes display name correctly
- ✅ Converts height and weight to proper units
- ✅ Handles multiple types
- ✅ Calculates total stats correctly

#### 2. `filterPokemonByType` (3 tests)
- ✅ Filters Pokémon by type (case insensitive)
- ✅ Returns empty array for non-existent type
- ✅ Handles Pokémon with multiple types

#### 3. `sortPokemonByStats` (3 tests)
- ✅ Sorts Pokémon by stats descending by default
- ✅ Sorts Pokémon by stats ascending when specified
- ✅ Does not mutate original array

#### 4. `getTopPokemonByStats` (3 tests)
- ✅ Returns top N Pokémon by stats
- ✅ Returns all Pokémon if count exceeds array length
- ✅ Returns empty array for count of 0

### Utility Functions

#### 1. `cn` (8 tests)
- ✅ Combines multiple class strings
- ✅ Handles conditional classes with objects
- ✅ Handles arrays of classes
- ✅ Filters out falsy values
- ✅ Handles empty inputs
- ✅ Handles mixed input types
- ✅ Deduplicates Tailwind classes
- ✅ Handles complex conditional logic

## Running Tests

```bash
# Run all tests
npm run test:run

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Results Summary

- **Total Test Files**: 6
- **Total Tests**: 49
- **Passing Tests**: 49
- **Failing Tests**: 0
- **Coverage**: Core HOFs and utilities are fully tested

## Key Testing Patterns

### 1. Mock Functions
```typescript
const mockFn = vi.fn().mockResolvedValue('success')
```

### 2. Error Testing
```typescript
await expect(wrappedFn('test')).rejects.toThrow('Expected error message')
```

### 3. Console Mocking
```typescript
vi.spyOn(console, 'log').mockImplementation(() => {})
```

### 4. Async Testing
```typescript
const result = await wrappedFn('test')
expect(result).toBe('success')
```

## Benefits of This Test Suite

1. **Reliability**: Ensures HOFs work correctly in all scenarios
2. **Maintainability**: Catches regressions when modifying code
3. **Documentation**: Tests serve as living documentation
4. **Confidence**: Enables safe refactoring and feature additions
5. **Quality**: Maintains high code quality standards

## Future Enhancements

- Add integration tests for API routes
- Add component tests for React components
- Add E2E tests for user workflows
- Increase coverage thresholds
- Add performance tests for HOFs
