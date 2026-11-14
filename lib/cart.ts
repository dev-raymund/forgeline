/**
 * Client-side cart prototype.
 *
 * Lines are kept in memory and persisted to localStorage so the cart survives
 * reloads in the same browser. There is no server state, checkout, payment or
 * account integration. Import this module from Client Components only.
 */
import { useSyncExternalStore } from "react";

export interface CartLine {
  readonly productId: string;
  readonly variantId: string | null;
  readonly quantity: number;
}

const STORAGE_KEY = "forgeline:cart:v1";
export const MAX_LINE_QUANTITY = 10;

const EMPTY: readonly CartLine[] = Object.freeze([]);
const listeners = new Set<() => void>();
let state: readonly CartLine[] | null = null;

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.productId === "string" &&
    (typeof line.variantId === "string" || line.variantId === null) &&
    Number.isSafeInteger(line.quantity) &&
    (line.quantity as number) >= 1 &&
    (line.quantity as number) <= MAX_LINE_QUANTITY
  );
}

function load(): readonly CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartLine) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getState(): readonly CartLine[] {
  if (state === null) state = load();
  return state;
}

function emit(): void {
  for (const listener of listeners) listener();
}

function commit(next: readonly CartLine[]): void {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private browsing, quota). Keep the
    // in-memory cart working for the rest of the session.
  }
  emit();
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== STORAGE_KEY) return;
  state = load();
  emit();
}

function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

const getServerSnapshot = (): readonly CartLine[] => EMPTY;

function sameLine(line: CartLine, productId: string, variantId: string | null) {
  return line.productId === productId && line.variantId === variantId;
}

function clampQuantity(quantity: number): number {
  return Math.min(Math.max(Math.trunc(quantity), 0), MAX_LINE_QUANTITY);
}

export function addToCart(
  productId: string,
  variantId: string | null,
  quantity = 1,
): void {
  const lines = getState();
  const existing = lines.find((line) => sameLine(line, productId, variantId));
  const nextQuantity = clampQuantity((existing?.quantity ?? 0) + quantity);
  if (existing) {
    commit(
      lines.map((line) =>
        line === existing ? { ...line, quantity: nextQuantity } : line,
      ),
    );
  } else if (nextQuantity > 0) {
    commit([...lines, { productId, variantId, quantity: nextQuantity }]);
  }
}

export function setLineQuantity(
  productId: string,
  variantId: string | null,
  quantity: number,
): void {
  const nextQuantity = clampQuantity(quantity);
  const lines = getState();
  commit(
    nextQuantity === 0
      ? lines.filter((line) => !sameLine(line, productId, variantId))
      : lines.map((line) =>
          sameLine(line, productId, variantId)
            ? { ...line, quantity: nextQuantity }
            : line,
        ),
  );
}

export function removeFromCart(
  productId: string,
  variantId: string | null,
): void {
  setLineQuantity(productId, variantId, 0);
}

export function useCartLines(): readonly CartLine[] {
  return useSyncExternalStore(subscribe, getState, getServerSnapshot);
}

export function useCartCount(): number {
  return useCartLines().reduce((total, line) => total + line.quantity, 0);
}

const noopSubscribe = () => () => {};

/** False during server rendering and hydration, true once on the client. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
