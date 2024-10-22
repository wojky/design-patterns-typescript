import { availableCurrencies } from "./currency.model";
import { selectElement } from "./ui";

export function renderCurrencySelectOptions() {
  for (let currencyCode of availableCurrencies) {
    const option = document.createElement("option");
    option.value = currencyCode;
    option.textContent = currencyCode;

    selectElement.append(option);
  }
}
