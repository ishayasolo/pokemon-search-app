import { useQuery } from "@tanstack/react-query";
import { Pokemon, ApiResponse } from "@/types";

/**
 * Fetch Pokémon data from our API route
 */
async function fetchPokemon(searchTerm: string): Promise<Pokemon> {
  const response = await fetch(
    `/api/pokemon?q=${encodeURIComponent(searchTerm)}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch Pokémon");
  }

  const data: ApiResponse<Pokemon> = await response.json();
  return data.data;
}

/**
 * React Query hook for Pokémon search
 */
export const usePokemonSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ["pokemon", searchTerm],
    queryFn: () => fetchPokemon(searchTerm),
    enabled: searchTerm.length > 0, // Only run query if search term exists
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
