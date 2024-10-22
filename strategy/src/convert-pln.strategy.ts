import { CurrencyCode } from "./currency.model";

export interface ConvertPlnStrategy {
  calc(pln: number): Promise<{
    value: string;
    currencyCode: any;
  }>;
}

class ConverPlnToUsdStrategy implements ConvertPlnStrategy {
  calc(pln: number) {
    return convertPln("USD", pln);
  }
}

export const convertPlnStrategies: Record<CurrencyCode, ConvertPlnStrategy> = {
  EUR: {
    calc(pln) {
      return convertPln("EUR", pln);
    },
  },
  USD: new ConverPlnToUsdStrategy(),
  GBP: {
    calc(pln) {
      return convertPln("GBP", pln);
    },
  },
};

async function convertPln(currencyCode: CurrencyCode, pln: number) {
  const response = await fetch("https://api.nbp.pl/api/exchangerates/rates/a/" + currencyCode);
  const { code, rates } = await response.json();

  return {
    value: (pln / rates[0].mid).toFixed(2),
    currencyCode: code,
  };
}
