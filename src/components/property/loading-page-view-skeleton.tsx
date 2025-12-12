import { Skeleton } from "../ui/skeleton";

export function LoadingPageViewSkeleton() {
  return (
    <section className="flex flex-col gap-y-6">
      {/** Seccion de imagenes */}
      <div className="grid grid-cols-3 gap-6">
        {/** Imagen principal */}
        <Skeleton className="min-h-96 w-full col-span-2" />
        {/** Imagenes secundarias */}
        <div className="w-full h-full flex flex-col gap-y-4">
          <Skeleton className="w-full h-1/2" />
          <Skeleton className="w-full h-1/2" />
        </div>
      </div>
      {/** Seccion de informacion */}
      <div className="grid grid-cols-3 gap-6">
        {/** Section left */}
        <div className="col-span-2 flex flex-col gap-y-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32" />
          </div>
        </div>
        {/** Section right */}
        <div className="flex flex-col gap-y-6">
          <Skeleton className="h-24" />
          <Skeleton className="h-48" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </section>
  );
}
