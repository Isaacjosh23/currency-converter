import { useState, useEffect } from "react";

export const CurrencyInput = ({
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
      <div className="flex flex-col gap-3">
        <label className="block text-xl font-semibold" htmlFor="amount">
          Amount
        </label>
        <input
          inputMode="decimal"
          pattern="[0-9]*"
          id="amount"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
              setAmount(value);
            }
          }}
          type="text"
          placeholder="Enter Amount"
          className="border rounded-[6px] border-[#040f16] w-72 h-14 px-6 py-2 text-2xl placeholder:text-xl placeholder:font-semibold font-semibold"
        />
      </div>

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
