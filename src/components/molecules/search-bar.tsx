"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Molecule: SearchBar - Search input with debouncing
 */
export function SearchBar({
  onSearch,
  placeholder = "Search Pokémon...",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
}
