import { renderCurrencySelectOptions } from "./options.ui";
import { renderConvertionResult } from "./result.ui";
import { selectElement, inputElement } from "./ui";

function initApp() {
  renderCurrencySelectOptions();
  renderConvertionResult();

  selectElement.addEventListener("change", () => {
    renderConvertionResult();
  });

  inputElement.addEventListener("change", () => {
    renderConvertionResult();
  });
}

initApp();
