import currencySymbols from "./CurrencySymbols";

export const CurrencyOutput = ({
  outputAmount,
  amount,
  baseCurrency,
  quoteCurrency,
}) => {
  return (
    <p className="text-2xl">
      {/* {outputAmount
        ? `${amount} ${baseCurrency} to ${quoteCurrency} is ${
            currencySymbols[quoteCurrency]
          } ${baseCurrency === quoteCurrency ? amount : outputAmount}`
        : "How much do you want to convert?"} */}

      {!amount && "How much do you want to convert?"}

      {amount &&
        baseCurrency !== quoteCurrency &&
        outputAmount &&
        `${amount} ${baseCurrency} to ${quoteCurrency} is ${currencySymbols[quoteCurrency]} ${outputAmount}`}

      {amount &&
        baseCurrency === quoteCurrency &&
        "Can't convert to the same currency. Please select another currency"}
    </p>
  );
};
