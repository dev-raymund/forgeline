import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Centers content within the shared content width and page gutter. */
export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-content px-gutter", className)}
      {...props}
    />
  );
}
