import { cn } from "@/lib/cn";

/** Static placeholder block. Intentionally not animated. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("rounded-md bg-surface", className)} />
  );
}

export function ProductDetailSkeleton() {
  return (
    <div role="status" aria-label="Loading product">
      <Skeleton className="mt-6 h-4 w-56 md:mt-8" />
      <div className="grid gap-10 pb-section pt-6 md:pt-8 lg:grid-cols-12 lg:gap-16">
        <Skeleton className="aspect-square lg:col-span-7" />
        <div className="space-y-4 lg:col-span-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-12 w-64" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading products"
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-square" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}
