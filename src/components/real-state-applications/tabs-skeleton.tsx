import { Skeleton } from "../ui/skeleton";

export function TabsSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-28" />
      <Skeleton className="h-10 w-24" />
    </div>
  );
}
