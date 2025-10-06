import { describe, it, expect } from 'vitest'
import { 
  transformPokemonData, 
  filterPokemonByType, 
  sortPokemonByStats, 
  getTopPokemonByStats 
} from '@/lib/utils/transformers'
import type { RawPokemon, TransformedPokemon } from '@/lib/utils/transformers'

describe('transformPokemonData', () => {
  const mockRawPokemon: RawPokemon = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'https://example.com/pikachu.png'
        }
      }
    },
    types: [
      { type: { name: 'electric' } }
    ],
    stats: [
      { base_stat: 35, stat: { name: 'hp' } },
      { base_stat: 55, stat: { name: 'attack' } },
      { base_stat: 40, stat: { name: 'defense' } },
      { base_stat: 90, stat: { name: 'speed' } },
      { base_stat: 50, stat: { name: 'special-attack' } },
      { base_stat: 50, stat: { name: 'special-defense' } }
    ]
  }

  it('should transform raw Pokémon data correctly', () => {
    const result = transformPokemonData(mockRawPokemon)

    expect(result).toEqual({
      id: 25,
      name: 'pikachu',
      displayName: 'Pikachu',
      height: '0.4m',
      weight: '6kg',
      image: 'https://example.com/pikachu.png',
      types: ['electric'],
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        speed: 90,
        specialAttack: 50,
        specialDefense: 50
      },
      totalStats: 320
    })
  })

  it('should capitalize display name correctly', () => {
    const pokemonWithLowercase = { ...mockRawPokemon, name: 'charizard' }
    const result = transformPokemonData(pokemonWithLowercase)

    expect(result.displayName).toBe('Charizard')
  })

  it('should convert height and weight to proper units', () => {
    const pokemonWithDifferentStats = { 
      ...mockRawPokemon, 
      height: 20, 
      weight: 1000 
    }
    const result = transformPokemonData(pokemonWithDifferentStats)

    expect(result.height).toBe('2m')
    expect(result.weight).toBe('100kg')
  })

  it('should handle multiple types', () => {
    const pokemonWithMultipleTypes = {
      ...mockRawPokemon,
      types: [
        { type: { name: 'fire' } },
        { type: { name: 'flying' } }
      ]
    }
    const result = transformPokemonData(pokemonWithMultipleTypes)

    expect(result.types).toEqual(['fire', 'flying'])
  })

  it('should calculate total stats correctly', () => {
    const result = transformPokemonData(mockRawPokemon)
    const expectedTotal = 35 + 55 + 40 + 90 + 50 + 50

    expect(result.totalStats).toBe(expectedTotal)
  })
})

describe('filterPokemonByType', () => {
  const mockPokemon: TransformedPokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      displayName: 'Bulbasaur',
      height: '0.7m',
      weight: '6.9kg',
      image: 'https://example.com/bulbasaur.png',
      types: ['grass', 'poison'],
      stats: { hp: 45, attack: 49, defense: 49, speed: 45, specialAttack: 65, specialDefense: 65 },
      totalStats: 318
    },
    {
      id: 2,
      name: 'charmander',
      displayName: 'Charmander',
      height: '0.6m',
      weight: '8.5kg',
      image: 'https://example.com/charmander.png',
      types: ['fire'],
      stats: { hp: 39, attack: 52, defense: 43, speed: 65, specialAttack: 60, specialDefense: 50 },
      totalStats: 309
    },
    {
      id: 3,
      name: 'squirtle',
      displayName: 'Squirtle',
      height: '0.5m',
      weight: '9kg',
      image: 'https://example.com/squirtle.png',
      types: ['water'],
      stats: { hp: 44, attack: 48, defense: 65, speed: 43, specialAttack: 50, specialDefense: 64 },
      totalStats: 314
    }
  ]

  it('should filter Pokémon by type (case insensitive)', () => {
    const firePokemon = filterPokemonByType(mockPokemon, 'fire')
    expect(firePokemon).toHaveLength(1)
    expect(firePokemon[0].name).toBe('charmander')

    const firePokemonUppercase = filterPokemonByType(mockPokemon, 'FIRE')
    expect(firePokemonUppercase).toHaveLength(1)
    expect(firePokemonUppercase[0].name).toBe('charmander')
  })

  it('should return empty array for non-existent type', () => {
    const electricPokemon = filterPokemonByType(mockPokemon, 'electric')
    expect(electricPokemon).toHaveLength(0)
  })

  it('should handle Pokémon with multiple types', () => {
    const grassPokemon = filterPokemonByType(mockPokemon, 'grass')
    expect(grassPokemon).toHaveLength(1)
    expect(grassPokemon[0].name).toBe('bulbasaur')
  })
})

