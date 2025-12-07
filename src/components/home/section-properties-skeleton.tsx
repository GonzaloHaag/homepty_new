import { Skeleton } from "@/components/ui/skeleton";

export function SectionPropertiesSkeleton() {
  return (
    <section className="grid grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[380px]"
        >
          {/* Image Skeleton */}
          <Skeleton className="h-48 w-full rounded-none" />

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Title */}
            <Skeleton className="h-5 w-3/4" />

            {/* Location */}
            <Skeleton className="h-4 w-1/2" />

            {/* Property Details - 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16 ml-auto" />
            </div>

            {/* Areas - 2 columns */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
              <div className="space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="space-y-1 ml-auto">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
