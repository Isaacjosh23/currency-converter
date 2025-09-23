import { useEffect, useState } from "react";

const App = () => {
  return <CurrencyConverter />;
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [quoteCurrency, setQuoteCurrency] = useState("USD");

  // Conversion Effect
  useEffect(() => {
    async function converter() {
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}&symbols=${quoteCurrency}`
      );

      const data = await res.json();

      const convertedAmount = (amount * data.rates[quoteCurrency]).toFixed(2);
    }

    converter();
  }, [amount, baseCurrency, quoteCurrency]);

  console.log(amount, baseCurrency, quoteCurrency);

  return (
    <div className="flex flex-col items-center gap-20">
      <CurrencyInput
        amount={amount}
        setAmount={setAmount}
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        quoteCurrency={quoteCurrency}
        setQuoteCurrency={setQuoteCurrency}
      />

      <CurrencyOutput />
    </div>
  );
};

const CurrencyInput = ({
  amount,
  setAmount,
  baseCurrency,
  setBaseCurrency,
  quoteCurrency,
  setQuoteCurrency,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState({});

  console.log(selectedCurrency);

  useEffect(() => {
    async function currencies() {
      const res = await fetch(`https://api.frankfurter.dev/v1/currencies`);

      const data = await res.json();

      // console.log(data);
      setSelectedCurrency(data);
    }

    currencies();
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center">
      <input
        value={amount}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(Number(value));
          }
        }}
        type="text"
        className="border rounded-[6px] border-black w-72 h-11 px-6 py-2 text-2xl"
      />

      <div className="flex items-center gap-6">
        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="border border-black text-2xl cursor-pointer rounded"
        >
          {Object.keys(selectedCurrency).map((currency) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>

        <select
          value={quoteCurrency}
          onChange={(e) => setQuoteCurrency(e.target.value)}
          className="border border-black text-2xl cursor-pointer rounded"
        >
          {Object.keys(selectedCurrency).map((currency) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const CurrencyOutput = () => {
  return <p className="text-2xl">Output</p>;
};

export default App;
