import { convertPlnStrategies } from "./convert-pln.strategy";
import { assertCurrencyCode, CurrencyCode } from "./currency.model";
import { inputElement, resultElement, selectElement } from "./ui";

// "https://api.nbp.pl/api/exchangerates/rates/a/gbp"

export async function renderConvertionResult() {
  const currencyCode = selectElement.value;
  assertCurrencyCode(currencyCode);

  const result = await convertPlnStrategies[currencyCode].calc(inputElement.valueAsNumber);

  resultElement.innerText = `You will get ${result.value} ${result.currencyCode}`;
}
