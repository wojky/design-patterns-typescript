type CurrencyRate = {
  ask: number;
  bid: number;
  date: string;
  currencyCode: string;
};

type ExchangeRateTypeC = {
  code: string;
  rates: {
    ask: number;
    bid: number;
    effectiveDate: string;
  }[];
};

let currentCurrency = "usd";
let fromCurrency = "pln";
let toCurrency = currentCurrency;

let currentRate = {} as CurrencyRate;

const currenciesButtonsContainer = document.querySelector(".currencies") as HTMLElement;
const switchCurrenciesBtn = document.querySelector("#switch") as HTMLButtonElement;
const input = document.querySelector("input") as HTMLInputElement;
const fromCurrencyUI = document.querySelector("#from") as HTMLElement;
const toCurrencyUI = document.querySelector("#to") as HTMLElement;
const resultContainer = document.querySelector("#result") as HTMLElement;

fromCurrencyUI.textContent = fromCurrency;
toCurrencyUI.textContent = toCurrency;

function createMessage(cost: number) {
  return `Możesz kupić ${cost.toFixed(2)}${toCurrency} za ${input.value}${fromCurrency} po kursie ${
    fromCurrency === currentCurrency ? currentRate.bid : currentRate.ask
  } ${fromCurrency === currentCurrency ? `${toCurrency}/${fromCurrency}` : `${fromCurrency}/${toCurrency}`} (z dn. ${
    currentRate.date
  })`;
}

function withApiConnectionErrorHandler(promise: Promise<unknown>) {
  return promise.catch(() => {
    document.body.innerHTML = "Nie możemy połaczyć się z serwerami Narodowego Banku Polskiego, odśwież stronę";
  });
}

withApiConnectionErrorHandler(
  fetch(`https://api.nbp.pl/api/exchangerates/rates/c/${currentCurrency}/`)
    .then((res) => res.json())
    .then((res: ExchangeRateTypeC) => {
      currentRate = {
        ask: res.rates[0].ask,
        bid: res.rates[0].bid,
        date: res.rates[0].effectiveDate,
        currencyCode: res.code,
      };

      const cost =
        fromCurrency === currentCurrency
          ? input.valueAsNumber * currentRate.bid
          : input.valueAsNumber / currentRate.ask;

      resultContainer.textContent = createMessage(cost);
    })
);

input.addEventListener("change", () => {
  const cost =
    fromCurrency === currentCurrency ? input.valueAsNumber * currentRate.bid : input.valueAsNumber / currentRate.ask;

  resultContainer.textContent = createMessage(cost);
});

switchCurrenciesBtn.addEventListener("click", () => {
  const tempCurrency = fromCurrency;

  fromCurrency = toCurrency;
  toCurrency = tempCurrency;

  fromCurrencyUI.textContent = fromCurrency;
  toCurrencyUI.textContent = toCurrency;

  const cost =
    fromCurrency === currentCurrency ? input.valueAsNumber * currentRate.bid : input.valueAsNumber / currentRate.ask;

  resultContainer.textContent = createMessage(cost);
});

currenciesButtonsContainer.addEventListener("click", (e) => {
  currentCurrency = (e.target as HTMLElement).id;
  fromCurrency = "pln";
  toCurrency = currentCurrency;

  fromCurrencyUI.textContent = fromCurrency;
  toCurrencyUI.textContent = toCurrency;

  withApiConnectionErrorHandler(
    fetch(`https://api.nbp.pl/api/exchangerates/rates/c/${currentCurrency}/`)
      .then((res) => res.json())
      .then((res) => {
        currentRate = {
          ask: res.rates[0].ask,
          bid: res.rates[0].bid,
          date: res.rates[0].effectiveDate,
          currencyCode: res.code,
        };

        const cost =
          fromCurrency === currentCurrency
            ? input.valueAsNumber * currentRate.bid
            : input.valueAsNumber / currentRate.ask;

        resultContainer.textContent = createMessage(cost);
      })
  );
});
