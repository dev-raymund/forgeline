import { assertMinorUnits } from "./money";
import type { CurrencyCode, Money } from "./types";

/** Display locale. Localised pricing is planned for a later phase. */
const LOCALE = "en-US";

const currencyFormatters = new Map<CurrencyCode, Intl.NumberFormat>();

function currencyFormatter(currency: CurrencyCode): Intl.NumberFormat {
  let formatter = currencyFormatters.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat(LOCALE, { style: "currency", currency });
    currencyFormatters.set(currency, formatter);
  }
  return formatter;
}

/** Number of minor-unit digits for a currency (2 for USD, 0 for JPY). */
export function minorUnitDigits(currency: CurrencyCode): number {
  return currencyFormatter(currency).resolvedOptions().maximumFractionDigits ?? 2;
}

/**
 * Converts integer minor units to an exact decimal string such as "1299.00"
 * using string manipulation only, so no floating-point rounding can occur.
 */
export function toDecimalString(value: Money): `${number}` {
  assertMinorUnits(value.amount);
  const digits = minorUnitDigits(value.currency);
  const sign = value.amount < 0 ? "-" : "";
  const units = String(Math.abs(value.amount)).padStart(digits + 1, "0");
  if (digits === 0) return `${sign}${units}` as `${number}`;
  const major = units.slice(0, -digits);
  const minor = units.slice(-digits);
  return `${sign}${major}.${minor}` as `${number}`;
}

export function formatMoney(value: Money): string {
  return currencyFormatter(value.currency).format(toDecimalString(value));
}

export function formatCount(
  count: number,
  singular: string,
  plural = `${singular}s`,
): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
