import { NextRequest, NextResponse } from "next/server";
import {
  withLogger,
  withBaseUrl,
  withMiddleware,
  withErrorHandler,
} from "@/lib/hofs";
import { transformPokemonData } from "@/lib/utils";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

// Enhanced fetch function with middleware
const enhancedFetch = withMiddleware(withErrorHandler, withLogger, fn =>
  withBaseUrl(fn, POKEAPI_BASE_URL)
)(fetch);

/**
 * Fetch Pokémon data from PokéAPI
 */
async function fetchPokemonData(searchTerm: string) {
  const url = `/pokemon/${searchTerm.toLowerCase()}`;

  const response = await enhancedFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const rawData = await response.json();
  return transformPokemonData(rawData);
}

/**
 * API Route Handler for Pokémon search
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("q");

  if (!searchTerm) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }

  try {
    const pokemon = await fetchPokemonData(searchTerm);

    return NextResponse.json({
      data: pokemon,
      success: true,
    });
  } catch (error) {
    console.error("Pokémon API Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch Pokémon data",
        success: false,
      },
      { status: 500 }
    );
  }
}
