import { Skeleton } from "@/components/ui";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  className?: string;
}

/**
 * Atom: StatBar - Displays a stat with a visual bar
 */
export function StatBar({
  label,
  value,
  maxValue = 255,
  className,
}: StatBarProps) {
  const percentage = (value / maxValue) * 100;

  const getBarColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    if (percentage >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className={className}>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium capitalize">{label}</span>
        <span className="text-gray-600">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getBarColor(percentage)}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Atom: StatBarSkeleton - Loading state for StatBar
 */
export function StatBarSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex justify-between text-sm mb-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
      </div>
      <Skeleton className="w-full h-2 rounded-full" />
    </div>
  );
}