describe('sortPokemonByStats', () => {
  const mockPokemon: TransformedPokemon[] = [
    {
      id: 1,
      name: 'weak',
      displayName: 'Weak',
      height: '0.5m',
      weight: '5kg',
      image: 'https://example.com/weak.png',
      types: ['normal'],
      stats: { hp: 30, attack: 30, defense: 30, speed: 30, specialAttack: 30, specialDefense: 30 },
      totalStats: 180
    },
    {
      id: 2,
      name: 'strong',
      displayName: 'Strong',
      height: '1m',
      weight: '10kg',
      image: 'https://example.com/strong.png',
      types: ['fighting'],
      stats: { hp: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
      totalStats: 300
    },
    {
      id: 3,
      name: 'medium',
      displayName: 'Medium',
      height: '0.7m',
      weight: '7kg',
      image: 'https://example.com/medium.png',
      types: ['normal'],
      stats: { hp: 40, attack: 40, defense: 40, speed: 40, specialAttack: 40, specialDefense: 40 },
      totalStats: 240
    }
  ]

  it('should sort Pokémon by stats descending by default', () => {
    const sorted = sortPokemonByStats(mockPokemon)
    
    expect(sorted[0].name).toBe('strong')
    expect(sorted[1].name).toBe('medium')
    expect(sorted[2].name).toBe('weak')
  })

  it('should sort Pokémon by stats ascending when specified', () => {
    const sorted = sortPokemonByStats(mockPokemon, true)
    
    expect(sorted[0].name).toBe('weak')
    expect(sorted[1].name).toBe('medium')
    expect(sorted[2].name).toBe('strong')
  })

  it('should not mutate original array', () => {
    const original = [...mockPokemon]
    sortPokemonByStats(mockPokemon)
    
    expect(mockPokemon).toEqual(original)
  })
})

describe('getTopPokemonByStats', () => {
  const mockPokemon: TransformedPokemon[] = [
    {
      id: 1,
      name: 'weak',
      displayName: 'Weak',
      height: '0.5m',
      weight: '5kg',
      image: 'https://example.com/weak.png',
      types: ['normal'],
      stats: { hp: 30, attack: 30, defense: 30, speed: 30, specialAttack: 30, specialDefense: 30 },
      totalStats: 180
    },
    {
      id: 2,
      name: 'strong',
      displayName: 'Strong',
      height: '1m',
      weight: '10kg',
      image: 'https://example.com/strong.png',
      types: ['fighting'],
      stats: { hp: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
      totalStats: 300
    },
    {
      id: 3,
      name: 'medium',
      displayName: 'Medium',
      height: '0.7m',
      weight: '7kg',
      image: 'https://example.com/medium.png',
      types: ['normal'],
      stats: { hp: 40, attack: 40, defense: 40, speed: 40, specialAttack: 40, specialDefense: 40 },
      totalStats: 240
    }
  ]

  it('should return top N Pokémon by stats', () => {
    const top2 = getTopPokemonByStats(mockPokemon, 2)
    
    expect(top2).toHaveLength(2)
    expect(top2[0].name).toBe('strong')
    expect(top2[1].name).toBe('medium')
  })

  it('should return all Pokémon if count exceeds array length', () => {
    const top10 = getTopPokemonByStats(mockPokemon, 10)
    
    expect(top10).toHaveLength(3)
    expect(top10[0].name).toBe('strong')
    expect(top10[1].name).toBe('medium')
    expect(top10[2].name).toBe('weak')
  })

  it('should return empty array for count of 0', () => {
    const top0 = getTopPokemonByStats(mockPokemon, 0)
    
    expect(top0).toHaveLength(0)
  })
})
