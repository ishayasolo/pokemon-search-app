/**
 * TypeScript type definitions for the Pokémon app
 */

export interface Pokemon {
  id: number;
  name: string;
  displayName: string;
  height: string;
  weight: string;
  image: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
  totalStats: number;
}

export interface PokemonSearchParams {
  query: string;
  type?: string;
  sortBy?: "name" | "stats";
  sortOrder?: "asc" | "desc";
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PokemonApiResponse {
  pokemon: Pokemon;
}

export interface PokemonListApiResponse {
  pokemon: Pokemon[];
  total: number;
  page: number;
  limit: number;
}
