import { formatMoney } from "@/lib/format";
import type { Money } from "@/lib/types";

/** Shows a formatted price, or a clear notice while pricing is unconfirmed. */
export function ProductPrice({
  price,
  className,
}: {
  price?: Money;
  className?: string;
}) {
  return (
    <p className={className}>
      {price ? (
        <span className="tabular-nums">{formatMoney(price)}</span>
      ) : (
        <span className="text-muted">Price coming soon</span>
      )}
    </p>
  );
}
