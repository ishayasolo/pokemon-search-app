import { SearchHeader } from "@/components/organisms";

/**
 * Template: SearchPageTemplate - Main page layout for Pokémon search
 */
export function SearchPageTemplate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <SearchHeader />
      </div>
    </div>
  );
}
