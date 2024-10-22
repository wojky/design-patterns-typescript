export const availableCurrencies = ["USD", "EUR", "GBP"] as const;

export type CurrencyCode = (typeof availableCurrencies)[number];

export function assertCurrencyCode(code: string): asserts code is CurrencyCode {
  if (!availableCurrencies.includes(code as any)) {
    throw new Error(`Unsupported currency code: ${code}`);
  }
}
