"use client";

import { useState } from "react";
import { AlertCircle, Search } from "lucide-react";
import { SearchBar, PokemonCard } from "@/components/molecules";
import { usePokemonSearch } from "@/api/pokemon";

/**
 * Organism: SearchHeader - Header with search functionality
 */
export function SearchHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: pokemon, isLoading, error } = usePokemonSearch(searchTerm);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Pokémon Search</h1>
        <p className="text-lg text-gray-600">
          Search for any Pokémon to see their stats and information
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <SearchBar onSearch={setSearchTerm} />
        </div>
      </div>

      {searchTerm && (
        <div className="flex justify-center">
          <PokemonCard
            pokemon={pokemon}
            isLoading={isLoading}
            className="w-full max-w-md"
          />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span>{error.message}</span>
        </div>
      )}

      {!searchTerm && (
        <div className="flex items-center justify-center space-x-2 text-gray-500 bg-gray-50 p-8 rounded-lg">
          <Search className="h-6 w-6" />
          <span>Enter a Pokémon name to get started</span>
        </div>
      )}
    </div>
  );
}
