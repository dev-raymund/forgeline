import type { CurrencyCode, Money } from "./types";

/**
 * Integer-only money arithmetic. Amounts are always whole minor units, so
 * values never pass through floating-point major-unit representations.
 */

export function assertMinorUnits(amount: number): void {
  if (!Number.isSafeInteger(amount)) {
    throw new RangeError(
      `Money amounts must be safe integers in minor units, received ${amount}.`,
    );
  }
}

export function money(amount: number, currency: CurrencyCode): Money {
  assertMinorUnits(amount);
  return { amount, currency };
}

function assertSameCurrency(a: Money, b: Money): void {
  if (a.currency !== b.currency) {
    throw new TypeError(
      `Cannot combine ${a.currency} and ${b.currency} amounts.`,
    );
  }
}

export function addMoney(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  return money(a.amount + b.amount, a.currency);
}

export function multiplyMoney(value: Money, quantity: number): Money {
  if (!Number.isSafeInteger(quantity)) {
    throw new RangeError(`Quantity must be an integer, received ${quantity}.`);
  }
  return money(value.amount * quantity, value.currency);
}

/**
 * Sums a list of amounts. Returns `undefined` for an empty list or when the
 * amounts are in different currencies, since there is no meaningful total.
 */
export function sumMoney(values: readonly Money[]): Money | undefined {
  const [first, ...rest] = values;
  if (!first) return undefined;
  if (rest.some((value) => value.currency !== first.currency)) return undefined;
  return rest.reduce(addMoney, first);
}
