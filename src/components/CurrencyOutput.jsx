import currencySymbols from "./CurrencySymbols";

export const CurrencyOutput = ({
  outputAmount,
  amount,
  baseCurrency,
  quoteCurrency,
}) => {
  return (
    <p
      className={`text-2xl font-bold text-center ${
        amount && baseCurrency === quoteCurrency ? "text-red-500 font-bold" : ""
      }`}
    >
      {/* {outputAmount
        ? `${amount} ${baseCurrency} to ${quoteCurrency} is ${
            currencySymbols[quoteCurrency]
          } ${baseCurrency === quoteCurrency ? amount : outputAmount}`
        : "How much do you want to convert?"} */}

      {!amount && "Enter an amount to convert"}

      {amount &&
        baseCurrency !== quoteCurrency &&
        outputAmount &&
        `${amount} ${baseCurrency} to ${quoteCurrency} is ${currencySymbols[quoteCurrency]} ${outputAmount}`}

      {amount && baseCurrency === quoteCurrency && "Same currency not allowed"}
    </p>
  );
};
