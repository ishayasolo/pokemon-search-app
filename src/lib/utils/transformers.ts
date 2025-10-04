/**
 * Functional transformations for Pokémon API data
 * Uses map, filter, and reduce to transform raw API responses
 */

/**
 * Raw Pokémon data structure from PokéAPI
 * @interface RawPokemon
 */
export interface RawPokemon {
  /** Pokémon ID number */
  id: number;
  /** Pokémon name in lowercase */
  name: string;
  /** Height in decimeters */
  height: number;
  /** Weight in hectograms */
  weight: number;
  /** Sprite images and artwork */
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  /** Array of Pokémon types */
  types: Array<{
    type: {
      name: string;
    };
  }>;
  /** Array of base stats */
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

/**
 * Transformed Pokémon data structure for UI consumption
 * @interface TransformedPokemon
 */
export interface TransformedPokemon {
  /** Pokémon ID number */
  id: number;
  /** Pokémon name in lowercase */
  name: string;
  /** Display name with proper capitalization */
  displayName: string;
  /** Height formatted as meters */
  height: string;
  /** Weight formatted as kilograms */
  weight: string;
  /** Image URL for official artwork */
  image: string;
  /** Array of type names */
  types: string[];
  /** Object containing all base stats */
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
  /** Sum of all base stats */
  totalStats: number;
}

/**
 * Transforms raw Pokémon data from PokéAPI into UI-friendly format
 * Uses functional programming patterns: map, filter, and reduce
 *
 * @param rawPokemon - Raw Pokémon data from PokéAPI
 * @returns Transformed Pokémon data optimized for UI display
 *
 * @example
 * ```typescript
 * const rawData = await fetch('/api/pokemon/pikachu');
 * const transformed = transformPokemonData(rawData);
 *
 * console.log(transformed.displayName); // "Pikachu"
 * console.log(transformed.height); // "0.4m"
 * console.log(transformed.totalStats); // 320
 * ```
 */
export const transformPokemonData = (
  rawPokemon: RawPokemon
): TransformedPokemon => {
  // Map: Transform the data structure
  const mappedData = {
    id: rawPokemon.id,
    name: rawPokemon.name,
    displayName:
      rawPokemon.name.charAt(0).toUpperCase() + rawPokemon.name.slice(1),
    height: `${rawPokemon.height / 10}m`,
    weight: `${rawPokemon.weight / 10}kg`,
    image: rawPokemon.sprites.other["official-artwork"].front_default,
    types: rawPokemon.types.map(type => type.type.name),
    stats: rawPokemon.stats.reduce(
      (acc, stat) => {
        const statName = stat.stat.name.replace("-", "");
        switch (statName) {
          case "hp":
            acc.hp = stat.base_stat;
            break;
          case "attack":
            acc.attack = stat.base_stat;
            break;
          case "defense":
            acc.defense = stat.base_stat;
            break;
          case "speed":
            acc.speed = stat.base_stat;
            break;
          case "specialattack":
            acc.specialAttack = stat.base_stat;
            break;
          case "specialdefense":
            acc.specialDefense = stat.base_stat;
            break;
        }
        return acc;
      },
      {
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        specialAttack: 0,
        specialDefense: 0,
      } as TransformedPokemon["stats"]
    ),
  };

  // Reduce: Calculate total stats
  const totalStats = Object.values(mappedData.stats).reduce(
    (sum, stat) => sum + stat,
    0
  );

  return {
    ...mappedData,
    totalStats,
  };
};

/**
 * Filters an array of Pokémon by their type
 *
 * @param pokemon - Array of transformed Pokémon data
 * @param type - Type to filter by (case-insensitive)
 * @returns Filtered array of Pokémon matching the specified type
 *
 * @example
 * ```typescript
 * const firePokemon = filterPokemonByType(pokemonList, 'fire');
 * const electricPokemon = filterPokemonByType(pokemonList, 'Electric');
 * ```
 */
export const filterPokemonByType = (
  pokemon: TransformedPokemon[],
  type: string
): TransformedPokemon[] => {
  return pokemon.filter(p => p.types.includes(type.toLowerCase()));
};

/**
 * Sorts an array of Pokémon by their total stats
 *
 * @param pokemon - Array of transformed Pokémon data
 * @param ascending - Whether to sort in ascending order (default: false)
 * @returns New sorted array of Pokémon
 *
 * @example
 * ```typescript
 * const strongestFirst = sortPokemonByStats(pokemonList);
 * const weakestFirst = sortPokemonByStats(pokemonList, true);
 * ```
 */
export const sortPokemonByStats = (
  pokemon: TransformedPokemon[],
  ascending = false
): TransformedPokemon[] => {
  return [...pokemon].sort((a, b) => {
    return ascending
      ? a.totalStats - b.totalStats
      : b.totalStats - a.totalStats;
  });
};

/**
 * Gets the top N Pokémon by total stats
 *
 * @param pokemon - Array of transformed Pokémon data
 * @param count - Number of top Pokémon to return
 * @returns Array of top N Pokémon sorted by stats (highest first)
 *
 * @example
 * ```typescript
 * const top10 = getTopPokemonByStats(pokemonList, 10);
 * const top3 = getTopPokemonByStats(pokemonList, 3);
 * ```
 */
export const getTopPokemonByStats = (
  pokemon: TransformedPokemon[],
  count: number
): TransformedPokemon[] => {
  return sortPokemonByStats(pokemon).slice(0, count);
};
