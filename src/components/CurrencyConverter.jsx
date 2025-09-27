import { useState, useEffect } from "react";
import { CurrencyInput } from "./CurrencyInput";
import { CurrencyOutput } from "./CurrencyOutput";

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [quoteCurrency, setQuoteCurrency] = useState("USD");
  const [outputAmount, setOutputAmount] = useState("");

  // Conversion Effect
  useEffect(() => {
    async function converter() {
      if (!amount) {
        setOutputAmount("");
        return;
      }

      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        setOutputAmount("");
        return;
      }

      if (baseCurrency === quoteCurrency) {
        setOutputAmount("");
        return;
      }

      try {
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}&symbols=${quoteCurrency}`
        );

        const data = await res.json();

        const convertedAmount = (numAmount * data.rates[quoteCurrency]).toFixed(
          2
        );
        setOutputAmount(convertedAmount);
      } catch (err) {
        console.error("Conversion failed:", err);
        setOutputAmount("");
      }
    }

    converter();
  }, [amount, baseCurrency, quoteCurrency]);

  return (
    <div className="flex flex-col items-center gap-20 bg-[#fbfbff] p-20 rounded-2xl w-[30rem] md:w-[34rem]">
      <CurrencyInput
        amount={amount}
        setAmount={setAmount}
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        quoteCurrency={quoteCurrency}
        setQuoteCurrency={setQuoteCurrency}
      />

      <CurrencyOutput
        amount={amount}
        baseCurrency={baseCurrency}
        quoteCurrency={quoteCurrency}
        outputAmount={outputAmount}
      />
    </div>
  );
};
