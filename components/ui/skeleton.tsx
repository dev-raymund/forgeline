import { cn } from "@/lib/cn";

/** Static placeholder block. Intentionally not animated. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("rounded-sm bg-sunken", className)} />
  );
}

export function ProductDetailSkeleton() {
  return (
    <div role="status" aria-label="Loading product">
      <Skeleton className="mt-6 h-4 w-56 md:mt-8" />
      <div className="grid gap-8 pb-section pt-6 md:pt-8 lg:grid-cols-12 lg:gap-16">
        <Skeleton className="aspect-[4/5] lg:col-span-7" />
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
      className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-[4/5]" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}
