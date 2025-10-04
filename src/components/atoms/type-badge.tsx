import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
  className?: string;
}

/**
 * Atom: TypeBadge - Displays Pokémon type with appropriate styling
 */
export function TypeBadge({ type, className }: TypeBadgeProps) {
  const typeColors: Record<string, string> = {
    fire: "bg-red-500 hover:bg-red-600",
    water: "bg-blue-500 hover:bg-blue-600",
    grass: "bg-green-500 hover:bg-green-600",
    electric: "bg-yellow-500 hover:bg-yellow-600",
    psychic: "bg-purple-500 hover:bg-purple-600",
    ice: "bg-cyan-500 hover:bg-cyan-600",
    dragon: "bg-indigo-500 hover:bg-indigo-600",
    dark: "bg-gray-800 hover:bg-gray-900",
    fairy: "bg-pink-500 hover:bg-pink-600",
    normal: "bg-gray-500 hover:bg-gray-600",
    fighting: "bg-orange-500 hover:bg-orange-600",
    flying: "bg-sky-500 hover:bg-sky-600",
    poison: "bg-violet-500 hover:bg-violet-600",
    ground: "bg-amber-500 hover:bg-amber-600",
    rock: "bg-stone-500 hover:bg-stone-600",
    bug: "bg-lime-500 hover:bg-lime-600",
    ghost: "bg-slate-500 hover:bg-slate-600",
    steel: "bg-zinc-500 hover:bg-zinc-600",
  };

  return (
    <Badge
      className={cn(
        "text-white font-medium",
        typeColors[type.toLowerCase()] || "bg-gray-500 hover:bg-gray-600",
        className
      )}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
}
