import { Card, CardContent, CardHeader, Badge, Skeleton } from "@/components/ui";
import { StatBar, StatBarSkeleton, TypeBadge } from "@/components/atoms";
import { Pokemon } from "@/types";
import Image from "next/image";

interface PokemonCardProps {
  pokemon?: Pokemon;
  isLoading?: boolean;
  className?: string;
}

/**
 * Molecule: PokemonCard - Displays Pokémon information in a card
 */
export function PokemonCard({
  pokemon,
  isLoading = false,
  className,
}: PokemonCardProps) {
  console.log({ pokemon });
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="text-center">
          <Skeleton className="h-48 w-48 mx-auto rounded-lg" />
          <Skeleton className="h-6 w-32 mx-auto" />
          <div className="flex justify-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Height:</span>
              <Skeleton className="h-4 w-12 mt-1" />
            </div>
            <div>
              <span className="text-gray-500">Weight:</span>
              <Skeleton className="h-4 w-12 mt-1" />
            </div>
          </div>
          <div className="space-y-3">
            <StatBarSkeleton />
            <StatBarSkeleton />
            <StatBarSkeleton />
            <StatBarSkeleton />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!pokemon) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No Pokémon data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="relative h-48 w-48 mx-auto">
          <Image
            src={pokemon.image}
            alt={pokemon.displayName}
            width={200}
            height={200}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        <h2 className="text-2xl font-bold">{pokemon.displayName}</h2>
        <div className="flex justify-center gap-2 flex-wrap">
          {pokemon.types.map(type => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Height:</span>
            <p className="font-medium">{pokemon.height}</p>
          </div>
          <div>
            <span className="text-gray-500">Weight:</span>
            <p className="font-medium">{pokemon.weight}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Stats</h3>
          <StatBar label="HP" value={pokemon.stats.hp} />
          <StatBar label="Attack" value={pokemon.stats.attack} />
          <StatBar label="Defense" value={pokemon.stats.defense} />
          <StatBar label="Speed" value={pokemon.stats.speed} />
          <StatBar label="Sp. Attack" value={pokemon.stats.specialAttack} />
          <StatBar label="Sp. Defense" value={pokemon.stats.specialDefense} />

          <div className="pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <Badge variant="secondary" className="font-bold">
                {pokemon.totalStats}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
