const CURRENCY_LIST = {
  BRL: "Brazilian Real",
  EUR: "Eur",
  USD: "Dollar",
};

export type CurrencyCode = keyof typeof CURRENCY_LIST;

export const getCurrencyList = () => {
  return Object.keys(CURRENCY_LIST) as CurrencyCode[];
};

export const getCurrencyName = (currencyCode: CurrencyCode) =>
  CURRENCY_LIST[currencyCode];
